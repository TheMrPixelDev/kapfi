<script lang="ts">
    import type { contains } from '../interfaces'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
    export let ingredients: Array<contains>;
</script>

    {#if ingredients.length == 0}
        <div class="card m-3">
            <p class="m-3">
                Noch keine Zutaten vorhanden.
            </p>
        </div>
    {/if}

    {#if ingredients.length != 0}
        <table class="table m-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Menge (ml)</th>
                    <th>Aktionen</th>
                </tr>
            </thead>
            <tbody>
                {#each ingredients as { ingredientType, milliliters } }
                    <tr class="align-middle">
                        <td>{ingredientType}</td>
                        <td>{milliliters}</td>
                        <td>
                            <button type="button" class="btn btn-danger" on:click={ () => { dispatch('removeIngredient', { name: ingredientType }) } }>entfernen</button>
                        </td>
                    </tr>        
                {/each}
            </tbody>
        </table>
    {/if}