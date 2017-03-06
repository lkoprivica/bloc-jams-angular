(function() {
     function CollectionCtrl(Fixtures) {
       //update to use the Fixtures services getCollection Method assignment checkpoint 6
       this.albums = Fixtures.getCollection(12);
  }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', CollectionCtrl);
 })();