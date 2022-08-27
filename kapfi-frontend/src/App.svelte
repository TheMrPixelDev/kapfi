<script lang="ts">
    import Navbar from './Navbar.svelte';
    import routes from './routes';
    import Router from 'svelte-spa-router';
</script>

<main>

    <Navbar/>
    <Router {routes}/>
    
</main>

<style>
</style>