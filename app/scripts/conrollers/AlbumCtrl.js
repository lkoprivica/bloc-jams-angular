(function() {
     function AlbumCtrl(Fixtures) {
        this.albumData = [];
     for (var i=0; i < 12; i++) {
         this.albumData = Fixtures.getAlbum();
     }
  }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();