// Command Line app execution simplified
// Nicola Zordan 6/18/2020
// info@Zordan.net

// command line execution
var commandLineRun = {
  input:[],  
  command:null,
  parameters:[],
  getParameters: function () {
    commandLineRun.input=process.argv.slice(2);
    commandLineRun.parameters=commandLineRun.input.slice(1);
    commandLineRun.command=null;
    if (commandLineRun.input.length>0) commandLineRun.command=commandLineRun.input[0];
    return commandLineRun.input;
  },
  commands: {   // example of commands and corresponding functions to execute
    "log": console.log,
    "write": function () { console.log("writing:",Array.from(arguments)); },
  },
  run: function (cmdsIn) { 
    if (cmdsIn!=null) commandLineRun.commands=cmdsIn;
    var cmds=Object.keys(commandLineRun.commands);
    var clParams=commandLineRun.getParameters();
    var params=commandLineRun.parameters;
    var cmd=commandLineRun.command;
    if (cmd==null) {
        console.log('commandLine: null command: ['+cmd+'] \n',clParams);
        return cmd;
    };
    var commandFound=false;
    for (var c of cmds) {
        commandFound=(cmd==c);
        if (commandFound) {
            var fn=commandLineRun.commands[cmd];
            fn.apply(null,params);
            break;
        };
    };
    if (!commandFound) {
        console.log('commandLine: command NOT found: ['+cmd+'] \n',clParams);
        console.log('valid commands are: \n',cmds)
        return cmd;
    };
  },
};

// module
module.exports=commandLineRun.run;

// Example:

/*
// execution
var commandLineRun=require('commandLineRun');
commandLineRun({
    "logExample": console.log,
    "sendStaticFiles": ccc.sendStaticFiles,
    "startSoapWebService": ccc.startSoapWebService,
    "sendInvoice": ccc.sendInvoice,
    "log": console.log,
});
//// usage from the command line
// node file.js log "this is an example of" commandLine execution
*/
