import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY is not set in environment variables",
        suggestion: "Add GEMINI_API_KEY=your_key_here to .env.local"
      }, { status: 500 });
    }

    console.log("API Key found, testing with simple generation...");
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Test with a simple model - try multiple options
    const modelNames = [
      "gemini-1.5-flash",
      "gemini-1.5-pro", 
      "gemini-pro",
      "gemini-1.0-pro"
    ];

    const testResults = [];

    for (const modelName of modelNames) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Simple test prompt
        const result = await model.generateContent("Say 'Hello World' in one word.");
        const response = await result.response;
        const text = response.text().trim();
        
        testResults.push({
          model: modelName,
          status: "✅ Working",
          response: text,
          responseLength: text.length
        });
        
        console.log(`✅ ${modelName}: ${text}`);
        
      } catch (error: any) {
        testResults.push({
          model: modelName,
          status: "❌ Failed",
          error: error.message
        });
        console.log(`❌ ${modelName}: ${error.message}`);
      }
    }

    // Check if any model worked
    const workingModels = testResults.filter(r => r.status === "✅ Working");
    
    return NextResponse.json({
      apiKeyStatus: workingModels.length > 0 ? "Valid" : "No working models found",
      testResults: testResults,
      workingModels: workingModels.length,
      totalModelsTested: testResults.length,
      suggestion: workingModels.length > 0 
        ? `Use model: ${workingModels[0].model}`
        : "Check your API key at https://aistudio.google.com/"
    });

  } catch (error: any) {
    console.error("Gemini API test failed:", error);
    
    return NextResponse.json({
      apiKeyStatus: "Invalid",
      error: error.message,
      suggestion: "Your API key might be invalid or there's a network issue"
    }, { status: 500 });
  }
}