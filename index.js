#!/usr/bin/env node

const lib = require("./lib");

main();

async function main() {
  try {
    const current = await lib.getCurrent();
    console.log(current);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
    return;
  }
}
