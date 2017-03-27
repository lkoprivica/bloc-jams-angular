(function() {
     function PlayerBarCtrl(Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
		
		 
		 console.log(this.songPlayer);
		 
		 this.songName = this.songPlayer.currentSong;
		 
		 this.artistname = "";
		 
	 };
		 
 
     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
})();