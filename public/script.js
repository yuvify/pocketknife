import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const API_KEY = "AIzaSyD9VWSel_yEM3fxXgZJ4tH07wFEkN7zPFY"; // theres no point of stealing this api key, its literally free on ai.google.dev.
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

document.getElementById("submitBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  if (userInput) {
    const startTime = performance.now();
    const result = await model.generateContent(userInput);
    const originalText = await result.response.text();
    const markdownContent = marked.parse(originalText);
    const endTime = performance.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(1);

    document.getElementById("response").innerHTML = `
      <p><strong>Your input:</strong> ${userInput}</p>
      ${markdownContent}
      <p><em>Took ${timeTaken}s</em></p>`;

    document.getElementById("userInput").value = "";
  }
});
