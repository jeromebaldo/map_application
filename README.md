# map_application

The objective is to first provide an interface using Vue.js with OpenLayers.

Implemented functionality =>
- Import of geometries of type polygon, linestring, and point onto the map
- Usage of GDAL, OpenLayers, Vue.js, OpenStreetMap, and microservices
Next iteration =>
- Continue refactoring components (move the layer management into the map component)
- Extract other logic from the components
- Create a reset button
Key concepts =>
- 'props' for setting an attribute of a child component
- 'expose' makes an attribute or method available for external elements
- 'provide' makes attributes or methods available to child components

How do I run the application?
- under linux, go directly to the folder and type 'make sta' in a terminal
- under Windows, go directly to the folder and type the following commands in a terminal 
       - docker-compose build
       - docker-compose up -d
- test with test files => chicout_line.kml, chicout_point.kml, chicout_polygon.kml
![image](https://github.com/user-attachments/assets/a5389e76-8822-4e63-8e31-7ff0894d8cd4)
![image](https://github.com/user-attachments/assets/2c90264b-ed9a-4f42-802f-5791f6052db7)

