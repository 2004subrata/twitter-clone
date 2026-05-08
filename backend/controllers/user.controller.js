import { User } from "../models/user.model.js";

export const bookmarks = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const tweetId = req.params.id;

    const user = await User.findById(loggedInUserId);
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

export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOtherUser = async (req, res) => {
  try {
    const id = req.user.userId;
    const otherUser = await User.find({ _id: { $ne: id } }).select("-password");
    if (!otherUser) {
      return res.status(404).json({
        message: "Currently do not have any users.",
      });
    }
    return res.status(200).json({
      otherUser,
    });
  } catch (error) {
    console.error(error);
  }
};
