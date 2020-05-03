console.log('injection - index.js');

import App from './Injections.svelte';

const app = new App({
  target: document.body,
  props: {},
});

export default app;
