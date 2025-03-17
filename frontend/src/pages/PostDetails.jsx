import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import DOMPurify from "dompurify";

// Fluent UI imports
import {
  Button,
  Input,
  makeStyles,
  shorthands,
  tokens,
  Text,
  Image,
} from "@fluentui/react-components";
import { EditRegular, DeleteRegular } from "@fluentui/react-icons";

// Styles
const useStyles = makeStyles({
  container: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    marginTop: "2rem",
    [`@media(min-width: 768px)`]: {
      paddingLeft: "200px",
      paddingRight: "200px",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeHero700,
    color: tokens.colorNeutralForeground1,
  },
  postDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    alignItems: "center",
  },
  categoryBadge: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding("4px", "12px"),
    borderRadius: tokens.borderRadiusMedium,
  },
  commentSection: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  commentForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    [`@media(min-width: 768px)`]: {
      flexDirection: "row",
    },
  },
  commentInput: {
    width: "100%",
    marginBottom: "1rem",
    [`@media(min-width: 768px)`]: {
      width: "80%",
      marginBottom: "0",
      marginRight: "1rem",
    },
  },
  addButton: {
    width: "100%",
    [`@media(min-width: 768px)`]: {
      width: "20%",
    },
  },
  image: {
    width: "20rem",
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  loaderWrapper: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  postContent: {
    marginTop: "2rem",
    fontSize: "1rem", // Adjust this to match editor's font size (e.g., 16px)
    lineHeight: "1.6",
    color: tokens.colorNeutralForeground2,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    '& p': {
    margin: '0 0 1rem 0',
  },
  '& h1': {
    fontSize: '2rem',
  },
  '& h2': {
    fontSize: '1.5rem',
  },
  '& strong': {
    fontWeight: 'bold',
  },
  '& em': {
    fontStyle: 'italic',
  },
  },
});

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const styles = useStyles();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/comments/create`,
        {
          comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <Text className={styles.title}>{post.title}</Text>
            {user?._id === post?.userId && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  icon={<EditRegular />}
                  appearance="secondary"
                  onClick={() => navigate(`/edit/${postId}`)}
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteRegular />}
                  appearance="outline"
                  onClick={handleDeletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className={styles.postDetails}>
            <Text>@{post.username}</Text>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Text>{new Date(post.updatedAt).toDateString()}</Text>
              <Text>{new Date(post.updatedAt).toTimeString().slice(0, 8)}</Text>
            </div>
          </div>

          <Image
            src={IF + post.photo}
            alt="Post"
            className={styles.image}
            fit="cover"
          />

          {/* 👇 Render sanitized post content */}
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          />

          <Text weight="semibold" style={{ marginTop: "2rem" }}>
            Categories:
          </Text>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {post.categories?.map((c) => (
              <span key={c} className={styles.categoryBadge}>
                {c}
              </span>
            ))}
          </div>

          <div className={styles.commentSection}>
            <Text weight="semibold" style={{ marginTop: "2rem" }}>
              Comments:
            </Text>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>

          <form onSubmit={postComment} className={styles.commentForm}>
            <Input
              className={styles.commentInput}
              placeholder="Write a comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              required
            />
            <Button
              type="submit"
              appearance="primary"
              className={styles.addButton}
            >
              Add Comment
            </Button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
