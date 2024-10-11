import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyB7jpfsNH70K6Fk4ai_UxdBj2QL3CzWVEw";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

document.getElementById("sendBtn").addEventListener("click", async () => {
  const userMessage = document.getElementById("userInput").value;
  if (userMessage) {
    const result = await model.generateContent(userMessage);
    const outputText = await result.response.text();
    document.getElementById("response").innerHTML = `<pre>${outputText}</pre>`;
    document.getElementById("userInput").value = "";
  }
});
