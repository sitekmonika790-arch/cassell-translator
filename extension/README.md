# Cassell Translator Edge Extension

本目录是 Cassell Translator 的本地 Microsoft Edge 插件版本。

## 安装方式

1. 打开 Microsoft Edge。
2. 进入 `edge://extensions/`。
3. 打开左侧或页面上的“开发人员模式”。
4. 点击“加载解压缩的扩展”。
5. 选择本项目的 `extension/` 目录。
6. 打开任意网页，右下角会出现 Cassell 翻译按钮。

## 使用方式

1. 点击右下角的 Cassell 按钮。
2. 在小面板里输入或粘贴文本。
3. 停顿约 0.5 秒后自动翻译。
4. 翻译成功后点击“复制译文”可复制结果。

## 依赖

插件调用线上接口：

`https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/api/translate`

如果 Vercel 部署不可用，插件会显示错误提示。
