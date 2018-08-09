账户查看管理系统
===========================

### 环境依赖
node
koa2

#### 部署步骤
```
1. 分别进入 account-sys service 安装 执行 npm install  //安装node运行环境
2. 本地启动需额外全局安装 supervisor 执行 npm install -g supervisor
3. 安装完成 进入account-sys 执行 npm run serve 
4. 进入 service 执行 supervisor -i node_modules/ index.js 
5. 暂无数据库信息（所以启动后访问会有问题）
```

#### 目录结构描述
│ 
├── Readme.md                   // help
├── account-sys                 //前端界面
└── service                 //后台服务器




#### V1.0.0 版本内容更新
1. 前端界面展示
2. 带简单增删改查功能
3. 路由拦截
