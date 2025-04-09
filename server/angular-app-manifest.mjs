
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Portfolio-Updated/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 11506, hash: '9da746d9949c5d923d26e873795ef3fa509ecf7ac3c9ba4e6c685560077b911d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1258, hash: 'c6706658e0de19b596343df90f2483cbcabc3b0c035bb6253707a0e8a0386867', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-67UXUOZO.css': {size: 13981, hash: 'uDCDmJNWH8g', text: () => import('./assets-chunks/styles-67UXUOZO_css.mjs').then(m => m.default)}
  },
};
