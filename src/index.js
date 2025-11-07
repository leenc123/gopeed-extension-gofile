import * as cheerio from 'cheerio';
const puppeteer = require('puppeteer');
async function simplePuppeteerFetch(url) {
    const browser = await puppeteer.launch({ headless: true });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent(gopeed.settings.ua);
        
        // 访问页面
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        
        // 获取完整 HTML
        const html = await page.content();
        return html;
        
    } finally {
        await browser.close();
    }
}
gopeed.events.onResolve(async (ctx) => {
  try {
   // 使用示例
    const html = await simplePuppeteerFetch(ctx.req.url);
    const $ = cheerio.load(html);

    // 多种方式查询元素
    const selectors = [
      '.item_download',
      '[class*="item_download"]',
      '[class*="download"]',
      'button[class*="download"]',
      'a[class*="download"]'
    ];

    let foundElements = [];

    for (const selector of selectors) {
      const elements = $(selector);
      gopeed.logger.info(`选择器 "${selector}" 找到 ${elements.length} 个元素`);

      elements.each((index, element) => {
        const $el = $(element);
        const classes = $el.attr('class') || '';

        // 检查是否包含目标class
        const targetClasses = ['item_download', 'border', 'text-white', 'rounded'];
        const hasTargetClasses = targetClasses.every(cls => classes.includes(cls));

        if (hasTargetClasses) {
          foundElements.push({
            $el: $el,
            selector: selector,
            text: $el.text().trim(),
            classes: classes,
            html: $el.prop('outerHTML')
          });
        }
      });
    }

    gopeed.logger.info(`总共找到 ${foundElements.length} 个匹配元素`);

    // 输出详细信息
    foundElements.forEach((item, index) => {
      gopeed.logger.info(`=== 元素 ${index + 1} ===`);
      gopeed.logger.info(`选择器: ${item.selector}`);
      gopeed.logger.info(`文本: ${item.text}`);
      gopeed.logger.info(`Class: ${item.classes}`);
      gopeed.logger.info('================');
    });

  } catch (error) {
    gopeed.logger.error('获取页面失败:', error);
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
