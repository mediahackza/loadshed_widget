<script>

    import { onMount } from 'svelte';

    let source = ``;

    onMount(() => { 
        source = window.location.href
        source = source.replace('/testing', "");
        console.log(source)
    });

    let size = 300;

    const copyIframe = () => {
        navigator.clipboard.writeText(code);  
        window.alert("iframe copied to clipboard")  
    }

    $: code = "<iframe src='"+ source +"' frameborder='0' height='" + size + "px' width='" + size + "px' />";

</script>

<div class="widget">
    <input type="number" bind:value={size} min="200" max="1000" /><br/>
    <input type=range bind:value={size} min="200" max="1000" /><br/>
    <div class="details">
        height: {size}px<br/>
        width: {size}px<br/>
    </div>



    <iframe src="{source}" frameborder="0" height="{size}px" width="{size}px"/>


    <br/>
    <textarea style="height: 50px; width: 280px"on:click={copyIframe} >{code}</textarea>
</div>





<style>
    .widget {
        margin: auto;
        width: fit-content
    }

    .widget input, div, textarea{
        margin: auto;
        display: block;
    }

    .details {
        text-align: center;
    }

    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    }

</style>