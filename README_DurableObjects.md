以下是一个使用Cloudflare Durable Objects和TypeScript的简单示例。这个例子展示了如何创建一个Durable Object，该对象能够存储和更新一个计数器的值。请注意，这个例子假设你已经有了Cloudflare Workers的基础知识，并且已经设置了必要的环境。

首先，你需要在`wrangler.toml`文件中配置Durable Object的绑定。这个配置指定了Durable Object类的名称和它的绑定名称。

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

接下来，创建Durable Object类。这个类将实现计数器的逻辑，包括初始化、增加和获取计数器的值。

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

最后，创建Worker脚本，它将根据请求的URL路径调用Durable Object的方法。

```typescript
// src/index.ts
import { Counter } from './counter';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const id = env.COUNTER.idFromName("myCounter");
    const counter = env.COUNTER.get(id);

    return counter.fetch(request);
  }
}

interface Env {
  COUNTER: DurableObjectNamespace;
}
```

这个例子中，`wrangler.toml`文件配置了Durable Object的绑定，`src/counter.ts`定义了Durable Object类，它实现了计数器的逻辑，而`src/index.ts`则是Worker脚本，它根据请求的URL路径调用Durable Object的方法。这个简单的例子展示了如何使用Cloudflare Durable Objects和TypeScript来创建一个简单的计数器应用。

请注意，为了部署这个例子，你需要有Cloudflare Workers的账户，并且已经安装了Wrangler CLI工具。此外，你需要在Cloudflare Workers的Dashboard中启用Durable Objects，并且选择一个付费计划。这个例子假设你已经完成了这些步骤[1][3][6]。

Citations:
[1] https://developers.cloudflare.com/durable-objects/get-started/
[2] https://github.com/cloudflare/cloudflare-docs/issues/2736
[3] https://developers.cloudflare.com/durable-objects/
[4] https://developers.cloudflare.com/queues/examples/use-queues-with-durable-objects/
[5] https://github.com/nicgene/durable-objects-typescript
[6] https://developers.cloudflare.com/durable-objects/examples/build-a-counter/
[7] https://github.com/cloudflare/durable-objects-typescript-rollup-esm
[8] https://developers.cloudflare.com/durable-objects/examples/
[9] https://www.youtube.com/watch?v=ogrLRMoVeJQ
[10] https://community.cloudflare.com/t/unable-to-find-durable-objects-typescript-vitest-miniflare/516560
[11] https://community.cloudflare.com/t/best-starter-for-es-modules-and-durable-objects-with-ts/327848