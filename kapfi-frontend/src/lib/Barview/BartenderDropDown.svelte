<script lang="ts">
    import type { Bartender } from '../interfaces';
    import BartenderOption from './BartenderOption.svelte';
    import { writable } from 'svelte/store'
    import { currentBartender } from '../../stores';
    export let bartenders: Array<Bartender>;
        
</script>

<div class="dropdown m-3">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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