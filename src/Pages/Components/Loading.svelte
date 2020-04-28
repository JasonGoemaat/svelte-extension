<script>
    import Spinner from './Spinner.svelte'

    export let message = "Loading..."
    export let inline = false;
</script>

<div class="outer" class:inline>
    <div class="loading">
        {#if message}
            <span>{ message }</span>
        {/if}
        <Spinner/>
    </div>
</div>

<style>
    div.outer.inline {
        display: inline-block
    }
    div.loading {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.loading > span {
        margin-right: 20px;
    }
</style>
