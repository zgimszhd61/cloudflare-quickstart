以下是一个使用Cloudflare AI Gateway并结合TypeScript的最简单示例。这个例子展示了如何部署一个Worker，该Worker通过AI Gateway调用OpenAI的API。请注意，这个例子假设你已经有了Cloudflare和OpenAI的账户，并且已经在Cloudflare的AI Gateway中创建了一个Gateway。

首先，你需要安装Cloudflare的Wrangler CLI工具，以及设置你的Cloudflare和OpenAI的API密钥。然后，你可以按照以下步骤创建和部署你的Worker。

```typescript
// src/index.ts
import { OpenAI } from "openai";

const OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY_HERE>";
const GATEWAY_BASE_URL = "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai";

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      baseURL: GATEWAY_BASE_URL,
    });

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: [{ role: "user", content: "What is a neuron?" }],
        max_tokens: 100,
      });

      const response = chatCompletion.choices[0].message;
      return new Response(JSON.stringify(response));
    } catch (e) {
      return new Response(e.toString());
    }
  },
};
```

在这个例子中，我们首先导入了`OpenAI`库，这是一个用于与OpenAI API交互的Node.js库。然后，我们定义了一个Worker，它通过Cloudflare的AI Gateway调用OpenAI的Chat Completions API。我们使用了`gpt-3.5-turbo-0613`模型，并发送了一个问题：“What is a neuron?”。然后，我们将API的响应返回给用户。

为了部署这个Worker，你需要创建一个`wrangler.toml`配置文件，并使用Wrangler CLI工具进行部署。

```toml
# wrangler.toml
name = "openai-aig-worker"
type = "javascript"
account_id = "<YOUR_CLOUDFLARE_ACCOUNT_ID>"
workers_dev = true
compatibility_date = "2024-01-01"

[vars]
OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY_HERE>"
```

请确保替换`<YOUR_OPENAI_API_KEY_HERE>`和`<YOUR_CLOUDFLARE_ACCOUNT_ID>`为你自己的API密钥和Cloudflare账户ID。

最后，使用以下命令部署你的Worker：

```bash
wrangler publish
```

这个例子展示了如何通过Cloudflare的AI Gateway使用TypeScript创建和部署一个简单的Worker，该Worker调用OpenAI的API。希望这个例子对你有所帮助。

Citations:
[1] https://developers.cloudflare.com/ai-gateway/get-started/creating-gateway/
[2] https://developers.cloudflare.com/ai-gateway/
[3] https://blog.cloudflare.com/announcing-ai-gateway
[4] https://www.youtube.com/watch?v=bkdEJk7oYCY
[5] https://developers.cloudflare.com/ai-gateway/tutorials/
[6] https://blog.cloudflare.com/cryptocurrency-api-gateway-typescript-workers
[7] https://developers.cloudflare.com/ai-gateway/tutorials/deploy-aig-worker/
[8] https://developers.cloudflare.com/ai-gateway/get-started/connecting-applications/
[9] https://www.youtube.com/watch?v=oZGDqCR4nZE
[10] https://www.pulumi.com/ai/answers/wkA1Cy4Dihf37212Dp551q/securing-ai-api-gateway-via-cloudflare-workers
[11] https://github.com/langgenius/dify/issues/2911
[12] https://developers.cloudflare.com/ai-gateway/get-started/configuring-settings/
[13] https://github.com/cloudflare/cloudflare-docs/blob/production/content/ai-gateway/tutorials/deploy-aig-worker.md