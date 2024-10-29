# 使用Cloudflare D1和TypeScript创建简单API入门教程

本教程介绍如何在Cloudflare Worker中使用D1数据库，并创建一个简易API，能够插入和查询D1数据库中的数据。**注意**：此示例假设你已经创建了一个D1数据库，其中包含名为`tasks`的表，并有`id`和`name`两个字段。

## 步骤一：安装依赖

在你的Cloudflare Worker项目目录下，运行以下命令安装依赖：

```bash
npm install --save-dev typescript @cloudflare/workers-types
```

## 步骤二：创建`index.ts`文件

在项目根目录创建`index.ts`文件，并添加以下代码：

```typescript
interface Task {
  question: string;
  answer: string;
}

export default {
  async fetch(request: Request, env: { MYDD_DATABASE: any }, ctx: ExecutionContext) {
    // 仅接受POST请求
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // 获取请求体中的数据
      const data = await request.json<Task>();
      const { question, answer } = data;

      // 检查数据有效性
      if (!question || !answer) {
        return new Response('Missing required fields', { status: 400 });
      }

      // 插入数据到D1数据库
      const query = `INSERT INTO tasks (question, answer) VALUES (:question, :answer)`;
      await env.MYDD_DATABASE.prepare(query, { question, answer }).run();

      return new Response('Data stored successfully', { status: 200 });
    } catch (error) {
      console.error('Error processing request:', error);
      return new Response(`Error processing request: ${error.message}`, { status: 500 });
    }
  }
};
```

- **代码解释**：此代码实现一个简单的API，接收`POST`请求，在请求体中包含`question`和`answer`字段，将其存储到D1数据库表中。
- **改进点**：增加了接口`Task`来约束数据类型，并使用了`console.error`来记录错误细节。

## 步骤三：配置`wrangler.toml`

在`wrangler.toml`文件中，设置数据库绑定，使Worker可以访问D1数据库：

```toml
name = "your-worker-name"
compatibility_date = "2024-03-29"

[[d1_databases]]
binding = "MYDD_DATABASE" # 必须与代码中环境变量一致
database_name = "your-database-name"
database_id = "your-database-id"
```

- **绑定解释**：`binding`指定了数据库在代码中的名称，确保和代码中的`env.MYDD_DATABASE`保持一致。

## 测试方法

以下是测试API的示例命令：

```bash
curl -X POST 'https://your-worker-url.workers.dev' \
-H 'Content-Type: application/json' \
-d '{"question": "What is the capital of France?", "answer": "Paris"}'
```

通过以上步骤，你就可以在Cloudflare Workers中使用TypeScript和D1数据库构建一个简单的API了，希望本教程对你有所帮助！