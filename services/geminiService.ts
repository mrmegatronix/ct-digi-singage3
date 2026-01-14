import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestionResponse } from "../types";

export const generateEnhancedCopy = async (
  currentTitle: string, 
  currentDescription: string, 
  day: string
): Promise<AISuggestionResponse> => {
  
  // Check for API key presence to prevent errors in demo environments without keys.
  // The application must generally assume process.env.API_KEY is available.
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing. Returning dummy data.");
    return {
      title: `${currentTitle} (Enhanced)`,
      description: `[DEMO MODE: Missing API Key] ${currentDescription} - Enjoy this delicious meal!`
    };
  }

  // Initialize Gemini client using the environment variable directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a professional menu copywriter for a modern, high-quality tavern called "Coasters Tavern".
    Please rewrite the following menu item to be more appetizing, catchy, and professional. 
    Keep the tone welcoming and premium yet accessible.
    
    Day: ${day}
    Current Title: ${currentTitle}
    Current Description: ${currentDescription}
    
    Return a JSON object with 'title' (short, catchy) and 'description' (max 25 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AISuggestionResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
