(function() {
     function SongPlayer() {
        var SongPlayer = {};
           
        var currentSong = null;
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
               currentSong.playing = null;
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
 
    currentSong = song;
 };
       
        SongPlayer.play = function(song) {
          if (currentSong !== song) {
            
              setSong(song);
              currentBuzzObject.play(); 
              song.playing = true;
          
             
          } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                 currentBuzzObject.play();
         }
     }    
          
  };
          
         SongPlayer.pause = function(song) {
                 currentBuzzObject.pause();
                 song.playing = false;
 };
            var currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
         });
            
         
       }
     };

          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
