Here is a quickstart guide for using Cloudflare AI:

## Getting Started with Cloudflare AI

Cloudflare AI allows you to deploy and run AI models like large language models (LLMs) on Cloudflare's global network. There are two main ways to get started:

### 1. Cloudflare Workers AI

Workers AI lets you access GPUs close to users to run AI models on a pay-as-you-go basis for low-latency AI inference. Here are the steps:

1. Sign up for a Cloudflare account at cloudflare.com if you don't have one already[2].

2. Install the Cloudflare CLI: `npm install -g @cloudflare/wrangler`

3. Authenticate with `wrangler login`

4. Create a new Workers AI project:

```bash
npx wrangler generate my-ai-app https://github.com/cloudflare/workers-ai-template
```

This sets up a project using the official Workers AI template[1].

5. In the project, open `src/index.ts` and modify the code to use the AI model and task you need.

6. Deploy to Cloudflare Workers with `npm run deploy`[4]

You can now access and run your deployed AI model through the Workers AI interface.

### 2. Cloudflare AI Gateway

AI Gateway provides tools to deploy, monitor and optimize LLMs and other AI models. Key features include:

- Caching responses to reduce costs
- Rate limiting to control scaling 
- Metrics on usage and spending[3]

To use AI Gateway, sign up for the private beta through your Cloudflare dashboard[8].

You can find more guides and sample projects for working with Cloudflare AI in the [developer docs][1][2].

[1] [2] [3]

Citations:
[1] https://developers.cloudflare.com/workers/get-started/quickstarts/
[2] https://developers.cloudflare.com/workers-ai/get-started/
[3] https://techcrunch.com/2023/09/27/cloudflare-launches-new-ai-tools-to-help-customers-deploy-and-run-models/
[4] https://www.youtube.com/watch?v=oZGDqCR4nZE&t=0
[5] https://www.youtube.com/watch?v=bUe7cGxItvo
[6] https://yon.fun/chatgpt-plugin/
[7] https://github.com/planetscale/cloudflare-workers-quickstart
[8] https://community.cloudflare.com/t/cloudflare-ai/594215
