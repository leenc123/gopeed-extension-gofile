gopeed.events.onResolve(async (ctx) => {
  let path = new URL(ctx.req.url).pathname.substring(1);
  const resp = await fetch(ctx.req.url, {
    headers: {
      'User-Agent': gopeed.settings.ua,
    },
  });
  const html = await resp.text();
  gopeed.logger.info('html', html);
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
