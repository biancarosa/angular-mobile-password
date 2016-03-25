'use strict';

angular.module('mobilePassword', [])

.directive('password', ['$timeout', function($timeout) {
  function link(scope, element, attrs) {
    var lastSize = 0;
    var timer;
    var timeout = 200;
    scope[attrs.password] = '';

    scope.$watch(attrs.ngModel, function(value) {
      if (value === undefined) {
        return;
      }
      if (lastSize == value.length) {
        return;
      }
      if (lastSize > value.length) {
        scope[attrs.password] = scope[attrs.password].substring(0, value.length-1);
      } else {
        scope[attrs.password] += value.substring(value.length-1, value.length);
      }
      var bullets = "";
      for (var i = 0; i < value.length; ++i) {
        bullets += String.fromCharCode(8226);
      }
      lastSize = value.length;
      if (! (timer === undefined )) {
        $timeout.cancel(timer);
      }
      timer = $timeout(function(){
         scope[attrs.ngModel] = bullets;
       }, timeout);
    });
  }
  return {
    restrict: 'A',
    link: link
  }
}]);
