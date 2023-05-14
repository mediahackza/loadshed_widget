import { c as create_ssr_component, e as escape, d as add_attribute, f as each } from "../../chunks/index2.js";
import { scaleLinear } from "d3-scale";
const styles = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-1157ts2.svelte-1157ts2{position:relative;border-radius:2px;background-color:#fff;width:300px;height:300px;padding:0px;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',\n      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',\n      sans-serif;margin:auto;background-color:#242424;color:white;text-align:center}.heading.svelte-1157ts2.svelte-1157ts2{font-size:1rem;font-weight:700 !important;color:#000}.link.svelte-1157ts2.svelte-1157ts2{color:lightgray;text-decoration:none}.baselink.svelte-1157ts2.svelte-1157ts2{position:absolute;bottom:10px;width:100%;font-size:0.7rem;color:gray}.head-wrap.svelte-1157ts2.svelte-1157ts2{padding:10px;margin-bottom:5px}.chart-wrap.svelte-1157ts2.svelte-1157ts2{margin-bottom:10px;margin-top:10px;transform:translate(4px, 0px)}.stage-block.svelte-1157ts2 .svelte-1157ts2{display:inline-block}.stage-label.svelte-1157ts2.svelte-1157ts2{font-weight:700;text-transform:uppercase;font-size:1rem;transform:translate(0px, -5px)}.stage-number.svelte-1157ts2.svelte-1157ts2{font-weight:900;font-size:2rem}.date.svelte-1157ts2.svelte-1157ts2{font-size:0.8rem;margin-top:2px;color:rgb(186, 186, 186)}.label.svelte-1157ts2.svelte-1157ts2{font-size:0.7rem;fill:gray}",
  map: null
};
let width = 300;
let height = 150;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerHeight;
  let yScale;
  let innerWidth;
  const colors = ["#19A900", "#FFEDA0", "#FED976", "#FEB24D", "#FD8D3D", "#FC4E2A", "#E31A1D"];
  let stage = 6;
  let date_since = "";
  let promise = [];
  let padding = { top: 20, right: 20, bottom: 12, left: 20 };
  const formateDate = (date) => {
    let date_form = date.substr(2);
    date_form = "20" + date_form;
    return date_form;
  };
  $$result.css.add(css);
  innerHeight = height - (padding.top + padding.bottom);
  yScale = scaleLinear().domain([0, 4e3]).range([40, innerHeight]);
  scaleLinear().domain([0, 4e3]).range(["#D3BE00", "#E31A1D"]);
  innerWidth = width - (padding.left + padding.right);
  return `<div class="container svelte-1157ts2"><div class="head-wrap svelte-1157ts2" style="${"background: " + escape(colors[+stage], true) + " !important;"}">${`<div class="heading svelte-1157ts2" style="color: #fff;"><strong>LOADSHEDDING</strong></div>`}</div>

  <div class="stage-block svelte-1157ts2"><div class="stage-label svelte-1157ts2">Stage </div>
    <div class="stage-number svelte-1157ts2" style="${"color: " + escape(colors[+stage], true) + " !important;"}">${escape(stage)}</div></div>

  

  <div class="date svelte-1157ts2">Since ${escape(date_since)}</div>

  <div class="chart-wrap svelte-1157ts2"><svg class="chart"${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}>${each(promise, (point, i) => {
    return `<rect${add_attribute("y", height - yScale(+point.hours) - padding.bottom, 0)}${add_attribute("x", i * (innerWidth / promise.length) + padding.left, 0)}${add_attribute("width", innerWidth / promise.length - 8, 0)}${add_attribute("height", yScale(+point.hours), 0)} style="fill: gray;"></rect>
        
        <text text-anchor="middle" dominant-baseline="text-bottom" style="fill: #ffffff; font-size: 10px;"${add_attribute("x", i * (innerWidth / promise.length) + innerWidth / promise.length / 2 + 15, 0)}${add_attribute("y", height - yScale(+point.hours) - padding.bottom - 10, 0)}>${escape(Math.ceil(+point.hours).toLocaleString())}</text>
        <text class="label svelte-1157ts2" x="20"${add_attribute("y", height / 3, 0)}>Hours of active loadshedding</text>
        <text text-anchor="middle" dominant-baseline="text-bottom" style="fill: lightgray; font-size: 10px;"${add_attribute("x", i * (innerWidth / promise.length) + innerWidth / promise.length / 2 + 15, 0)}${add_attribute("y", height, 0)}>${escape(formateDate(point.year))}</text>`;
  })}</svg></div>

  <div class="baselink svelte-1157ts2"><a class="link svelte-1157ts2" href="https://loadshed.theoutlier.co.za" target="_blank">https://loadshed.theoutlier.co.za</a></div>
</div>`;
});
export {
  Page as default
};
