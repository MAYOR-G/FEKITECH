# Fekitech Chatbot Setup

The Fekitech website includes a floating AI assistant that answers visitor questions using the company knowledge file, page content, service content, contact details, and blog content.

## Vector Database

This implementation uses Upstash Vector because it is serverless and works well on Vercel. The code also writes a local `data/chatbot-index.json` file so local development still has retrieval context when Upstash credentials are not configured.

Create an Upstash Vector index with hosted embeddings enabled, then add these environment variables:

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openrouter/free
NEXT_PUBLIC_SITE_URL=https://fekitech.co.uk
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
```

`OPENROUTER_MODEL` controls the model. You can test another free OpenRouter model later, such as `nvidia/nemotron-3-super-120b-a12b:free`, by changing only the environment variable.

## Index Content

Run indexing after editing `data/fekitech-knowledge.txt`, adding new blogs, or changing service/contact content:

```bash
npm run index:chatbot
```

The script reads:

- `data/fekitech-knowledge.txt`
- Current service descriptions
- Current contact details
- Current page summaries
- Current FAQ content
- Existing blog article content

It chunks the content, stores a local retrieval cache, and upserts chunks to Upstash Vector when credentials are present.

## Local Testing

```bash
npm run index:chatbot
npm run dev
```

Open the site and test:

- Opening and closing the assistant
- Sending a normal question
- Contact questions
- Website, AI agents, automation, scaling, and FOS questions
- Voice typing in a browser that supports Web Speech API
- API fallback behavior when OpenRouter credentials are missing

## Vercel Deployment

Add the environment variables in Vercel Project Settings, then deploy. After adding or changing blog content, run `npm run index:chatbot` locally with Upstash credentials available, or run the same command in a trusted CI/indexing environment.

## Adding Future Blogs

When new blog posts are added to the website, update `lib/chatbot/index-content.js` so each blog section becomes a chunk with:

- `sourceType: "blog"`
- Blog title
- Blog URL/slug
- Section heading
- Publish date
- Content text

Then run `npm run index:chatbot` again.
