<script lang="ts">
    import Navbar from './Navbar.svelte';
    import routes from './routes';
    import Router from 'svelte-spa-router';
    import { applicationViewStat } from './stores';
    import { View } from './enumerations';
    import Login from './lib/Loginview/Login.svelte';

    applicationViewStat.set(View.LOGIN)
    
</script>

<main>

    {#if $applicationViewStat != View.LOGIN}
        <Navbar/>    
        <Router {routes}/>
    {:else}
        <Login/>
    {/if}
    
</main>

<style>
</style>