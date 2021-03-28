#!/usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

main();

async function main() {
  const uri = "https://www.islandhealth.ca/learn-about-health/covid-19/covid-19-vaccine";
  const h2Text = "Currently eligible";
  const { data: html } = await axios.get(uri);
  const $ = cheerio.load(html);
  const els = $("h2 + h3")
    .filter((i, h3) => $(h3.previousSibling.prev).text() === h2Text)
    .get();

  if (els.length === 0) {
    console.error("h3 element not found.");
    process.exitCode = 1;
    return;
  }
  const current = $(els[0]);
  console.log(`${h2Text}: ${current?.text()}`);
}
