import * as cheerio from 'cheerio';
gopeed.events.onResolve(async (ctx) => {
  let path = new URL(ctx.req.url).pathname.substring(1);
  const resp = await fetch(ctx.req.url, {
    headers: {
      'User-Agent': gopeed.settings.ua,
    },
  });
  const html = await resp.text();
  gopeed.logger.info('html', html);
// 使用cheerio解析HTML
  const $ = cheerio.load(html);
  const btns = $('.item_download.border.border-gray-600.text-white.text-sm.px-2.py-1.rounded.shadow.hover\\:bg-gray-700.flex.items-center');

  gopeed.logger.info('html', `找到 ${btns.length} 个下载按钮`);

  if (btns.length === 0) {
    alert("未找到可下载的文件");
    return;
  }
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
