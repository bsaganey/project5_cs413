TITLE=''


function setim(cmd,fxno){
testmagick(cmdstring);return false
document.getElementById("magicktext").value = cmd
document.getElementById("effectmenu").selectedIndex=0
if(cmt){
document.getElementById("imexp").innerHTML=cmt[fxno]
document.getElementById("effectmenu").selectedIndex=0
}
}


function convertpng(){
cmdstring = ' -quality 00 '
testmagick(cmdstring,'png')
}

function convertjpg(){
cmdstring = ' -quality 80 '
testmagick(cmdstring,'jpg')
}


function fgborder(){
bwidth = document.getElementById("borderwidth").value
if(!bwidth || bwidth == 0){alert("No border width set. No action");return(false)}
cmdstring = '-bordercolor @fghex -border ' + bwidth
if(dd.elements.imedit.visible==true){
setim(cmdstring,51)
}else{
testmagick(cmdstring)
}
}



function xshadow(){
cmdstring = ' -background  @fghex  \\\\( +clone -shadow 75x4+4+4 \\\\) +swap -background @bghex -flatten  -depth 8  -quality 80'
if(dd.elements.imedit.visible==true){
setim(cmdstring,50)
}else{
testmagick(cmdstring)
}
}


function rcorners(){
tfg=document.getElementById("fgpic").value
lth=tfg.length
if(tfg.substring(lth-4,lth+1)=="jpeg" || tfg.substring(lth-3,lth+1)=="jpg"){alert("JPG image does not transparency required for this effect\n\nConvert image to PNG first");return false};
cmdstring = '\\\\( +clone -threshold -1  -compose multiply  -draw "fill black polygon 0,0 0,15 15,0 fill white circle 15,15 15,0"  \\\\( +clone -flip \\\\) -composite \\\\( +clone -flop \\\\) -composite \\\\) +matte -compose Copy_Opacity -composite'
if(dd.elements.imedit.visible==true){
setim(cmdstring,55)
}else{
testmagick(cmdstring)
}
}

function polaroid(){
tfg=document.getElementById("fgpic").value
lth=tfg.length
cmdstring = '-bordercolor white  -border 6 -bordercolor grey75 -border 1 -background  none   -rotate 4 -background  @fghex  \\\\( +clone -shadow 75x4+4+4 \\\\) +swap -background @bghex -flatten  -depth 8  -quality 80'
if(dd.elements.imedit.visible==true){
setim(cmdstring,60)
}else{
testmagick(cmdstring)
}
}

function sharpen(){
cmdstring = "-sharpen 0x1"
if(dd.elements.imedit.visible==true){
setim(cmdstring,52)
}else{
testmagick(cmdstring)
}
}

function negate(){
cmdstring = "-negate"
if(dd.elements.imedit.visible==true){
setim(cmdstring,56)
}else{
testmagick(cmdstring)
}
}

function fblur(){
cmdstring = "-blur 0x.65"
if(dd.elements.imedit.visible==true){
setim(cmdstring,53)
}else{
testmagick(cmdstring)
}
}

function brighten(){
cmdstring = "-sigmoidal-contrast 4,0%"
if(dd.elements.imedit.visible==true){
setim(cmdstring,54)
}else{
testmagick(cmdstring)
}
}

function pencilsketch(){
cmdstring = '\\\\( +clone -tile imgpath/pencil3.gif -draw "color 0,0 reset" +clone +swap -compose color_dodge -composite \\\\)  -fx "u*.2+v*.7" -contrast -sepia-tone 80% -modulate 100,0'
if(dd.elements.imedit.visible==true){
setim(cmdstring,62)
}else{
testmagick(cmdstring)
}
}

function edgetrace(){
cmdstring = '-colorspace Gray -negate -edge 2 -negate -blur 0x.5'
if(dd.elements.imedit.visible==true){
setim(cmdstring,61)
}else{
testmagick(cmdstring)
}
}


function sframe(){
cmdstring = '-matte -bordercolor @bghex -border 10 -mattecolor @fghex -frame 10x10+6+0'
if(dd.elements.imedit.visible==true){
setim(cmdstring,57)
}else{
testmagick(cmdstring)
}
}

function maketransparent(){
fuzz=document.getElementById("fuzzfactor").value
if(!fuzz || fuzz==0 ){fuzz=1}
tfg=document.getElementById("fgpic").value
lth=tfg.length
if(tfg.substring(lth-4,lth+1)=="jpeg" || tfg.substring(lth-3,lth+1)=="jpg"){alert("Sorry JPG image does not support transparency\n\nPlease convert to PNG fomat first");return false};
cmdstring = '-fuzz ' +  fuzz + '% -transparent @bghex'
if(dd.elements.imedit.visible==true){
setim(cmdstring,58)
}else{
testmagick(cmdstring)
}
}

function colorize(){
strength=document.getElementById("colorizer").value
if(!strength || strength==0 ){strength=1}
tfg=document.getElementById("fgpic").value
cmdstring = '-fill white -colorize 50% \\\\( +clone +matte -fill @fghex -colorize ' + strength + '% \\\\)  -compose overlay -composite'
if(dd.elements.imedit.visible==true){
setim(cmdstring,59)
}else{
testmagick(cmdstring)
}
}

function effectbarcontent(){
	var content ='<div  class="menuhdr">'
	
// content += '<img style="float:right;" src="images/tinyclose.gif" onclick="togglefxbar();"/></div>'
content += '</div>'
	
content += '<img id="sharp" style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(12),TITLE,\'Sharpen\');redborder(this);figstat(\'Sharpen foreground image. \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  onclick="sharpen();" src="images/b-sharpen.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(11),TITLE,\'Soften\');redborder(this);figstat(\'Soften foreground image. \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  onclick="fblur();" src="images/b-blur.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(9),TITLE,\'Brighten\');redborder(this);figstat(\'Brighten foreground image. \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-brighten.gif"  onclick="brighten()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(10),TITLE,\'Round Corners\');redborder(this);figstat(\'Apply round corners to foreground image. \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-rcorners.gif"  onclick="rcorners()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(8),TITLE,\'Shadow\');redborder(this);figstat(\'Shadow foreground image. \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-shadow.gif"  onclick="xshadow()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(7),TITLE,\'Kodak Moment Effect\');redborder(this);figstat(\'Apply Kodak Moment effect. \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-polaroid.gif"  onclick="polaroid()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(6),TITLE,\'Pencil Sketch\');redborder(this);figstat(\'Pencil Sketch effect. \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-pencilsketch.gif"  onclick="pencilsketch()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(5),TITLE,\'Trace Edges\');redborder(this);figstat(\'Trace edges \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-trace.gif"  onclick="edgetrace()">'


content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(3),TITLE,\'Matted Frame\');redborder(this);figstat(\'Matted frame using foreground color \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-frameit.gif"  onclick="sframe()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(2),TITLE,\'Border\');redborder(this);figstat(\'Apply a solid border using current foreground color.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="setslider(\'Border width\', dd.elements.effectbar.x-175,parent.dd.elements.effectbar.y+190,1,180,document.getElementById(\'borderwidth\').value/.056,document.getElementById(\'borderwidth\').value)" src="images/b-fgborder.gif"><input type="hidden" id="borderwidth" value=1>'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(64),TITLE,\'Set Transparent Color\');redborder(this);figstat(\'Sets transparency in the current foreground image.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="setslider(\'Tolerance\', dd.elements.effectbar.x-175,parent.dd.elements.effectbar.y+215,1,200,document.getElementById(\'fuzzfactor\').value/.5,document.getElementById(\'fuzzfactor\').value)" src="images/b-maketransp.gif"><input type="hidden" id="fuzzfactor" value=1>'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(68),TITLE,\'Colorize\');redborder(this);figstat(\'Colorize.  Add foreground color to the foreground image\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="setslider(\'Strength\', dd.elements.effectbar.x-175,parent.dd.elements.effectbar.y+240,1,200,document.getElementById(\'colorizer\').value/.5,document.getElementById(\'colorizer\').value)" src="images/b-colorize.gif"><input type="hidden" id="colorizer" value=1>'


content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(67),TITLE,\'Negative Image\');redborder(this);figstat(\'Invert image colors \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-negate.gif"  onclick="negate()">'


content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(65),TITLE,\'Convert to PNG\');redborder(this);figstat(\'Convert to PNG \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-convpng.gif"  onclick="convertpng()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(66),TITLE,\'Convert to JPG\');redborder(this);figstat(\'Convert to JPG \')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  src="images/b-convjpg.gif"  onclick="convertjpg()">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(73),TITLE,\'Download Current Font\');redborder(this);figstat(\'Download the current font.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onClick="getfontlink()" src="images/b-getfont.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(1),TITLE,\'ImageMagick Editor\');redborder(this);figstat(\'Open the ImageMagick editor.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onClick="imed()" src="images/b-im.gif">'

//content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(1),TITLE,\'ImageMagick Editor\');redborder(this);figstat(\'Open the ImageMagick editor.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onClick="featurenotavailable()" src="images/b-im.gif">'


	return content;
}

fxbar();