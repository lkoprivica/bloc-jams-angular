(function() {
    /**
     * @function SongPlayer
     * @desc gets the index of a song object in order to move between songs
     * @type {object} song
     */
    function SongPlayer($scope, Fixtures) {
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
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
             if (currentBuzzObject) {
               SongPlayer.stopSong();
             }

          /**assignment checkpoint 7
          * @function playSong
          * @desc plays the current song
          * @param {Object} song
		  */
          var playSong = function() {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.play();
            song.playing = true;

           }
           /** 
		   * @desc Sets the currentBuzz objec to play current song
		   * @ param {object} song
		   */
           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
            });

            SongPlayer.currentSong = song;
        };
       
		/** 
		* @function SongPlayer.play
		* @desc If the currently playing song is not the same as the song the user clicks on, then: Stop * * the currently playing song, if there is one, Set a new Buzz sound object, Set the newly chosen ** * song object as the currentSong,Play the new Buzz sound object.
		* @param {object} song
		*/
        SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				 setSong(song);
                 playSong(song);
             }else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  }
			 }     
        };
		
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
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
            var currentSongIndex = getSongIndex(songPlayer.currentSong);
            currentSongIndex++;
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
		console.log(song);
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

        
            
       
     