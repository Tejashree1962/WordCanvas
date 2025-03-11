import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from 'form-data';

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body; // Correct key is 'prompt'

        // Fetch the user
        const user = await userModel.findById(userId);

        if (!user || !prompt) { // Fixed typo
            return res.json({ success: false, message: "Missing Details" });
        }

        // Check if user has enough credits
        if (user.creditBalance <= 0) { // Fixed condition
            return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance });
        }

        // Prepare form-data for Clipdrop API
        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API,
                    ...formData.getHeaders(), // Ensure correct headers for FormData
                },
                responseType: "arraybuffer",
            }
        );

        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct 1 credit
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage,
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
