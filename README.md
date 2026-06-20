# Dr. Shakally Website

Personal authority website for Dr. Monzer Shakally, focused on speaking, dental business-model innovation, higher standards of care, applied AI, and digital dentistry workflows.

## Deploy with GitHub and Vercel

1. Create a new GitHub repository named `Dr-Shakally-Website`.
2. Upload the contents of this project folder to the repository.
3. In Vercel, choose **Add New Project** and import the GitHub repository.
4. Keep Vercel's detected Vite settings and deploy.

## Local development

```bash
npm install
npm run dev
```

Primary editable website copy is stored in `src/content.js` and the routed page composition is in `src/App.jsx`.

The site uses approved photography supplied by Dr. Shakally. Vercel rewrites all public routes to the Vite entry point so `/journey`, `/dentistry`, `/ideas`, `/speaking`, and `/life` can be opened directly.
