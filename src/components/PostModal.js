import { useEffect, useState } from "react";
import { Avatar, Modal } from "@material-ui/core";
import { db } from "../firebase/config";
import PostComment from "./PostComment";

const PostModal = ({ post, isModal, setIsModal }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .doc(post.id)
      .collection("comments")
      .onSnapshot((snap) => {
        setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, [post.id]);

  return (
    <Modal open={isModal} onClose={() => setIsModal(false)}>
      <div className="post_modal__body">
        <div className="post_modal__content">
          <a
            href="#!"
            className="post_modal__close"
            onClick={() => setIsModal(false)}
          >
            &times;
          </a>
          <div className="post__img">
            <img src={post.url} alt="Post" />
          </div>
          <div className="post__body">
            <div className="post__user">
              <Avatar src={post?.user.photoURL} alt={post?.user.fullName} />
              <h3>{post?.user.fullName}</h3>
            </div>
            <p className="post__caption">{post?.caption}</p>
            <h3 className="post__commentsHeading">Comments</h3>
            <div className="post__comments">
              {comments.map((comment) => (
                <PostComment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
