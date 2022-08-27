<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import type { Ingredient } from '../interfaces';

    let milliliters: number = 0;
    let ingredientType: string = "";

    let allIngredients: Array<Ingredient> = [];
        onMount(async () => {
            allIngredients = await (await fetch("http://127.0.0.1:3000/ingredients")).json();
    })

    const dispatch = createEventDispatcher()

    function checkValues() {    
        if(ingredientType !== "" && milliliters > 0) {
            dispatch('newIngredient', {
                ingredientType: ingredientType,
                milliliters: milliliters
            })
            console.log("New ingredient added")
        }
    }

</script>

<select class="form-select m-3" aria-label="Default select example" bind:value={ingredientType}>
    <option selected>Zutat wählen...</option>
    {#each allIngredients as { type } }
        <option value="{type}">{type}</option>
    {/each}
</select>

<div class="row">
    <div class="col">
        <div class="input-group m-3">
            <span class="input-group-text">Milliliter</span>
            <input type="number" class="form-control" placeholder="000" aria-label="Menge" aria-describedby="Menge" bind:value={milliliters}>
        </div>            
    </div>
    <div class="col">
        <button type="button" class="btn btn-primary m-3" on:click={checkValues}>+ Zutat</button>
    </div>
</div>
