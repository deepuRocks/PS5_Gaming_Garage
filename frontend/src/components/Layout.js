import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="layout">
      <Header onSearch={setSearchTerm} />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          {/* ✅ inject searchTerm into children */}
          {React.cloneElement(children, { searchTerm })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
