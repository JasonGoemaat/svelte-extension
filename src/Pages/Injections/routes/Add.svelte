<script>
  import { onMount } from "svelte";
  import { querystring } from "svelte-spa-router";
  //import * as monaco from "monaco-editor";
  import { editor as meditor } from "monaco-editor";

  export let params = {};

  let value, match;

  let query = $querystring.split("&").reduce((acc, x) => {
    let parts = x.split("=");
    if (parts.length === 1) {
      acc[parts[0]] = true;
    } else if (parts.length > 1) {
      acc[parts[0]] = decodeURIComponent(parts.slice(1).join("="));
    }
    return acc;
  }, {});

  console.log("query:", query);

  import { actions, dispatch, store } from "../../Popup/store";

  let which = "Settings";
  let js = `function(messge) {
  console.log(message);
}
`;
  let css = `p.sample {
  color: blue;
}
`;

  self.MonacoEnvironment = {
    getWorkerUrl: function(moduleId, label) {
      if (label === "css") {
        return "/editor/css.worker.js";
      }
      if (label === "typescript" || label === "javascript") {
        return "/editor/ts.worker.js";
      }
      return "/editor/editor.worker.js";
    }
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
      jsModel = meditor.createModel(js, "typescript");
      cssModel = meditor.createModel(css, "css");

      editor = meditor.create(document.getElementById("container"), {
        automaticLayout: true
      });

      select("Settings");
    }
  });

  const select = w => {
    if (which === w) return;
    which = w;
    if (w === "Js") {
      editor.setModel(jsModel);
    } else if (w === "Css") {
      editor.setModel(cssModel);
    } else if (w === "Settings") {
      console.log("settings");
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
    border-bottom: solid 1px black;
  }

  div.tab {
    border: solid 1px black;
    border-radius: 6px 6px 0 0;
    display: inline-block;
    padding: 4px 10px 4px 10px;
    box-sizing: border-box;
    position: relative;
    top: 1px;
    border-collapse: collapse;
    cursor: pointer;
    min-width: 80px;
  }

  div.tab.active {
    /* background-color: #55c; */
    /* color: white; */
    border-bottom-color: white;
    font-weight: bold;
  }

  div.tab.first {
    margin-left: 10px;
  }

  div.editor {
    flex: 1 1 auto;
  }

  div.hidden {
    display: none;
  }
</style>

<div class="main">
  <div class="header">
    <h1>Add Injection</h1>

    <p>querystring: {JSON.stringify($querystring)}</p>
    <p>query: {JSON.stringify(query)}</p>
    <p>which: {which}</p>

    {#if $store.loading}
      <p>Loading...</p>
    {:else}
      <h3>Loaded</h3>
    {/if}

    <div
      class="tab first"
      class:active={which === 'Settings'}
      on:click={() => select('Settings')}>
      Settings
    </div>
    <div
      class="tab"
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

  <div class="editor" id="container" class:hidden={which !== 'Js' && which !== 'Css'} />
  <div class="settings" class:hidden={which !== 'Settings'}>
    <div class="flex-form">
      <div class="flex-form-row">
        <div class="flex-form-label">Url:</div>
        <div class="flex-form-value">
          <input bind-value="url" />
        </div>
      </div>
      <div class="flex-form-row">
        <div class="flex-form-label">RegEx:</div>
        <div class="flex-form-value">
          <input bind-value="regex" />
        </div>
      </div>
      <div class="flex-form-row">
        <div class="flex-form-label">Match:</div>
        <div class="flex-form-value">
          <span>{match}</span>
        </div>
      </div>
    </div>
  </div>
</div>
