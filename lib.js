const axios = require("axios");
const cheerio = require("cheerio");

async function getCurrent() {
  const uri = "https://www.islandhealth.ca/learn-about-health/covid-19/covid-19-vaccine";
  const h2Text = "Currently eligible";
  const { data: html } = await axios.get(uri);
  const $ = cheerio.load(html);
  const h3s = $("h2 + h3")
    .filter((i, h3) => $(h3.previousSibling.prev).text() === h2Text)
    .get();

  if (h3s.length === 0) {
    throw new Error("element not found");
  }
  const current = $(h3s[0])?.text();
  return `${h2Text}: ${current}`;
}

module.exports = {
  getCurrent
}
