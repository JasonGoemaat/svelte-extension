console.log('injection - index.js');

import App from './newtab.svelte';

const app = new App({
  target: document.body,
  props: {},
});

export default app;
