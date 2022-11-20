<script lang="ts">
    import { onMount } from "svelte";
    import { View } from "../../enumerations";
    import { applicationViewStat,credentials } from "../../stores";


    let password: string;
    let email: string;

    let authorized: boolean;

    onMount(() => {
        const credentials = localStorage.getItem("credentials");
        if(credentials != null){
            handleLogin()
        }
    })

    async function handleLogin() {
        const res = await (await fetch("http://127.0.0.1/login", {
            headers: {
                'Authorization': 'Basic ' + btoa(email+":"+password)
            }
        })).json()

        if(!res.ok) {
            authorized = false;
        }else{
            authorized = true;
            applicationViewStat.set(View.BAR);
            localStorage.setItem("credentials", 'Basic ' + btoa(email+":"+password))
        }
    }

</script>

<div class="container">
    
    <h1>Login</h1>

    <div class="input-group mb-3">
        <span class="input-group-text">E-Mail</span>
        <input type="text" class="form-control" bind:value={email}>
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text">Passwort</span>
        <input type="password" class="form-control" bind:value={password}>
    </div>

    <button type="button" class="btn btn-primary" on:click={handleLogin}>Login</button>
    
    {#if authorized != undefined && !authorized}
        <img src="https://http.cat/401">
    {/if}

</div>