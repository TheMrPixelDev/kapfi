<script lang="ts">
    import { onMount } from "svelte";
    import type { Drink, Bartender } from '../interfaces';
    import Drinktile from "./DrinkTile.svelte";
    import BartenderDropDown from './BartenderDropDown.svelte';
    import { currentBartender } from '../../stores';

    let drinks: Array<Drink> = [];

    let bartenders: Array<Bartender> = [];

    onMount(async () => {
        drinks = await (await fetch('http://127.0.0.1:3000/drinks')).json()
        bartenders = await (await fetch('http://127.0.0.1:3000/bartenders')).json()
    });


</script>

<div class="container">
    <div class="row">
        <h1 class="m-3">Tresen</h1>
    </div>
</div>
<div class="d-flex container flex-wrap">
    {#each drinks as { name, price }}
        <Drinktile name={name} price={price}/>
    {/each}
</div>
<div class="container">
    <p class="m-3">Aktuell: {$currentBartender.firstName} {$currentBartender.lastName}</p>
    <BartenderDropDown bartenders={bartenders}/>
</div>