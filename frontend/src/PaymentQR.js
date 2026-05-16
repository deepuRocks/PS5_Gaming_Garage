import { QRCodeCanvas } from 'qrcode.react';

function PaymentQR() {
  return (
    <div>
      <h2>Scan to Pay via UPI</h2>
      <QRCodeCanvas value="upi://pay?pa=yourupiid@upi&pn=PS5GamingGarage&am=500" />
    </div>
  );
}

export default PaymentQR;
