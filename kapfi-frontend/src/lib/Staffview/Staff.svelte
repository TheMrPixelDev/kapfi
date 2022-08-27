<script lang="ts">
    import StaffList from "./StaffList.svelte";
    import AddStaff from "./AddStaff.svelte"

    let addStaffView: boolean = false;

    let filterName: string = "";

</script>

<div class="container">

    {#if addStaffView}

        <AddStaff on:exit={() => addStaffView = !addStaffView} />
        
    {/if}

    {#if !addStaffView}

        <div class="row">
            <h1 class="m-3">Personal</h1>
        </div>
        <div class="row">
            <div class="col">
                <div class="input-group m-3">
                    <span class="input-group-text">Suche</span>
                    <input type="text" class="form-control" placeholder="Name" aria-label="Suche" aria-describedby="Suche" bind:value={filterName}>
                </div>    
            </div>
            <div class="col">
                <button type="button" class="btn btn-primary m-3" on:click={() => addStaffView = !addStaffView}>+ hinzufügen</button>
            </div>
        </div>
        <div class="row">
            <StaffList filterName={filterName}/>
        </div>  

    {/if}

</div>