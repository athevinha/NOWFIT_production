import Avatar from "@material-ui/core/Avatar";

const PostComment = ({comment}) => {
  return (
    <div className="post__comment">
      <div className="post__userDescription">
        <Avatar src={comment.user.photoURL} alt={comment.user.fullName} />
        <h3>{comment.user.fullName}</h3>
      </div>
      <p className="post__commentText">{comment.comment}</p>
    </div>
  );
};

export default PostComment;
