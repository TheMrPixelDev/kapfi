<script lang="ts">
    import { currentBartender } from "../../stores";
    import type { Bartender } from "../interfaces";

    export let bartender: Bartender;

</script>

<option class="dropdown-item" on:click={() => currentBartender.set(bartender)}>{bartender.firstName} {bartender.lastName}</option>