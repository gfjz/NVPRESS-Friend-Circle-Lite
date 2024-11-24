<div align="center">
  <img src="https://bloggfjz.lqbby.com/uploads/2024/09/icon.png" width="200" alt="fclite">
  </div>

[前端展示](https://bloggfjz.lqbby.com) | [插件安装详细文档(正在写，写完以后放链接)]()

# Friend-Circle-Lite

本nvpress插件适配了友链朋友圈简单版，实现了[友链朋友圈](https://github.com/Rock-Candy-Tea/hexo-circle-of-friends)的基本功能，能够定时爬取rss文章并输出有序内容，为了较好的兼容性，输入格式与友链朋友圈的json格式一致，为了轻量化，暂不支持从友链页面自动爬取

## 展示页面

* [高峰君主の友链朋友圈](https://bloggfjz.lqbby.com/fcircle/)

* [清羽飞扬の友链朋友圈](https://blog.liushen.fun/fcircle/)

* [❖星港◎Star☆ 的友链朋友圈](https://blog.starsharbor.com/fcircle/)

* [梦爱吃鱼的友链朋友圈](https://blog.bsgun.cn/fcircle/)

* 欢迎在issue中[提交](https://github.com/gfjz/NVPRESS-Friend-Circle-Lite/issues)以展示你独特的设计！

## 功能概览

* 文章爬取
* 显示作者所有文章
* 随机钓鱼
* 自部署(2024-08-11添加)

## 项目介绍与插件安装教程

- **前端直接作为插件加载到网站里**：从[releases页面](https://github.com/gfjz/NVPRESS-Friend-Circle-Lite/releases)下载最新版插件压缩包然后在nvpress后台中已安装套件页面选择导入插件，重启服务后即可应用插件。
- **生成友链朋友圈页面在“/fcircle”页面**：本插件会自动生成前端在fcircle页面。
- **文章随机钓鱼功能**：本插件会随机获取一篇文章当页面刷新时。
- **默认的后端地址是LiuShen的**: 无需服务器，轻松搭建，有需要的可以自行搭建服务，可参照下面的教程。

[原作者写的后端服务搭建教程](https://blog.liushen.fun/posts/4dc716ec/)</h4>

## action后端服务部署使用方法

### 前置工作

1. **Fork 后端仓库:**
   点击[这个页面](https://github.com/willow-god/Friend-Circle-Lite)右上角的 Fork 按钮，将本仓库复制到你自己的`GitHub`账号下，仅复刻main分支即可。
2. **配置 Secrets:**
   在你 Fork 的仓库中，依次进入 `Settings` -> `Secrets` -> `New repository secret`，添加以下 Secrets：
   
   - `SMTP_PWD`(可选): SMTP 服务器的密码，用于发送电子邮件，如果你不需要，可以不进行配置。
3. **配置action权限：**
   
   在设置中，点击`action`，拉到最下面，勾选`Read and write permissions`选项并保存，确保action有读写权限。
4. **启用 GitHub Actions:**
   GitHub Actions 已经配置好在仓库的 `.github/workflows/*.yml` 文件中，当到一定时间时将自动执行，也可以手动运行。
   其中，每个action功能如下：
   
   - `friend_circle_lite.yml`实现核心功能，爬取并发送邮箱，需要在Action中启用；
   - `deal_subscribe_issue.yml`处理固定格式的issue，打上固定标签，评论，并关闭issue；
5. **设置issue格式：**
   这个我已经设置好了，你只需要检查issue部分是否有对应格式即可，可以自行修改对应参数以进行自定义。

### 配置选项

1. 如果需要修改爬虫设置或邮件模板等配置，需要修改仓库中的 `config.yaml` 文件：
   
   - **爬虫相关配置**
     使用 `requests` 库实现友链文章的爬取，并将结果存储到根目录下的 `all.json` 文件中。
     
     ```yaml
     spider_settings:
       enable: true
       json_url: "https://blog.qyliu.top/friend.json"
       article_count: 5
       merge_result:
         enable: true
         merge_json_url: "https://fc.liushen.fun"
     ```
     
     `enable`：开启或关闭，默认开启；
     
     `json_url`：友链朋友圈通用爬取格式第一种（下方有配置方法）;
     
     `article_count`：每个作者留存文章个数。
     
     `marge_result`：是否合并多个json文件，若为true则会合并指定网络地址和本地地址的json文件并去重
     
     - `enable`：是否启用合并功能，该功能提供与自部署的友链合并功能，可以解决服务器部分国外网站，服务器无法访问的问题
     - `marge_json_path`：请填写网络地址的json文件，用于合并，不带空格！！！
   - **邮箱推送功能配置**
     暂未实现，预留用于将每天的友链文章更新推送给指定邮箱。
     
     ```yaml
     email_push:
       enable: false
       to_email: recipient@example.com
       subject: "今天的 RSS 订阅更新"
       body_template: "rss_template.html"
     ```
     
     **暂未实现**：该部分暂未实现，由于感觉用处不大，保留接口后期酌情更新。
   - **邮箱 issue 订阅功能配置**
     通过 GitHub issue 实现向提取的所有邮箱推送博客更新的功能。
     
     ```yaml
     rss_subscribe:
       enable: true
       github_username: willow-god
       github_repo: Friend-Circle-Lite
       your_blog_url: https://blog.qyliu.top/
     ```
     
     `enable`：开启或关闭，默认开启，如果没有配置请关闭。
     
     `github_username`：github用户名，用来拼接github api地址
     
     `github_repo`：仓库名称，作用同上。
     
     `your_blog_url`：用来定时检测是否有最新文章，请确保你的网站可以被FCLite抓取到
   - **SMTP 配置**
     使用配置中的相关信息实现邮件发送功能。
     
     ```yaml
     smtp:
       email: 3162475700@qq.com
       server: smtp.qq.com
       port: 587
       use_tls: true
     ```
     
     `email`：发件人邮箱地址
     
     `server`：`SMTP` 服务器地址
     
     `port`：`SMTP` 端口号
     
     `use_tls`：是否使用 `tls` 加密
     
     这部分配置较为复杂，请自行学习使用。
   - **特定 RSS 配置**
     
     用于指定特定友链特殊RSS，样例如下：
     
     ```yaml
     specific_RSS:
       - name: "Redish101"
         url: "https://reblog.redish101.top/api/feed"
      # - name: "無名小栈"
      #   url: "https://blog.imsyy.top/rss.xml"
     ```
     
     `name`：友链名称，需要严格匹配
     
     `url`：该友链对应RSS地址
     
     可以添加多个，如果不需要也可以置空。
2. **贡献与定制:**
   欢迎对仓库进行贡献或根据需要进行定制。

**如果你配置正常，那么等action运行一次（可以手动运行）应该就可以在page分支看到结果了，检查一下，如果结果无误，可以继续看下一步**

### 友圈json生成

**注意，以下可能仅适用于hexo-theme-butterfly或部分类butterfly主题，如果你是其他主题，可以自行适配，理论上只要存在友链数据文件都可以整理为该类型，甚至可以自行整理为对应json格式后放到 `/source` 目录下即可，格式可以参考：`https://blog.qyliu.top/friend.json` **

1. 将以下文件放置到博客根目录：
   
   ```javascript
   const YML = require('yamljs')
   const fs = require('fs')
   
   let friends = [],
       data_f = YML.parse(fs.readFileSync('source/_data/link.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));
   
   data_f.forEach((entry, index) => {
       let lastIndex = 2;
       if (index < lastIndex) {
           const filteredLinkList = entry.link_list.filter(linkItem => !blacklist.includes(linkItem.name));
           friends = friends.concat(filteredLinkList);
       }
   });
   
   // 根据规定的格式构建 JSON 数据
   const friendData = {
       friends: friends.map(item => {
           return [item.name, item.link, item.avatar];
       })
   };
   
   // 将 JSON 对象转换为字符串
   const friendJSON = JSON.stringify(friendData, null, 2);
   
   // 写入 friend.json 文件
   fs.writeFileSync('./source/friend.json', friendJSON);
   
   console.log('friend.json 文件已生成。');
   ```
2. 在根目录下运行：
   
   ```bash
   node link.js
   ```
   
   你将会在source文件中发现文件`friend.json`，即为对应格式文件，下面正常hexo三件套即可放置到网站根目录。
3. (可选)添加运行命令到脚本中方便执行，在根目录下创建：
   
   ```bash
   @echo off
   E:
   cd E:\Programming\HTML_Language\willow-God\blog
   node link.js && hexo g && hexo algolia && hexo d
   ```
   
   地址改成自己的，上传时仅需双击即可完成。
   
   如果是github action，可以在hexo g脚本前添加即可完整构建，注意需要安装yaml包才可解析yml文件。

## 自部署使用方法

如果你有一台境内服务器，你也可以通过以下操作将其部署到你的服务器上，操作如下：

### 前置工作

确保你的服务器有定时任务 `crontab` 功能包，一般是linux自带，如果你没有宝塔等可以管理定时任务的面板工具，可能需要你自行了解定时工具并导入，本教程提供了简单的介绍。

首先克隆仓库并进入对应路径：

```bash
git clone https://github.com/willow-god/Friend-Circle-Lite.git
cd Friend-Circle-Lite
```

由于不存在issue，所以不支持邮箱推送(主要是懒得分类写了，要不然还得从secret中获取密码的功能剥离QAQ)，请将除第一部分抓取以外的功能均设置为false

下载服务相关包，其中 `requirements-server.txt` 是部署API服务所用包， `requirements.txt` 是抓取服务所用包，请均下载一遍。

```bash
pip install -r ./requirements.txt
pip install -r ./server/requirements-server.txt
```

### 部署API服务

如果环境配置完毕，你可以进入目录路径后直接运行`deploy.sh`脚本启动API服务：

```bash
chmod +x ./deploy.sh
./deploy.sh
```

其中的注释应该是较为详细的，如果部署成功你可以使用以下命令进行测试，如果获取到了首页html内容则成功：

```bash
curl 127.0.0.1:1223
```

这个端口号可以修改，在server.py最后一行修改数字即可，如果你想删除该API服务，可以使用ps找到对应进程并使用Kill命令杀死进程：

```bash
ps aux | grep python
kill -9 [这里填写上面查询结果中对应的进程号]
```

### 合并github数据

你是不是以为github数据没用了？并不是！因为有很多站长是使用的GitHub page等服务部署的，这种服务可能无法被你的服务器抓取，此时你就需要合并两个的爬取数据。修改第一个配置中的以下部分：

```yaml
merge_result:
    enable: true
    merge_json_url: "https://fc.liushen.fun"
```

其中地址项不要添加最后的斜杠，这样就会在本地爬取结束后合并远程的数据，以做到更高的准确率！

## 问题与贡献

如果遇到任何问题或有建议，请[提交一个 issue](https://github.com/willow-god/Friend-Circle-Lite/issues)。欢迎贡献代码！

