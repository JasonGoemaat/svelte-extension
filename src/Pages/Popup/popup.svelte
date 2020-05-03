<script>
    import { actions, dispatch, store } from './store';

    Object.assign(window, { actions, dispatch, store });
    dispatch(actions.init());

    const getAddInjectionLink = () => {
        return chrome.extension.getURL(`html/injections.html#/add`);
    }
</script>

<h2>Injections - <a target="_blank" href={getAddInjectionLink()}>add</a></h2>

{#if $store.loading}
    Loading...
{:else}
    {#if $store.injections && $store.injections.length > 0}
        <ul class="injections">
            {#each $store.injections as injection (injection.name)}
	            <li>
                    <a target="_blank" href={chrome.extension.getURL(`/injection.html#/injections/edit/${injection.name}`)}>{ injection.name }</a>
                    <button>remove</button>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No injections</p>
    {/if}
{/if}

<p>Injections:</p>
<pre>{JSON.stringify($store.injections)}</pre>

<style>
h2 {
    white-space: nowrap;
}

button {
    margin-left: 1em;
}
    /* ul.injections {
        font-size: 2em;
    } */

    /* ul.injections > li {

    } */
</style>