gopeed.events.onResolve((ctx) => {
  let path = new URL(ctx.req.url).pathname.substring(1);
  console.log('path', path)
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
