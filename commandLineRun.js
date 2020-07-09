// Command Line app execution simplified
// Nicola Zordan 6/24/2020
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
  run: function (commands) { 
    if (commands!=null) commandLineRun.commands=commands;
    if (commands==null) commands=commandLineRun.commands;
    //var cmds=Object.keys(commandLineRun.commands);
    var clParams=commandLineRun.getParameters();
    var params=commandLineRun.parameters;
    var cmd=commandLineRun.command;
    var fn=commandLineRun.findFunction(cmd);
    if (fn==null) {
      console.log('commandLineRun: command ['+cmd+'] not found \n Available commands are: '+JSON.stringify(commandLineRun.commandsList(commands),null,2));
      return cmd;
    };
    if (typeof(fn)!='function') {
        console.log('commandLineRun: ['+cmd+'] found but does not correspond to a function to run \n Available commands are: '+JSON.stringify(commandLineRun.commandsList(commands),null,2));
        return cmd;
    };
    fn.apply(null,params);
  },
  findFunction: function (cmd, commands) {
    // null cmd, will match null element in commands to execute the default action with no parameters
    if (commands==null) commands=commandLineRun.commands;
    var fn=commands[cmd];
    if (fn==null) {
      fn=commandLineRun.findFunctionNested(cmd,commands);
    };
    return fn;
  },
  findFunctionNested: function (cmdStr, commands) {
    if (cmdStr==null) return null;
    if (commands==null) commands=commandLineRun.commands;
    var cmdA=cmdStr.split('.');
    var fn=commands;
    for (var c of cmdA) {
      if (fn==null || typeof(fn)!='object') break;
      fn=fn[c];
    };
    return fn;
  },
  commandsList: function (commands, prefix) {
    if (commands==null) commands=commandLineRun.commands;
    if (prefix==null) prefix='';
    var cmds=Object.keys(commands);
    var lc=[];
    var o, lo, cs;
    for (var c of cmds) {
      cs=prefix+c;
      //lc.push(cs);
      o=commands[c];
      if (typeof(o)=='function') lc.push(cs);
      if (o!=null && typeof(o)=='object') {
        lo=commandLineRun.commandsList(o,cs+'.');
        lc=lc.concat(lo);
      };
    };
    return lc;
  },
};

// module
module.exports=commandLineRun.run;

// Example:

/*
// execution
var commandLineRun=require('commandLineRun');
commandLineRun({
    null: function (args) { 
        console.log('Default execution of app, no parameters or  null action: \n'+JSON.stringify(args)); 
    }, 
    "logExample": console.log,
    "sendStaticFiles": ccc.sendStaticFiles,
    "startSoapWebService": ccc.startSoapWebService,
    "sendInvoice": ccc.sendInvoice,
    "log": console.log,
    "a": {
        "log": console.log,
        "b": {
            "c": function () {console.log('3rd level')},
            "log": console.log,
        },
        "nofunction": null,
    },
});
//// usage from the command line
// node file.js log "this is an example of" commandLine execution
*/
