<script>
  import '../styles.css'
  import { scaleLinear } from 'd3-scale'
  import { onMount } from 'svelte'

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
  let promise = []

  let yTicks = []
  let padding = {
    top: 20,
    right: 20,
    bottom: 12,
    left: 20,
  }

  let width = 300
  let height = 150

  for (let i = 200; i < 3200; i += 200) {
    yTicks.push(i)
  }

  // onMount( async () => {

  onMount(async () => {
    fetch(
      'https://api.datadesk.co.za/json.php?table=dd_loadsheddingmhc_6163407'
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data[1])
        stage = data[1].stage
        date_since = string_date(data[1].start_time.split(' ')[0])
        console.log('date since is: ', date_since)
        console.log('stage is: ', stage)
      })

    fetch('https://mediaverse.mediahack.co.za/api/loadshedding/stats.php')
      .then((res) => res.json())
      .then((data) => {
        promise = data.years
        // console.log('promise is: ', promise)
      })
  })
  // })
  $: innerHeight = height - (padding.top + padding.bottom)

  $: yScale = scaleLinear().domain([0, 4000]).range([40, innerHeight])

  $: colorScale = scaleLinear().domain([0, 4000]).range(['#D3BE00', '#E31A1D'])

  $: innerWidth = width - (padding.left + padding.right)
  $: barWidth = innerWidth / 10

  // $: data = points.length == 0 ? true : false;

  const formateDate = (date) => {
    let date_form = date.substr(2)
    date_form = '20' + date_form
    return date_form
  }

  const string_date = (date) => {
    let date_obj = new Date(date)

    let month = date_obj.toLocaleString([], { month: 'long' })
    let res =
      date_obj.getDate().toString() +
      ' ' +
      month +
      ' ' +
      date_obj.getFullYear().toString()
    return res
  }
</script>

<div class="container">
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

  <!-- <div class="sub-heading">Stage</div>
  <div class="stage" style="color: {colors[+stage]} !important;">
    <strong>{stage}</strong>
  </div> -->

  <div class="date">Since {date_since}</div>

  <div class="chart-wrap">
    <svg class="chart" {width} {height}>
      {#each promise as point, i}
        <rect
          y={height - yScale(+point.hours) - padding.bottom}
          x={i * (innerWidth / promise.length) + padding.left}
          width={innerWidth / promise.length - 8}
          height={yScale(+point.hours)}
          style="fill: gray;"
        />
        <!-- fill:{colorScale(+point.hours)} -->
        <text
          text-anchor="middle"
          dominant-baseline="text-bottom"
          style="fill: #ffffff; font-size: 10px;"
          x={i * (innerWidth / promise.length) +
            innerWidth / promise.length / 2 +
            15}
          y={height - yScale(+point.hours) - padding.bottom - 10}
          >{Math.ceil(+point.hours).toLocaleString()}</text
        >
        <text class="label" x="20" y={height / 3}
          >Hours of active loadshedding</text
        >
        <text
          text-anchor="middle"
          dominant-baseline="text-bottom"
          style="fill: lightgray; font-size: 10px;"
          x={i * (innerWidth / promise.length) +
            innerWidth / promise.length / 2 +
            15}
          y={height}>{formateDate(point.year)}</text
        >
      {/each}
    </svg>
  </div>

  <div class="baselink">
    <a class="link" href="https://loadshed.theoutlier.co.za" target="_blank"
      >https://loadshed.theoutlier.co.za</a
    >
  </div>
</div>

<style>
  .container {
    position: relative;
    border-radius: 2px;
    background-color: #fff;
    width: 300px;
    height: 300px;
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
    bottom: 10px;
    width: 100%;
    font-size: 0.7rem;
    color: gray;
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
    transform: translate(4px, 0px);
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
    fill: gray;
    /* text-anchor: end; */
  }
</style>
