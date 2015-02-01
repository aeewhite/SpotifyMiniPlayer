spotify = require("spotify-node-applescript");
// Load native UI library
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui()

// Get the current window
var win = gui.Window.get();

var currentBackground = "Whatever";
var currentSong;
var mostRecentState;


function isSongEquivalent(a, b) {
	if(a === undefined || b ===undefined){
		return false;
	}
	if(a.id != b.id){
		return false;
	}
	// If we made it this far, objects
	// are considered equivalent
	return true;
}

function spamCheckStatus(){
	// This doesn't usually work
	setInterval(function(){
		spotify.getState(function(err, state){
			if(err){
				// console.log(err);
			}
			if(state){
				if(state.state == "paused" && $('.playpause').attr('src') == "images/pause.png"){
					$('.playpause').attr('src','images/play.png');
				}
				else if(state.state == "playing" && $('.playpause').attr('src') == "images/play.png"){
					$('.playpause').attr('src','images/pause.png');	
				}	
			}
			
		});
	}, 500);	
}

var currentBackground = "Whatever";

function setBackground(path){
	if(path !== undefined && path != currentBackground){
		$('html').css('background-image', 'url(' + path + ')');
		currentBackground = path;
		console.log("set background to " + path);
	}
	else{
		console.log("Tried to change background");
		if(path === undefined){
			console.log("Path wasn't defined");
			getAlbumArtwork(); //Try again
		}
		if(path == currentBackground){
			console.log("The background was already set");
		}
	}
}


function getAlbumArtwork(){
	// Returns a filepath to the artwork
	spotify.getArtwork(function(err, artworkPath) {
		if(err){
			console.log(err);
		}
		setBackground(artworkPath);
	});
}

var currentSong;

function getTrackInformation(){
	spotify.getTrack(function(err, track){
		if(err){
			console.error("Song Check Failed");
		}
		else{
			console.log("Song Check Success");
			if(!isSongEquivalent(track,currentSong) && track !== undefined){
				console.log("I think the song changed");
				console.log("----------Old Track------------");
				console.log(currentSong);
				console.log("----------Track------------");
				console.log(track);
				currentSong = track;
				$('body').trigger("songChange");
			}
		}
	});
}

function displaySong(songObject){
	if(songObject){
		$('.songTitle').text(songObject.name);
		$('.songArtist').text(songObject.artist);
		$('.songAlbum').text(songObject.album);	
	}
}

function songChangeLoop(){
	setInterval(getTrackInformation, 1000);
	console.log("Started Check Loop");
}

$('.playpause').click(function(){
	spotify.playPause();
});
$('.prev').click(function(){
	spotify.previous();
	getTrackInformation();
});
$('.next').click(function(){
	spotify.next();
	getTrackInformation();
});

$(document).on("mouseleave",function(){
	setTimeout(function(){
		$('.infoBox').fadeOut();
		$('.controlBox').fadeOut();
		$('.exit').fadeOut();
	},800);
});
$(document).on("mouseenter",function(){
	$('.infoBox').show();
	$('.controlBox').show();
	$('.exit').show();
});

// $(document).click(win.focus);
$('#closeButton').on("click",function(){
	win.close();
});

$('body').on('songChange', function(){
	getAlbumArtwork();
	displaySong(currentSong);
});

spamCheckStatus();
songChangeLoop();