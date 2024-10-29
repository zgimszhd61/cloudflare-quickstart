# Cloudflare Workers AI 入门教程

Cloudflare Workers AI 是一个强大的平台，允许开发者在 Cloudflare 的全球网络上运行 AI 模型。以下是一个简明快速开始教程，帮助你使用 Cloudflare Workers AI 运行流行的大型语言模型，如 Llama 2。

## 步骤 1: 安装必要工具

首先，确保你已经安装了 [Node.js](https://nodejs.org/) 和 npm。接着，安装 `wrangler`，这是 Cloudflare 提供的命令行工具，方便管理 Workers 项目。

```bash
npm install -g wrangler
```

## 步骤 2: 创建 Workers 项目

在终端中运行以下命令，初始化一个新的 Cloudflare Workers 项目：

```bash
npm create cloudflare@latest
```

在创建过程中，你会遇到以下问题，请根据提示选择：

- **应用名称（app name）**：输入 `workers-ai`
- **应用类型（type of application）**：选择 `Hello World` 脚本
- **是否使用 TypeScript**：选择 `yes`
- **是否使用 Git**：选择 `yes`
- **是否立即部署（deploying）**：选择 `no`

完成后，导航到新应用目录：

```bash
cd workers-ai
```

## 步骤 3: 配置 AI 服务绑定

为了使用 Cloudflare Workers AI，我们需要在 worker 中绑定 AI 服务。打开 `wrangler.toml` 文件，在文件末尾添加以下内容：

```toml
[ai]
binding = "AI"
```

这段配置将 Workers AI 服务绑定到你的 worker，允许你在 worker 中直接调用 AI 模型，而无需自行管理 API 密钥。此配置的 `binding` 名称 `AI` 可以在代码中引用。

## 步骤 4: 编写你的 Worker

现在，你可以开始编辑 `index.ts` 文件，使用 Workers AI 服务来调用 Llama 2 模型。以下是一个示例代码：

```typescript
export interface Env {
	AI: any;
}

export default {
	async fetch(request: Request, env: Env) {
	    const url = new URL(request.url);
	    const userInput = url.searchParams.get('input') || '没有提供输入';
	    try {
	        // 调用 Llama 2 模型
	        const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
		        prompt: userInput,
		        max_tokens: 30,
	        });
	        return new Response(JSON.stringify(response), {
	            headers: { 'content-type': 'application/json' },
	        });
	    } catch (error) {
	        // 错误处理
	        return new Response(JSON.stringify({ error: 'AI 模型调用失败' }), {
	            headers: { 'content-type': 'application/json' },
	        });
	    }
	},
};
```

### 代码解释

1. `Env` 接口定义了环境变量 `AI`，用于访问 Workers AI 服务。
2. `fetch` 函数中解析 URL 查询参数 `input`，并调用 Llama 2 模型，生成响应内容。
3. 错误处理：确保代码能够捕捉并返回错误，便于调试。

## 步骤 5: 部署和测试

完成代码编辑后，使用以下命令部署你的 worker：

```bash
wrangler publish
```

部署成功后，你可以通过以下 URL 进行测试（替换为实际的 `workers.dev` 子域名）：

```
https://your-subdomain.workers.dev/?input=hello
```

### 验证部署结果

1. 访问测试 URL，查看 AI 模型的返回结果。
2. 通过 Cloudflare Dashboard 检查 worker 的日志，确保调用成功。

## 参考资料
- [Cloudflare Workers AI 官方文档](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/)