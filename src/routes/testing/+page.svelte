<script>

    import { onMount } from 'svelte';

    let source = ``;

    onMount(() => { 
        source = window.location.href
        source = source.replace('/testing', "");
        console.log(source)
    });

    let size = 300;

</script>

<input type="number" bind:value={size} min="200" max="1000" /><br/>
<input type=range bind:value={size} min="200" max="1000" /><br/>
<div>
    height: {size}px<br/>
    width: {size}px<br/>
</div>


<iframe src="{source}" frameborder="0" height="{size}px" width="{size}px"/>