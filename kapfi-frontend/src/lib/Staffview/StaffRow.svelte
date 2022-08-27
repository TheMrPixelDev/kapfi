<script lang="ts">
    export let firstName: string;
    export let lastName: string;
    export let telephone: string;

    function removeBartender() {

        const confirmed = confirm("Bist du sicher, dass du " + firstName + " löschen möchtest? (Es werden auch dessen Verkäufe gelöscht!)")

        if(confirmed) {
            /*fetch(`http://127.0.0.1:3000/removeSells/${telephone}`, { method: "DELETE" })
            .then(res => {
                if(!res.ok){
                    alert("Etwas ist schief gelaufen beim Löschen.")
                }else{*/
                    fetch(`http://127.0.0.1:3000/removeBartender/${telephone}`, { method: "DELETE" })
                    .then(res => {
                        if(!res.ok){
                            alert("Etwas ist schief gelaufen beim Löschen.")
                        }
                    })
                /*}
            })*/
        }
        
    }

</script>

<tr class="align-middle">
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{telephone}</td>
    <td>
        <button type="button" class="btn btn-danger" on:click={removeBartender}>löschen</button>
    </td>
</tr>