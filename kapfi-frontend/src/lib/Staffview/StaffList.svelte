<script lang="ts">
    import { onMount } from "svelte";
    import type { Bartender } from '../interfaces'
    import StaffRow from './StaffRow.svelte';

    export let filterName: string = ""

    let staff: Array<Bartender> = [];
    let filteredStaff: Array<Bartender> = [];

    $: filteredStaff = staff.filter((bartender) => {
        const name = bartender.firstName.toLowerCase() + " " + bartender.lastName.toLowerCase()
        return name.includes(filterName.toLowerCase())
    })

    onMount(async () => {
        staff = await (await fetch('http://127.0.0.1:3000/bartenders')).json()
        filteredStaff = staff;
    })
    
</script>

<table class="table m-3">
    <thead>
        <tr>
            <th scope="col">Vorname</th>
            <th scope="col">Nachname</th>
            <th scope="col">Telefon</th>
            <th scope="col">Aktionen</th>
        </tr>
    </thead>
    <tbody>
        {#each filteredStaff as { firstName, lastName, telephone }}
            <StaffRow firstName={firstName} lastName={lastName} telephone={telephone} />
        {/each }
    </tbody>
</table>