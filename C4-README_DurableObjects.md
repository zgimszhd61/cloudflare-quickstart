# Cloudflare Durable Objects 和 TypeScript 简明入门教程

本文档将引导你如何使用Cloudflare Durable Objects和TypeScript实现一个简单的计数器。此示例演示了如何创建一个 Durable Object，并在不同请求下存储和更新计数器的值。

## 前置要求

- Cloudflare Workers 基础知识
- 安装了 Wrangler CLI 工具
- Cloudflare Workers 账户并选择付费计划
- 已在 Cloudflare Workers Dashboard 中启用了 Durable Objects 功能

---

## 第一步：配置 `wrangler.toml`

首先，你需要在 `wrangler.toml` 文件中配置 Durable Object 的绑定。这个配置指定了 Durable Object 类的名称和它的绑定名称。

```toml
name = "durable-objects-example" 
compatibility_date = "2024-02-16"

[durable_objects]
bindings = [
  { name = "COUNTER", class_name = "Counter" }
]

[build]
upload.format = "modules"
```

### 配置说明
- `name`: 项目的名称，可以根据需求修改。
- `compatibility_date`: 确保项目兼容 Cloudflare 的当前 API 版本。
- `[durable_objects]`: 定义 Durable Object 的绑定名称（`COUNTER`）和类名（`Counter`）。

---

## 第二步：创建 Durable Object 类

接下来，创建 Durable Object 类。在 `src/counter.ts` 文件中定义计数器的逻辑，包含初始化、增加和获取计数器值的方法。

```typescript
// src/counter.ts
export class Counter {
  state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    let url = new URL(request.url);
    switch (url.pathname) {
      case "/increment":
        await this.increment();
        return new Response("Counter incremented.");
      case "/value":
        const value = await this.state.storage.get<number>("count") || 0;
        return new Response(value.toString());
      default:
        return new Response("Not found", { status: 404 });
    }
  }

  async increment(): Promise<void> {
    let count = (await this.state.storage.get<number>("count")) || 0;
    count++;
    await this.state.storage.put("count", count);
  }
}
```

### 代码说明
- **构造函数**：`constructor` 初始化 `DurableObjectState`，以便在类中访问。
- **fetch 方法**：处理传入请求的路径，根据路径调用相应的逻辑。
  - `/increment`: 调用 `increment()` 方法，将计数器值加一。
  - `/value`: 返回当前的计数器值。
  - 默认情况：返回 404 状态码，指示未找到资源。
- **increment 方法**：读取存储中的当前计数器值并增加，然后将新值存储。

---

## 第三步：创建 Worker 脚本

最后，创建一个 Worker 脚本 `src/index.ts`，用来路由请求，并调用 Durable Object 类中的方法。

```typescript
// src/index.ts
import { Counter } from './counter';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 根据名称生成 Durable Object 的唯一 ID
    const id = env.COUNTER.idFromName("myCounter");
    const counter = env.COUNTER.get(id);

    // 将请求转发到 Durable Object
    return counter.fetch(request);
  }
}

// 定义 `Env` 接口，用于类型检查 Durable Object 的绑定
interface Env {
  COUNTER: DurableObjectNamespace;
}
```

### 代码说明
- **idFromName**: 使用 `idFromName` 为计数器生成唯一 ID。此方法确保多个请求可以指向同一个计数器实例。
- **fetch**: 将请求传递到 Durable Object 中处理，实现计数器功能。

---

## 部署教程

1. 确保已经启用了 Cloudflare Durable Objects，并选择了付费计划。
2. 在命令行中执行以下命令，构建并发布项目：

   ```bash
   wrangler publish
   ```

3. 发布后，访问 `https://<your-worker-subdomain>.workers.dev/increment` 可以增加计数器，访问 `https://<your-worker-subdomain>.workers.dev/value` 获取当前计数值。