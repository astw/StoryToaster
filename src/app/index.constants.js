/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('storyToaster')
    .constant('_', window._)
    .constant('config', {
      authTokenName:'Authorization',
      apiKeyName: 'clientkey',
      apiKeyValue:'test key for local',
      apiRootPath: 'http://localhost:1337/'
      // apiRootPath:'http://192.168.0.12:1337'
    });
})();
