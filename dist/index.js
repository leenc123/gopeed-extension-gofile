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
gopeed.events.onResolve(async function (ctx) {
  var path = new URL(ctx.req.url).pathname.substring(1);
  var resp = await fetch(ctx.req.url, {
    headers: {
      'User-Agent': gopeed.settings.ua
    }
  });
  var html = await resp.text();
  gopeed.logger.info('html', html);
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