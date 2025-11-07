import * as cheerio from 'cheerio';
gopeed.events.onResolve(async (ctx) => {
  let path = new URL(ctx.req.url).pathname.substring(1);
  gopeed.logger.info('path', path);
  
  gopeed.logger.info('Authorization',gopeed.settings.authorization);
  const resp = await fetch('https://api.gofile.io/contents/1c7K8b?wt=4fd6sg89d7s6', {
    headers: {
      'authorization': gopeed.settings.authorization,
    },
  });
// 将响应转换为JSON对象
  const data = await resp.json();
  // 打印JSON字符串
  gopeed.logger.info(JSON.stringify(data, null, 2));
  if (resp.status == 'ok')
  gopeed.logger.info('data', resp.status);

  ctx.res = {
    name: 'example',
    files: [
      {
        name: 'index.html',
        req: {
          url: 'https://example.com',
        },
      },
    ],
  };
});
