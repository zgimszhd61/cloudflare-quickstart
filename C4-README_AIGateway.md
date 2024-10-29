# Cloudflare AI Gateway & TypeScript 简明入门教程

本教程将指导你如何使用Cloudflare的AI Gateway结合TypeScript创建一个Worker，通过AI Gateway调用OpenAI API。该示例假设你已经拥有Cloudflare和OpenAI账户，并在Cloudflare的AI Gateway中创建了一个Gateway。

## 前置步骤

1. **安装Wrangler CLI**：用于管理和部署Cloudflare Workers。
   ```bash
   npm install -g wrangler
   ```
2. **配置API密钥**：
   - **Cloudflare API**：登录Cloudflare，进入 [Cloudflare Dashboard](https://dash.cloudflare.com/)，创建一个API Token并保存。
   - **OpenAI API**：登录OpenAI [平台](https://platform.openai.com/account/api-keys)以获取API密钥。

3. **准备项目结构**：新建一个项目文件夹，创建以下文件：
   ```plaintext
   your_project/
   ├── wrangler.toml
   └── src/
       └── index.ts
   ```

## Step 1：编写Worker代码

在`src/index.ts`中编写以下代码，调用OpenAI API生成文本回复：

```typescript
// src/index.ts
import { OpenAI } from "openai";

const OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>";
const GATEWAY_BASE_URL = "https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai";

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      baseURL: GATEWAY_BASE_URL,
    });

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "What is a neuron?" }],
        max_tokens: 100,
      });

      const response = chatCompletion.choices[0].message;
      return new Response(JSON.stringify(response), { headers: { "Content-Type": "application/json" } });
    } catch (error) {
      return new Response(`Error: ${error}`, { status: 500 });
    }
  },
};
```

### 代码说明

- 使用`OpenAI`库访问OpenAI API。
- **错误处理**：捕获异常，返回简洁的错误信息，以便后续调试。
- **Content-Type**：返回内容类型设置为`application/json`，确保响应内容符合JSON格式。

## Step 2：创建`wrangler.toml`配置文件

在项目根目录创建`wrangler.toml`文件，配置Worker的基本信息：

```toml
# wrangler.toml
name = "openai-aig-worker"
type = "javascript"
account_id = "<YOUR_CLOUDFLARE_ACCOUNT_ID>"
workers_dev = true
compatibility_date = "2024-01-01"

[vars]
OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>"
```

### 配置说明

- 替换`<YOUR_OPENAI_API_KEY>`和`<YOUR_CLOUDFLARE_ACCOUNT_ID>`为你的API密钥和Cloudflare账户ID。
- `compatibility_date` 确保使用该日期版本的Workers运行时。

## Step 3：部署Worker

执行以下命令，将Worker部署到Cloudflare Workers：

```bash
wrangler publish
```

### 部署后的验证

访问返回的URL以验证部署是否成功。如果请求成功，你将会收到来自OpenAI API的响应内容。

## 进阶优化

- **调试日志**：在开发环境中使用`console.log`记录请求和响应内容，方便调试。
- **Error Boundaries**：针对API响应的各类错误进行分层处理（如身份验证失败、API超时等），提升稳定性。
- **Token 安全**：将敏感信息通过Cloudflare的环境变量存储，确保在源码中不包含密钥。

以上示例帮助你快速入门Cloudflare AI Gateway和OpenAI的基础使用，希望对你有所帮助！