import starling.display.Sprite;
import starling.utils.AssetManager;
import starling.display.Image;
import starling.core.Starling;
import starling.animation.Transitions;
import starling.events.KeyboardEvent;
import flash.ui.Keyboard;
import starling.events.TouchEvent;
import starling.events.TouchPhase;
import starling.events.Event;
import starling.utils.RectangleUtil;
import flash.geom.Rectangle;
import starling.textures.Texture;


import Tilemap;
import Bounds;

class Root extends Sprite{

    public static var assets:AssetManager;
    public var ninja:Image;
    public var portal:Image;
    
	//For the tilemap
	var tmxMain:Tilemap;

    public function new() {
        super();
    }

    public function start(startup:Startup) {
    
    	assets = new AssetManager();
    	
    	//tilemap
		assets.enqueue("assets/floor.png");
		assets.enqueue("assets/doorflip.png");
		assets.enqueue("assets/door3.png");
		assets.enqueue("assets/doorDown.png");
		assets.enqueue("assets/Bricks.png");
		assets.enqueue("assets/MainMap.tmx");

        assets.enqueue("assets/ninja.png");
        assets.enqueue("assets/portal.png");
        
        assets.loadQueue(function onProgress(ratio:Float) {

            if (ratio == 1) {

                Starling.juggler.tween(startup.loadingBitmap, 2.0, {
                    transition: Transitions.EASE_OUT,
                        delay: 1.0,
                        alpha: 0,
                        onComplete: function() {
                        startup.removeChild(startup.loadingBitmap);
                        
                        ninja = new Image(Root.assets.getTexture("ninja"));
                        ninja.x = 600;
                        ninja.y = 360;
                        
                        //portal = new Image(Root.assets.getTexture("portal"));
                        //portal.x = 10;
                        //portal.y = 10;
                        
                        // Load tilemap
						tmxMain = new Tilemap(Root.assets, "tmxMain");
						addChild(tmxMain);
						addChild(ninja);
						//addChild(portal);
						
                        
                        Starling.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, 
                        	function(event:KeyboardEvent){
                        		//trace(event.keyCode);
                        		if(event.keyCode == Keyboard.LEFT){
                        			ninja.x -= 10;
                        			}
                        		
                        		if(event.keyCode == Keyboard.RIGHT){
                        			ninja.x += 10;
                        			}
                        		if(event.keyCode == Keyboard.UP){
                        			ninja.y -= 10;
                        		}
                        		if(event.keyCode == Keyboard.DOWN){
                        			ninja.y += 10;
                        		}
                        	level1RB(ninja);
                        	});
                        	
                        	ninja.addEventListener(TouchEvent.TOUCH, 
                        	function(e:TouchEvent){
                        		var touch = e.getTouch(stage, TouchPhase.BEGAN);
                        		trace("NINJA TOUCHED");
                        		
                        	});
                                
                       // stage.addEventListener(Event.ENTER_FRAME, movecam);

                    }

                });
            }

        });
        
    }
    
	
	// Check Collision
    private function checkCollision(texture1:Image, texture2:Rectangle):Bool {
        return (texture1.bounds.intersects(texture2));
    }

	// main level right bounds
	public function level1RB(Image){
	
		//right bounds 
		var Bound1 = new Rectangle(659,229,25,122);
		var Bound2 = new Rectangle(994,162,26,65);
		var Bound3 = new Rectangle(991,35,29,78);
		var Bound4 = new Rectangle(657,405,28,121);
		var Bound5 = new Rectangle(656,581,28,201);
		
		//left bounds
		var Bound6 = new Rectangle(354,68,25,249);
		var Bound7 = new Rectangle(353,372,26,169);
		var Bound8 = new Rectangle(354,598,25,136);
		
		// top bounds
		var Bound9 = new Rectangle(611,37,377,25);
		var Bound10 = new Rectangle(354,36,202,26);
		
		// bottom bounds
		var Bound11 = new Rectangle(690,229,331,25);
		var Bound12 = new Rectangle(384,706,272,33);
		var Bound13 = new Rectangle(385,724,272,54);
		
		// right bounds
		if(checkCollision(Image,Bound1)||checkCollision(Image,Bound2)||checkCollision(Image,Bound3)||
		checkCollision(Image,Bound4)||checkCollision(Image,Bound5)){
			Image.x -= 10;
		}
		
		//left bounds
		if(checkCollision(Image,Bound6)||checkCollision(Image,Bound7)||checkCollision(Image,Bound8)){
			Image.x += 10;
		}
		
		//Top bounds
		if(checkCollision(Image,Bound9)||checkCollision(Image,Bound10)){
			Image.y += 10;
		}
		
		// bottom bounds
		if(checkCollision(Image,Bound11)||checkCollision(Image,Bound12)||checkCollision(Image,Bound13)){
			Image.y -= 10;
		}
	}

}
