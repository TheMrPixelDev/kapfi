<script lang="ts">
    import { onMount } from "svelte"
    import SalesRow from './SalesRow.svelte'
    import type { sell } from '../interfaces'

    let sales: Array<sell> = [];

    onMount(async () => {
        sales = await ( await fetch('http://127.0.0.1:3000/sells/all')).json();
    })

</script>

<table class="table m-3">
    <thead class="align-middle">
        <tr>
            <th>Drink</th>
            <th>Verkäufer</th>
            <th>Datum</th>
            <th>Uhrzeit</th>
            <th>Aktionen</th>
        </tr>
    </thead>
    <tbody>
        {#each sales as { sellerNumber, drinkName, datetime } }
            <SalesRow bartenderNumber={sellerNumber} drinkName={drinkName} datetime={datetime}/>
        {/each}
    </tbody>
</table>