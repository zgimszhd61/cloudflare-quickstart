# Cloudflare Workers 简明入门教程

本教程展示如何使用Cloudflare Workers KV和TypeScript编写一个键值存储API，以便通过HTTP请求获取和设置键值对。

### 环境准备

在开始前，请确保您已安装 [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler) CLI，并且在Cloudflare控制台创建了一个KV命名空间。

### 配置 `wrangler.toml`

在`wrangler.toml`中配置您的项目和KV命名空间。以下是一个示例配置：

```toml
name = "my-worker"           # Worker项目名称
type = "javascript"           # 构建类型
account_id = "your-account-id" # Cloudflare账户ID
workers_dev = true            # 开发模式下自动发布

# Cloudflare KV 命名空间绑定
kv_namespaces = [
  { binding = "MY_KV_NAMESPACE", id = "your-kv-namespace-id" }
]
```

请确保用您自己的`account_id`和`KV命名空间ID`替换示例中的值。

### 安装依赖

我们将使用`itty-router`库来简化路由处理。请安装以下依赖：

```bash
npm install itty-router
```

### 示例代码

创建一个`src/index.ts`文件，编写以下代码以实现一个简单的键值存储API：

```typescript
import { Router } from 'itty-router';

const router = Router();  // 创建一个路由器实例

// KV命名空间绑定，需在wrangler.toml中配置
export interface Env {
  MY_KV_NAMESPACE: KVNamespace;
}

// 处理GET请求：从KV中获取值
router.get('/get/:key', async ({ params, env }: { params: { key: string }, env: Env }) => {
  const value = await env.MY_KV_NAMESPACE.get(params.key);
  if (value === null) {
    return new Response(`Key ${params.key} not found`, { status: 404 });
  }
  return new Response(value, {
    headers: { 'Content-Type': 'text/plain' },
  });
});

// 处理POST请求：将值存储到KV中
router.post('/set/:key', async ({ params, request, env }: { params: { key: string }, request: Request, env: Env }) => {
  try {
    const value = await request.text();
    await env.MY_KV_NAMESPACE.put(params.key, value);
    return new Response(`Key ${params.key} set to ${value}`, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    return new Response('Failed to set key-value pair', { status: 500 });
  }
});

// 注册fetch事件监听器，处理所有HTTP请求
addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request, event));
});
```

### 代码说明

- `/get/:key` 路由：从KV存储获取指定键的值。如果键不存在，返回404错误。
- `/set/:key` 路由：将提供的值存储到KV。如果发生错误，返回500错误。

### 部署到Cloudflare

使用以下命令将您的Worker部署到Cloudflare：

```bash
wrangler publish
```

### 结语

这个示例展示了如何使用Cloudflare Workers和KV存储实现一个简单的键值API。您可以根据需求扩展此代码，加入更多功能或复杂的业务逻辑。