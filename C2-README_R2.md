# Cloudflare R2 快速入门教程

本教程帮助您通过Cloudflare R2搭建一个基础应用。您将学习如何配置R2存储桶，并通过Worker与存储桶进行数据交互。下面是详细步骤和代码示例。

## 1. 注册 Cloudflare 账户

访问 [Cloudflare官网](https://www.cloudflare.com/) 完成账户注册。

## 2. 安装 Wrangler CLI

Wrangler是管理Cloudflare Workers和R2存储桶的CLI工具。确保安装了 [Node.js](https://nodejs.org/) 和 npm，然后执行以下命令安装Wrangler：

```bash
npm install -g @cloudflare/wrangler
```

## 3. 创建 R2 存储桶

登录到 Cloudflare Dashboard，选择 R2 服务并点击“创建存储桶”。命名您的存储桶后，点击“创建”。

## 4. 配置 Wrangler 访问 R2 存储桶

1. 初始化一个 Wrangler 项目：

   ```bash
   wrangler init my-r2-project
   ```

2. 在项目的 `wrangler.toml` 文件中，配置 R2 存储桶的绑定（将 `<YOUR_BUCKET_NAME>` 替换为您的存储桶名称）：

   ```toml
   name = "my-r2-project"
   type = "javascript"
   
   [[r2_buckets]]
   binding = "MY_BUCKET"  # 引用名称
   bucket_name = "<YOUR_BUCKET_NAME>"
   ```

## 5. 创建 Worker 访问 R2 存储桶

在项目目录中创建 `index.js` 文件，实现基础的文件访问功能：

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
    headers: { 'content-type': file.httpMetadata.contentType },
  })
}
```

此脚本在接收请求时从URL中读取文件名并尝试从R2存储桶获取该文件。

## 6. 部署 Worker

使用 Wrangler 将 Worker 部署到 Cloudflare：

```bash
wrangler publish
```

成功部署后，您可以通过带文件名查询参数的 URL 来访问 Worker，例如：`https://your-worker.your-subdomain.workers.dev/?file=example.txt`。

## 7. 使用 TypeScript 实现 Worker（可选）

以下是 TypeScript 版本代码。假设您有一个 R2 存储桶绑定在 `MY_BUCKET` 上：

```typescript
export interface Env {
  MY_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const key = url.pathname.slice(1)

    const object = await env.MY_BUCKET.get(key)
    if (object === null) {
      return new Response('Object not found', { status: 404 })
    }

    return new Response(object.body)
  }
}
```

1. **更新 `wrangler.toml` 文件**：为项目添加账户信息和存储桶绑定。
   ```toml
   name = "your-worker"
   account_id = "your-account-id"
   
   [[r2_buckets]]
   binding = 'MY_BUCKET'
   bucket_name = 'your-bucket-name'
   ```

2. **部署**：使用 `wrangler publish` 发布您的 Worker。

## 8. 进阶功能：实现文件上传与下载

要实现文件上传和下载，可以扩展 `index.ts` 文件，通过不同路径处理上传和下载请求：

```typescript
export interface Env {
  MY_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    switch (url.pathname) {
      case '/upload':
        return handleUpload(request, env);
      case '/download':
        return handleDownload(request, env);
      default:
        return new Response('Hello World!');
    }
  },
};

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

async function handleDownload(request: Request, env: Env): Promise<Response> {
  const filename = new URL(request.url).searchParams.get('filename');
  if (!filename) return new Response('Filename required', { status: 400 });

  const object = await env.MY_BUCKET.get(filename);
  if (object === null) return new Response('File not found', { status: 404 });

  return new Response(object.body);
}
```

## 9. 测试上传与下载

### 上传测试

使用HTML表单上传：

```html
<form action="https://your-worker.your-subdomain.workers.dev/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" value="Upload File" />
</form>
```

### 下载测试

直接访问下载URL：

```
https://your-worker.your-subdomain.workers.dev/download?filename=example.txt
```

### cURL 命令行测试

**上传**：

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/path/to/file" https://your-worker.your-subdomain.workers.dev/upload
```

**下载**：

```bash
curl https://your-worker.your-subdomain.workers.dev/download?filename=test.txt -o test.txt
```

---

**提示**：测试时，请确保Cloudflare账户和R2存储桶的权限配置正确，以便能够成功上传和下载文件。