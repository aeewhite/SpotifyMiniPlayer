Spotify Mini Player
=====

A mini player for OS X similar to the one included in iTunes that connects to Spotify. Currently can only change tracks (previous, next), control playback (play, pause), and show information about the current song along with it's album art.

Gets information from Spotify using applescript and displays it in a visually appealing way. 

##How it works

The app uses [node-webkit](https://github.com/nwjs/nw.js) to make a desktop app using node.js and javascript. The [spotify-node-applescript](https://github.com/andrehaveman/spotify-node-applescript) node package is then used to get information out of Spotify using applescript. It fetches album artwork from the local cache that Spotify creates, so it doesn't have to download it again.

##Installation
1. Clone the repository
2. In the directory run `npm install`
3. Run the app using node-webkit `nw .` or run `./build` to build a .app bundle in the build folder
