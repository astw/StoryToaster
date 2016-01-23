
(function() {
  'use strict';

    angular.module('storyToaster')
    .service('imageService', function ($http, $q, $cookieStore, config) {

        this.getPropsImages = function(){
          var defer = $q.defer();

          var backgroundImageUrl = config.apiRootPath + "mediaServer/image?cat=prop";

          $http.get(backgroundImageUrl)
            .then(function(res){
              var links = res.data.map(function(image){
                return image.thumb;
              })

              var data = {
                title: '故事素材 ',
                content: '故事素材',
                imageType: 'props',
                titleImage: '/assets/images/1.gif',
                images:links
              }

              defer.resolve(data)
            })

          return defer.promise;
        },

        this.getBackgroundImages = function() {

          var defer = $q.defer();
          var backgroundImageUrl = config.apiRootPath + "mediaServer/image?cat=background";

          $http.get(backgroundImageUrl)
            .then(function (res) {
              var links = res.data.map(function (image) {
                return config.apiRootPath + image.thumb;
              });

              var data = {
                title: '故事场景',
                content: '故事场景',
                imageType: 'background',
                titleImage: '/assets/images/callout/Blue_background.jpg',

                images: links
              }

              defer.resolve(data);
            })

          return defer.promise;
        },

          this.getTextImages = function(){

            var defer = $q.defer();
            var backgroundImageUrl = config.apiRootPath + "mediaServer/image?cat=text";

            $http.get(backgroundImageUrl)
              .then(function(res){
                var links = res.data.map(function(image){
                  return image.thumb;
                })

                var data = {
                  title: '文字框',
                  content: '文字框',
                  imageType:'text',
                  titleImage :'/assets/images/callout/Blue_background.jpg',

                  images:links
                }

                defer.resolve(data);
              })

            return defer.promise;
          },

      this.getImages = function() {
        return [
          {
            title: '故事场景',
            content: '故事场景',
            imageType: 'background',
            titleImage: '/assets/images/callout/Blue_background.jpg',
            images: [
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
            imageType: 'props',
            titleImage: '/assets/images/1.gif',
            images: [
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
            imageType: 'text',
            titleImage: '/assets/images/256px-Speech_balloon.svg.png',
            images: [
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
