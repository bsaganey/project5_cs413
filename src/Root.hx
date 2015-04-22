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
	var levelone:Tilemap;
	
		
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
		assets.enqueue("assets/levelone.tmx");

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
                        	doorEnter(ninja);
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
	
	/*public function leveloneBounds(Image){
	
	
				var LBound1 = new Rectangle(4.4287, 3.32152 ,21.0363, 458.37);
			var LBound2  =new Rectangle(4.4287 ,519.265, 19.9291, 197.077);
			var LBound3 = new Rectangle(31.0009 ,679.805, 1240.04 ,21.0363);
			var LBound4 = new Rectangle(1248.89, 5.53587 ,24.3578, 673.162);
			var LBound5 = new Rectangle(633.2152, 4.4287, 1214.57 ,8.8574);
			var LBound6 = new Rectangle(1044.07 ,17.7148 ,19.9291 ,75.2879);
			var LBound7 = new Rectangle(1042.96 ,166.076 ,204.827 ,23.2507);
			var LBound8 = new Rectangle(1044.07 ,193.756 ,21.0363 ,378.654);
			var LBound9 = new Rectangle(1075.07 ,438.441 ,101.86 ,21.0363);
			var LBound10 = new Rectangle(1153.68 ,261.293 ,24.3578 ,171.612);
			var LBound11 = new Rectangle(548.051 ,18.822 ,22.1435 ,71.9663);
			var LBound12 = new Rectangle(577.945 ,69.752 ,132.861 ,23.2507);
			var LBound13 = new Rectangle(276.794 ,167.183 ,677.591 ,21.0363);
			var LBound14 = new Rectangle(403.012 ,53.1444 ,21.0363 ,107.396);
			var LBound15 = new Rectangle(117.36 ,85.2524 ,18.822 ,136.182);
			var LBound16 = new Rectangle(141.718 ,87.4668 ,152.79 ,18.822);
			var LBound17 = new Rectangle(276.794 ,114.039 ,22.1435 ,45.3942);
			var LBound18 = new Rectangle(484.942 ,195.97 ,24.3578 ,368.689);
			var LBound19 = new Rectangle(403.012 ,566.873 ,195.97 ,21.0363);
			var LBound20 = new Rectangle(580.159 ,311.116 ,19.9291 ,252.436);
			var LBound21 = new Rectangle(605.624 ,311.116 ,187.112 ,17.7148);
			var LBound22 = new Rectangle(6773.915, 246.9 ,18.822 ,54.2516);
			var LBound23 = new Rectangle(802.702, 249.114, 117.36 ,17.7148);
			var LBound24 = new Rectangle(901.24 ,274.579 ,19.9291 ,166.076);
			var LBound25 = new Rectangle(708.592 ,421.833 ,191.541 ,23.2507);
			var LBound26 = new Rectangle(707.484 ,452.834 ,23.2507 ,219.221);
			
			var LBound27 = new Rectangle(837.024 ,550.266 ,202.613 ,19.9291);
			var LBound28 = new Rectangle(400.797 ,277.901, 23.2507, 283.437);
			var LBound29 = new Rectangle(7275.686, 276.794 ,121.789 ,22.1435);
			var LBound30 = new Rectangle(276.794 ,306.687 ,21.0363 ,106.289);
			var LBound31 = new Rectangle(277.901 ,503.764 ,19.9291 ,87.4668);
			var LBound32 = new Rectangle(31.0009 ,567.981 ,242.471 ,22.1435);
			var LBound33 = new Rectangle(116.253 ,293.401 ,21.0363 ,151.683);
			var LBound34 = new Rectangle(29.8937 ,426.262 ,85.2524 ,18.822);
			var LBound35 = new Rectangle(819.309 ,69.752 ,222.542 ,25.465);
			
			
			Starling.current.stage.addEventListener(KeyboardEvent.KEY_DOWN, 
                        	function(event:KeyboardEvent){
                        		//trace(event.keyCode);
                        		if(event.keyCode == Keyboard.LEFT){
					if(checkCollision(Image,LBound1)||checkCollision(Image,LBound2)||checkCollision(Image,LBound3)||
			checkCollision(Image,LBound4)||checkCollision(Image,LBound5)||checkCollision(Image,LBound6)||
			checkCollision(Image,LBound7)||checkCollision(Image,LBound8)||checkCollision(Image,LBound9)||
			checkCollision(Image,LBound10)||checkCollision(Image,LBound11)||checkCollision(Image,LBound12)||
			checkCollision(Image,LBound13)||checkCollision(Image,LBound14)||checkCollision(Image,LBound15)||
			checkCollision(Image,LBound16)||checkCollision(Image,LBound17)||checkCollision(Image,LBound18)||
			checkCollision(Image,LBound19)||checkCollision(Image,LBound20)||checkCollision(Image,LBound21)||
			checkCollision(Image,LBound22)||checkCollision(Image,LBound23)||checkCollision(Image,LBound24)||
			checkCollision(Image,LBound25)||checkCollision(Image,LBound26)||checkCollision(Image,LBound27)||
			checkCollision(Image,LBound28)||checkCollision(Image,LBound29)||checkCollision(Image,LBound30)||
			checkCollision(Image,LBound31)||checkCollision(Image,LBound32)||checkCollision(Image,LBound33)||
			checkCollision(Image,LBound34)||checkCollision(Image,LBound35)){
				Image.x -= 10;
			
			}
			}
			if(event.keyCode == Keyboard.RIGHT){
						if(checkCollision(Image,LBound1)||checkCollision(Image,LBound2)||checkCollision(Image,LBound3)||
			checkCollision(Image,LBound4)||checkCollision(Image,LBound5)||checkCollision(Image,LBound6)||
			checkCollision(Image,LBound7)||checkCollision(Image,LBound8)||checkCollision(Image,LBound9)||
			checkCollision(Image,LBound10)||checkCollision(Image,LBound11)||checkCollision(Image,LBound12)||
			checkCollision(Image,LBound13)||checkCollision(Image,LBound14)||checkCollision(Image,LBound15)||
			checkCollision(Image,LBound16)||checkCollision(Image,LBound17)||checkCollision(Image,LBound18)||
			checkCollision(Image,LBound19)||checkCollision(Image,LBound20)||checkCollision(Image,LBound21)||
			checkCollision(Image,LBound22)||checkCollision(Image,LBound23)||checkCollision(Image,LBound24)||
			checkCollision(Image,LBound25)||checkCollision(Image,LBound26)||checkCollision(Image,LBound27)||
			checkCollision(Image,LBound28)||checkCollision(Image,LBound29)||checkCollision(Image,LBound30)||
			checkCollision(Image,LBound31)||checkCollision(Image,LBound32)||checkCollision(Image,LBound33)||
			checkCollision(Image,LBound34)||checkCollision(Image,LBound35)){
				Image.x += 10;
			}
			}
			if(event.keyCode == Keyboard.UP){
						if(checkCollision(Image,LBound1)||checkCollision(Image,LBound2)||checkCollision(Image,LBound3)||
			checkCollision(Image,LBound4)||checkCollision(Image,LBound5)||checkCollision(Image,LBound6)||
			checkCollision(Image,LBound7)||checkCollision(Image,LBound8)||checkCollision(Image,LBound9)||
			checkCollision(Image,LBound10)||checkCollision(Image,LBound11)||checkCollision(Image,LBound12)||
			checkCollision(Image,LBound13)||checkCollision(Image,LBound14)||checkCollision(Image,LBound15)||
			checkCollision(Image,LBound16)||checkCollision(Image,LBound17)||checkCollision(Image,LBound18)||
			checkCollision(Image,LBound19)||checkCollision(Image,LBound20)||checkCollision(Image,LBound21)||
			checkCollision(Image,LBound22)||checkCollision(Image,LBound23)||checkCollision(Image,LBound24)||
			checkCollision(Image,LBound25)||checkCollision(Image,LBound26)||checkCollision(Image,LBound27)||
			checkCollision(Image,LBound28)||checkCollision(Image,LBound29)||checkCollision(Image,LBound30)||
			checkCollision(Image,LBound31)||checkCollision(Image,LBound32)||checkCollision(Image,LBound33)||
			checkCollision(Image,LBound34)||checkCollision(Image,LBound35)){
				Image.y -= 10;
			}
			}
			if(event.keyCode == Keyboard.DOWN){
						if(checkCollision(Image,LBound1)||checkCollision(Image,LBound2)||checkCollision(Image,LBound3)||
			checkCollision(Image,LBound4)||checkCollision(Image,LBound5)||checkCollision(Image,LBound6)||
			checkCollision(Image,LBound7)||checkCollision(Image,LBound8)||checkCollision(Image,LBound9)||
			checkCollision(Image,LBound10)||checkCollision(Image,LBound11)||checkCollision(Image,LBound12)||
			checkCollision(Image,LBound13)||checkCollision(Image,LBound14)||checkCollision(Image,LBound15)||
			checkCollision(Image,LBound16)||checkCollision(Image,LBound17)||checkCollision(Image,LBound18)||
			checkCollision(Image,LBound19)||checkCollision(Image,LBound20)||checkCollision(Image,LBound21)||
			checkCollision(Image,LBound22)||checkCollision(Image,LBound23)||checkCollision(Image,LBound24)||
			checkCollision(Image,LBound25)||checkCollision(Image,LBound26)||checkCollision(Image,LBound27)||
			checkCollision(Image,LBound28)||checkCollision(Image,LBound29)||checkCollision(Image,LBound30)||
			checkCollision(Image,LBound31)||checkCollision(Image,LBound32)||checkCollision(Image,LBound33)||
			checkCollision(Image,LBound34)||checkCollision(Image,LBound35)){
				Image.y += 10;
			}
			}
			}
	}*/
	
	public function doorEnter(Image){
	
		//677" y="534" width="8" height="41
		var Door1 = new Rectangle(677,534,8,41);
		if(checkCollision(Image, Door1)){
			
					//right bounds 
				Bound1 = new Rectangle(0,0,0,0);
				Bound2 = new Rectangle(0,0,0,0);
				Bound3 = new Rectangle(0,0,0,0);
				Bound4 = new Rectangle(0,0,0,0);
				Bound5 = new Rectangle(0,0,0,0);
		
				//left bounds
				Bound6 = new Rectangle(0,0,0,0);
				Bound7 = new Rectangle(0,0,0,0);
				Bound8 = new Rectangle(0,0,0,0);
		
				// top bounds
				Bound9 = new Rectangle(0,0,0,0);
				Bound10 = new Rectangle(0,0,0,0);
		
				// bottom bounds
				Bound11 = new Rectangle(0,0,0,0);
				Bound12 = new Rectangle(0,0,0,0);
				Bound13 = new Rectangle(0,0,0,0);


			
			removeChild(tmxMain);
			levelone = new Tilemap(Root.assets, "levelone");
			addChild(levelone);
			}
			
			
			
	}

}
