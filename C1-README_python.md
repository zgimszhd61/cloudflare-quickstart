# Cloudflare Workers 和 Python 入门教程（优化版）

本教程将指导你使用 Cloudflare Workers 创建一个简单的 HTTP 服务。注意：目前 Cloudflare Workers 默认支持 JavaScript/TypeScript 运行环境。如果希望在 Worker 中执行 Python 代码，可以考虑通过 WebAssembly 运行 Python，本文将以 JavaScript 方式为例进行说明。

## 环境准备

确保以下环境已安装：
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- 已注册的 [Cloudflare 账户](https://dash.cloudflare.com/) 和一个可用的 Cloudflare API token

## 1. 初始化 Cloudflare Worker 项目

使用 Wrangler CLI 创建一个新的 Worker 项目：

```bash
mkdir my-worker
cd my-worker
wrangler init --type javascript  # 初始化 JavaScript 项目
```

## 2. 编写 Worker 逻辑

编辑 `src/index.js` 文件，添加一个简单的 JavaScript 代码块，响应 HTTP 请求：

```javascript
export default {
  async fetch(request) {
    return new Response("Hello from Cloudflare Worker!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
```

此代码定义了一个 `fetch` 事件处理函数，每次接收到 HTTP 请求时，都会返回 `Hello from Cloudflare Worker!` 的文本响应。

## 3. 配置 `wrangler.toml` 文件

在项目根目录下找到 `wrangler.toml` 文件，并确保正确配置。下面是一个示例：

```toml
name = "my-python-worker"
type = "javascript"  # 此处指定为 JavaScript 类型

account_id = "你的 Cloudflare 账户 ID"  # 请替换为你的账户 ID
workers_dev = true
```

### `wrangler.toml` 关键字段

- `account_id`：登录 Cloudflare，进入账户设置页面获取。
- `workers_dev`：设置为 `true` 以便在 Cloudflare 的开发模式中快速测试部署。

## 4. 部署 Worker

使用以下命令发布你的 Worker：

```bash
wrangler publish
```

部署完成后，你的 Worker 将在 Cloudflare 的边缘网络上运行。访问 `https://<your-worker-name>.<your-account-id>.workers.dev` 以查看 Worker 的输出。

## 5. 后续操作

若要进一步使用 Python 代码，可以参考 Cloudflare Workers 的 WebAssembly 兼容方案，将 Python 代码编译为 WebAssembly 模块并导入 Worker。在官方文档中搜索 "WebAssembly" 可以找到相应的教程和支持资源。

## 参考链接

- [Cloudflare Workers 官方文档](https://developers.cloudflare.com/workers/)
- [WebAssembly 介绍](https://webassembly.org/)

通过本教程，你可以快速上手 Cloudflare Workers，理解其基本结构和运行方式。对于更复杂的应用，可以利用 WebAssembly 或探索 Cloudflare 的其他边缘计算功能。