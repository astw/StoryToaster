
(function() {
  'use strict';

    angular.module('storyToaster')
    .service('imageService', function ($http, $q, $cookieStore, config) {

      this.getImages = function(){
        return [
          {
            title: '故事场景',
            content: '故事场景',
            titleImage :'/assets/images/callout/Blue_background.jpg',
            images:[
              "/assets/images/1.gif",
              "/assets/images/128px-Speech_balloon.svg.png",
              "/assets/images/2.gif",
              "/assets/images/256px-Speech_balloon.svg.png",
              "/assets/images/3.gif",
              "/assets/images/32px-Speech_balloon.svg.png",
              "/assets/images/4.gif",
              "/assets/images/5.gif",
              "/assets/images/512px-Speech_balloon.svg.png",
              "/assets/images/6.gif",
              "/assets/images/64px-Speech_balloon.svg.png",
              "/assets/images/Speech_balloon.svg",
              "/assets/images/speachBolloon-1.svg",
              "/assets/images/callout/callout_rectangle_right/callout_rectangle_right.svg"
            ]
          },
          {
            title: '卡通图片 ',
            content: '卡通图片',
            titleImage :'/assets/images/1.gif',
            images:[
              "/assets/images/callout/Blue_background.jpg",
              "/assets/images/1.gif",
              "/assets/images/128px-Speech_balloon.svg.png",
              "/assets/images/2.gif",
              "/assets/images/256px-Speech_balloon.svg.png",
              "/assets/images/3.gif",
              "/assets/images/32px-Speech_balloon.svg.png",
              "/assets/images/4.gif",
              "/assets/images/5.gif",
              "/assets/images/512px-Speech_balloon.svg.png",
              "/assets/images/6.gif",
              "/assets/images/64px-Speech_balloon.svg.png",
              "/assets/images/Speech_balloon.svg",
              "/assets/images/speachBolloon-1.svg"
            ]
          },
          {
            title: '文字',
            content: '文字',
            titleImage :'/assets/images/256px-Speech_balloon.svg.png',
            images:[
              "/assets/images/1.gif",
              "/assets/images/128px-Speech_balloon.svg.png",
              "/assets/images/2.gif",
              "/assets/images/256px-Speech_balloon.svg.png",
              "/assets/images/3.gif",
              "/assets/images/32px-Speech_balloon.svg.png",
              "/assets/images/4.gif",
              "/assets/images/5.gif",
              "/assets/images/512px-Speech_balloon.svg.png",
              "/assets/images/6.gif",
              "/assets/images/64px-Speech_balloon.svg.png",
              "/assets/images/Speech_balloon.svg",
              "/assets/images/speachBolloon-1.svg"
            ]
          }
        ];
      }
    })
})();
