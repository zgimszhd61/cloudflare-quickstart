Cloudflare Workers AI 提供了一个强大的平台，允许开发者在 Cloudflare 的全球网络上运行 AI 模型。以下是一个简单的快速开始示例，展示如何使用 Cloudflare Workers AI 运行一个流行的大型语言模型，如 Llama 2。

### 步骤 1: 创建 Workers 项目

首先，你需要创建一个新的 Workers 项目。打开终端或命令行界面，运行以下命令：

```bash
npm create cloudflare@latest
```

在设置过程中，请按照以下指示回答问题：

- 应用名称（app name）: 输入 `workers-ai`
- 应用类型（type of application）: 选择 `Hello World` 脚本
- 是否使用 TypeScript: 选择 `yes`
- 是否使用 Git: 选择 `yes`
- 是否立即部署（deploying）: 选择 `no`

完成后，导航到你的新应用目录：

```bash
cd workers-ai
```

### 步骤 2: 连接 Workers AI 到你的 worker

接下来，你需要创建一个 Workers AI 绑定，这允许你的 worker 访问 Workers AI 服务，而无需自己管理 API 密钥。为了将 Workers AI 绑定到你的 worker，请在你的 `wrangler.toml` 文件末尾添加以下内容：

```toml
[ai]
binding = "AI"
```

这段配置将 Workers AI 服务绑定到你的 worker，允许你在 worker 中直接调用 AI 模型。

### 步骤 3: 编写和部署你的 Worker

现在，你可以在你的 worker 中使用 Workers AI 服务了。编辑你的 `index.ts` 文件，添加代码以调用一个 AI 模型。例如，如果你想运行 Llama 2 模型，你可以添加如下代码：

```typescript
export interface Env {
	AI: any;
  }
  
  export default {
	async fetch(request: Request, env: Env) {
	    // 解析 URL
   	    const url = new URL(request.url)
  
	    // 获取查询参数中的 'input' 参数
	    const userInput = url.searchParams.get('input') || '没有提供输入'
	    const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
		  prompt: userInput,
		  max_tokens: 30,
		  }
	    );
      return new Response(JSON.stringify(response), {
        headers: { 'content-type': 'text/plain' },
      })
 	//   return new Response(JSON.stringify(response));
	},
  };
```

这段代码在接收到 HTTP 请求时，会调用 Llama 2 模型，并以 "Hello, world!" 作为提示。然后，它将模型的回答作为 HTTP 响应返回。

最后，使用以下命令部署你的 worker：

```bash
wrangler publish
```

然后测试代码如下：
```
  https://twilight-silence-cd73.lininruc.workers.dev/?input=hello
```
这就完成了一个简单的 Cloudflare Workers AI 快速开始示例，展示了如何在 Cloudflare 的全球网络上运行 AI 模型[5]。

## 参考教程
 - https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/
