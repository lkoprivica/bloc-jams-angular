(function() {
      function AlbumCtrl(Fixtures, SongPlayer) {
		  
	     this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
		  
		  
		for (var songIndex in this.albumData.songs){
			var song = this.albumData.songs[songIndex];
			var duration = song.duration;
			var minutes = parseInt(duration / 60),
				seconds = parseInt(duration % 60);
			
			if(seconds <= 9){
				seconds = "0" + seconds;
			}
			
			song.duration = minutes + ":" + seconds;
			
			song.songIndex = parseInt(songIndex) + 1;
			
		}
     
  }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]); 
 })();