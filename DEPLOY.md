# AuditMind — Vercel Deployment

This folder is ready to deploy to Vercel. Same site as before, just retargeted off Netlify.

## What changed from your Netlify version

1. `index__2_.html` renamed to `index.html` (so Vercel serves it as the default page)
2. Inside `index.html`, the chat widget call changed:
   - Old: `fetch('/.netlify/functions/chat', ...)`
   - New: `fetch('/api/chat', ...)`
3. `chat.js` moved from `/netlify/functions/` to `/api/` and rewritten in Vercel's serverless function format. **Same logic, same model (Haiku 4.5), same system prompt.**

Nothing else touched.

## Folder structure

```
auditmind-vercel/
├── index.html
├── blog.html
├── article-kyc-2025.html
└── api/
    └── chat.js
```

## Deploy steps (no GitHub needed)

1. Go to **vercel.com** → sign up (use Google or GitHub login, takes 1 min)
2. On the dashboard click **Add New → Project**
3. Choose the **drag-and-drop** option (or "Deploy without Git")
4. Drag this entire `auditmind-vercel` folder onto the page
5. Vercel will deploy in ~30 seconds. You'll get a URL like `auditmind-xxxx.vercel.app`
6. **Set the environment variable:** Project → Settings → Environment Variables
   - Name: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (same one you used on Netlify)
   - Apply to: Production, Preview, Development (tick all three)
7. **Redeploy** (Project → Deployments → ... menu on latest → Redeploy) so the env var takes effect
8. Test: open the .vercel.app URL, try the chat widget — should work

## Connecting auditmind.in (your domain)

After the .vercel.app URL works:

1. In Vercel: **Project → Settings → Domains → Add `auditmind.in`**
2. Vercel will display two records you need to add at GoDaddy:
   - An **A record** for `@` pointing to a specific IP
   - A **CNAME record** for `www` pointing to a Vercel hostname
3. In GoDaddy: **My Products → auditmind.in → DNS → Manage DNS**
4. Delete any existing A/CNAME records on `@` and `www` (they're pointing at GoDaddy parking right now)
5. Add the two records Vercel showed you, exactly as displayed
6. Wait 5–30 minutes. `auditmind.in` will load your site

## Note on Netlify

You can ignore the "domain locked" error in Netlify — it doesn't affect anything once you're hosting on Vercel. The lock only blocks Netlify-side actions, and you're not using Netlify anymore.

## Note on GitHub Actions for daily articles

Your old setup had GitHub Actions auto-generating articles. That still works — just point the Action to commit to whichever GitHub repo you connect to Vercel later (when you graduate from drag-drop to a proper Git workflow). For now, drag-drop is the fastest path to a live site.
