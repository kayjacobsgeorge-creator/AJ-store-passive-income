
import { GoogleGenAI, Type } from "@google/genai";
import { ProductTrend, GeneratedContent, AdCampaign } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTrendingProducts = async (niche: string): Promise<ProductTrend[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze current e-commerce trends for a store in the ${niche} niche. Provide 5 trending product ideas that work well for a dropshipping or small store model.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            demandScore: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            suggestedPrice: { type: Type.STRING },
            niche: { type: Type.STRING }
          },
          required: ["name", "demandScore", "reasoning", "suggestedPrice", "niche"]
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};

export const generateProductListing = async (productName: string, niche: string): Promise<GeneratedContent> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a high-converting product listing for "${productName}" in the ${niche} niche. Include an SEO-optimized title, a compelling description, search keywords, and a social media marketing hook.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          marketingCopy: { type: Type.STRING }
        },
        required: ["title", "description", "keywords", "marketingCopy"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateAdCampaign = async (productName: string, targetAudience: string): Promise<AdCampaign> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 24/7 automated advertising campaign for "${productName}" targeting "${targetAudience}". Provide high-converting ad copy for Meta (Facebook/Instagram), TikTok, and Google Ads. Include visual directions and a budget strategy.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          targetAudience: { type: Type.STRING },
          platforms: {
            type: Type.OBJECT,
            properties: {
              facebook: {
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING },
                  body: { type: Type.STRING },
                  cta: { type: Type.STRING },
                  visualDirection: { type: Type.STRING }
                },
                required: ["headline", "body", "cta", "visualDirection"]
              },
              tiktok: {
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING },
                  body: { type: Type.STRING },
                  cta: { type: Type.STRING },
                  visualDirection: { type: Type.STRING }
                },
                required: ["headline", "body", "cta", "visualDirection"]
              },
              google: {
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING },
                  body: { type: Type.STRING },
                  cta: { type: Type.STRING },
                  visualDirection: { type: Type.STRING }
                },
                required: ["headline", "body", "cta", "visualDirection"]
              }
            },
            required: ["facebook", "tiktok", "google"]
          },
          suggestedDailyBudget: { type: Type.STRING },
          scalingStrategy: { type: Type.STRING }
        },
        required: ["productName", "targetAudience", "platforms", "suggestedDailyBudget", "scalingStrategy"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getPassiveIncomeRoadmap = async (storeName: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `I have a store called "${storeName}" on Webnode. Provide a 24/7 passive income automation roadmap focusing on: 1. Automated traffic sources, 2. AI-driven customer support, 3. Semi-automated fulfillment, 4. Content scheduling. Use a clear, step-by-step professional tone.`,
  });

  return response.text || "Failed to generate roadmap.";
};
