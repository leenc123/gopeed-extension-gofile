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
        url: item.link,
        extra: {
          header: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Referer': 'https://gofile.io/',
            'Origin': 'https://gofile.io',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Cache-Control': 'max-age=0',
            'Range': 'bytes=0-',
            'Connection': 'keep-alive',
            'Host': 'store3.gofile.io'
          }
        },
      },
      size: item.size,
      tolerance: 0,
      connections: 1,
      name: item.name
    }));
  }
  gopeed.logger.info('files', files);


  ctx.res = {
    name: '文件地址',
    files: files,
  };
});
