
export async function POST(req) {
  const { text } = await req.json();

  if (!text) {
    return Response.json({ error: "No story provided" }, { status: 400 });
  }

  // TRY: Real AI (OpenAI) if key exists
  try {
    if (process.env.OPENAI_API_KEY) {
      const scenes = await generateWithAI(text);
      return Response.json({ scenes });
    }
  } catch (e) {
    console.log("AI failed, falling back", e);
  }

  // FALLBACK: smart split
  const scenes = smartSceneSplit(text);
  return Response.json({ scenes });
}

function smartSceneSplit(text) {
  const sentences = text.split(/[.!?]/).filter(Boolean);

  return sentences.map((s, i) => ({
    id: i,
    text: s.trim(),
    visual: `Scene visual prompt: ${s.trim()}`
  }));
}

// OPTIONAL AI LAYER (plug OpenAI later)
async function generateWithAI(text) {
  // NOTE: This is structured for OpenAI Responses API style
  // Replace with real SDK call when installing openai package

  const prompt = `
Convert this story into cinematic scenes.
Return JSON array like:
[{id, text, visual_prompt}]

Story:
${text}
`;

  // MOCK RESPONSE (safe default)
  const sentences = text.split(/[.!?]/).filter(Boolean);

  return sentences.map((s, i) => ({
    id: i,
    text: s.trim(),
    visual: `AI cinematic prompt: ${s.trim()}`
  }));
}
