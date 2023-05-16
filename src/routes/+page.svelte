<script>
  // https://gist.github.com/mbostock/3019563https://gist.github.com/mbostock/3019563

  import '../styles.css'
  import { scaleLinear, scaleBand } from 'd3-scale'
  import { max } from 'd3'
  import { timeParse, timeFormat } from 'd3-time-format'
  import { onMount } from 'svelte'

  let parseDate = timeParse('%Y-%m-%d %H:%M:%S')
  let formatDate = timeFormat('%-d %b %-I:%M %p')

  const colors = [
    '#19A900',
    '#FFEDA0',
    '#FED976',
    '#FEB24D',
    '#FD8D3D',
    '#FC4E2A',
    '#E31A1D',
  ]

  let stage = 6
  let date_since = ''
  let latestDate = ''
  let promise = [];
  $: xDomain = [];

  
  let padding = {
    top: 20,
    right: 10,
    bottom: 10,
    left: 10,
  }

  let width = 300
  let height = 150

  onMount(async () => {
    fetch('https://mediaverse.mediahack.co.za/api/loadshedding/stats.php')
      .then((res) => res.json())
      .then((data) => {
        data.latest.forEach((d) => {
          d.fullDate = parseDate(d.start_time)
        })

        promise = data.years
        stage = data.latest[0].stage
        latestDate = formatDate(data.latest[0].fullDate)
        xDomain = promise.map((d) => {
            return d.year
        });
      })
  })
  // })
  $: innerHeight = height - (padding.top + padding.bottom);
  $: innerWidth = width - (padding.left + padding.right)

  $: yScale = scaleLinear().domain([0, max(promise, (d) => {
    return +d.hours
  })])
  .range([padding.bottom, innerHeight])
  // scaleBand

  $: xScale = scaleBand().domain(promise.map(d => {
    return d.year
  }))
  .range([padding.left, innerWidth])
  .padding(0.2)
//   $: test = xScale.bandwidth();
  $: console.log("bandwidth test: ", xScale.bandwidth())
  $: console.log("step test: ", xScale.step());

  $: yTicks = yScale.ticks(16);

  $: colorScale = scaleLinear().domain([0, 4000]).range(['#D3BE00', '#E31A1D'])

  
  $: barWidth = innerWidth / 10

  // $: data = points.length == 0 ? true : false;

  const formateDate = (date) => {
    let date_form = date.substr(2)
    date_form = '20' + date_form
    return date_form
  }

  $: console.log(height)

</script>


<div class="container" bind:clientWidth={width} style="height: {width}px">
  {#if promise.length > 0}
  <div class="head-wrap" style="background: {colors[+stage]} !important;">
    {#if +stage === 6}
      <div class="heading" style="color: #fff;">
        <strong>LOADSHEDDING</strong>
      </div>
    {:else}
      <div class="heading"><strong>LOADSHEDDING</strong></div>
    {/if}
  </div>

  <div class="stage-block">
    <div class="stage-label">Stage&nbsp;</div>
    <div class="stage-number" style="color: {colors[+stage]} !important;">
      {stage}
    </div>
  </div>

  <div class="date">
    Last update: <span class="highlight">{latestDate}</span>
  </div>

  <div class="chart-wrap" bind:clientHeight={height}>
    <svg class="chart" {width} {height}>
      <!-- Define the gradient -->
      <!-- <linearGradient id="myGradient" x1="0" y1="0" x2="0" y2="1"> -->
      <!-- Start with a transparent stop at the beginning -->
      <!-- <stop offset="0" stop-opacity="1" stop-color="#eaaf00" /> -->
      <!-- Add a solid stop at 75% of the width -->
      <!-- <stop offset="0.7" stop-color="#eaaf00" /> -->
      <!-- End with a transparent stop at the end -->
      <!-- <stop offset="1" stop-opacity="1" stop-color="#eaaf00" /> -->
      <!-- </linearGradient> -->

      {#each promise as point}
        <rect
          y={height - padding.bottom - yScale(+point.hours)}
          x={xScale(point.year)}
          width={xScale.bandwidth()}
          height={yScale(+point.hours)}
          fill="#eaaf00"
        />
        <!-- fill="url(#myGradient)" -->
        <!-- fill:{colorScale(+point.hours)} -->
        <text
          text-anchor="middle"
          dominant-baseline="text-bottom"
          style="fill: #ffffff; font-size: 10px;"
          x={xScale(point.year) + xScale.bandwidth()/2}
          y={height - yScale(+point.hours) - 15 }
          >{Math.ceil(+point.hours).toLocaleString()}</text
        >
        <text class="label" x="20" y={height + padding.bottom + 5}
          >Hours of active loadshedding</text>

        <text
          text-anchor="middle"
          dominant-baseline="text-bottom"
          class="axis axis-x"
          x={xScale(point.year) + xScale.bandwidth()/2}
          y={height}>{formateDate(point.year)}</text
        >
      {/each}
    </svg>
  </div>

  <div class="baselink">
    <div class="source">Data: Eskom se Push & The Outlier</div>
    <div class="outlier-logo">
      <span class="outlier-initial">The</span>
      <span class="outlier-secondary">Outlier</span>
    </div>
  </div>

  {/if}
</div>

<style>
  .container {
    position: relative;
    border-radius: 2px;
    background-color: #fff;
    min-width: 250px;
    max-width: 600px;
    min-height: 250px;
    max-height: 600px;
    padding: 0px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    margin: auto;
    background-color: #242424;
    color: white;
    text-align: center;
  }

  /* .spacer {
        height: 2px;
    } */

  .heading {
    font-size: 1rem;
    font-weight: 700 !important;
    color: #000;
  }

  .link {
    color: lightgray;
    text-decoration: none;
  }
  .baselink {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    font-size: 0.7rem;
    color: gray;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  .sub-heading {
    font-size: 1rem;
  }

  .stage {
    font-size: 36px;
  }

  .head-wrap {
    padding: 10px;
    margin-bottom: 5px;
  }
  .chart-wrap {
    margin-bottom: 10px;
    margin-top: 10px;
    /* padding: 10px; */
    /* padding-bottom: 20px; */
    /* transform: translate(4px, 0px); */
    height: calc(100% - 150px);
  }
  .stage-block * {
    display: inline-block;
  }
  .stage-label {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1rem;
    transform: translate(0px, -5px);
  }
  .stage-number {
    font-weight: 900;
    font-size: 2rem;
  }
  .date {
    font-size: 0.8rem;
    margin-top: 2px;
    color: rgb(186, 186, 186);
  }
  .label {
    font-size: 0.7rem;
    fill: #eaaf00;
    font-weight: 100;
    letter-spacing: 0.03rem;
    /* text-anchor: end; */
  }
  .highlight {
    color: #eaaf00;
    font-weight: 700;
  }

  rect {
    background-image: linear-gradient(red, yellow);
  }
  svg {
    overflow: visible;
  }
  .axis {
    font-size: 0.6rem;
    fill: rgb(185, 185, 185);
    font-weight: 400;
    /* letter-spacing: 0.03rem; */
    /* text-anchor: end; */
  }
  .outlier-logo {
    text-transform: uppercase;
    font-weight: 600;
    background: #da191a;
    color: #fff;
    padding: 1px 5px 2px 5px;
    /* width: 100px; */
  }
  .outlier-initial {
    /* color: #fff; */
  }
  .outlier-secondary {
    /* color: #da191a; */
  }
  .source {
    color: lightgray;
    font-size: 0.6rem;
    text-align: left;
    padding-left: 10px;
  }
</style>
