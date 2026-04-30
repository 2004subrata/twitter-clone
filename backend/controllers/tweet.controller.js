import { Tweet } from "../models/tweet.model.js";

/**
 * - Create a new tweet.
 * -  Requires an authenticated user (via authMiddleware).
 */
export const createTweetController = async (req, res) => {
  try {
    const { description } = req.body;
    const { userId } = req.user;
    if (!description || !userId) {
      return res.status(401).json({
        success: false,
        message: "Feilds are required",
      });
    }

    await Tweet.create({
      description,
      userId: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Tweet created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * - Delete a tweet.
 * - Requires an authenticated user (via authMiddleware).
 * - Only the owner of the tweet is allowed to delete it.
 */
export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Tweet deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * like or unlike (toggle) a tweet.
 * - If the authenticated user has already liked the tweet,
 * their like is removed (dislike/unlike). Otherwise, the tweet is liked.
 */
export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const tweetId = req.params.id;

    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loggedInUserId)) {
      // dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User disliked you tweet",
      });
    } else {
      // like
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User liked you tweet",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
