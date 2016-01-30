
(function() {
  'use strict';

    angular.module('storyToaster')
    .service('imageService', function ($http, $q, $cookieStore, config) {

        var service = {
          getPropsImages: getPropsImages,
          getBackgroundImages: getBackgroundImages,
          getTextImages: getTextImages,
          getImages: getImages
        };

        return service;

        function getPropsImages() {
          return getRemoteImage('props')
            .then(function (links) {
              return {
                title: '故事素材 ',
                content: '故事素材',
                imageType: 'props',
                titleImage: '/assets/images/1.gif',
                images: links
              }
            });
        }

        function getBackgroundImages()  {
          return getRemoteImage('background')
            .then(function (links) {
              return {
                title: '故事场景',
                content: '故事场景',
                imageType: 'background',
                titleImage: '/assets/images/Blue_background.jpg',
                images: links
              }
            })
        }

        function getImages() {
          return [
            {
              title: '故事场景',
              content: '故事场景',
              imageType: 'background',
              titleImage: '/assets/images/callout/Blue_background.jpg',
              images: [
                "/assets/images/1.gif",
                "/assets/images/2.gif",
                "/assets/images/3.gif",
                "/assets/images/4.gif",
                "/assets/images/5.gif",
                "/assets/images/6.gif"
              ]
            },
            {
              title: '卡通图片 ',
              content: '卡通图片',
              imageType: 'props',
              titleImage: '/assets/images/1.gif',
              images: [
                "/assets/images/1.gif",
                "/assets/images/2.gif",
                "/assets/images/3.gif",
                "/assets/images/4.gif",
                "/assets/images/5.gif",
                "/assets/images/6.gif"
              ]
            },
            {
              title: '文字',
              content: '文字',
              imageType: 'text',
              titleImage: '/assets/images/256px-Speech_balloon.svg.png',
              images: [
                "/assets/images/128px-Speech_balloon.svg.png",
                "/assets/images/256px-Speech_balloon.svg.png",
                "/assets/images/32px-Speech_balloon.svg.png",
                "/assets/images/512px-Speech_balloon.svg.png",
                "/assets/images/64px-Speech_balloon.svg.png",
                "/assets/images/Speech_balloon.svg",
                "/assets/images/speachBolloon-1.svg",
                "/assets/images/callout/speachBolloon-1.svg"
              ]
            }
          ];
        }

        function getTextImages() {
          return getRemoteImage('text')
            .then(function (links) {
              return {
                title: '文字框',
                content: '文字框',
                imageType: 'text',
                titleImage: '/assets/images/callout/Blue_background.jpg',
                images: links
              }
            })
        }

        function getRemoteImage(imageType){
          var imageUrl = config.apiRootPath + "mediaServer/image?cat=" + imageType;
          return $http.get(imageUrl)
            .then(function(res){
              return res.data.map(function(image){
                return  config.apiRootPath + image.thumb;
              })
            })
        }
      })
})();
