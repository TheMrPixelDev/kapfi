<script lang="ts">
    import { onMount } from "svelte";
    import type { Drink, Bartender } from '../interfaces';
    import Drinktile from "./DrinkTile.svelte";

    let drinks: Array<Drink> = [];

    onMount(async () => {
        drinks = await (await fetch('http://127.0.0.1:3000/drinks', {
            headers: {
                'Authorization': localStorage.getItem("credentials")
            }
        })).json()
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