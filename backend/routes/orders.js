
// ✅ Conditional env loader
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
require("dotenv").config({ path: envFile });

const { sendMail } = require("../utils/mailer");
const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const jwt = require("jsonwebtoken");

// ✅ Checkout route: create new order with shipping info + cart items
router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token provided ❌" });

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: "Please login ❌" });
    }
    const userId = decoded.id;

    const { name, phone, address1, address2, landmark, pincode, state } = req.body;
    if (!name || !phone || !address1 || !landmark || !pincode || !state) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, address1, landmark, pincode, and state are required ❌",
      });
    }

    const cartResult = await pool.query(
      `SELECT c.service_id, c.option_name, c.quantity, so.price
       FROM cart c
       JOIN service_options so
         ON c.service_id = so.service_id AND c.option_name = so.option_name
       WHERE c.user_id = $1`,
      [userId],
    );

    if (cartResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty ❌" });
    }

    const total = cartResult.rows.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderResult = await pool.query(
      `INSERT INTO orders (
         user_id, shipping_name, shipping_phone,
         shipping_address1, shipping_address2,
         shipping_landmark, shipping_pincode, shipping_state,
         total, status, created_at
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'Pending',NOW())
       RETURNING id`,
      [userId, name, phone, address1, address2, landmark, pincode, state, total],
    );
    const orderId = orderResult.rows[0].id;

    for (const item of cartResult.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, service_id, option_name, quantity, price, status, created_at)
         VALUES ($1, $2, $3, $4, $5, 'Pending', NOW())`,
        [orderId, item.service_id, item.option_name, item.quantity, item.price],
      );
    }

    await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);

    res.json({ success: true, message: "Order placed successfully ✅", orderId });

    setImmediate(async () => {
      try {
        await sendMail(
          process.env.GMAIL_USER,
          `New Order #${orderId}`,
          `Order #${orderId}
Name: ${name}
Phone: ${phone}
Address: ${address1}, ${address2}, Landmark: ${landmark}, ${state}, Pincode: ${pincode}
Total: ₹${total}
Status: Pending
Date: ${new Date().toLocaleString()}`
        );

        const userEmailResult = await pool.query("SELECT email FROM users WHERE id=$1", [userId]);
        const userEmail = userEmailResult.rows[0]?.email;
        if (userEmail) {
          await sendMail(
            userEmail,
            `Order Confirmation #${orderId}`,
            `Thank you for your order!
Order #${orderId}
Total: ₹${total}
Status: Pending
We’ll notify you when the status changes.`
          );
        }
      } catch (err) {
        console.error("Background email failed:", err.message);
      }
    });
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({ success: false, message: "Failed to create order ❌" });
  }
});

// ✅ Get orders summary
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token provided ❌" });

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: "Please login ❌" });
    }
    const userId = decoded.id;

    const result = await pool.query(
      `SELECT o.id AS order_id,
              o.status AS order_status,
              o.total,
              o.created_at,
              o.shipping_name,
              o.shipping_phone,
              o.shipping_address1,
              o.shipping_address2,
              o.shipping_landmark,
              o.shipping_pincode,
              o.shipping_state,
              oi.id AS item_id,
              oi.status AS item_status,
              s.id AS service_id,
              s.title || ' - ' || oi.option_name AS service_name,
              s.image_url,
              oi.quantity,
              oi.price
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN services s ON oi.service_id = s.id
       WHERE o.user_id = $1
       ORDER BY 
         CASE 
           WHEN oi.status = 'Delivered' THEN 1
           WHEN oi.status = 'Out for Delivery' THEN 2
           WHEN oi.status = 'Work in Progress' THEN 3
           WHEN oi.status = 'Received Order' THEN 4
           WHEN oi.status = 'Active' THEN 5
           WHEN oi.status = 'Pending' THEN 6
           WHEN oi.status LIKE 'Cancelled%' THEN 7
           ELSE 8
         END,
         o.created_at DESC`,
      [userId],
    );

    res.json({ success: true, message: "Orders fetched successfully ✅", data: result.rows });
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch orders ❌" });
  }
});

// ✅ Cancel a single order item
router.put("/items/:itemId/cancel", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token provided ❌" });

    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: "Please login ❌" });
    }

    const { itemId } = req.params;
    const { reason } = req.body;
    const statusText = `Cancelled: ${reason}`.substring(0, 100);

    const itemResult = await pool.query(
      `UPDATE order_items
       SET status=$1, cancel_reason=$2, updated_at=NOW()
       WHERE id=$3
       RETURNING order_id`,
      [statusText, reason, itemId],
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Order item not found ❌" });
    }

    const orderId = itemResult.rows[0].order_id;

    await pool.query(
      `UPDATE orders
       SET total = (
         SELECT COALESCE(SUM(price * quantity),0)
         FROM order_items
         WHERE order_id=$1 AND status NOT LIKE 'Cancelled%'
       )
       WHERE id=$1`,
      [orderId],
    );

    res.json({ success: true, message: "Order item cancelled successfully ✅" });

    setImmediate(async () => {
      try {
        const userEmailResult = await pool.query(
          "SELECT email FROM users WHERE id=(SELECT user_id FROM orders WHERE id=$1)",
          [orderId],
        );
        const userEmail = userEmailResult.rows[0]?.email;

        if (userEmail) {
          await sendMail(
            userEmail,
            `Order #${orderId} Status Update`,
            `Your order has been updated.
Order #${orderId}
Item: ${itemId}
New Status: ${statusText}`
          );
        }

        await sendMail(
          process.env.GMAIL_USER,
          `Order #${orderId} Cancelled`,
          `Order #${orderId}
Item ID: ${itemId}
Status: ${statusText}
Reason: ${reason}
Date: ${new Date().toLocaleString()}`
        );
      } catch (err) {
        console.error("Background email failed:", err.message);
      }
    });
  } catch (err) {
    console.error("Error cancelling order item:", err.message);
    res.status(500).json({ success: false, message: "Failed to cancel order item ❌" });
  }
});

module.exports = router;
