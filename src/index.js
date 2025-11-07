import * as cheerio from 'cheerio';
gopeed.events.onResolve(async (ctx) => {
  let path = new URL(ctx.req.url).pathname.substring(1);
  gopeed.logger.info('path', path);
  gopeed.settings.refreshToken
  const resp = await fetch('https://api.gofile.io/contents/1c7K8b?wt=4fd6sg89d7s6', {
    headers: {
      'authorization': gopeed.settings.authorization,
    },
  });


  gopeed.logger.info('resp', resp.json());

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
