import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

// Fluent UI v9 imports
import {
  Input,
  Button,
  makeStyles,
  shorthands,
  tokens,
  Text,
  Caption1,
} from "@fluentui/react-components";

import {
  Dismiss12Regular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow4,
  },
  postList: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
  },
  actions: {
    display: "flex",
    columnGap: tokens.spacingHorizontalS,
  },
});

const Profile = () => {
  const classes = useStyles();
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        `${URL}/api/users/${user._id}`,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [param]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-6 md:px-[200px] py-8 flex flex-col md:flex-row gap-8">
        {/* Posts */}
        <div className="md:w-[70%] w-full">
          <Text size={500} weight="bold" className="mb-4">
            Your Posts
          </Text>
          <div className={classes.postList}>
            {posts?.map((p) => (
              <ProfilePosts key={p._id} p={p} />
            ))}
          </div>
        </div>

        {/* Profile Settings */}
        <div className="md:w-[30%] w-full md:sticky md:top-12">
          <div className={classes.container}>
            <Text size={500} weight="bold">
              Profile
            </Text>

            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              appearance="outline"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              appearance="outline"
            />

            {/* Uncomment if password edit is enabled */}
            {/* <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              appearance="outline"
            /> */}

            <div className={classes.actions}>
              <Button
                appearance="primary"
                onClick={handleUserUpdate}
              >
                Update
              </Button>

              <Button
                appearance="secondary"
                icon={<Dismiss12Regular />}
                onClick={handleUserDelete}
              >
                Delete
              </Button>
            </div>

            {updated && (
              <Caption1
                className="text-green-600 text-center mt-4"
              >
                User updated successfully!
              </Caption1>
            )}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Profile;
