console.log('newtab - index.js');

import App from './newtab.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'Svelte',
  },
});

export default app;
