 (function() {
     function FixturesModule() {
		 
		 var Fixtures = {};
       
         var albumPicasso = {
             title: 'The Colors',
             artist: 'Pablo Picasso',
             label: 'Cubism',
             year: '1881',
             albumArtUrl: '/dist/assets/images/album_covers copy/album_covers/01.png',
             songs: [
                 { title: 'Blue', duration: '161.71', audioUrl: '/dist/assets/music copy/blue' },
                 { title: 'Green', duration: '103.96', audioUrl: '/dist/assets/music copy/green' },
                 { title: 'Red', duration: '268.45', audioUrl: '/dist/assets/music copy/red' },
                 { title: 'Pink', duration: '153.14', audioUrl: '/dist/assets/music copy/pink' },
                 { title: 'Magenta', duration: '374.22', audioUrl: '/dist/assets/music copy/magenta' }
             ]
         };
 
         var albumMarconi = {
             title: 'The Telephone',
             artist: 'Guglielmo Marconi',
             label: 'EM',
             year: '1909',
             albumArtUrl: '/assets/images/album_covers/20.png',
             songs: [
                 { title: 'Hello, Operator?', duration: '1:01' },
             	 { title: 'Ring, ring, ring', duration: '5:01' },
                 { title: 'Fits in your pocket', duration: '3:21' },
                 { title: 'Can you hear me now?', duration: '3:14' },
                 { title: 'Wrong phone number', duration: '2:15' }
             ]
         };
		 
	 
       
       
         Fixtures.getAlbum = function() {
              return albumPicasso;
         };
       
         //assignment checkpoint 6
         Fixtures.getCollection = function(numberOfAlbums){
			 var collections = [];
			 for(var i = 0; i < numberOfAlbums; i++){
				 collections.push(albumPicasso);
			 }
             return collections;
         }
         return Fixtures;
     }
 
     angular
         .module('blocJams')
         .factory('Fixtures', FixturesModule);
 })();