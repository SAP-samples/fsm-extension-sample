# FSM Extension Dev-Starter-Kit

This project is an FSM-Extension project with a setup that has the aim to start quickly with some modern tools. 
In this setup, TypeScript and Node are used, so you can write your code in TypeScript-format and import dependencies from NPM. Additionally, there are ready to use NPM-scripts to build the ts-code to a js-file and makes it together with the html and css files accessible from outside via a https-url through a tunnel-tool.

## Prerequisite:
ngrok is the tool that is used for the tunnel. To make use of this, you need to have a ngrok account and install the ngrok-authtoken. More information can be found here: https://ngrok.com/docs#getting-started-authtoken.

## Getting-Started
* Open a first terminal/cmd and execute this command "npm install" and then "npm run start:dev". The "start:dev" npm-script will build the ts-files and serve it via a localhost-url. It additionally watch for code changes and triggers an update automatically.
* Open a second terminal/cmd and execute this command "npm run tunnel". This will make the files accessible though a https-url that is acceptable in Shell.
* Install the extension in Shell and try it out. Here are the docs: https://help.sap.com/viewer/fsm_extensions/Cloud/en-US/install-manage.html
