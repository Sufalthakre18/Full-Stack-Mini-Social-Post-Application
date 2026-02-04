import { Paper, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { apiRequest } from "../api/api";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPost = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image.trim()) return;

    try {
      setLoading(true);
      const newPost = await apiRequest("/posts", {
        method: "POST",
        body: {
          text: text.trim() || undefined,
          image: image.trim() || undefined,
        },
      });

      onPostCreated(newPost);
      setText("");
      setImage("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <form onSubmit={submitPost}>
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="What's on your mind?"
            multiline
            minRows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <TextField
            label="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
