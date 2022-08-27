<script lang="ts">
import { createEventDispatcher } from "svelte";
    
export let title: string = "INPUT";
export let placeholder: string = "PLACEHOLDER";
let value: string = "";

const dispatch = createEventDispatcher();
$: dispatch('value', value)

</script>

<div class="input-group m-3">
    <span class="input-group-text">{title}</span>
    <input type="text" class="form-control" placeholder="{placeholder}" aria-label="{title}" aria-describedby="{title}" bind:value={value}>
</div>
