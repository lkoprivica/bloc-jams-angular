(function() {
    /**
     * @function SongPlayer
     * @desc gets the index of a song object in order to move between songs
     * @type {object} song
     */
    function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};
		
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @function getSongInde
         * @desc gets the index of a song 
         * @type {object} song
         */
        var getSongIndex = function(song) {
			if(!song) return 0;
            return currentAlbum.songs.indexOf(song);
        };

        /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;
		
		/**
		 * @desc Current playback time (in seconds) of currently playing song.
		 * @type {number}
		 */
		
		SongPlayer.currentTime = null;
		
		SongPlayer.totalTime = "-:--";
		
		SongPlayer.volume = 0;
		
		SongPlayer.setVolume = function(vol){
			
			currentBuzzObject.setVolume(vol);
			
		}
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
		
		  /**assignment checkpoint 7
          * @function playSong
          * @desc plays the current song
          * @param {Object} song
		  */
         var playSong = function(song) {
            song = song || SongPlayer.currentSong;
			for(var songIndex in currentAlbum.songs) { currentAlbum.songs[songIndex].playing = false; }
            currentBuzzObject.play();
            song.playing = true;
        }

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
             if (currentBuzzObject) {
               SongPlayer.stopSong();
             }
           /** 
		   * @desc Sets the currentBuzz objec to play current song
		   * @ param {object} song
		   */
           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
            });
			 
			currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
					var minutes = parseInt(SongPlayer.currentTime / 60),
				        seconds = parseInt(SongPlayer.currentTime % 60);
			
					if(seconds <= 9){
						seconds = "0" + seconds;
			        }
			
			     SongPlayer.currentTime = minutes + ":" + seconds;

			
                });
            });
		
            SongPlayer.currentSong = song;
			 SongPlayer.totalTime = SongPlayer.currentSong.duration;
			 console.log(SongPlayer)
        };
       
		/** 
		* @function SongPlayer.play
		* @desc If the currently playing song is not the same as the song the user clicks on, then: Stop * * the currently playing song, if there is one, Set a new Buzz sound object, Set the newly chosen ** * song object as the currentSong,Play the new Buzz sound object.
		* @param {object} song
		*/
        SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong || currentAlbum.songs[0];
			if (SongPlayer.currentSong !== song) {
				 setSong(song);
                 playSong(song);
             }else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  }
			 }     
        };

        /** 
		* @function SongPLayer.pause
		* @desc If song is already playing and user clicks it, then pause the song.
		* @param {object} song
		*/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
         * @function SongPlayer.previous
         * @desc Method that gives teh ability to get a song's index
         * @param {Object} song
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;

            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
		* @fucntion Songplayer.next
		* @desc stops currently playing song and switches to next song. 
		* @param {object} song
		*/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
			
			if(currentSongIndex >= currentAlbum.songs.length){
				currentSongIndex = 0;	
			}
			var song = currentAlbum.songs[currentSongIndex];
			setSong(song);
			playSong(song);
			
			
        };
		
		/**
		* @function setCurrentTime
		* @desc Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			time = Number(time);
     		if (currentBuzzObject) {
         		currentBuzzObject.setTime(time);
     		}
 		};
		
         /** assignment checkpoint 8 
         * @function StopSong
         * @ desc stops the currently playing song and resets it to zero
         * @param {object} song
         */

        SongPlayer.stopSong = function() {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.stop();
            song.playing = false;
        };
		var song = currentAlbum.songs[getSongIndex(SongPlayer.currentSong)];
        var currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
		
		
		return SongPlayer;

    };


    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();

        
            
       
     