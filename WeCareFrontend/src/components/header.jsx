
import useAuthContext from "../hooks/useAuthContext";

function Header() {
    const listItemStyle = {
        listStyle: "none",
        padding: "0 10px",
        whiteSpace: "nowrap",
    };
    const {user , isAuthenticated} = useAuthContext();
    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "0 0 10px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    boxShadow: "0 1px 8px #ddd",
                    zIndex: 1000,
                }}
            >
                <h1
                    style={{
                        margin: "0",
                        fontSize: "1.5em",
                        flex: "1 1 auto",
                    }}
                >
                    WeCare
                </h1>

                <ul
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "10px",
                        padding: 0,
                        margin: 0,
                        flex: "2 1 auto",
                    }}
                >
                {isAuthenticated && <li style={listItemStyle}>View Profile</li>}
                {isAuthenticated && user.role === "USER" &&   <li style={listItemStyle}>My Schedule</li>}
                {isAuthenticated && user.role === "COACH" &&    <li style={listItemStyle}>My Appointments</li>}
                <li style={listItemStyle}>Contact Us: 080 22334477</li>
                {isAuthenticated && <li style={listItemStyle}>Log Out</li>}
                </ul>
            </header>
        </>
    );
}

export default Header;
