export type PostStyle = "simple" | "professional" | "storytelling"

export const POST_TEMPLATES: Record<PostStyle, string> = {
  simple: `
Write a short, clear LinkedIn post about:
- Event: {{event}}
- Type: {{type}}
- What I did/learned: {{experience}}

Rules:
- 70–120 words
- 1–2 short paragraphs
- Plain tone (no buzzwords)
- {{emojis}}
- {{hashtags}}
`,

  professional: `
Write a professional LinkedIn post about:
- Event: {{event}}
- Type: {{type}}
- Contributions/Impact: {{experience}}

Rules:
- 120–180 words
- Confident, formal tone
- Outcome/impact first, then details
- Use bullet points if helpful
- {{emojis}}
- {{hashtags}}
`,

  storytelling: `
Write a storytelling LinkedIn post about:
- Event: {{event}}
- Type: {{type}}
- My journey/insight: {{experience}}

Rules:
- 150–220 words
- Hook in first line, narrative arc (problem → action → insight)
- Warm, human tone; 1 call-to-action at end
- {{emojis}}
- {{hashtags}}
`,
}

export function buildPrompt(opts: {
  style: PostStyle
  event: string
  type: string
  experience: string
  emojis: boolean
  hashtags: boolean
}) {
  const tpl = POST_TEMPLATES[opts.style]
  return tpl
    .replaceAll("{{event}}", opts.event || "the event")
    .replaceAll("{{type}}", opts.type || "opportunity")
    .replaceAll("{{experience}}", opts.experience || "my experience")
    .replaceAll("{{emojis}}", opts.emojis ? "Tasteful emojis allowed" : "No emojis")
    .replaceAll("{{hashtags}}", opts.hashtags ? "Add 3–5 relevant hashtags at the end" : "No hashtags")
}
