<script lang="ts">
    import { View } from "./enumerations";
    
    let viewState: View = View.BAR;
    

</script>

<div class="container">
        <ul class="nav nav-pills m-3">
            <li class="nav-item { viewState == View.BAR ? 'active': '' }">
                <a href="#/" class="nav-link" on:click={() => viewState = View.BAR}>Bar</a>
            </li>
            <li class="nav-item { viewState == View.DRINKS ? 'active': '' }">
                <a href="#/drinks" class="nav-link" on:click={() => viewState = View.DRINKS}>Drinks</a>
            </li>
            <li class="nav-item { viewState == View.STOCK ? 'active': '' }">
                <a href="#/storage" class="nav-link" on:click={() => viewState = View.STOCK}>Lager</a>
            </li>
            <li class="nav-item { viewState == View.SALES ? 'active': '' }">
                <a href="#/sales" class="nav-link" on:click={() => viewState = View.SALES}>Verkäufe</a>
            </li>
            <li class="nav-item { viewState == View.STAFF ? 'active': '' }">
                <a href="#/staff" class="nav-link" on:click={() => viewState = View.STAFF}>Personal</a>
            </li>
        </ul>
</div>