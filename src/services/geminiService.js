import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "[GEMINI_API_KEY]"; // Replace with your actual Gemini API key
const genAI = new GoogleGenerativeAI(API_KEY);

function dataURLToGenerativePart(dataURL) {
  return {
    inlineData: {
      data: dataURL.split(',')[1],
      mimeType: 'image/png'
    },
  };
}

export const getHelpFromGemini = async (screenshotDataUrl, userQuery) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = userQuery;
  const imagePart = dataURLToGenerativePart(screenshotDataUrl);

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  const text = response.text();
  return text;
};
