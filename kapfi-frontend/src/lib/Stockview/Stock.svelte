<script lang="ts">
import { onMount } from 'svelte';
import { prevent_default } from 'svelte/internal';

    import type { Ingredient } from '../interfaces'

    let ingredient: string = "";

    let ingredients: Array<Ingredient> = [];

    onMount(async () => {
        ingredients = await (await fetch("http://127.0.0.1:3000/ingredients")).json()
    })

    async function addIngredient() {
        if(ingredient.length != 0){
            fetch(`http://127.0.0.1:3000/addIngredient/${ingredient}`, { method: "POST" })
            .then(res => {
                if(res.ok){
                    ingredients.push({ type: ingredient })
                    ingredients = ingredients;
                }
            })
        }
    }

</script>

<div class="container">
    <h1>Zutaten</h1>
    <table class="table m-3">
        <thead>
            <tr>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {#each ingredients as { type } }
                <tr>{type}</tr>
            {/each}
        </tbody>
    </table>
    <form on:submit|preventDefault={addIngredient} class="m-3">
        <input type="text" bind:value={ingredient}>
        <input type="submit" class="btn btn-primary" value="+ Hinzufügen">
    </form>
</div>