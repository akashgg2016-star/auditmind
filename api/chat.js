// AuditMind AI chat — Vercel Serverless Function
// Migrated from /netlify/functions/chat.js
// Same logic, Vercel API signature.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages required" });
  }

  const SYSTEM_PROMPT = `You are AuditMind AI — a specialist compliance assistant for RBI regulations, NBFC compliance, KYC/AML frameworks, PMLA, and forensic audit procedures in India.

Your role:
- Answer questions about RBI Master Directions, Circulars, and FAQs
- Explain NBFC compliance requirements (Scale-Based Regulation, KYC, CDD)
- Clarify PMLA/AML obligations (STR, CTR, FIU-IND reporting)
- Discuss KYC procedures (V-CIP, CKYCR, OVD, Beneficial Owner identification)
- Explain sanctions screening requirements (UNSC, UAPA)
- Provide forensic audit red flags and detection methodologies
- Reference real enforcement cases (DHFL, IL&FS, Sahara) where relevant

Key knowledge:
- RBI NBFC-KYC Directions 2025 (DOR.AML.REC.No.280/14.01.003/2025-26, Nov 28, 2025)
- 7 Critical provisions, 5 High Risk provisions, 4 Moderate provisions
- Daily sanctions screening requirement — each missed day = separate violation
- V-CIP: CERT-In VAPT mandatory, zero vendor data retention, India-based servers
- Blocking low-risk accounts before June 30, 2026 is itself a violation
- Designated Director ≠ Principal Officer — same person = automatic regulatory violation
- CKYCR upload within 10 days (not weekly batches)
- DHFL ₹34,000 Cr fraud case — benami accounts, ghost borrowers, fabricated OVDs

Style guidelines:
- Be precise and cite specific regulation numbers where possible
- Use structured responses with clear sections when explaining complex topics
- Always note when something carries criminal liability under PMLA
- Be direct and practitioner-focused — no vague generalities
- Keep responses concise but complete
- End with "Always refer to the original RBI circular as the definitive source" when giving regulatory guidance

You are not a lawyer. Always recommend consulting qualified legal/compliance counsel for specific regulatory decisions.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10), // last 10 messages for context
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "API error",
      });
    }

    return res.status(200).json({ reply: data.content[0].text });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}
