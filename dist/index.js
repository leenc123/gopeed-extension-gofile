/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'cheerio'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

gopeed.events.onResolve(async function (ctx) {
  var path = new URL(ctx.req.url).pathname.substring(1);
  var resp = await fetch(ctx.req.url, {
    headers: {
      'User-Agent': gopeed.settings.ua
    }
  });
  var html = await resp.text();
  gopeed.logger.info('html', html);
  // 使用DOMParser解析HTML
  // 使用cheerio解析HTML
  var $ = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'cheerio'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(html);
  var btns = $('.button.item_download.border.border-gray-600');
  gopeed.logger.info('html', "\u627E\u5230 ".concat(btns.length, " \u4E2A\u4E0B\u8F7D\u6309\u94AE"));
  if (btns.length === 0) {
    alert("未找到可下载的文件");
    return;
  }
  ctx.res = {
    name: 'example',
    files: [{
      name: 'index.html',
      req: {
        url: 'https://example.com'
      }
    }]
  };
});
/******/ })()
;