# Cloudflare Pages 入门教程

本教程将帮助您快速入门 **Cloudflare Pages**，了解如何利用这一平台轻松构建和部署静态网站或 JAMstack 应用。

## 什么是 Cloudflare Pages

**Cloudflare Pages** 是 Cloudflare 提供的一项静态网站托管服务，适用于个人和团队快速构建、预览、发布网站，并且能够无缝集成到 CI/CD 流程中。Cloudflare Pages 支持 Git 集成，使得代码提交后自动触发部署，极大提高了工作效率。

## 准备工作

1. 确保已拥有一个 [GitHub](https://github.com) 账户。
2. 注册并登录 [Cloudflare](https://www.cloudflare.com) 账户。
3. 准备好一个已存在的静态网站项目（如 HTML、CSS、JavaScript 文件）。

## 创建新项目

### 1. 连接 Git 仓库

- 进入 [Cloudflare Pages 仪表板](https://dash.cloudflare.com/?to=/:account/pages) 后，点击 **Create a project**（创建项目）。
- 选择 **Connect to Git**，然后选择要部署的 GitHub 仓库。
- 允许 Cloudflare Pages 访问您的 GitHub 账户，以便自动部署项目。

### 2. 配置项目

- 选择好仓库后，您可以自定义项目的设置，如 **项目名称**、**部署分支**（通常是 `main` 或 `master`）。
- 如果您的项目是用框架构建的（例如 Next.js 或 Gatsby），可以在 **Build settings** 部分输入构建命令和输出目录（例如：`npm run build` 和 `out`）。

### 3. 部署项目

- 完成设置后，点击 **Save and Deploy** 按钮。Cloudflare Pages 会自动克隆仓库并开始第一次部署。
- 部署完成后，您会得到一个默认的 `*.pages.dev` 域名，您可以在浏览器中访问它查看您的网站。

## 自定义域名

- 在 Cloudflare Pages 仪表板中，您可以为项目添加自定义域名。
- 进入项目的设置页面，找到 **Custom domains** 选项，按照提示将您自己的域名与 Cloudflare Pages 关联。

## 预览分支部署

Cloudflare Pages 支持对不同的 Git 分支进行预览部署，这样可以方便地测试新功能或变更。

- 每次创建 Pull Request 时，Cloudflare Pages 会自动生成一个预览链接，便于查看更改效果。
- 您可以将这个链接分享给团队成员，以便协作评审。

## 部署日志和故障排查

- 在项目的 **Deployments** 选项卡中，您可以查看每次部署的日志。
- 如果部署失败，可以通过日志信息定位问题，例如缺少依赖或构建命令错误。

## 常见问题

- **如何处理构建错误？** 检查 **Build settings** 中的构建命令和输出目录是否正确，并确保您的项目根目录中包含必要的配置文件（如 `package.json`）。
- **如何保护特定页面或 API？** 可以通过结合 [Cloudflare Access](https://www.cloudflare.com/products/zero-trust/access/) 实现访问控制，保护敏感内容。

---

### 小结

通过 Cloudflare Pages，您可以方便地托管静态网站，享受快速的全球 CDN 加速和便捷的 Git 集成。只需几步，便可让您的项目轻松上线。

如果您需要更多帮助，请查阅 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages)。