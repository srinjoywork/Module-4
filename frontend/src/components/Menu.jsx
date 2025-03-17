import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

import {
  Text,
  tokens,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  menuItem: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent", // no bg color by default
    borderRadius: tokens.borderRadiusCircular,
    padding: "0.5rem 1rem",
    fontSize: tokens.fontSizeBase300,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "inline-block", // shrink to fit content
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
});

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const styles = useStyles();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-gray-300 w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4 shadow-xl"
      style={{ borderRadius: tokens.borderRadiusMedium }}
    >
      {!user && (
        <Link to="/login" className="w-full">
          <Text className={`${styles.menuItem} w-full text-center`}>
            Login
          </Text>
        </Link>
      )}

      {!user && (
        <Link to="/register" className="w-full">
          <Text className={`${styles.menuItem} w-full text-center`}>
            Register
          </Text>
        </Link>
      )}

      {user && (
        <Link to={`/profile/${user._id}`} className="w-full">
          <Text className={`${styles.menuItem} w-full text-center`}>
            Profile
          </Text>
        </Link>
      )}

      {user && (
        <Link to="/write" className="w-full">
          <Text className={`${styles.menuItem} w-full text-center`}>
            Write
          </Text>
        </Link>
      )}

      {user && (
        <Link to={`/myblogs/${user._id}`} className="w-full">
          <Text className={`${styles.menuItem} w-full text-center`}>
            My Blogs
          </Text>
        </Link>
      )}

      {user && (
        <Text
          className={`${styles.menuItem} w-full text-center`}
          onClick={handleLogout}
        >
          Logout
        </Text>
      )}
    </div>
  );
};

export default Menu;
