// Command Line execution Test
// Nicola Zordan 6/18/2020


// execution
var commandLineRun=require('./commandLineRun');

//commandLineRun.run({
commandLineRun({
    "logExample": console.log,
    "log": console.log,
    "write": function () { console.log("writing:",Array.from(arguments)); },
    "write1": function (first) { console.log("writing1:",first); },    
    "concat": function () {console.log("contatenating parameters:",Array.from(arguments).join(''))},
});
//// usage from the command line
// node file.js log "this is an example of" commandLine execution
