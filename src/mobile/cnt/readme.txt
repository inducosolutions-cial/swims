npm uninstall -g cordova
npm uninstall -g ionic


npm install -g ionic
ionic start
npm install --save @ionic/storage
npm install @ionic-native/core
In the project folder give 
---- ionic info
It gives the ionic versions and cordova versions


Adding cordova 
---  npm install -g cordova ionic
2. in the project folder give the below command
---- ionic cordova platform  list
this creates the resources for  ios and android folders
--- cordova platform add android
it will install android related packagess.
---- ionic cordova run android

npm install @ionic-native/network
ionic cordova plugin add cordova-plugin-network-information 
npm install @awesome-cordova-plugins/network 
ionic cordova plugin add cordova-plugin-inappbrowser
npm install @awesome-cordova-plugins/in-app-browser 
npm install bootstrap --save