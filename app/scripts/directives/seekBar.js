 (function() {
     function seekBar($document) {
		 var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = (offsetX / seekBarWidth); 
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(100, offsetXPercent);
             return offsetXPercent;
         };
	  	 return {
			 templateUrl: '/templates/directives/seek_bar.html',
			 replace: true,
			 restrict: 'E',
			 scope: {
			 	onChange: '&'
         	},
         	link: function(scope, element, attributes) {
              scope.value = 0;
              scope.max = 100;
			  scope.tracker_width = 0;
			  
	          var seekBar = $(element);
			 
			  attributes.$observe('value', function(newValue) {
				  var time = newValue.split(":");
				  newValue = parseInt(time[0]) * 60 + parseInt(time[1]);
				  scope.value = newValue;
				  scope.tracker_width = (newValue / scope.max) * 100;
 			  });
 
 		      attributes.$observe('max', function(newValue) {
				  if(newValue.indexOf(":") > -1){
					  var time = newValue.split(":");
					  newValue = parseInt(time[0]) * 60 + parseInt(time[1]);
					  scope.max = newValue;
					  scope.tracker_width = (newValue / scope.max) * 100;
				  }else{
					  scope.max = newValue;
					  scope.tracker_width = (newValue / scope.max) * 100;
				  }
 			  });
 
              var percentString = function () {
                  var value = scope.value;
                  var max = scope.max;
                  var percent = value / max * 100;
                  return percent + "%";
             };
             //assignment checkpoint 9
			 scope.thumbStyle = function(){
				 return scope.value = percent *scope.max;
			 }
             scope.fillStyle = function() {
                 return {width: percentString()};
             };
			 var notifyOnChange = function(newValue) {
     		 	 if (typeof scope.onChange === 'function') {
                 	 scope.onChange({value: newValue});
                 }
             };
			 scope.onClickSeekBar = function(event) {
              	  var percent = calculatePercent(seekBar, event);
             	  scope.value = percent * scope.max;
				  notifyOnChange(scope.value);
             };
			  
			 scope.trackThumb = function(event) {
				 
     		      $document.bind('mousemove.thumb', function(event) {
                      var percent = calculatePercent(seekBar, event);
                      scope.$apply(function() {
                          scope.value = percent * scope.max;
						  var thumb = event.target.querySelector('.thumb');
						  notifyOnChange(scope.value);
                  });
             });
				
				 
             $document.bind('mouseup.thumb', function() {
                  $document.unbind('mousemove.thumb');
                  $document.unbind('mouseup.thumb');
             });
             };
         }
     };

     }
 
     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();
