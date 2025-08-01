function Footer() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",  
            bottom: "0",
            width: "100%",
            height: "60px",
            backgroundColor: "blue",
            color: "white",
            textAlign: "center",
            padding: "10px",
            zIndex: 1000, 
        }}>
            <span>© 2025 WeCare. All Rights Reserved.</span>
        </div>
    );
}

export default Footer;
