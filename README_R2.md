使用Cloudflare R2的快速入门教程主要包括以下几个步骤：注册Cloudflare账户、安装Wrangler CLI、创建R2存储桶、配置Wrangler以访问R2存储桶、通过Worker访问R2存储桶。下面是详细的步骤和代码示例。

## 1. 注册Cloudflare账户

首先，您需要在Cloudflare上注册一个账户。访问[Cloudflare官网](https://www.cloudflare.com/)并完成注册流程。

## 2. 安装Wrangler CLI

Wrangler是Cloudflare的命令行工具，用于管理Cloudflare Workers和R2存储桶。您需要安装Node.js和npm（Node.js的包管理器），然后通过npm安装Wrangler。

```bash
npm install -g @cloudflare/wrangler
```

## 3. 创建R2存储桶

登录到Cloudflare Dashboard，选择R2服务，然后点击“创建存储桶”按钮。为您的存储桶命名，然后点击“创建”。

## 4. 配置Wrangler以访问R2存储桶

创建一个新的Wrangler项目：

```bash
wrangler init my-r2-project
```

在项目的`wrangler.toml`文件中，添加R2存储桶的绑定。您需要替换`<YOUR_BUCKET_NAME>`为您实际的存储桶名称。

```toml
name = "my-r2-project"
type = "javascript"

[env.production]
r2_buckets = [{ binding = "MY_BUCKET", bucket_name = "<YOUR_BUCKET_NAME>" }]
```

## 5. 通过Worker访问R2存储桶

创建一个简单的Worker脚本来访问R2存储桶。在项目目录中创建一个名为`index.js`的文件，并添加以下代码：

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  const fileName = searchParams.get('file')
  if (!fileName) {
    return new Response('File name is required', { status: 400 })
  }

  const file = await MY_BUCKET.get(fileName)
  if (!file) {
    return new Response('File not found', { status: 404 })
  }

  return new Response(file.body, {
    headers: {
      'content-type': file.httpMetadata.contentType,
    },
  })
}
```

这段代码定义了一个Worker，当请求到来时，它会从URL查询参数中获取文件名，然后尝试从R2存储桶中获取该文件并返回给客户端。

## 6. 部署Worker

使用Wrangler将您的Worker部署到Cloudflare：

```bash
wrangler publish
```

完成以上步骤后，您就成功创建了一个可以访问Cloudflare R2存储桶的Worker。您可以通过构造包含文件名查询参数的URL来测试Worker，例如：`https://your-worker.your-subdomain.workers.dev/?file=example.txt`。

请注意，这个快速入门教程假设您已经有了基本的Cloudflare和命令行使用经验。如果您在执行上述步骤时遇到任何问题，建议查阅[Cloudflare官方文档](https://developers.cloudflare.com/r2/)获取更多信息和帮助。

Citations:
[1] https://developers.cloudflare.com/workers/tutorials/upload-assets-with-r2/
[2] https://www.youtube.com/watch?v=HPo2OW_bdi0
[3] https://www.youtube.com/watch?v=Q6WTwZI9-Ko
[4] https://elixirforum.com/t/heres-how-to-upload-to-cloudflare-r2-tweaks-from-original-s3-implementation-code/58686
[5] https://urlbox.com/docs/storage/configure-cloudflare-r2
[6] https://www.cloudflare.com/zh-cn/developer-platform/r2/
[7] https://developers.cloudflare.com/r2/api/workers/workers-api-usage/
[8] https://developers.cloudflare.com/r2/get-started/
[9] https://juejin.cn/post/7307171953868603429
[10] https://blog.csdn.net/qq_52475653/article/details/134723529
[11] https://www.zyglq.cn/posts/cf-r2-obj-storage.html
[12] https://blog.moraxyc.com/post/fbc493de/
[13] https://www.youtube.com/watch?v=2qq94qs1ZmM
[14] https://developers.cloudflare.com/r2/
[15] https://developers.cloudflare.com/r2/examples/
[16] https://github.com/cloudflare/cloudflare-docs/blob/production/content/r2/examples/postman.md
[17] https://github.com/cloudflare/cloudflare-docs/blob/production/content/cloudflare-one/tutorials/r2-logs.md
[18] https://blog.tanglu.me/cloudflare-R2-configure/
[19] https://blog.huacai.one/post/3
[20] https://www.youtube.com/watch?v=GDL2bzYMgLY



-------

以下是一个使用Cloudflare R2和TypeScript的最简单示例。这个例子展示了如何创建一个Cloudflare Worker，该Worker能够从R2存储桶中读取数据。请注意，这个例子假设你已经有了一个R2存储桶，并且你的Cloudflare账户已经配置好了相应的权限。

```typescript
// src/index.ts
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const key = url.pathname.slice(1) // Remove the leading '/'

  // 假设'MY_BUCKET'是你的R2存储桶绑定的变量名
  const object = await MY_BUCKET.get(key)
  if (object === null) {
    return new Response('Object not found', { status: 404 })
  }

  // 返回R2存储桶中的对象内容
  return new Response(object.body)
}
```

为了使上述代码工作，你需要进行以下步骤：

1. **创建Cloudflare Worker**：使用Cloudflare的Wrangler CLI工具创建一个新的Worker项目。你可以通过运行`npm create cloudflare@latest`来创建一个新的项目[3][8]。

2. **配置`wrangler.toml`**：在你的Worker项目中，更新`wrangler.toml`文件以包含你的Cloudflare账户ID和R2存储桶的绑定。例如：

   ```toml
   name = "your-worker-name"
   compatibility_date = "2024-04-05"
   account_id = "your-account-id"
   workers_dev = true

   [[r2_buckets]]
   binding = 'MY_BUCKET'
   bucket_name = 'your-bucket-name'
   ```

3. **部署Worker**：使用`wrangler publish`命令将你的Worker部署到Cloudflare的全球网络上[8]。

请注意，这个例子是一个基础的读取操作示例，实际应用中可能需要更复杂的逻辑，比如验证请求、处理不同的HTTP方法等。此外，确保你已经安装了Wrangler CLI并且已经登录到你的Cloudflare账户。

希望这个例子对你有所帮助！

Citations:
[1] https://justinnoel.dev/2023/03/02/using-cloudflare-workers-to-manage-an-s3-compatible-r2-bucket/
[2] https://www.reddit.com/r/CloudFlare/comments/1302hcs/how_i_can_use_r2_with_next_js_typescript/
[3] https://developers.cloudflare.com/workers/tutorials/upload-assets-with-r2/
[4] https://blog.cloudflare.com/improving-workers-types
[5] https://developers.cloudflare.com/r2/get-started/
[6] https://github.com/cloudflare/workerd/discussions/92
[7] https://github.com/cloudflare/worker-typescript-template/blob/master/src/index.ts
[8] https://developers.cloudflare.com/r2/api/workers/workers-api-usage/
[9] https://developers.cloudflare.com/r2/examples/
[10] https://community.cloudflare.com/t/read-r2-data-using-workers/385060
[11] https://github.com/topics/cloudflare-r2

--------

为了使`index.ts`文件能够调用Cloudflare R2进行文件上传和下载，我们需要对原始文件进行一些修改。首先，我们需要在`Env`接口中添加一个对R2存储桶的引用。然后，我们将实现两个函数：一个用于处理文件上传，另一个用于处理文件下载。以下是修改后的代码示例：

```typescript
export interface Env {
  MY_BUCKET: R2Bucket; // 添加对R2存储桶的引用
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // 根据请求的路径选择不同的操作
    switch (path) {
      case '/upload':
        return handleUpload(request, env);
      case '/download':
        return handleDownload(request, env);
      default:
        return new Response('Hello World!');
    }
  },
};

// 处理文件上传
async function handleUpload(request: Request, env: Env): Promise<Response> {
  const formData = await request.formData();
  const file = formData.get('file');
  if (file && file instanceof File) {
    await env.MY_BUCKET.put(file.name, file.stream());
    return new Response('File uploaded successfully');
  } else {
    return new Response('Invalid file', { status: 400 });
  }
}

// 处理文件下载
async function handleDownload(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return new Response('Filename is required', { status: 400 });
  }

  const object = await env.MY_BUCKET.get(filename);
  if (object === null) {
    return new Response('File not found', { status: 404 });
  }

  // 返回R2存储桶中的对象内容
  return new Response(object.body);
}
```

在这个修改后的版本中，我们首先在`Env`接口中添加了一个`MY_BUCKET`属性，这是对R2存储桶的引用。然后，我们在`fetch`函数中根据请求的URL路径来决定是调用`handleUpload`函数处理文件上传，还是调用`handleDownload`函数处理文件下载。

- `handleUpload`函数接收一个包含文件的`FormData`对象，然后使用`env.MY_BUCKET.put`方法将文件上传到R2存储桶中。
- `handleDownload`函数通过查询参数获取文件名，然后使用`env.MY_BUCKET.get`方法从R2存储桶中获取文件并返回。

请注意，为了使这段代码正常工作，你需要确保你的Cloudflare Worker环境已经配置了对应的R2存储桶绑定，并且`MY_BUCKET`与你在`wrangler.toml`文件中定义的绑定名称相匹配[1]。此外，这个示例假设上传和下载的请求路径分别是`/upload`和`/download`，你可以根据实际情况调整这些路径。

Citations:
[1] https://juejin.cn/post/7159782837640658974
[2] https://juejin.cn/post/7306723921717166131
[3] https://blog.csdn.net/Web3Stack/article/details/131587543
[4] https://github.com/wdssmq/Just-Imgs
[5] https://juejin.cn/s/cloudflare%20kv%20%E6%95%99%E7%A8%8B
[6] https://blog.cloudflare.com/internationalizing-the-cloudflare-dashboard-zh-cn
[7] https://blog.cloudflare.com/pages-function-goes-ga-zh-cn
[8] https://www.developers.pub/article/1207647
[9] https://www.owenyoung.com/categories/dev/
[10] https://www.github-zh.com/projects/321892267-x-file-storage
[11] https://github.com/wdssmq/R2-Worker-cf
[12] https://elog.1874.cool/notion/image-platform

-------

在使用`wrangler publish`命令将你的Cloudflare Worker部署到Cloudflare的全球网络之后，你可以通过以下步骤进行测试验证：

### 测试文件上传

1. **构建一个简单的HTML表单**：创建一个HTML文件，其中包含一个表单，允许用户选择文件并将其上传到你的Worker。例如：

   ```html
   <form action="https://your-worker.your-subdomain.workers.dev/upload" method="post" enctype="multipart/form-data">
     <input type="file" name="file" />
     <input type="submit" value="Upload File" />
   </form>
   ```

   将表单的`action`属性设置为你的Worker的上传URL。

2. **打开HTML文件**：在浏览器中打开这个HTML文件。

3. **选择文件并提交表单**：选择一个文件并点击提交按钮。表单将通过POST请求将文件发送到你的Worker。

4. **检查响应**：如果文件上传成功，你的Worker应该返回一个成功的响应消息。

### 测试文件下载

1. **直接访问下载URL**：在浏览器中输入你的Worker的下载URL，并提供所需的文件名作为查询参数。例如：

   ```
   https://your-worker.your-subdomain.workers.dev/download?filename=test.txt
   ```

   将`filename`查询参数设置为你想要下载的文件名。

2. **检查响应**：如果文件存在于R2存储桶中，你的Worker应该会返回该文件的内容。如果文件不存在，你应该会收到一个404错误响应。

### 使用cURL进行命令行测试

你也可以使用cURL工具从命令行进行测试：

- **上传文件**：

  ```bash
  curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/path/to/your/file" https://your-worker.your-subdomain.workers.dev/upload
  ```

  将`/path/to/your/file`替换为你要上传的文件的路径。

- **下载文件**：

  ```bash
  curl https://your-worker.your-subdomain.workers.dev/download?filename=test.txt -o test.txt
  ```

  将`test.txt`替换为你要下载的文件名，并且`-o test.txt`指定了下载文件的本地保存路径。

### 检查R2存储桶

你还可以直接登录到Cloudflare的R2存储桶管理界面，检查文件是否已经被正确上传到你的R2存储桶中。

确保在测试过程中，你的Worker和R2存储桶的权限和配置是正确的，以便能够成功上传和下载文件。如果在测试过程中遇到任何问题，检查Worker的代码逻辑是否正确，以及是否有任何错误消息可以帮助你诊断问题。

-------