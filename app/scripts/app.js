(function() {
     function config($stateProvider, $locationProvider) {
       $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
       
       $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'
         })
         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
         })
         //assignment checkpoint 3
        .state('collection', {
             url:'/collection',
             templateUrl: '/templates/collection.html'
          })
      });
     }
 
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();