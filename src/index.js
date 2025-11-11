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
    files = Object.values(response.data.children).map(item => ({
      req: {
        url:item.link
      },
      size:1233333,
      name: item.name
    }));
  }
  gopeed.logger.info('files', files);
 

  ctx.res = {
    name: '文件地址',
    files: files,
  };
});
