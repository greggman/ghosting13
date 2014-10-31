// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var scene;
var camera;
var renderer;
var g_objs;
var g_dt = 1.0 / 60.0;
var g_time = 0.0;

$(function() {
  	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x6D3E86, 0.25 );
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 5;


	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	// objs
	g_objs = new ObjManager();
	g_objs.init();

	(function animloop(){
	  requestAnimFrame(animloop);
	  render();
	  g_time += g_dt;
	})();
});

function render()
{
	renderer.setClearColor( 0x6D3E86, 1);
	renderer.render( scene, camera );

	g_objs.update();
	g_objs.draw();
}

