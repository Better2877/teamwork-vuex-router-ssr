# 使用说明
1. 开始
    * 生成客户端manifest文件

    `npm run build:client`

    * 生成服务端bundle文件

    `npm run build: server`

    * 利用KOA框架将服务端bundle文件和客户端manifest文件混合生成renderer对象，并分别生成客户端渲染结果和服务端渲染结果

    `npm run start`
    
2. 相关文档
    * *relativeFiles*文件夹中
        - **Mackup**：视觉稿
        - **interactiveDesign.png**：交互设计图
        - **data.json**：Mock数据JSON格式
