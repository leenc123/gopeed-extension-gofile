import * as cheerio from 'cheerio';
gopeed.events.onResolve(async (ctx) => {
  let path = new URL(ctx.req.url).pathname.substring(1);
  gopeed.logger.info('path', path);

  gopeed.logger.info('Authorization', gopeed.settings.authorization);
  const resp = await fetch('https://api.gofile.io/contents/1c7K8b?wt=4fd6sg89d7s6&contentFilter=&page=1&pageSize=1000&sortField=name&sortDirection=1', {
    headers: {
      'authorization': gopeed.settings.authorization,
    },
  });
  // 将响应转换为JSON对象
  const data = await resp.json();
  // 打印JSON字符串
  const response = JSON.parse(JSON.stringify(data, null, 2))
  let files = []
  if (response.status == 'ok') {
    files = await Promise.all(
      Object.values(response.data.children).map(async (item) => {
        let fileSize = 0; // 默认大小

        try {
          // 发送HEAD请求获取文件大小
          const resp = await gopeed.fetch({
            url: item.link,
            method: 'HEAD'
          });

          // 从Content-Length头部获取文件大小
          const contentLength = resp.headers['content-length'];
          if (contentLength) {
            fileSize = parseInt(contentLength);
          }
        } catch (error) {
          gopeed.logger.warn(`无法获取文件大小: ${item.link}`, error);
          // 保持默认大小
        }

        return {
          req: {
            url: item.link
          },
          size: fileSize,
          name: item.name
        };
      })
    );
  }
  gopeed.logger.info('files', files);


  ctx.res = {
    name: '文件地址',
    files: files,
  };
});
