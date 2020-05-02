console.log('popup - index.js');

import App from './popup.svelte';

const app = new App({
  target: document.body,
  props: {},
});

export default app;
