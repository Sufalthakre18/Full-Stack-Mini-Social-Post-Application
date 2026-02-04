import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useContext, useState } from "react";
import { apiRequest } from "../api/api.js";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function PostCard({ post, onUpdate }) {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const likedByUser = post.likes.includes(user.username);

  const likePost = async () => {
    const updatedPost = await apiRequest(`/posts/${post._id}/like`, {
      method: "PUT",
    });
    onUpdate(updatedPost);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const updatedPost = await apiRequest(
      `/posts/${post._id}/comment`,
      {
        method: "POST",
        body: { commentText },
      }
    );

    setCommentText("");
    setShowComments(true);
    onUpdate(updatedPost);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar>{post.username[0].toUpperCase()}</Avatar>}
        title={post.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />

      <CardContent>
        {post.text && <Typography>{post.text}</Typography>}

        {post.image && (
          <Box sx={{ mt: 2 }}>
            <img
              src={post.image}
              alt="post"
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>
        )}
      </CardContent>

      <CardActions>
        <IconButton onClick={likePost}>
          <FavoriteIcon color={likedByUser ? "error" : "inherit"} />
        </IconButton>
        <Typography>{post.likes.length}</Typography>

        <IconButton onClick={() => setShowComments(!showComments)}>
          <CommentIcon />
        </IconButton>
        <Typography>{post.comments.length}</Typography>
      </CardActions>

      {showComments && (
        <CardContent>
          {post.comments.map((c, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="subtitle2">{c.username}</Typography>
              <Typography variant="body2">{c.commentText}</Typography>
            </Box>
          ))}

          <form onSubmit={submitComment}>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </Box>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
