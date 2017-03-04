(function() {
     /**
     * @function SongPlayer
     * @desc gets the index of a song object in order to move between songs
     * @type {object} song
     */
     function SongPlayer(Fixtures) {
        var SongPlayer = {};
       
        var currentAlbum = Fixtures.getAlbum();
       
       /**
       * @function getSongInde
       * @desc gets the index of a song 
       * @type {object} song
       */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
     };
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.SongPlayer.currentSong = null;
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
               currentBuzzObject.stop();
               SongPlayer.currentSong.playing = null;
            }
          
            /**assignment checkpoint 7
            * @function playSong
            * @desc plays the current song
            * @param {Object} song
            */
            var playSong = function(song){
                currentBuzzObject.play()
                song.playing = true;
       
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
            });
 
            SongPlayer.currentSong = song;
        };
       
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                currentBuzzObject.play(); 
                song.playing = true;
          
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     currentBuzzObject.play();
                 }
               }    
          
         };
          
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
            var currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
         });
                   
       };

          return SongPlayer;
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
