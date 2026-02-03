import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: {
      type: String,
      required: true
    },
    text: {
      type: String
    },
    image: {
      type: String
    },
    likes: {
      type: [String],
      default: []
    },
    comments: [
      {
        username: String,
        commentText: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
