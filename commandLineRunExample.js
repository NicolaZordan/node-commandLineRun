// Command Line execution Example
// Nicola Zordan 6/18/2020

// must install to use this
// npm install commandlinerun

// load nmodule
var commandLineRun=require('commandlinerun');

// execuution
commandLineRun({
    "logExample": console.log,
    "log": console.log,
    "write": function () { console.log("writing:",Array.from(arguments)); },
    "write1": function (first) { console.log("writing1:",first); },    
    "concat": function () {console.log("contatenating parameters:",Array.from(arguments).join(''))},
});
// usage from the command line
// node commandLineRunExample.js log "this is an example of" commandLine execution
