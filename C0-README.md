# Cloudflare Workers 入门教程

本教程将指导您如何快速开始使用 **Cloudflare Workers** 来编写和部署您的第一个应用程序。

## 安装 Wrangler CLI

**Wrangler CLI** 是 Cloudflare 官方提供的命令行工具，用于管理和部署 Workers。请先安装 Wrangler CLI：

```bash
npm install -g wrangler
```

> **提示**: 确保已安装 [Node.js](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)。

## 创建 Worker 项目

使用 Wrangler 快速生成一个新项目：

```bash
wrangler generate my-worker https://github.com/cloudflare/worker-template
```

该命令会在当前目录下创建一个名为 `my-worker` 的文件夹，其中包含 Cloudflare 提供的 Worker 示例代码。

## 编写 Worker 代码

打开 `my-worker/src/index.js`，并编辑您的 Worker 代码。以下是一个“Hello World”示例：

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response('Hello from Cloudflare Workers!', {
    headers: { 'content-type': 'text/plain' }
  })
}
```

此代码将在每次请求到达时返回“Hello from Cloudflare Workers!”的响应。

## 配置 Wrangler

在项目根目录找到 `wrangler.toml` 文件，并进行基本配置。运行以下命令来登录您的 Cloudflare 账户：

```bash
wrangler login
```

> **说明**: 登录后，`wrangler` 将自动链接到您的 Cloudflare 账户，方便后续的预览和部署操作。

## 预览 Worker 应用

在本地测试 Worker 功能，以确保部署前一切正常。使用以下命令预览：

```bash
wrangler dev
```

这将在 `localhost:8787` 启动一个本地服务器，您可以在浏览器中访问此地址并测试代码。

## 部署到 Cloudflare

确认代码正常运行后，使用以下命令将 Worker 部署到 Cloudflare 的全球网络：

```bash
wrangler publish
```

完成后，您可以在 Cloudflare 仪表板上查看和管理您的 Worker 应用。

---

### 注意事项

1. **身份验证**: 初次使用 `wrangler` 时，请确保完成 Cloudflare 账户登录。
2. **本地开发**: 在开发期间，`wrangler dev` 提供了便捷的本地测试环境，便于调试。
3. **部署与管理**: 部署完成后，您可以随时通过 Cloudflare 仪表板查看或更新 Worker 应用。

---

### 常见问题

- **如何管理多个 Worker 项目？** 您可以为不同的 Worker 项目创建多个文件夹，分别配置每个项目的 `wrangler.toml` 文件。
- **如何指定自定义域名？** 可以在 Cloudflare 仪表板的“Workers”部分为特定的 Worker 绑定自定义域名，配置在 `wrangler.toml` 中。
