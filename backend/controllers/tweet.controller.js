import { Tweet } from "../models/tweet.model.js";

export const createTweetController = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        success: false,
        message: "Feilds are required",
      });
    }

    await Tweet.create({
      description,
      userId: id,
    });

    return res.status(201).json({
      success: true,
      message: "Tweet created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
