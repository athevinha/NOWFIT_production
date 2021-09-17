import { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Hashtags from "react-highlight-hashtags";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase/config";
import { Context } from "../Context/GlobalState";
import firebase from "firebase";
import PostComment from "./PostComment";
import PostModal from "./PostModal";

export default function Post({ post }) {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const { user } = useContext(Context);

  // This effect will help to load post's comment from the firestore DB
  useEffect(() => {
    db.collection("posts")
      .doc(post.id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setPostComments(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, [post.id]);

  const handleCommentForm = (e) => {
    e.preventDefault();

    db.collection("posts")
      .doc(post.id)
      .collection("comments")
      .add({
        comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: {
          fullName: user.fullName,
          photoURL: user.photoURL,
        },
      });

    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={post.user.fullName} src={post.user.photoURL} />
        <h4>{post.user.username}</h4>
      </div>
      <div className="post__body" onClick={() => setIsModal(true)}>
        <img src={post.url} alt="Post" title="Click to view in full screen" />
      </div>
      <div className="post__footer">
        <p className="post__caption">
          <Hashtags>{post.caption}</Hashtags>
        </p>
      </div>
      <div className="post__comments">
        {postComments.slice(0, 2).map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))}
      </div>
      <form className="post__commentForm" onSubmit={handleCommentForm}>
        <input
          type="text"
          placeholder="Comment here..."
          className="comment__box"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="post__commentBtn">
          <SendIcon />
        </button>
      </form>
      {isModal && (
        <PostModal post={post} isModal={isModal} setIsModal={setIsModal} />
      )}
    </div>
  );
}
