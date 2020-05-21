# ArcGIS Picture Layer

ArcGIS Picture Layer帮你实现在使用ArcGIS JavaScript API时，添加知道地理范围的图片到2D/3D地图上展示

![示例图片](https://upload-images.jianshu.io/upload_images/2510057-cf4508ab211bb8bc.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

## 部署

可以把PictureLayer部署到你离线的ArcGIS JavaScript包中，如果你使用的是在线的API，那么你可以在你的Web服务器或直接在你的项目中部署。

- 部署到离线ArcGIS JavaScript API，直接将PictureLayer.js文件复制到esri/layers/包下；
- 部署到Web服务器，在你的Web服务器中任何地址部署PictureLayer.js；
- 部署到项目，将PictureLayer.js拷贝到项目的js目录下；

## 引用

~~~js
/**引用部署到离线ArcGIS JavaScript API中的PictureLayer*/
  require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/PictureLayer"
        ], function (Map, MapView, PictureLayer) {
      
  }
          
/**引用部署到Web服务器的ArcGIS JavaScript API中的PictureLayer*/
  require([
            "esri/Map",
            "esri/views/MapView",
            "http://js.simple.com/esri/layers/PictureLayer"
        ], function (Map, MapView, PictureLayer) {
      
  }

/**引用部署到项目文件夹中的的ArcGIS JavaScript API中的PictureLayer*/
  require([
            "esri/Map",
            "esri/views/MapView",
            "../esri/layers/PictureLayer"
        ], function (Map, MapView, PictureLayer) {
      
  }
~~~

## 使用

~~~js
let extent = {
   xmin: 7792364.355529149,
   ymin: -7.081154551613622E-10,
   xmax: 1.6697923618991036E7,
   ymax: 4865942.279503176};
let spatialReference = {wkid: 102100, latestWkid: 3857}
let units = "esriMeters";

let layer=new PictureLayer({
                    url: `./${i}.jpg`,
                    opacity: 0.75,
                    pictureExtent: extent,
                    units: units,
                    spatialReference: spatialReference}));
map.add(layer);
~~~

**属性说明**

- extent

  extent为图片的地理范围，需要注意的是这里使用的坐标值需要与地图的坐标系统一致，结构如下：

  ~~~js
  {xmin: ,ymin: ,xmax: ,ymax: }
  ~~~

- spatialReference

  坐标系，与地图的坐标系操持一致，对象的结构与ArcGIS JavaScript API中的SpatialReference类的结构一致，一般情况下包含wkid和lastestwikd两个属性。

- unites

  单位，与地图的单位一致

## 说明

PictureLayer 基于ArcGIS JavaScript API 4.13中的MapImageLayer改造，4.15版本API同样适用。

实现的详细说明来我的简书上看看吧 [扩展ArcGIS JS API中的MapImageLayer支持图片图层加载](https://www.jianshu.com/p/cc744f1ad6bb)

