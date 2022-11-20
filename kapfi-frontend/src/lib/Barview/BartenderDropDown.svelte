<script lang="ts">
    import { onMount } from 'svelte';
    import type { Bartender } from '../interfaces';
    import BartenderOption from './BartenderOption.svelte';
    
    let bartenders: Array<Bartender> = [];

    onMount(async () => {
        bartenders = await (await fetch('http://127.0.0.1:3000/bartenders')).json()
    })

</script>

<div class="dropdown m-3">
    <a class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Barleute
    </a>
  
    <ul class="dropdown-menu">
            {#each bartenders as bartender }
                <li>
                    <BartenderOption bartender={bartender}/>
                </li>
            {/each}
      </ul>
</div>