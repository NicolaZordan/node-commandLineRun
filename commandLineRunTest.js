// Command Line execution Test
// Nicola Zordan 6/18/2020


// load module
var commandLineRun=require('./commandLineRun');

// execution
commandLineRun({
    "logExample": console.log,
    "log": console.log,
    "write": function () { console.log("writing:",Array.from(arguments)); },
    "write1": function (first) { console.log("writing1:",first); },    
    "concat": function () {console.log("contatenating parameters:",Array.from(arguments).join(''))},
    "a": {
        "log": console.log,
        "b": {
            "c": function () {console.log('3rd level')},
            "log": console.log,
        },
        "nofunction": null,
    },
});
// usage from the command line
// node file.js log "this is an example of" commandLine execution
