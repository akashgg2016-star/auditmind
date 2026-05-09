# AGENTS.md — AuditMind Project Rules

## What this project is
AuditMind (auditmind.in) is an AI audit productivity platform for
internal, concurrent, and statutory auditors. Three product pillars;
this repo currently covers Pillar 1: Audit Operations Copilot.

Active build: Meeting Minutes Generator (MOM Generator) — uploads
audio of an audit meeting, returns a formatted MOM as DOCX.

## Tech stack — strict
- Hosted on Vercel. Use /api/ for serverless functions, vercel.json for config.
- Frontend: vanilla HTML + CSS + JavaScript. NO React, NO Vue, NO frameworks.
- No build step. Static files served as-is by Vercel.
- Env vars set via Vercel dashboard; never hardcoded, never committed.
- API integrations: OpenAI Whisper (transcription), Anthropic Claude (generation).

## Brand
- Primary color: navy `#002060`
- Accent color: gold `#C8A84B`
- Background: white `#FFFFFF`
- Heading font: Playfair Display (Google Fonts CDN)
- Body font: system font stack with Inter fallback

## File and folder conventions
- `/api/` — Vercel serverless functions (one file per endpoint)
- `/tools/<feature-name>/` — each tool lives in its own folder
- `/tools/<feature-name>/index.html` — entry page for that tool
- `/assets/` — shared CSS, JS, images
- `/lib/` — shared utility modules
- `vercel.json` at root — runtime config + security headers

## DOCX output format (when the project generates Word documents)
- H1: Arial 20pt Bold `#002060`, centered, gold border `#C8A84B`
- H2: 13pt Bold `#002060`, indent left 360 twips
- H3: Arial 9pt Bold `#002060`
- Body: Arial 9pt justified, line spacing 60/60
- Bullets: `• ` left indent 480, hanging 240
- Table headers: `#002060` fill, white Arial 9pt Bold text
- Table data: Arial 9pt, no fill, `#BFBFBF` border
- Generate DOCX in Node.js using `docx` (npm package). Never use python-docx.

## Security rules — never violate
- Never log audio file content or transcript content. Log only
  metadata: file size, duration, success/error code.
- Never store user-uploaded files anywhere. In-memory processing only.
  Discard after the API response is sent.
- API keys server-side only. Never include in client-side JS bundles.
- Set HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff,
  Referrer-Policy strict-origin in vercel.json security headers.
- Never commit `.env` files or hardcode secrets.

## Naming rules — strict
- Never reference the project owner's employer or any client by name.
- Use only generic descriptors: "an NBFC engagement", "a revenue ops
  audit", "a manufacturing company audit", "an internal audit firm",
  etc. Applies to code comments, sample data, test fixtures, README,
  marketing copy, everywhere. Treat real names as off-limits.

## Out-of-scope reminders for the MOM Generator build
- No user accounts, login, or auth in v1.
- No history, no saved MOMs.
- No real-time meeting bot or live transcription.
- No speaker diarization by name.
- No multi-document upload.
- No PDF parsing.

## Working style with the project owner
- Owner is non-technical. Code and instructions must be paste-and-done.
- Always prefer simple over clever. Vanilla JS over abstractions.
- Comments explain *why*, not *what* — owner reads comments, not deep
  implementation.
- For any architectural choice, default to the most common,
  well-documented pattern (boring is good).
- When tests are appropriate, write them. Run them. Fix failures
  before declaring done.

## Browser verification (use it!)
For any UI feature, after writing code:
1. Run the dev server locally (`vercel dev`)
2. Open the page in Antigravity's built-in browser
3. Walk through the user flow end-to-end
4. Take screenshots of key states (initial, in-progress, success, error)
5. Verify mobile responsive layout (resize browser to 375px width)
6. Attach screenshots to your task report

## Ask vs. assume
- If a design decision could go multiple ways → ASK.
- If a security or privacy choice is involved → ASK.
- If a new npm package would be installed → ASK.
- If the task is clearly in scope with one obvious right answer → proceed.

## Done = …
A task is "done" when:
- Code is written, formatted, and runs without errors.
- All listed acceptance criteria pass.
- Browser verification screenshots are captured.
- A summary of files created/modified is in the task report.
- No console errors, no broken links, no missing assets.
