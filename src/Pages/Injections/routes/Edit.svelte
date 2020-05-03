<script>
import {querystring} from 'svelte-spa-router';

export let params = {} // for router

</script>

<h1>Edit</h1>

<p>Params: {JSON.stringify(params)}</p>
<p>Query String: {$querystring}</p>
