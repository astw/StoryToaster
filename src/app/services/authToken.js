'use strict'

angular.module('storyToaster')
.factory('authToken', function($window,config, $http){
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken';

    var authToken = {
      setToken : function(token){
        cachedToken = token;
        $http.defaults.headers.common[config.authTokenName] = token;
        storage.setItem(userToken,token);
      },

      getToken:function(){
        if(!cachedToken)
            cachedToken = storage.getItem(userToken);

        return cachedToken;
      },

      removeToken:function(){
        cachedToken = null;
        storage.removeItem(userToken);
      }
    };

    return authToken;

  });

