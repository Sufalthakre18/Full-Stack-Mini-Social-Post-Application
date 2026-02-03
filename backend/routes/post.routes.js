import express from 'express'
import auth from '../middlewares/auth.middleware.js';
import { commentPost, createPost, getPosts, likePost } from '../controllers/post.controller.js';


const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.put("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);

export default router;
