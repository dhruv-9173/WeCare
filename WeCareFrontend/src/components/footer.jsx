import React from "react";

function Footer() {
  return (
    <footer
      className="bg-primary text-white text-center py-3"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        fontSize: "14px",
      }}
    >
      <span>© 2025 WeCare. All Rights Reserved.</span>
    </footer>
  );
}

export default Footer;
