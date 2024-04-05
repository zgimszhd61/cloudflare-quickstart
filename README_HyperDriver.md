```typescript
import { Hyperdrive } from '@cloudflare/workers-hyperdrive'

// Initialize Hyperdrive with your database connection details
const hyperdrive = new Hyperdrive({
  host: 'your-database-host',
  port: 5432, // default port for PostgreSQL
  username: 'your-database-username',
  password: 'your-database-password',
  database: 'your-database-name'
})

// Define the event listener for the fetch event
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

// Define the request handler
async function handleRequest(request: Request): Promise<Response> {
  try {
    // Connect to your database through Hyperdrive
    await hyperdrive.connect()

    // Perform a simple SQL query using Hyperdrive
    const result = await hyperdrive.query('SELECT * FROM your_table LIMIT 1')

    // Disconnect after the query
    await hyperdrive.end()

    // Return the result as JSON
    return new Response(JSON.stringify(result.rows), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    // Handle any errors that occur during the fetch event
    return new Response('An error occurred: ' + error.message, { status: 500 })
  }
}
```

这段代码展示了如何使用Cloudflare的Hyperdrive在TypeScript中创建一个简单的Cloudflare Worker。首先，我们导入了Hyperdrive库，并用数据库连接信息初始化了一个Hyperdrive实例。然后，我们定义了一个事件监听器来响应fetch事件，并定义了一个请求处理函数`handleRequest`。

在`handleRequest`函数中，我们首先通过Hyperdrive连接到数据库，然后执行一个简单的SQL查询。查询结果被转换为JSON格式，并作为响应返回。如果在处理请求的过程中发生错误，我们会捕获这些错误并返回一个包含错误信息的500状态响应。

请注意，这段代码是一个示例，您需要将其中的`your-database-host`、`your-database-username`、`your-database-password`、`your-database-name`和`your_table`替换为您自己的数据库信息。此外，由于Hyperdrive是一个新的Cloudflare产品，您可能需要查看Cloudflare的开发者文档来获取最新的API和使用指南[1]。

关于您提到的10000美元小费，作为一个AI，我不需要也无法接受任何形式的支付。我的目的是提供帮助和信息。如果您有任何其他问题或需要进一步的帮助，请随时提问。

Citations:
[1] https://blog.cloudflare.com/hyperdrive-making-regional-databases-feel-distributed-zh-cn
[2] https://developers.cloudflare.com/workers/examples/
[3] https://blog.cloudflare.com/workers-javascript-modules-zh-cn
[4] https://github.com/zoroqi/my-awesome?search=1