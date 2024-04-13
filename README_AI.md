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
[[mappings]]
name = "AI_SERVICE"
class_name = "AI"
```

这段配置将 Workers AI 服务绑定到你的 worker，允许你在 worker 中直接调用 AI 模型。

### 步骤 3: 编写和部署你的 Worker

现在，你可以在你的 worker 中使用 Workers AI 服务了。编辑你的 `index.js` 文件，添加代码以调用一个 AI 模型。例如，如果你想运行 Llama 2 模型，你可以添加如下代码：

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await AI_SERVICE.run("llama-2", {
    prompt: "Hello, world!",
    max_tokens: 50,
  })
  return new Response(response.answer, {status: 200})
}
```

这段代码在接收到 HTTP 请求时，会调用 Llama 2 模型，并以 "Hello, world!" 作为提示。然后，它将模型的回答作为 HTTP 响应返回。

最后，使用以下命令部署你的 worker：

```bash
wrangler publish
```

这就完成了一个简单的 Cloudflare Workers AI 快速开始示例，展示了如何在 Cloudflare 的全球网络上运行 AI 模型[5]。

Citations:
[1] https://developers.cloudflare.com/workers/get-started/quickstarts/
[2] https://github.com/optimizely/cloudflare-worker-template
[3] https://developers.cloudflare.com/workers/get-started/guide/
[4] https://www.youtube.com/watch?v=uv1Cz_BDFmo
[5] https://blog.cloudflare.com/workers-ai
[6] https://www.youtube.com/watch?v=oZGDqCR4nZE
[7] https://github.com/planetscale/cloudflare-workers-quickstart
[8] https://blog.cloudflare.com/magic-in-minutes-how-to-build-a-chatgpt-plugin-with-cloudflare-workers
