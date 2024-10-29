# Cloudflare Queues 和 TypeScript 入门教程

本教程将帮助你快速入门Cloudflare Queues，了解如何通过TypeScript创建一个最简单的生产者Worker，将来自浏览器的请求体发送到Cloudflare队列中。

## 前置准备

在开始之前，请确保已安装以下工具：

- [Node.js](https://nodejs.org/) (建议版本：16或更高)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)（Cloudflare的开发工具）

安装Wrangler CLI：
```bash
npm install -g wrangler
```

## 第一步：创建 Cloudflare Worker 项目

根据[Cloudflare的官方文档](https://developers.cloudflare.com/queues/get-started/)，可以使用以下命令创建一个新的Worker项目：

```bash
npm create cloudflare@latest
# 或者
yarn create cloudflare
```

在项目创建过程中，请选择"Hello World" Worker类型，并选择使用TypeScript。

## 第二步：配置 `wrangler.toml` 文件

在项目的根目录中找到 `wrangler.toml` 文件。在此文件中，你需要配置一个队列绑定，以便Worker可以将消息发送到Cloudflare Queue。

示例配置如下：

```toml
name = "your_worker_name"
type = "javascript"

[[queues.producers]]
queue = "MY_QUEUE" # 你的队列名称
binding = "MY_QUEUE" # Worker中访问队列的变量名称
```

确保将`MY_QUEUE`替换为你在Cloudflare Dashboard中实际创建的队列名称。

## 第三步：编写生产者Worker代码

创建 `src/index.ts` 文件，并添加以下代码。这段代码定义了一个生产者Worker，它会接收来自浏览器的请求，将请求体解析为JSON格式，然后发送到Cloudflare Queue。

```typescript
// src/index.ts
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      // 将请求体转换为JSON
      const requestBody = await request.json();
      // 发送消息到队列
      await env.MY_QUEUE.send({ body: JSON.stringify(requestBody) });
      // 返回成功响应
      return new Response('Message sent to the queue');
    } catch (error) {
      // 错误处理：如果JSON解析或发送消息失败，返回错误响应
      return new Response('Failed to send message', { status: 500 });
    }
  },
};
```

### 代码说明

- `env.MY_QUEUE`：`MY_QUEUE`是队列绑定名称，需要在`wrangler.toml`中进行相应配置。
- 错误处理：捕获解析或发送消息的错误，并返回适当的错误响应。

## 第四步：部署你的 Worker

确认所有配置和代码无误后，可以通过以下命令将Worker部署到Cloudflare：

```bash
wrangler publish
```

## 总结

以上步骤展示了如何使用Cloudflare Queues和TypeScript编写一个最简单的生产者Worker。这个Worker接收浏览器的请求并将请求体作为消息发送到Cloudflare Queue中。