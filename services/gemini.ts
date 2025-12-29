import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, RecommendationResponse } from "../types";

const getGeminiClient = () => {
  // The API key must be obtained exclusively from process.env.API_KEY.
  // It is assumed to be pre-configured and injected via the build process (vite.config.ts).
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }
  
  return new GoogleGenAI({ apiKey });
};

export const generateHealthPlan = async (profile: UserProfile, bmi: number, bmiCategory: string): Promise<RecommendationResponse> => {
  const ai = getGeminiClient();
  
  const prompt = `
    Act as an expert nutritionist and fitness coach called "NutriFood".
    Create a personalized health plan for a user with the following profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Height: ${profile.height} cm
    - Weight: ${profile.weight} kg
    - Activity Level: ${profile.activityLevel}
    - BMI: ${bmi} (${bmiCategory})

    Provide a JSON response with practical, safe, and motivating advice.
    The tone should be encouraging, friendly, and easy to understand.
    Ensure recommendations are age-appropriate and realistic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A short, motivating summary message about their current status and goals." },
            exercise: {
              type: Type.OBJECT,
              properties: {
                routine: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of specific exercises suitable for them." },
                frequency: { type: Type.STRING, description: "Recommended duration and frequency (e.g. 30 mins, 4x a week)." },
                home_workouts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Simple exercises they can do at home." }
              }
            },
            walking: {
              type: Type.OBJECT,
              properties: {
                daily_steps: { type: Type.STRING, description: "Target step count." },
                tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tips to increase activity (e.g. take stairs)." }
              }
            },
            nutrition: {
              type: Type.OBJECT,
              properties: {
                meals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "General meal ideas for Breakfast, Lunch, Dinner." },
                hydration: { type: Type.STRING, description: "Daily water intake recommendation." },
                foods_to_include: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top healthy foods to add." },
                foods_to_avoid: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Foods to limit or avoid." }
              }
            },
            lifestyle: {
              type: Type.OBJECT,
              properties: {
                sleep: { type: Type.STRING, description: "Sleep duration recommendation." },
                stress_management: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tips for mental well-being." }
              }
            }
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("No response generated from Gemini.");
    }

    return JSON.parse(response.text) as RecommendationResponse;

  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    
    // Specific handling for the "API Not Enabled" error
    if (error.message && (error.message.includes("Generative Language API has not been used") || error.message.includes("SERVICE_DISABLED"))) {
      throw new Error("The Gemini API is not enabled on your Google Cloud Project. Please enable it in the Google Cloud Console.");
    }
    
    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
      throw new Error("Received an invalid response format. Please try again.");
    }

    // Pass through the original message if available, otherwise a generic one
    throw new Error(error.message || "Failed to generate health plan. Please try again.");
  }
};