import { NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required"),
  style: z.enum(["simple", "professional", "storytelling"]).default("professional"),
  emojis: z.boolean().default(true),
  hashtags: z.boolean().default(true),
  generateAll: z.boolean().default(false),
});

// Enhanced high-quality mock responses with engaging openings and impact hooks
const mockResponses: Record<string, (title: string, type: string, description: string, emojis: boolean, hashtags: boolean) => string> = {
  
  simple: (title: string, type: string, description: string, emojis: boolean, hashtags: boolean) => {
    const emoji = emojis ? '🚀 ' : '';
    const hashtag = hashtags ? '\n\n#Tech #Opportunity #CareerGrowth #Coding' : '';
    
    return `${emoji}Excited to share this amazing ${type.toLowerCase()} opportunity!\n\n` +
           `🎯 ${title}\n\n` +
           `${description}\n\n` +
           `💡 This experience will help you level up your skills and connect with like-minded developers in the community.\n\n` +
           `Don't miss out on this chance to grow and learn!${hashtag}`;
  },
  
  professional: (title: string, type: string, description: string, emojis: boolean, hashtags: boolean) => {
    const emoji = emojis ? '🎯 ' : '';
    const hashtag = hashtags ? '\n\n#ProfessionalDevelopment #TechCareer #Innovation #Networking' : '';
    
    return `${emoji}Thrilled to announce my involvement with "${title}" - an exceptional ${type.toLowerCase()} opportunity!\n\n` +
           `📊 Project Impact:\n` +
           `${description}\n\n` +
           `💼 Key Achievements:\n` +
           `• Enhanced platform engagement through smart alert systems\n` +
           `• Implemented AI-powered content generation\n` +
           `• Built scalable full-stack architecture\n\n` +
           `This experience has been instrumental in advancing my expertise in modern web technologies and user-centric design principles.\n\n` +
           `Looking forward to applying these insights to future innovative projects!${hashtag}`;
  },
  
  storytelling: (title: string, type: string, description: string, emojis: boolean, hashtags: boolean) => {
    const emoji = emojis ? '✨ ' : '';
    const hashtag = hashtags ? '\n\n#Journey #Learning #TechCommunity #Innovation' : '';
    
    return `${emoji}Let me take you on a journey that started with a simple idea and turned into something extraordinary...\n\n` +
           `🌟 Discovering "${title}"\n\n` +
           `It began as a ${type.toLowerCase()} opportunity, but quickly evolved into a passion project. ${description}\n\n` +
           `💫 The Turning Point\n\n` +
           `What started as technical implementation became a lesson in perseverance, collaboration, and the power of community-driven development.\n\n` +
           `🎯 Key Learnings:\n` +
           `• The importance of user feedback in shaping product direction\n` +
           `• How AI can enhance human creativity, not replace it\n` +
           `• The magic that happens when developers unite around a shared vision\n\n` +
           `This journey reinforced my belief that technology's true power lies in its ability to connect and empower people.\n\n` +
           `Grateful for the mentors and community that made this possible!${hashtag}`;
  }
};

// AI-powered prompt template for when Gemini API works
const buildAIPrompt = (title: string, type: string, description: string, style: string, emojis: boolean, hashtags: boolean) => {
  return `
Generate a compelling LinkedIn post in a ${style} tone about this ${type}:

TITLE: ${title}
DESCRIPTION: ${description}

CRITICAL REQUIREMENTS:
1. Start with an engaging, achievement-oriented opening line
2. Include a clear impact/achievement hook showing results or takeaways
3. Add personal reflection on learning or growth
4. End with a strong call-to-action encouraging engagement
5. Use proper line spacing for readability
6. ${emojis ? "Include relevant emojis for visual appeal" : "No emojis"}
7. ${hashtags ? "Include 4-6 relevant hashtags at the end" : "No hashtags"}

TONE: ${style} - should feel human, authentic, and professional
LENGTH: 150-300 words
FORMAT: Use line breaks between sections for readability

Make it sound like a real professional sharing an exciting achievement!
`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = BodySchema.parse(body);

    const styles = data.generateAll
      ? ["simple", "professional", "storytelling"]
      : [data.style];

    const results: Record<string, string> = {};

    for (const s of styles) {
      const responseGenerator = mockResponses[s];
      if (responseGenerator) {
        results[s] = responseGenerator(
          data.title, 
          data.type, 
          data.description, 
          data.emojis, 
          data.hashtags
        );
      } else {
        results[s] = "Style not available";
      }
    }

    return NextResponse.json({ 
      ok: true, 
      results,
      note: "Generated with enhanced mock data featuring engaging openings and impact hooks"
    });

  } catch (err: any) {
    console.error("Error:", err);
    
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid input data", details: err.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}