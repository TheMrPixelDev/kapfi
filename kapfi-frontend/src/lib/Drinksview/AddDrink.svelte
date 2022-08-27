<script lang="ts">
    import IngredientList from './IngredientList.svelte';
    import IngredientPicker from './IngredientPicker.svelte';
    import type { contains } from '../interfaces';
    import { createEventDispatcher } from 'svelte';
    
    let name: string = "";
    let price: number = 0.0;
    
    let newDrinkIngredients: Array<contains> = [];
    $: console.log(newDrinkIngredients);

    const dispatch = createEventDispatcher();
    async function checkValues() {
        if(name.length != 0 && price != 0 && newDrinkIngredients.length != 0) {

            newDrinkIngredients = newDrinkIngredients.map((ingredient) => {
                return { drinkName: name, ingredientType: ingredient.ingredientType, milliliters: ingredient.milliliters };
            })

            fetch('http://127.0.0.1:3000/addDrink', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    price: price,
                })
            })
            .then(res => {
                if(res.ok) {
                    fetch('http://127.0.0.1:3000/addIngredientsToDrink', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newDrinkIngredients)
                    })
                    .then(res => {
                        if(res.ok) {
                            dispatch('exit');
                            alert("Drink wurde erfolgreich hinzugefügt.")
                        }else{
                            alert('Fehler aufgetreten. Wahrscheinlich existiert eine Zutat schon.')
                        }
                    })
                    .catch(err => { alert(err)})
                }else{
                    alert('Fehler aufgetreten. Wahrscheinlich existiert der Drink schon.')
                }
            })
            .catch(err => { alert(err); })
        }
    }

    function removeIngredient(event) {
        newDrinkIngredients = newDrinkIngredients.filter((ingredient) => {
            return ingredient.ingredientType != event.detail.name;
        })
    }

    function addNewIngredient(event){
        let savedArray = newDrinkIngredients;
        savedArray.push(
            {
                drinkName: name,
                ingredientType: event.detail.ingredientType,
                milliliters: event.detail.milliliters
            }
        )
        newDrinkIngredients = savedArray;
    }

</script>

<div class="container">
    <div class="row">
        <h1 class="m-3">Drink hinzufügen</h1>
    </div>

    <!-- Input for drink name -->
    <div class="input-group m-3">
        <span class="input-group-text">Name</span>
        <input type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="Name" bind:value={name}>
    </div>

    <!-- Input for drink price -->
    <div class="input-group m-3">
        <span class="input-group-text">€</span>
        <input type="number" class="form-control" placeholder="0.0" aria-label="Preis" aria-describedby="Preis" bind:value={price}>
    </div>

    <h3 class="m-3">Aktuelle Zutaten</h3>
    <IngredientList ingredients={newDrinkIngredients} on:removeIngredient={removeIngredient} />
    <IngredientPicker on:newIngredient={addNewIngredient}/>

</div>
<div class="container">
    <div class="row">
        <div class="col">
            <button class="btn btn-primary m-3" on:click={checkValues}>speichern</button>
        </div>
        <div class="col">
            <button class="btn btn-danger m-3" on:click={() => { dispatch('exit') }}>abbrechen</button>
        </div>
    </div>    
</div>