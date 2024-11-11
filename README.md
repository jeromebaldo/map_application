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

![image](https://github.com/user-attachments/assets/b9d78b6d-a181-4411-9cdc-2ac02360abe2)
![image](https://github.com/user-attachments/assets/8c852343-03f9-470b-9f92-9742b1ab1372)
![image](https://github.com/user-attachments/assets/bf566f22-ea63-414a-908a-dcc8dc787e04)




