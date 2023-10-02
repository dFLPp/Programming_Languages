let n = 1;
const a = 0;
if(n === 1){
    console.log("my first node program")
}
console.log(`With ${a} errors`)

//console.log(__dirname)
//console.log(__filename)
//console.log(require)
//console.log(module)
//console.log(process);

let dsImported = require("./datasetEx")
let funcsImported = require("./moduleEx")

//funcImported(dsImported);
console.log(funcsImported.showDS(dsImported));