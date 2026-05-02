import { User } from "../models/user.model.js";

export const bookmarks = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const tweetId = req.params.id;

    const user = await User.findById({ loggedInUserId });
    if (user.bookmarks.includes(tweetId)) {
      // remove
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Remove from bookmark",
      });
    } else {
      // bookmark
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Saved to bookmark",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
