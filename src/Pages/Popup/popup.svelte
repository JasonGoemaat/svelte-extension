<script>
    import { backgroundPage } from '../../stores/background-page';
    import { currentTab } from '../../stores/current-tab';
    import store from './store';

    let injections = null;
    $: window.store = $store; // this works
    $: injections = store ? store.injections : null; // this works
    $: window.injections = $store ? $store.injections : null; // this does not
    store.subscribe(s => { // error: not a function
        if (s) {
            console.log('store from subscription:', s);
            injections = s.injections;
        }
    });
    window.popup = this;
</script>

<h2>Injections</h2>

{#if injections}
    {#if injections.length > 0}
        <ul>
            {#each $injections as injection (injection.name)}
	            <li>{ injection.name }</li>>
            {/each}
        </ul>
    {:else}
        <p>No injections</p>
    {/if}
{:else}
    Loading...
{/if}

<p>
Injections:
</p>
<pre>{JSON.stringify(injections)}</pre>