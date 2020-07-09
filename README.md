# commandLineRun
Running nodejs app from the command line simplified

Nicola Zordan
info@Zordan.net 
6/18/2020

## Abstract
Allows an easy way to run different application entry points from running the command line

## Requirement
Writing nodejs apps we need to test and execute parts of the application with different entry points, passing parameters to allow execution 
for example: 
- run the server
- perform an action
- run only a part of the app
- test a specific portion of the app

## Solution
commandLineRun allows you to specify what function should be run when a command line is specified form the command line

### Examples form the command line
Assuming your app has an app.js file
- node app.js
- node app.js log "write this in the log"
- node app.js deleteKey 1234
- node app.js test first second third
- node app.js startServer
- node app.js startServer 8000 localhost
- node app.js displayConfiguration

## Installation
npm install commandLineRun

## Implementation
to use commandLineRun is simple
1. require the module
2. execute it passing the object that describe the actions

### Action mapping object to be passed
The action mapping object to be passed is a simple object that to each element matches a function to execute, the property name will be used to identify the command from the command line that will execute the corresponding function

- NOTE: The default action with no parameters passed, is associated to the null command

```javascript
{
    null: function (args) {     // null: default action function
        console.log('Default execution of app, no parameters or null action: \n'+JSON.stringify(args)); 
    }, 
    "log": console.log,
    "run": app.run,
    "startServer": app.start,
    "eraseCache": app.clearCache,
    "deleteKey": app.deleteKey,
    "concat": function () {console.log("contatenating parameters",Array.from(arguments).join(''))},
    "write": function () { console.log("writing:",Array.from(arguments)); },
    "write1": function (first) { console.log("writing1:",first); },
}
```

#### Nested Objects
Nesting allows to define groupig of entry points by app area

It is possible to specify nested objects when defining the action mapping object, nested object functions to call can be accessed with the dot notation:

on the example below:
- sales.report
- sales.bonues.person

Note that if in the action mapping object an end point is specified that is not a funtion, it will not be executed.
If teh command entered in the command line does not match a valid function a message will be displayed, and the list of available defined commands will be shown

```javascript
{
    null: function (args) { 
        console.log('Default execution of app, no parameters or  null action: \n'+JSON.stringify(args)); 
    }, 
    "log": console.log,
    "run": app.run,
    "startServer": app.start,
    "eraseCache": app.clearCache,
    "deleteKey": app.deleteKey,
    "sales": {
        "report": console.log,
        "bonuses": {
            "person": function () {console.log('3rd level')},
            "log": console.log,
        },
        "nofunction": null,
    },
}
```


### Example
```javascript
// define commandLineRun
var commandLineRun=require('commandLineRun');

// execute from the command line
commandLineRun({
    null: function () { console.log('default action') },
    "log": console.log,
    "write": function () { console.log("writing:",Array.from(arguments)); },
    "write1": function (first) { console.log("writing1:",first); },
});
```

### Run
Invoking commandLineRun 
1. gets the data from the command line, 
2. find the matching command (can use nested objects)
3. execute the function specified in the action mapping object, passing the parameters from the command line

