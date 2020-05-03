<script>
    import Add from './routes/Add.svelte'
    import Edit from './routes/Edit.svelte'
    import Home from './routes/Home.svelte'
    import NotFound from './routes/NotFound.svelte'
    import Router from "svelte-spa-router"

    const routes = {
        '/': Home,
        '/add': Add,
        '/edit/:name': Edit,
        '*': NotFound
    }
</script>

<Router {routes}/>
