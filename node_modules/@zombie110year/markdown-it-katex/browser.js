// use for preview on development envrionment.
const md = require('markdown-it')();
const mk = require('./index');
md.use(mk);
const input = document.getElementById('input');
const output = document.getElementById('output');
output.innerHTML = md.render(input.innerText);
