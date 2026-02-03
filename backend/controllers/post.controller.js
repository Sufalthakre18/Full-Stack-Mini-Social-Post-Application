import Post from "../models/Post";

export async function createPost(req, res){
  const { text, image } = req.body;

  if (!text && !image) {
    return res.status(400).json({ message: "Post cannot be empty" });
  }

  try {
    const post = await Post.create({
      userId: req.user.id,
      username: req.user.username,
      text,
      image
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export async function getPosts(req, res){
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export async function likePost(req, res){
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user.username)) {
      post.likes = post.likes.filter(
        (user) => user !== req.user.username
      );
    } else {
      post.likes.push(req.user.username);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export async function commentPost(req, res){
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      username: req.user.username,
      commentText: req.body.commentText
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
