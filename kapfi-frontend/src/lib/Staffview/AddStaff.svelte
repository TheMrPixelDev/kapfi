<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let firstName: string;
    let lastName: string;
    let telephone: string;

    const dispatch = createEventDispatcher();

    function checkValues() {
        if(firstName.length > 0 && lastName.length > 0 && telephone.length > 0) {
            fetch('http://127.0.0.1:3000/addBartender', {
                method: "POST",
                body: JSON.stringify({ firstName, lastName, telephone })
            }).then(res => {
                if(!res.ok){
                    alert("Etwas ist schief gelaufen.")
                }else{
                    dispatch('exit');
                }
            }).catch(err => console.log(err));
        }
    }

</script>

    <div class="row">
        <h1 class="m-3">Personal hinzufügen</h1>
    </div>

    <div class="row">
        <div class="col">
            <!-- Input for firstName -->
            <div class="input-group m-3">
                <span class="input-group-text" id="basic-addon1">Vorname (*)</span>
                <input type="text" class="form-control" placeholder="Max" aria-label="Vorname" aria-describedby="Vorname" bind:value={firstName}>
            </div>
                    
        </div>
        <div class="col">
            
            <!-- Input for lastName -->
            <div class="input-group m-3">
                <span class="input-group-text">Nachname (*)</span>
                <input type="text" class="form-control" placeholder="Mustermann" aria-label="Nachname" aria-describedby="Nachname" bind:value={lastName}>
            </div>

        </div>
    </div>

    <div class="row">

        <!-- Input for phone -->
        <div class="input-group m-3">
            <span class="input-group-text">Telefonnummer (*)</span>
            <input type="text" class="form-control" placeholder="012345678" aria-label="Nachname" aria-describedby="Nachname" bind:value={telephone}>
        </div>

    </div>

    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-primary m-3" on:click={checkValues}>speichern</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-danger m-3" on:click={() => dispatch('exit')}>abbrechen</button>
        </div>
    </div>