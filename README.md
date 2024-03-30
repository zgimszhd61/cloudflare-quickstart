以下是一个快速入门指南,帮助您开始使用 Cloudflare Workers:

## 安装 Wrangler CLI

首先,您需要安装 Wrangler CLI,这是 Cloudflare 官方提供的用于管理 Workers 的命令行工具。

```bash
npm install -g wrangler
```

## 创建新的 Worker 项目

使用 Wrangler 创建一个新的 Worker 项目:

```bash
wrangler generate my-worker https://github.com/cloudflare/worker-template
```

这将创建一个名为 `my-worker` 的新目录,其中包含一个基本的 Worker 示例。[1]

## 编写您的 Worker 代码

使用您喜欢的代码编辑器打开 `src/index.js` 文件,编写您的 Worker 代码。这是一个简单的"Hello World"示例:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' }
  })
}
```

## 配置 Wrangler

在项目根目录下,有一个 `wrangler.toml` 配置文件。您需要使用您的 Cloudflare 帐户凭据进行身份验证:

```
wrangler config
```

## 预览您的 Worker

在部署到 Cloudflare 之前,您可以在本地预览您的 Worker:

```
wrangler dev
```

这将启动一个本地服务器,您可以在 `localhost:8787` 查看您的 Worker。

## 部署到 Cloudflare

最后,使用以下命令将您的 Worker 部署到 Cloudflare:

```
wrangler publish
```

就是这样!您的 Worker 现在已部署到 Cloudflare 的全球网络中。您可以在 Cloudflare 仪表板中查看和管理您的 Worker。[1][3]

Citations:
[1] https://developers.cloudflare.com/workers/get-started/
[2] https://developers.cloudflare.com/workers/get-started/quickstarts/
[3] https://developers.cloudflare.com/workers/get-started/guide/
[4] https://github.com/planetscale/cloudflare-workers-quickstart
[5] https://hono.dev/getting-started/cloudflare-workers
[6] https://developers.cloudflare.com/workers/tutorials/
[7] https://www.serverless.com/framework/docs-providers-cloudflare-guide-quick-start
[8] https://confection.io/quick-start/cloudflare/
