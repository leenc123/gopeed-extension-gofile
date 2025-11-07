import * as cheerio from 'cheerio';
async function fetchWithRetry(url, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      gopeed.logger.info(`尝试第 ${i + 1} 次获取页面...`);

      const resp = await fetch(url, {
        headers: {
          'User-Agent': gopeed.settings.ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 30000
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
      }

      const html = await resp.text();

      // 检查页面是否包含预期内容
      if (html.includes('item_download') || html.includes('download')) {
        gopeed.logger.info('页面包含下载相关元素');
        return html;
      } else {
        gopeed.logger.warn('页面可能未完全加载，未找到下载元素');
        if (i < retries - 1) {
          gopeed.logger.info(`等待 ${delay}ms 后重试...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    } catch (error) {
      gopeed.logger.error(`第 ${i + 1} 次尝试失败:`, error);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw new Error('所有重试尝试都失败了');
}
gopeed.events.onResolve(async (ctx) => {
  try {
    const html = await fetchWithRetry(ctx.req.url, 3, 2000);
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
