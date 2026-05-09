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

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const userId = req.params.id;

    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    const alreadyFollowed = await user.followers.includes(loggedInUserId);

    if (!alreadyFollowed) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: userId } });
    } else {
      return res.status(400).json({
        message: `${loggedInUser.name} already followed to ${user.name}`,
      });
    }
    return res.status(200).json({
      message: `${loggedInUser.name} just follow to ${user.name}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
