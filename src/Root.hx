import starling.display.Sprite;
import starling.display.Button;
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
import Math;

class Root extends Sprite{

    public static var assets:AssetManager;
    public var ninja:Image;
    public var portal:Image;
	public var menu:Menu;
    public var credits:Credits;
	public var currentMenu:String;
    public var currentButton:Int;
	
	//For the tilemap
	var tmxMain:Tilemap;
	var levelone:Tilemap;
	var leveltwo:Tilemap;
	var level3:Tilemap;
	var level4:Tilemap;
	var level5:Tilemap;
	
		// Main level Bounds 
		//right bounds 
		var Bound1 = new Rectangle(659,229,25,175);
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
		
		var Bound14 = new Rectangle(0,0,0,0);
		var Bound15 = new Rectangle(0,0,0,0);
		var Bound16 = new Rectangle(0,0,0,0);
		var Bound17 = new Rectangle(0,0,0,0);
		var Bound18 = new Rectangle(0,0,0,0);
		var Bound19 = new Rectangle(0,0,0,0);
		var Bound20 = new Rectangle(0,0,0,0);
		var Bound21 = new Rectangle(0,0,0,0);
		var Bound22 = new Rectangle(0,0,0,0);
		var Bound23 = new Rectangle(0,0,0,0);
		var Bound24 = new Rectangle(0,0,0,0);
		var Bound25 = new Rectangle(0,0,0,0);
		var Bound26 = new Rectangle(0,0,0,0);
			
		var Bound27 = new Rectangle(0,0,0,0);
		var Bound28 = new Rectangle(0,0,0,0);
		var Bound29 = new Rectangle(0,0,0,0);
		var Bound30 = new Rectangle(0,0,0,0);
		var Bound31 = new Rectangle(0,0,0,0);
		var Bound32 = new Rectangle(0,0,0,0);
		var Bound33 = new Rectangle(0,0,0,0);
		var Bound34 = new Rectangle(0,0,0,0);
		var Bound35 = new Rectangle(0,0,0,0);
		
		var levelonePortal = new Rectangle(0,0,0,0);

		
		

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
		
		assets.enqueue("assets/tmxMain.tmx");
		assets.enqueue("assets/levelone.tmx");

        assets.enqueue("assets/ninja.png");
        assets.enqueue("assets/portal.png");
		
		assets.enqueue("assets/startbutton.png");
        assets.enqueue("assets/startbutton_selected.png");
        assets.enqueue("assets/credits.png");
        assets.enqueue("assets/backbutton.png");
        assets.enqueue("assets/backbutton_selected.png");
        assets.enqueue("assets/creditsbutton.png");
        assets.enqueue("assets/creditsbutton_selected.png");
        
        assets.loadQueue(function onProgress(ratio:Float) {

            if (ratio == 1) {

                Starling.juggler.tween(startup.loadingBitmap, 2.0, {
                    transition: Transitions.EASE_OUT,
                        delay: 1.0,
                        alpha: 0,
                        onComplete: function() {
                        startup.removeChild(startup.loadingBitmap);
                    }
                });
				addEventListener(Event.TRIGGERED, menuButtonClicked);
				addMenu();
            }

        });
        
    }
	
	public function startGame() {
		//Tween out the menu
        Starling.juggler.tween(getChildAt(0), 0.25, {
                    transition: Transitions.EASE_OUT,
                        delay: 0.0,
                        alpha: 0.0,
                        onComplete: function() {
                            removeChildAt(0, true);
							ninja = new Image(Root.assets.getTexture("ninja"));
							ninja.x = 506;
							ninja.y = 695;
							ninja.pivotX = ninja.width  * 0.5;
							ninja.pivotY = ninja.height * 0.5;
		
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
								if (event.keyCode == Keyboard.LEFT) {
									ninja.rotation = (3*Math.PI/2);
									ninja.x -= 10;
									leveloneBoundsL(ninja);
									
								}
								
								if (event.keyCode == Keyboard.RIGHT) {
									ninja.rotation = (Math.PI/2);
									ninja.x += 10;
									leveloneBoundsR(ninja);
								}
								if (event.keyCode == Keyboard.UP) {
									ninja.rotation = (0);
									ninja.y -= 10;
									leveloneBoundsUP(ninja);
								}
								if (event.keyCode == Keyboard.DOWN) {
									ninja.rotation = (Math.PI);
									ninja.y += 10;
									leveloneBoundsD(ninja);
								}
								
							if(checkCollision(ninja,levelonePortal)){
								ninja.x = 25;
								ninja.y = 490;
							}
							
							doorEnter(ninja);
							});
							
							
                        }
        });
	
	}
	
	public function menuButtonClicked(event:Event) {
        var button = cast(event.target, Button);
        if(button.name == "start") {
            startGame();
        } 
        else if(button.name == "credits") {
            showCredits();
        }  
        else if(button.name == "back") {
            Starling.juggler.tween(getChildAt(0), .25, {
                    transition: Transitions.EASE_OUT,
                        delay: 0.0,
                        alpha: 0.0,
                        onComplete: function() {
                            removeChildAt(0,true);
                            }
        
            });
            addMenu();
        }
    }
	
	public function addMenu() {

        menu = new Menu();
        menu.alpha = 0;
        addChild(menu);
        //Tween in menu
        Starling.juggler.tween(menu, 0.25, {
                    transition: Transitions.EASE_IN,
                        delay: 0.0,
                        alpha: 1.0
        });
    }
	
	public function showCredits() {
        //Tween out the menu
        Starling.juggler.tween(getChildAt(0), 0.25, {
                    transition: Transitions.EASE_OUT,
                        delay: 0.0,
                        alpha: 0.0,
                        onComplete: function() {
                            removeChildAt(0,true);
                        }
        });
        credits = new Credits();
        credits.alpha = 0;
        addChild(credits);
        //Tween in xredits screen
        Starling.juggler.tween(credits, 0.25, {
                    transition: Transitions.EASE_IN,
                        delay: .25,
                        alpha: 1.0
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
	
	public function leveloneBoundsR(Image){
			if(checkCollision(Image,Bound1)||checkCollision(Image,Bound2)||checkCollision(Image,Bound3)||
			checkCollision(Image,Bound4)||checkCollision(Image,Bound5)||checkCollision(Image,Bound6)||
			checkCollision(Image,Bound7)||checkCollision(Image,Bound8)||checkCollision(Image,Bound9)||
			checkCollision(Image,Bound10)||checkCollision(Image,Bound11)||checkCollision(Image,Bound12)||
			checkCollision(Image,Bound13)||checkCollision(Image,Bound14)||checkCollision(Image,Bound15)||
			checkCollision(Image,Bound16)||checkCollision(Image,Bound17)||checkCollision(Image,Bound18)||
			checkCollision(Image,Bound19)||checkCollision(Image,Bound20)||checkCollision(Image,Bound21)||
			checkCollision(Image,Bound22)||checkCollision(Image,Bound23)||checkCollision(Image,Bound24)||
			checkCollision(Image,Bound25)||checkCollision(Image,Bound26)||checkCollision(Image,Bound27)||
			checkCollision(Image,Bound28)||checkCollision(Image,Bound29)||checkCollision(Image,Bound30)||
			checkCollision(Image,Bound31)||checkCollision(Image,Bound32)||checkCollision(Image,Bound33)||
			checkCollision(Image,Bound34)||checkCollision(Image,Bound35)){
				Image.x -= 10;
			
			}
	}
	
	public function leveloneBoundsUP(Image){
			
			if(checkCollision(Image,Bound1)||checkCollision(Image,Bound2)||checkCollision(Image,Bound3)||
			checkCollision(Image,Bound4)||checkCollision(Image,Bound5)||checkCollision(Image,Bound6)||
			checkCollision(Image,Bound7)||checkCollision(Image,Bound8)||checkCollision(Image,Bound9)||
			checkCollision(Image,Bound10)||checkCollision(Image,Bound11)||checkCollision(Image,Bound12)||
			checkCollision(Image,Bound13)||checkCollision(Image,Bound14)||checkCollision(Image,Bound15)||
			checkCollision(Image,Bound16)||checkCollision(Image,Bound17)||checkCollision(Image,Bound18)||
			checkCollision(Image,Bound19)||checkCollision(Image,Bound20)||checkCollision(Image,Bound21)||
			checkCollision(Image,Bound22)||checkCollision(Image,Bound23)||checkCollision(Image,Bound24)||
			checkCollision(Image,Bound25)||checkCollision(Image,Bound26)||checkCollision(Image,Bound27)||
			checkCollision(Image,Bound28)||checkCollision(Image,Bound29)||checkCollision(Image,Bound30)||
			checkCollision(Image,Bound31)||checkCollision(Image,Bound32)||checkCollision(Image,Bound33)||
			checkCollision(Image,Bound34)||checkCollision(Image,Bound35)){
				Image.y += 10;
			}
	}
	
	public function leveloneBoundsL(Image){
					

						if(checkCollision(Image,Bound1)||checkCollision(Image,Bound2)||checkCollision(Image,Bound3)||
			checkCollision(Image,Bound4)||checkCollision(Image,Bound5)||checkCollision(Image,Bound6)||
			checkCollision(Image,Bound7)||checkCollision(Image,Bound8)||checkCollision(Image,Bound9)||
			checkCollision(Image,Bound10)||checkCollision(Image,Bound11)||checkCollision(Image,Bound12)||
			checkCollision(Image,Bound13)||checkCollision(Image,Bound14)||checkCollision(Image,Bound15)||
			checkCollision(Image,Bound16)||checkCollision(Image,Bound17)||checkCollision(Image,Bound18)||
			checkCollision(Image,Bound19)||checkCollision(Image,Bound20)||checkCollision(Image,Bound21)||
			checkCollision(Image,Bound22)||checkCollision(Image,Bound23)||checkCollision(Image,Bound24)||
			checkCollision(Image,Bound25)||checkCollision(Image,Bound26)||checkCollision(Image,Bound27)||
			checkCollision(Image,Bound28)||checkCollision(Image,Bound29)||checkCollision(Image,Bound30)||
			checkCollision(Image,Bound31)||checkCollision(Image,Bound32)||checkCollision(Image,Bound33)||
			checkCollision(Image,Bound34)||checkCollision(Image,Bound35)){
				Image.x += 10;
			}

			
			
	}
	
	public function leveloneBoundsD(Image){
	
			if(checkCollision(Image,Bound1)||checkCollision(Image,Bound2)||checkCollision(Image,Bound3)||
			checkCollision(Image,Bound4)||checkCollision(Image,Bound5)||checkCollision(Image,Bound6)||
			checkCollision(Image,Bound7)||checkCollision(Image,Bound8)||checkCollision(Image,Bound9)||
			checkCollision(Image,Bound10)||checkCollision(Image,Bound11)||checkCollision(Image,Bound12)||
			checkCollision(Image,Bound13)||checkCollision(Image,Bound14)||checkCollision(Image,Bound15)||
			checkCollision(Image,Bound16)||checkCollision(Image,Bound17)||checkCollision(Image,Bound18)||
			checkCollision(Image,Bound19)||checkCollision(Image,Bound20)||checkCollision(Image,Bound21)||
			checkCollision(Image,Bound22)||checkCollision(Image,Bound23)||checkCollision(Image,Bound24)||
			checkCollision(Image,Bound25)||checkCollision(Image,Bound26)||checkCollision(Image,Bound27)||
			checkCollision(Image,Bound28)||checkCollision(Image,Bound29)||checkCollision(Image,Bound30)||
			checkCollision(Image,Bound31)||checkCollision(Image,Bound32)||checkCollision(Image,Bound33)||
			checkCollision(Image,Bound34)||checkCollision(Image,Bound35)){
				Image.y -= 10;
			}
	}
	
	public function doorEnter(Image){
	
		//677" y="534" width="8" height="41
		var Door1 = new Rectangle(677,534,8,41);
		var Door2 = new Rectangle(353,549,13,42);
		var Door3 = new Rectangle(677,358,9,43);
		var Door4 = new Rectangle(352,325,14,42);
		var Door5 = new Rectangle(563,38,42,8);
		
		
		if(checkCollision(Image, Door1)){
			

				
						//level one Bounds
				Bound1 = new Rectangle(4.4287, 3.32152 ,21.0363, 458.37);
				Bound2  =new Rectangle(4.4287 ,519.265, 19.9291, 197.077);
				Bound3 = new Rectangle(31.0009 ,679.805, 1240.04 ,21.0363);
				Bound4 = new Rectangle(1248.89, 5.53587 ,24.3578, 673.162);
				Bound5 = new Rectangle(633.2152, 4.4287, 1214.57 ,8.8574);
				Bound6 = new Rectangle(1044.07 ,17.7148 ,19.9291 ,75.2879);
				Bound7 = new Rectangle(1042.96 ,166.076 ,204.827 ,23.2507);
				Bound8 = new Rectangle(1044.07 ,193.756 ,21.0363 ,378.654);
				Bound9 = new Rectangle(1075.07 ,438.441 ,101.86 ,21.0363);
				Bound10 = new Rectangle(1153.68 ,261.293 ,24.3578 ,171.612);
				Bound11 = new Rectangle(548.051 ,18.822 ,22.1435 ,71.9663);
				Bound12 = new Rectangle(577.945 ,69.752 ,132.861 ,23.2507);
				Bound13 = new Rectangle(276.794 ,167.183 ,677.591 ,21.0363);
				Bound14 = new Rectangle(403.012 ,53.1444 ,21.0363 ,107.396);
				Bound15 = new Rectangle(117.36 ,85.2524 ,18.822 ,136.182);
				Bound16 = new Rectangle(141.718 ,87.4668 ,152.79 ,18.822);
				Bound17 = new Rectangle(276.794 ,114.039 ,22.1435 ,45.3942);
				Bound18 = new Rectangle(484.942 ,195.97 ,24.3578 ,368.689);
				Bound19 = new Rectangle(403.012 ,566.873 ,195.97 ,21.0363);
				Bound20 = new Rectangle(580.159 ,311.116 ,19.9291 ,252.436);
				Bound21 = new Rectangle(605.624 ,311.116 ,187.112 ,17.7148);
				Bound22 = new Rectangle(6773.915, 246.9 ,18.822 ,54.2516);
				Bound23 = new Rectangle(802.702, 249.114, 117.36 ,17.7148);
				Bound24 = new Rectangle(901.24 ,274.579 ,19.9291 ,166.076);
				Bound25 = new Rectangle(708.592 ,421.833 ,191.541 ,23.2507);
				Bound26 = new Rectangle(707.484 ,452.834 ,23.2507 ,219.221);
			
				Bound27 = new Rectangle(837.024 ,550.266 ,202.613 ,19.9291);
				Bound28 = new Rectangle(400.797 ,277.901, 23.2507, 283.437);
				Bound29 = new Rectangle(7275.686, 276.794 ,121.789 ,22.1435);
				Bound30 = new Rectangle(276.794 ,306.687 ,21.0363 ,106.289);
				Bound31 = new Rectangle(277.901 ,503.764 ,19.9291 ,87.4668);
				Bound32 = new Rectangle(31.0009 ,567.981 ,242.471 ,22.1435);
				Bound33 = new Rectangle(116.253 ,293.401 ,21.0363 ,151.683);
				Bound34 = new Rectangle(29.8937 ,426.262 ,85.2524 ,18.822);
				Bound35 = new Rectangle(819.309 ,69.752 ,222.542 ,25.465);
				
				levelonePortal = new Rectangle(235,530,10,10);
				level2Portal = new Rectangle(497,129,10,10);
				level3Portal = new Rectangle(639,582,10,10);
				level4Portal = new Rectangle(910,482,10,10);

			removeChild(tmxMain);
			levelone = new Tilemap(Root.assets, "levelone");
			addChild(levelone);
			Image.x = 25;
			Image.y = 490;
			
			}
			
				if(checkCollision(Image, Door2)){
			
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
			leveltwo = new Tilemap(Root.assets, "leveltwo");
			addChild(leveltwo);
			}
						
				if(checkCollision(Image, Door3)){
			
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
			level3 = new Tilemap(Root.assets, "level3");
			addChild(level3);
			}
			
						
				if(checkCollision(Image, Door4)){
			
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
			level4 = new Tilemap(Root.assets, "level4");
			addChild(level4);
			}
			
						
				if(checkCollision(Image, Door5)){
			
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
			level5 = new Tilemap(Root.assets, "level5");
			addChild(level5);
			}
	}

}

class Menu extends Sprite {
    public var startButton:Button;
    public var creditsButton:Button;
    public var totalButtons:Int;
    public var currentButton:Int;

    public function new() {
        super();
        currentButton = 0;
        //var title = new Image(Root.assets.getTexture("title"));
        //title.x = .5*(flash.Lib.current.stage.stageWidth - title.width);
        //title.y = 0;
        //addChild(title);
        startButton = new Button(Root.assets.getTexture("startbutton"), "", null, Root.assets.getTexture("startbutton_selected"));
        startButton.name = "start";

        startButton.x = .5*(flash.Lib.current.stage.stageWidth - startButton.width) ;
        startButton.y = 400;
        this.addChild(startButton);

        creditsButton = new Button(Root.assets.getTexture("creditsbutton"), "", null, Root.assets.getTexture("creditsbutton_selected"));

        creditsButton.x = .5*(flash.Lib.current.stage.stageWidth - startButton.width);
        creditsButton.y = 450;

        creditsButton.name = "credits";
        this.addChild(creditsButton);

    }
}

class Credits extends Sprite {

    public var backButton:Button;

    public function new() {
        super();
        backButton = new Button(Root.assets.getTexture("backbutton"), "", null, Root.assets.getTexture("backbutton_selected"));
        backButton.name = "back";
        backButton.x = 0;
        backButton.y = 500;
        this.addChild(backButton);
    }
}
