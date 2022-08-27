<script lang="ts">
    export let name: string;
    export let price: number;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function removeDrink() {
        console.log("Trying to delete drink " + name)
        fetch(`http://127.0.0.1:3000/removeDrink/${name}`, { method: "DELETE" }).then(res => {
            if(!res.ok) {
                alert("Etwas ist beim Löschen schief gelaufen.")
            }else{
                dispatch('deleteDrink', {
                    name: name
                })
            }
        })
    }

</script>

<tr class="align-middle">
    <th scope="row">{name}</th>
    <td>{price}</td>
    <td>
        <button type="button" class="btn btn-danger" on:click={removeDrink}>löschen</button>
        <button type="button" class="btn btn-success">bearbeiten</button>
    </td>
</tr>