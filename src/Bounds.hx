import starling.display.Sprite;
import starling.utils.AssetManager;
import starling.display.Image;
import starling.events.KeyboardEvent;
import flash.ui.Keyboard;
import starling.utils.RectangleUtil;
import flash.geom.Rectangle;
import starling.textures.Texture;

import Root;

class Bounds extends Sprite {
 // <object id="50" x="659" y="229" width="25" height="122"/>
 // <object id="51" x="690" y="229" width="331" height="25"/>
  //<object id="52" x="994" y="181" width="26" height="44"/>
  //<object id="55" x="991" y="35" width="29" height="78"/>
//  <object id="57" x="611" y="37" width="377" height="25"/>
//  <object id="58" x="354" y="36" width="186" height="26"/>
//  <object id="59" x="354" y="68" width="25" height="233"/>
//  <object id="60" x="353" y="372" width="26" height="155"/>
//  <object id="61" x="354" y="598" width="25" height="100"/>
//  <object id="62" x="656" y="437" width="29" height="89"/>
//  <object id="63" x="658" y="599" width="27" height="98"/>

	public var _level1B:Image;
	var Bound1 = new Rectangle(658,599, 27, 98);
	
	    public function new() {
        super();
    }
	
	public function level1RB(Image){
		if(checkCollision(Image,Bound1)){
			Image.x += 10;
		}
	}
	
	// Check Collision
    private function checkCollision(texture1:Image, texture2:Rectangle):Bool {
        return (texture1.bounds.intersects(texture2));
    }
}