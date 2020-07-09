// Command Line execution Example
// Nicola Zordan 6/18/2020

// must install to use this
// npm install commandlinerun

// load nmodule
var commandLineRun=require('commandlinerun');

// execuution
commandLineRun({
    null: function (args) { 
        console.log('Default execution of app, no parameters or  null action: \n'+JSON.stringify(args)); 
    }, 
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
        "nostring": 'a.nostring',
    },
});
// usage from the command line
// node commandLineRunExample.js log "this is an example of" commandLine execution
