
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular-portfolio/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 11506, hash: '0811611a8328ea7f2791bf0d097e012656992f3eb70fd634cc558da084db370a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1258, hash: '1ab6e351667e26e16c523bb9ec79c94195ed0b8ce8e740d6f13e834c67bc3e06', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-67UXUOZO.css': {size: 13981, hash: 'uDCDmJNWH8g', text: () => import('./assets-chunks/styles-67UXUOZO_css.mjs').then(m => m.default)}
  },
};
