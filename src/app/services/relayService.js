/**
 * Created by Administrator on 30/05/2015.
 */


angular.module('storyToaster')
  .service('relayService',function($window){
    var storage = $window.localStorage;
    var bag ={};

    var put = function(obj){
      bag = obj;
    };

    var putKeyValue = function(key, obj){
      storage.setItem(key,JSON.stringify(obj));
    };

    var get = function(){
      return bag;
    };

    var getKeyValue = function(key){
      var obj = storage.getItem(key);
      if(!obj || obj ==='undefined')
         return null;

      return JSON.parse(storage.getItem(key));
    };

    var clear = function(){
      bag = null;
      storage.clear();
    };

    return{
      get:get,
      put:put,
      putKeyValue:putKeyValue,
      getKeyValue:getKeyValue,
      clear:clear
    }
});
