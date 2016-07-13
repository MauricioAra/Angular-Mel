(function() {
  'use strict';

  angular
    .module('angular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(cloudinary,ImageService,Upload) {
    var vm = this;
    //Imagen recortada
    var snippedImage;
    //configuracion del repositorio de la imagen
    var  cloudObj = ImageService.getConfiguration();

    vm.getImage = function(){
      cloudObj.data.file = document.getElementById('image').files[0];
      Upload.upload(cloudObj)
        .progress(function(e){
          //event.file.progress = Math.round((e.loaded * 100.0) / e.total);
          //event.file.status = "Uploading... " + event.file.progress + "%";
        }).success(function(data,status,headers,config){
          snippedImage = ImageService.splitImage(data.url);
          vm.image = snippedImage;
        }).error(function(data,status,headers,config){
          console.log(data);
        });
    }
  }
})();
