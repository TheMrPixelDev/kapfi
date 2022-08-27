<script lang="ts">
    import Table from './DrinksTable.svelte';
    import type { Drink } from '../interfaces';
    import { onMount } from 'svelte';
    import StyledInput from './StyledInput.svelte';
    import AddDrink from './AddDrink.svelte';

    let drinks: Array<Drink> = [];
    let filteredDrinks: Array<Drink> = [];
    let addDrink = false;
    
    onMount(async () => {
        drinks = await (await fetch("http://127.0.0.1:3000/drinks")).json();
        filteredDrinks = drinks;
    })

    function deleteDrink(event) {
        drinks = drinks.filter((drink) => {
            return drink.name != event.detail.name;
        })
        filteredDrinks = drinks;
    }

    function handleUpdatedInput(event) {
        filteredDrinks = drinks.filter((drink) => {
            return drink.name.toLowerCase().includes(event.detail.toLowerCase())
        })
    }
    
</script>

{#if addDrink}
    <AddDrink on:exit={() => {addDrink = !addDrink}}/>
{/if}

{#if !addDrink}
    <div class="container">
        <div class="row">
            <h1 class="m-3">Drinkverwaltung</h1>
        </div>
        <div class="row">
            <div class="col">
                <StyledInput title={"Suche"} placeholder={"Name"} on:value={handleUpdatedInput}></StyledInput>
            </div>
            <div class="col">
                <button type="button" class="btn btn-primary m-3" on:click={() => {addDrink = !addDrink}}>+ hinzufügen</button>
            </div>
        </div>    
        <div class="row">
            <div class="col">
                <Table drinks={filteredDrinks} on:deleteDrink={deleteDrink}></Table>
            </div>
        </div>
    </div>    
{/if}
