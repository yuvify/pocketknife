import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const API_KEY = "AIzaSyB7jpfsNH70K6Fk4ai_UxdBj2QL3CzWVEw";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let isMarkdown = false;
let originalText = "";

document.getElementById("submitBtn").addEventListener("click", async () => {
  const userMessage = document.getElementById("userInput").value;
  if (userMessage) {
    const result = await model.generateContent(userMessage);
    originalText = await result.response.text();
    document.getElementById(
      "response"
    ).innerHTML = `<pre>${originalText}</pre>`;
    document.getElementById("userInput").value = "";
    document.getElementById("toggleMarkdownBtn").style.display = "block";
    isMarkdown = false;
  }
});

document.getElementById("toggleMarkdownBtn").addEventListener("click", () => {
  const responseDiv = document.getElementById("response");
  if (isMarkdown) {
    responseDiv.innerHTML = `<pre>${originalText}</pre>`;
    document.getElementById("toggleMarkdownBtn").innerText = "View as Markdown";
  } else {
    const markdownContent = marked.parse(originalText);
    responseDiv.innerHTML = markdownContent;
    document.getElementById("toggleMarkdownBtn").innerText = "View as Text";
  }
  isMarkdown = !isMarkdown;
});
