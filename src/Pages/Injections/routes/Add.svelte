<script>
  import { onMount } from "svelte";
  import { querystring } from "svelte-spa-router";
  import * as monaco from "monaco-editor";

  export let params = {};

  import { actions, dispatch, store } from "../../Popup/store";

  let which = "Js";
  let js = `function(messge) {
  alert(message);
}
`;
  let css = `p {
  color: blue;
}
`;

  self.MonacoEnvironment = {
    getWorkerUrl: function(moduleId, label) {
      if (label === 'css') {
        return '/editor/css.worker.js';
      }
      if (label === 'typescript' || label === 'javascript') {
        return '/editor/ts.worker.js';
      }
      return '/editor/editor.worker.js';
    },
  };

  dispatch(actions.init());
  let editor;
  let jsModel, cssModel;

  //document.body.style.margin = "0";

  // https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html
  onMount(() => {
    console.log(
      "%cMOUNTED",
      "background-color: blue; padding: 5px; font-size: larger; color: white;"
    );

    if (!editor) {
      jsModel = monaco.editor.createModel(js, 'typescript');
      cssModel = monaco.editor.createModel(css, 'css');

      editor = monaco.editor.create(document.getElementById("container"), {
        automaticLayout: true,
      });

      select("Js");
    }
  });

  const select = w => {
    which = w;
    if (w === "Js") {
      editor.setModel(jsModel);
    } else if (w === "Css") {
      editor.setModel(cssModel);
    }
  };

  // monaco.editor.create(document.getElementById("container"), {
  //     value: "function hello() {\n\talert('Hello world!');\n}",
  //     language: "javascript"
  // });
</script>

<style>
  div.main {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    display: flex;
  }

  div.header {
    flex-basis: auto; /* default */
    flex: 0 1 auto;
    border-bottom: solid 2px black;
  }

  div.tab {
    border: solid 2px black;
    border-radius: 10px 10px 0 0;
    display: inline-block;
    padding: 5px 15px 5px 15px;
    box-sizing: border-box;
    position: relative;
    top: 2px;
    border-collapse: collapse;
    cursor: pointer;
  }

  div.tab.active {
    background-color: #55c;
    color: white;
  }

  div.tab.first {
    margin-left: 10px;
  }

  div.editor {
    flex: 1 1 auto;
  }
</style>

<div class="main">
  <div class="header">
    <h1>Add Injection</h1>

    {#if $store.loading}
      <p>Loading...</p>
    {:else}
      <h3>Loaded</h3>
    {/if}

    <div
      class="tab first"
      class:active={which === 'Js'}
      on:click={() => select('Js')}>
      Js
    </div>
    <div
      class="tab"
      class:active={which === 'Css'}
      on:click={() => select('Css')}>
      Css
    </div>
  </div>

  <div class="editor" id="container" />
</div>
