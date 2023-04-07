#!/usr/bin/env node

const shell = require("shelljs");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const projectDir = process.argv[3] || "."; // process.cwd() returns the current working directory of the Node.js process.
// const projectDir = process.cwd();
const projectName = process.argv[2];

if (!projectDir || !projectName) {
  console.error("Error: You must provide a project directory and name.");
  process.exit(1);
}

console.log(
  `Creating Nuxt.js ...`
);

shell.exec(`npx nuxi init ${projectDir}/${projectName}`);

console.log(`Nuxt.js project created.`);

// fs.rmSync(path.join(projectDir, projectName, "README.md"));

fse.copySync(
  path.join(__dirname, "", "template"),
  path.join(projectDir, projectName)
);

console.log(`Done.To start the project run: `);
console.log(`cd my-project && npm i && npm run dev`);
