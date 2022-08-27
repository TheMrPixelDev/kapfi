<script lang="ts">
import DrinkRow from './DrinkRow.svelte';
import type { Drink } from '../interfaces'

export let drinks: Array<Drink> = [];

</script>

<table class="table m-3">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Preis</th>
            <th scope="col">Aktionen</th>
        </tr>
    </thead>
    <tbody>
        { #each drinks as drink }
            <DrinkRow name={drink.name} price={drink.price} on:deleteDrink />
        {/each }
    </tbody>
</table>
