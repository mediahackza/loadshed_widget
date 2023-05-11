<script>
    import { scaleLinear } from 'd3-scale';
    import { onMount } from 'svelte';


    const colors = ["#19A900","#FFEDA0","#FED976","#FEB24D","#FD8D3D","#FC4E2A","#E31A1D"]

    let stage = 6;
    let date_since = ""
    let promise = [];

    let yTicks = [];
    let padding = {
        top: 20,
        right: 10,
        bottom: 20,
        left: 10
    };

    let width = 300;
    let height = 150;


    for (let i = 200; i < 3200; i += 200) {
        yTicks.push(i); 
    }


    // onMount( async () => {
        

        onMount(async () => {

            fetch("https://api.datadesk.co.za/json.php?table=dd_loadsheddingmhc_6163407")
            .then(res => res.json())
            .then(data => {
                stage = data[1].stage;
                date_since = data[1].date_since;
                console.log("stage is: ", stage)
            });

            fetch("https://mediaverse.mediahack.co.za/api/loadshedding/stats.php")
            .then(res => res.json())
            .then(data => {
                promise = data.years;
                console.log("promise is: ", promise)
            });

        });
    // })
    
    
    $: yScale = scaleLinear()
    .domain([0,4000])
    .range([0, height])

    $: colorScale = scaleLinear()
    .domain([0, 4000])
    .range(["#D3BE00", "#E31A1D"])

    $: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / 10;

    // $: data = points.length == 0 ? true : false;


</script>

<div class="container">
<div class="heading"><strong>LOADSHED</strong></div>
<div class='sub-heading'>Current stage</div>

<div class="stage" style="color: {colors[+stage]} !important;"><strong>{stage}</strong></div>

<div class="date">Since 2023-05-07</div>

<div class="spacer"></div>

<svg class="chart" width="{width}" height="{height}">

    {#each promise as point, i}
        <rect y="{height-yScale(+point.hours)}" x="{(i*(innerWidth/promise.length)) + padding.left}" width="{(innerWidth/promise.length) -10}" height="{yScale(+point.hours)}" style="fill:{colorScale(+point.hours)}"/>
    {/each}


</svg>

</div>

<style>
    .container {
        border-radius: 2px;
        background-color: #fff;
        width: 300px;
        height: 300px;
        padding: 10px;
        font-family: 'Inter', sans-serif;
        margin: auto;
        background-color: #242424;
        color: white;
        text-align: center;
    }

    .spacer {
        height: 15px;
    }

    .heading {
        font-size: 36px;
        
    }

    .sub-heading {
        font-size: 20px;
    }

    .stage {
        font-size: 36px;
    }

    .chart {
        /* border: 1px solid blue; */
    }

</style>