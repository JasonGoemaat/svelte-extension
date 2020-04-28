<script>
    import { location } from './stores/location.js';
    import Loading from '../Components/Loading.svelte'

    let name = 'Jason';
</script>

<h1 class="red-mofo">Hello {name}!</h1>

{#if $location.loading}
    <Loading message="Finding location..." inline/>
{/if}

<h2>Location:</h2>
<pre>{JSON.stringify($location, null, 2)}</pre>
<style type="text/scss">
    h1.red-mofo {
        color: red;
    }
</style>
