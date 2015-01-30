#!/usr/bin/env node
var NwBuilder = require('node-webkit-builder');
require('osx-ulimit').set(1024);
var nw = new NwBuilder({
    files: ['**/**','!build/**','!cache/**'], // use the glob format
    platforms: ['osx'],
    appName: "Spotify Mini Player",
    buildDir: "./build",
    buildType: "versioned",
    macIcns: "images/icon.icns",
    macZip: true
});

console.log("Running Build");

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('Build Complete! Have a nice day!');
}).catch(function (error) {
    console.error(error);
});
