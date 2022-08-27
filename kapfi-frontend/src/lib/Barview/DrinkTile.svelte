<script lang="ts">
    export let name: string;
    export let price: number;

    import { get } from 'svelte/store'
    import { currentBartender } from '../../stores';
    
    function sellDrink() {
        fetch("http://127.0.0.1:3000/addSell", {
            method: "POST",
            body: JSON.stringify({
                sellerNumber: get(currentBartender).telephone,
                drinkName: name,
                datetime: Date.now()
            })
        })
        .then( async res => { 
            if(res.ok) {
                const msg = await res.json();
                alert(msg.message)
            }
        })
    }

</script>

<div class="card m-3 w-25">
    <div class="card-body">
        <h3 class="card-title">{name}</h3>
        <p>Preis: {price} €</p>
        <button type="button" class="btn btn-primary" on:click={sellDrink}>verkaufen</button>
    </div>
</div>