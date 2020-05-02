<script>
    import { location } from './stores/location.js'
    import { weather } from './stores/weather.js'

    import Card from '../Components/Card.svelte'
    import Loading from '../Components/Loading.svelte'

    let name = 'Jason';

    const temp = celsius => `${(celsius * 9 / 5 + 32).toFixed(0)}`;
</script>

<h1 class="red-mofo">Hello {name}!</h1>

<style type="text/scss">
    h1.red-mofo {
        color: red;
    }
</style>
