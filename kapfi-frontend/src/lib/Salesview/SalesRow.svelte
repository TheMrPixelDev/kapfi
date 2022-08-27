<script lang="ts">
    export let drinkName: string;
    export let bartenderNumber: string;
    export let datetime: number;

    let convertedDateTime: Date = new Date(datetime*1);

</script>

<tr class="align-middle">
    <td>{drinkName}</td>
    <td>{bartenderNumber}</td>
    <td>{convertedDateTime.toLocaleDateString()}</td>
    <td>{convertedDateTime.toLocaleTimeString()}</td>
    <td></td>
</tr>