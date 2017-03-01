/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById("canvas");
	  const c = canvas.getContext('2d');
	});
	
	
	{/* <html>
	<body>
	<canvas width="800" height="600" id="canvas"></canvas>
	<script>
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.fillStyle = "red";
	c.fillRect(100,100,400,300);
	</script>
	</body>
	</html>  */}
	
	{/* <html>
	<body>
	<canvas width="800" height="600" id="canvas"></canvas>
	<script>
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	c.fillStyle = "red";
	c.fillRect(100,100,400,300);
	</script>
	</body>
	</html>  */}
	
	// Each level would be canvas with drawn images.
	
	
	// how to handle the floor disapearing???
	// Have it handled in the canvas drawing where I pass in an x and y coordinate? This updates every second How do I tell it to stop, when I get to the bottom of the ?
	// What happens when I dig through a floor and get to the air? Trigger a stop dig?
	
	
	// Handling the floor disappearing


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map