import { Tweet } from "../models/tweet.model.js";

export const createTweetController = async (req, res) => {
  try {
    const { description } = req.body;
    const { userId } = req.user;
    if (!description || !id) {
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
