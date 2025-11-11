# Gofile 下载器 - Gopeed 扩展

## 功能简介
专为 Gofile.io 网站设计的高效下载器扩展，无缝集成到 Gopeed 下载管理器。

## 🚀 快速开始

### 第一步：获取认证参数
1. 访问 Gofile.io 网站
2. 随意选择一个文件开始下载（此步骤用于生成必要的认证令牌）
3. 打开浏览器开发者工具（F12），按照以下方式获取参数：

### 第二步：获取必要参数

#### 🔑 获取 Authorization
1. 打开浏览器开发者工具（F12）
2. 切换到 **Network**（网络）标签页
3. 在 Gofile 网站进行任意下载操作
4. 在网络请求中找到包含 `api.gofile.io/contents/` 的请求
5. 查看请求头中的 **Authorization** 字段值

#### 🍪 获取 AccountToken
1. 在开发者工具的 **Application**（应用）标签页中
2. 展开 **Cookies** 选项
3. 选择 `https://gofile.io` 网站
4. 查找名为 `accountToken` 的 Cookie 值

### 第三步：配置扩展
1. 将获取到的 **Authorization** 和 **AccountToken** 填入扩展配置中
2. 保存设置

### 第四步：开始下载
现在你可以复制任意 Gofile.io 链接，Gopeed 将自动识别并开始下载！

## 💡 注意事项
- 认证令牌可能会过期，如遇下载失败请重新获取
- 确保网络连接稳定
- 支持文件夹和单文件下载
