
var clipWin = null;
TITLE=''
term=""
sterm=""
dsterm=""
ftgt=""
//virtual path to webhosting root directory
//vpath = "http://interactimage.com/";
vpath = "http://interactimage.com/";

//physical path to hosting root
rootpath = "/var/www/vhosts/interactimage.com/httpdocs/";

function imhelp(){
document.getElementById("imexp").innerHTML=cmt[document.getElementById("effectmenu").selectedIndex]
}

function noinputimage(){
// displays alert message and cleans up when ajax returns no input image failure
alert("Operation failed.  The original image is probably gone from the server.\n\nPlease try it again.");
dd.elements.xfgimg.swapImage("php/files/xtrans.png");
document.getElementById('fgpic').value="xtrans.png"
document.getElementById('xfgimg').src="php/files/xtrans.png"
z=setTimeout("hideajax(true);",500)
}

function flipgo(){
var el=document.getElementById('gobutt')
if(dd.elements.dlayer.visible==true){
el.src='images/merge-on.gif'
}else{
el.src='images/tinygo-on.gif'
}
}

function flopgo(){
var el=document.getElementById('gobutt')
if(dd.elements.dlayer.visible==true){
el.src='images/merge.gif'
}else{
el.src='images/tinygo.gif'
}
}

function toggledlayer(){
//alert("Freehand draw is temporarily out of service.  The recent update to ImageMagick is not compatible with FIG scripts.  Will update and restore ASAP")
//return false
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer. Please create something first');return false}

var el = dd.elements.dlayer;
var em = document.getElementById('gobutt')
var en = dd.elements.overunder
if ( el.visible != false ) {
en.hide()
em.src='images/tinygo.gif'
el.hide();
}
else {
if(document.getElementById('svgdraw').value!=""){draw.Clean();pausecomp(650)
}
el.show();
en.show()
en.maximizeZ()
em.src='images/merge.gif'
el.maximizeZ();
t=setTimeout("loadflash()",1)
//if(dd.elements.xfgimg.w>480 || dd.elements.xfgimg.h>320){alert("The foreground image exceeds drawing canvas size of 480x320.\nThe merged image will be clipped.\n\nYou may want to resize the image first")}
}
}

function loadflash(){
draw.Clean()
}

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 

function atest(msg){
//alert(msg)
}

function loadactions(){
//init();
//alert("load")
togglelocks()
var b1 = new Image();
b1.src = 'images/tinygo-on.gif';
var dde=dd.elements
parent.document.getElementById('picurl').value=document.getElementById('fgpic').value;
dde.appcontainer.moveTo(210,25);
var appx=dd.elements.appcontainer.x
var appy=dd.elements.appcontainer.y


dde.appcontainer.setZ(-1);
dde.toolbar.moveTo(appx+484,appy);
dde.monitor.moveTo(appx+553,appy);
dde.sview.moveTo(appx+5,appy+5);
dde.utils.moveTo(appx-30,appy+134);

//-----login updates-----------------------
dde.figmail.moveTo(appx-40,appy+104);
dde.fbhandle.moveTo(appx + 15,appy+18)
dde.fb.moveTo(appx+15,appy+36)
dde.fbhandle.addChild("fb")
dde.oldsite.moveTo(appx+396,7)
dde.helpscr.moveTo(appx+445,7)
dde.feedback.moveTo(appx+2,7)
//-----end login updates-----------------------

dde.effectbar.moveTo(appx+519,appy);

dde.mainmenu.moveTo(appx+271,appy);
dde.tbar.moveTo(appx,appy+330);
dde.tbox.moveTo(appx,appy+350);
dde.prompt.moveTo(appx,appy+417);
dde.overunder.moveTo(appx+264,appy+331)
dde.tbar.addChild("overunder");
dde.overunder.hide()

dde.prompt.addChild("tbox");
dde.prompt.addChild("tbar");

//dde.info.moveTo(dde.tbar.x+462,dde.tbar.y+89);

dde.tbcolor.moveTo(dde.tbar.x+460,dde.tbar.y+88);
dde.tfcolor.moveTo(dde.tbar.x+466,dde.tbar.y+95);
dde.tbar.setZ(dd.elements.appcontainer.z+1);

dde.bgdiv.setZ(dd.elements.appcontainer.z+1);
dde.prompt.addChild("tfcolor");
dde.prompt.addChild("tbcolor");
//dde.prompt.addChild("info");

dde.tfcolor.setZ(dde.prompt.z+2);
dde.tbcolor.setZ(dde.prompt.z+1);
//dde.info.setZ(dde.prompt.z+12);

if(document.getElementById('xfgimg').src='php/files/xtrans.png'){dde.xfgimg.moveTo(appx,appy)}


dde.fbanner.moveTo(appx+1,appy+1);

dde.subcontent2.moveTo(appx+138,appy+228);
dde.imedit.moveTo(appx+138,appy+228);

dde.flooder.moveTo(appx,appy);
dde.floodfiller.moveTo(appx+100,appy+100);
dde.cropper.moveTo(appx,appy);
dde.floater.moveTo(appx,appy);

dde.advert1.moveTo(2,0);
dde.advert2.moveTo(appx+6,appy+445);


if(parent.dde.fbanner.div.innerHTML == ""){parent.dde.fbanner.div.innerHTML = '<img style="margin:10px 0px 0px 0px;"  onclick="forum()" src="php/files/xgetimage.png">';
}else{
parent.dde.fbanner.hide(true);
}

dde.appcontainer.setZ(-1);

showeffectbar()
showtoolbar();
document.forms[0].style.visibility='visible'
if(document.getElementById('mytext').value=='Type some text here'){document.getElementById('mytext').select();}

if(gup('fpic')){document.getElementById('mytext').select();document.getElementById('size').innerHTML=20;
}else{
sitedown();
document.getElementById('mytext').select();
}
init();

if(gup('focus')){
showfocuscat(gup('focus'))
toggleff();
dde.titlebar.moveTo(dde.appcontainer.x+316,dde.appcontainer.y+58)
document.getElementById('aclose').checked=false
//if no image on the querystring and a banner set by database, show the banner in the fontfinder
if(!gup('img') && document.getElementById('ftbanner').value.length > 6){openfontbanner();document.getElementById('fontbanner').innerHTML=document.getElementById('ftbanner').value}
}

if(gup('dfocus')){
showdingfocus(gup('dfocus'))
document.getElementById('dngfocus').value=gup('dfocus')
toggledm()
dde.dtitlebar.moveTo(dde.appcontainer.x+316,dde.appcontainer.y+58)
document.getElementById('dclose').checked=false
//if no image on the querystring and a banner set by database, show the banner in the fontfinder
if(document.getElementById('dngfocus').value > 6){opendingbanner();}
}

if(gup('search')){
toggleff();
dde.titlebar.moveTo(dde.appcontainer.x+316,dde.appcontainer.y+58)
document.getElementById('aclose').checked=false
document.getElementById("fftypes").selectedIndex=document.getElementById("fftypes").options.length-1
document.getElementById("ffid").innerHTML='--'
}

if(gup('dsearch')){
toggledm(1);
dde.dtitlebar.moveTo(dde.appcontainer.x+316,dde.appcontainer.y+58)
document.getElementById('dclose').checked=false
document.getElementById("dtypes").selectedIndex=document.getElementById("dtypes").options.length-1
getdingfonts(gup('dsearch'))
}
showinfo()
}

function showfocuscat(cat){
if(!cat || cat=='new'){document.getElementById("ffid").innerHTML='new';return false}
if(cat && (cat < 122 || cat > 124)){
document.getElementById("ffid").innerHTML=cat
}else{
document.getElementById("ffid").innerHTML=""
}
}

function showdingfocus(cat){
if(cat && cat ==130){document.getElementById("dmid").innerHTML='new';return false}
if(cat && (cat < 130 || cat > 132)){
document.getElementById("dmid").innerHTML=cat
}else{
document.getElementById("dmid").innerHTML=""
}
}

function oldsite(){
window.open ('http://dingbatty.com', 'old')
}

function findflooder(){
dd.elements.flooder.maximizeZ()
dd.elements.flooder.div.style.border = "5px solid red"
x=setTimeout("setflooderborder()",1200)
}

function setflooderborder(){
dd.elements.flooder.div.style.border = "none"
}

function showhistory(thepic){
var img = new Image();
img.src = "php/files/" + thepic
w=img.width;
h=img.height;
if(w==0){
x=setTimeout("showhistory(\'" + thepic + "\')",100)
}else{
var content ='<div  class="menuhdr"><span style="color:white;font:700 11px arial;float:left;">Image gallery</span>'
	
	content += '<span style="float:right;"><img style="vertical-align:middle;" src="images/tinyclose.gif" onclick="dd.elements.sview.hide()" /></span></div>'

		content +='<img src="php/files/'+thepic+'">'
dd.elements.sview.div.innerHTML = content;
dd.elements.sview.maximizeZ()
if(w >= 106){
dd.elements.sview.resizeTo(w+4,h+22)
}else{
dd.elements.sview.resizeTo(106,h+22)
}
dd.elements.sview.show();
}
}

// image monitor
function getthumbnails() {
AjaxRequest.get(
    {
    'parameters':{'notused':0}
     			,'url':'sssdate.php'
			,'onSuccess':function(req) {iscroll(req.responseText) }    }
  );
}

//-----------------------------Update monitor----------------------------------------------------
function iscroll(result) {
document.getElementById('monitor').innerHTML=result
//z=setTimeout("getthumbnails();",10000)
}

function overunder(){
var el = document.getElementById("mergeloc")
var oname=el.src
oname=oname.substring(oname.lastIndexOf('/')+1)
if (oname != "b-over.gif") {
el.src = "images/b-over.gif"
}else {
el.src = "images/b-under.gif"
if(parent.document.getElementById("istrans").value=="false"){
alert('Current image is probably not transparent.  It will cover freehand drawing when merged "under".\n\nStarting with a transparent image will allow the drawing to show through.')
}
}
}
function togglemonitor(){
var el = dd.elements.monitor;
if ( el.visible != false  ) {
document.getElementById('monitor').innerHTML='idle'
//clearTimeout(z)
el.hide();
}else {
el.show()
dd.elements.monitor.maximizeZ()
getthumbnails()
}
}

function infomsg(){
var msg = ""
msg+='Current Settings:\n'
msg+='--------------------------------------------------\n'
msg+='Font: ' + document.getElementById('font').options[document.getElementById('font').options.selectedIndex].text
if(document.getElementById('ffid').innerHTML){msg+='\nFont category: ' + document.getElementById('ffid').innerHTML}else{msg+='\nFont category: --'}

msg+='\n'
msg+='Dingbat: ' 
if(document.getElementById('dfonts').options[0]){
msg+= document.getElementById('dfonts').options[document.getElementById('dfonts').options.selectedIndex].text
}else if(document.getElementById('searchdingbat').value){msg+=document.getElementById('searchdingbat').value }else{msg+='--'}

if(document.getElementById('dmid').innerHTML){msg+='\nDingbat category: ' + document.getElementById('dmid').innerHTML}else{msg+='\nDingbat category: --'}


msg+='\n\n'
msg+='Dimensions: '+ dd.elements.xfgimg.w + " x " + dd.elements.xfgimg.h +" pixels"
msg+='\n'
//msg+='Font size: ' + document.getElementById('size').value
//msg+='\n'
msg+='File format: ' + document.getElementById('ffmt').value
msg+='\nTransparent: '
var istrans=document.getElementById('istrans').value
if(istrans=='true'){msg+='yes'}else{msg+='no'}
msg+='\n'
var pad=document.getElementById('padding').value
msg+='Padding: ' 
if(!pad){msg+='0'}else{msg+= pad}
msg+='\n\n\n'
alert(msg)
}

function showinfo(){
figstat('Ready')
}

function dinitWindow(){
var dde=dd.elements

dde.dtitlebar.moveTo(dde.dframe.x+2+dframe_padding, dde.dframe.y+2+dframe_padding);
dde.dtitlebar.addChild("dframe");
dde.dtitlebar.setZ(dde.dframe.z+1); // ensure that titlebar is floating above frame
dde.dtitlebar.resizeTo(dde.dframe.w-4-(dframe_padding<<1), dtitlebar_h);
dde.dclientarea.moveTo(dde.dframe.x+2+dframe_padding+dclientarea_margin, dde.dtitlebar.y+dtitlebar_h+dtoolbar_h+dclientarea_margin);

dde.dtitlebar.addChild("dclientarea");
dde.dclientarea.resizeTo(dde.dframe.w-4-(dframe_padding<<1)-(dclientarea_margin<<1), dde.dframe.h-dtitlebar_h-dtoolbar_h-dstatusbar_h-4+12-(dframe_padding<<1)-dclientarea_margin);

dde.dresizehandle.moveTo(dde.dframe.x+dde.dframe.w-dde.dresizehandle.w-2, dde.dframe.y+dde.dframe.h-dde.dresizehandle.h-2);

dde.dresizebutton.moveTo(dde.dtitlebar.x+dde.dtitlebar.w-dde.dresizebutton.w-dframe_padding-(dtitlebar_h>>1)+Math.round(dde.dresizebutton.w/2), dde.dtitlebar.y+Math.round(dtitlebar_h/2)-Math.round(dde.dresizebutton.h/2));

dde.dtitlebar.addChild("dresizebutton");
dde.dtitlebar.addChild("dresizehandle");
dde.dtitlebar.show();
dde.dtitlebar.maximizeZ();
}

function fback(pf){
var el = dd.elements.fbhandle
if(el.visible==false){
el.show()
el.maximizeZ()
loc=document.location.href.toLowerCase()
//if(isloggedin()){alert("logged in")}else{alert("not logged in")}
if(loc.indexOf("www")>-1){
document.getElementById("fbframe").src = "http://www.interactimage.com/php_login_v2/login.php"
}else{
document.getElementById("fbframe").src = "http://interactimage.com/php_login_v2/login.php"
}
}else{
el.hide()
}
}

function closefontbanner(){
dde.clientarea.moveTo(dde.frame.x+2+frame_padding+clientarea_margin, dde.titlebar.y+titlebar_h+toolbar_h+clientarea_margin);
dde.clientarea.resizeTo(dde.frame.w-4-(frame_padding<<1)-(clientarea_margin<<1), dde.frame.h-titlebar_h-toolbar_h-statusbar_h-4+12-(frame_padding<<1)-clientarea_margin);
document.getElementById("fontbanner").style.display="none"
}

function openfontbanner(){
dde.clientarea.moveTo(dde.frame.x+2+frame_padding+clientarea_margin, dde.titlebar.y+60+titlebar_h+toolbar_h+clientarea_margin);
dde.clientarea.resizeTo(dde.frame.w-4-(frame_padding<<1)-(clientarea_margin<<1), dde.frame.h-titlebar_h-toolbar_h-statusbar_h-60+12-(frame_padding<<1)-clientarea_margin);
document.getElementById("fontbanner").style.display="block"
}

function closedingbanner(){
dde.dclientarea.moveTo(dde.dframe.x+2+dframe_padding+dclientarea_margin, dde.dtitlebar.y+dtitlebar_h+dtoolbar_h+dclientarea_margin);
dde.dclientarea.resizeTo(dde.dframe.w-4-(dframe_padding<<1)-(dclientarea_margin<<1), dde.dframe.h-dtitlebar_h-dtoolbar_h-dstatusbar_h-4+12-(dframe_padding<<1)-dclientarea_margin);
document.getElementById("dingbanner").style.display="none"
}

function opendingbanner(){
dde.dclientarea.moveTo(dde.dframe.x+2+dframe_padding+dclientarea_margin, dde.dtitlebar.y+60+dtitlebar_h+dtoolbar_h+dclientarea_margin);
dde.dclientarea.resizeTo(dde.dframe.w-4-(dframe_padding<<1)-(dclientarea_margin<<1), dde.dframe.h-dtitlebar_h-dtoolbar_h-dstatusbar_h-60+12-(dframe_padding<<1)-dclientarea_margin);
document.getElementById("dingbanner").style.display="block"
}

function initWindow(){
var dde=dd.elements
dde.titlebar.moveTo(dde.frame.x+2+frame_padding, dde.frame.y+2+frame_padding);
dde.titlebar.addChild("frame");
dde.titlebar.setZ(dde.frame.z+1); // ensure that titlebar is floating above frame
dde.titlebar.resizeTo(dde.frame.w-4-(frame_padding<<1), titlebar_h);
if(gup('img')){
openfontbanner()
//dde.clientarea.moveTo(dde.frame.x+2+frame_padding+clientarea_margin, dde.titlebar.y+titlebar_h+toolbar_h+60+clientarea_margin);
//dde.clientarea.resizeTo(dde.frame.w-4-(frame_padding<<1)-(clientarea_margin<<1), dde.frame.h-titlebar_h-toolbar_h-statusbar_h-60+12-(frame_padding<<1)-clientarea_margin);
document.getElementById("fontbanner").style.display="block"
document.getElementById("fontbanner").innerHTML="<a href='" +  gup('link') + "' target='_blank'><img style='border:none;' src='" + gup('img') + "'></a>"
}else{
dde.clientarea.moveTo(dde.frame.x+2+frame_padding+clientarea_margin, dde.titlebar.y+titlebar_h+toolbar_h+clientarea_margin);
dde.clientarea.resizeTo(dde.frame.w-4-(frame_padding<<1)-(clientarea_margin<<1), dde.frame.h-titlebar_h-toolbar_h-statusbar_h-4+12-(frame_padding<<1)-clientarea_margin);
document.getElementById("fontbanner").style.display="none"
}
dde.titlebar.addChild("clientarea");
dde.resizehandle.moveTo(dde.frame.x+dde.frame.w-dde.resizehandle.w-2, dde.frame.y+dde.frame.h-dde.resizehandle.h-2);
dde.resizebutton.moveTo(dde.titlebar.x+dde.titlebar.w-dde.resizebutton.w-frame_padding-(titlebar_h>>1)+Math.round(dde.resizebutton.w/2), dde.titlebar.y+Math.round(titlebar_h/2)-Math.round(dde.resizebutton.h/2));

dde.titlebar.addChild("resizebutton");
dde.titlebar.addChild("resizehandle");
dde.titlebar.show();
}

// submit diskup form
function submitform(){
var userinput=document.getElementById('thefile').value;
showajax()
userinput = userinput.toLowerCase();
fext= right(userinput,4);
if(fext==".jpg" || fext==".gif" || fext==".png"){
thefile = "<?php echo session_ID() . '-' . substr(microtime(),-10); ?>";
thefile = thefile + fext;
document.uplform.action='process-userpic.php?thefile=' + thefile + '&thetype=' + fext;
document.uplform.submit()
toggleutils();
noundo()
}else{
alert("Sorry,  something is wrong with the file.  Try it again.")
hideajax(true);
return false();
}
}

function setimage(thisfile){
parent.dd.elements.xfgimg.swapImage('php/files/' + thisfile)
}


function maxff(){
var dde=dd.elements
dde.frame.maximizeZ()
dde.titlebar.setZ(dde.frame.z+1); 
dde.clientarea.setZ(dde.frame.z+2);
dde.resizebutton.setZ(dde.frame.z+3); 
dde.resizehandle.setZ(dde.frame.z+4)
}

function maxdm(){
var dde=dd.elements
dde.dframe.maximizeZ()
dde.dtitlebar.setZ(dde.dframe.z+1); 
dde.dclientarea.setZ(dde.dframe.z+2);
dde.dresizebutton.setZ(dde.dframe.z+3); 
dde.dresizehandle.setZ(dde.dframe.z+4)
}

function toggleff(){
var dde=dd.elements
var el = dde.titlebar;
if ( el.visible != false  ) {
dde.clientarea.hide(true);
dde.resizehandle.hide(true);
dde.frame.hide(true);
dde.resizebutton.hide(true);
dde.titlebar.hide(true);
last_window_h = dde.frame.h;
}
else {
dde.clientarea.show();
dde.frame.show();
dde.resizehandle.show();
dde.resizebutton.show();
dde.titlebar.show();
loadff()
}
}


function toggledm(search){
var dde=dd.elements
var el = dde.dtitlebar;
if ( el.visible != false  ) {
dde.dclientarea.hide(true);
dde.dresizehandle.hide(true);
dde.dframe.hide(true);
dde.dresizebutton.hide(true);
dde.dtitlebar.hide(true);
dlast_window_h = dde.dframe.h;
}
else {
dde.dclientarea.show();
dde.dframe.show();
dde.dresizehandle.show();
dde.dresizebutton.show();
dde.dtitlebar.show();
loadbats(search)
}
}

function imed() {
//alert("Sorry, IM editor is currently out of service due to technical issues.");
if(document.getElementById("effectmenu")){
toggleimedit()
}else{
loadscript('js/imeditor.js')
}
}


function showdingfaves(){
if(!document.getElementById("username").value){alert("Please login to use favorites.  Registration is free.");return false}
document.getElementById("dtypes").selectedIndex=11
getdingfonts()
}

function showfaves(){
if(!document.getElementById("username").value){alert("Please login to use favorites.  Registration is free.");return false}
document.getElementById("fftypes").selectedIndex=6
getResponse('fontfinder')
}

function favorites(tgt) {
if(document.getElementById("dtypes").value==135){alert("Sorry, you can\'t set Flickr sets as favorites");return false}
ftgt=tgt
if(tgt=='ff'){dd.elements.subcontent2.moveTo(dd.elements.frame.x+20,dd.elements.frame.y+50)
}else if(tgt=='dm'){dd.elements.subcontent2.moveTo(dd.elements.dframe.x+72,dd.elements.dframe.y+50)}

if(!document.getElementById("username").value){alert("Please login to use favorites.  Registration is free.");return false}
if(document.getElementById("fave")){

togglefxmenu()

}else{
//alert("load faves")
showajax()
loadscript('js/favorites.js')
}
}

function favespanel(){
//dd.elements.subcontent2.div.innerHTML = ""
t=favescontent()
var newfdiv = document.createElement("div");
newfdiv.innerHTML = t;
var container = document.getElementById("subcontent2");
container.appendChild(newfdiv);

dd.elements.subcontent2.maximizeZ();
togglefxmenu()
}

function jmenu() {
if(document.getElementById("effectmenu")){
togglefxmenu()
}else{
loadscript('js/fxeditor.js')
}
}

function toggleimedit(){
var el = dd.elements.imedit;
if ( el.visible != false ) {
el.hide();
}
else {
el.show();
el.maximizeZ();
}
}

function togglefxmenu(){
var el = dd.elements.subcontent2;
if ( el.visible != false ) {
el.hide();
}
else {
if(ftgt=='ff'){
document.getElementById("mdm").style.display='none'
document.getElementById("mff").style.display='block'

}else{
document.getElementById("mff").style.display='none'
document.getElementById("mdm").style.display='block'
}
el.show();
el.maximizeZ();
}
}

function impanel(){
dd.elements.imedit.div.innerHTML = imeditorcontent();
dd.elements.imedit.maximizeZ();
dd.elements.imedit.show()
}


function showfigmail(){
//alert("Sorry, the email server is disabled by spam. We're working to fix it.  \n\nPlease check the Blog for updates");return false
if(dd.elements.fbanner.visible==true){alert("No Image to send");return false;}
if(document.getElementById("sendermail")){
togglefigmail();
}else{
n=setTimeout("loadscript('js/figmail.js')",10)
}
}

function loadfigmaildiv(){
dd.elements.figmail.div.innerHTML = figmail();
dd.elements.figmail.show()
dd.elements.figmail.maximizeZ();
}

function showeffectbar(){
if(document.getElementById("sharp")){
togglefxbar();
}else{
loadscript('js/fxbar.js')
}
}

function fxbar(){
dd.elements.effectbar.div.innerHTML = effectbarcontent();
//dd.elements.effectbar.maximizeZ();
dd.elements.effectbar.show()
}

function togglefxbar(){
var el = dd.elements.effectbar;
var em = document.getElementById("fxcheck")
if ( em.checked != true  ) {
el.hide();
}else {
el.show()
el.maximizeZ()
}
}

function toggletools(){
var el = dd.elements.toolbar;
var em = document.getElementById("tcheck")
if ( em.checked != true  ) {
el.hide();
}else if (em.checked == true ){
el.show()
el.maximizeZ()
}
}

function togglelocks(){
var ek = dd.elements.mainmenu;
var el = dd.elements.toolbar;
var em = dd.elements.effectbar;
var en = document.getElementById("lockcheck")
var pr = dd.elements.prompt
if ( en.checked == true  ) {
el.setDraggable(false)
el.setResizable(false)
em.setDraggable(false)
em.setResizable(false)
ek.setDraggable(false)
ek.setResizable(false)
pr.setDraggable(false)
}else {
el.setDraggable(true)
el.setResizable(true)
em.setDraggable(true)
em.setResizable(true)
ek.setDraggable(true)
ek.setResizable(true)
pr.setDraggable(true)
}
}


function minisize(){
setslider('Font size',dd.elements.tbar.x+270,dd.elements.tbar.y-47,-2,180,document.getElementById("size").value,document.getElementById("size").value)
}

function menu() {
var el = document.getElementById('menutable');
var au = document.getElementById('aux');

if ( el.style.display != 'none' ) {
el.style.display = 'none';
au.style.display = 'block';
}
else {
el.style.display = 'block';
au.style.display = 'none';
}
}


function flipcolors(){
var oldfghex=document.getElementById("fgndcolor").value
var oldbghex=document.getElementById("thebgcolor").value

document.getElementById("fgndcolorchip").style.backgroundColor = oldbghex
dd.elements.tfcolor.div.style.backgroundColor=oldbghex
document.getElementById("thebgcolorchip").style.backgroundColor = oldfghex
dd.elements.tbcolor.div.style.backgroundColor=oldfghex

document.getElementById("fgndcolor").value = oldbghex
document.getElementById("thebgcolor").value = oldfghex

if(document.getElementById("ctarget") && document.getElementById("ctarget").value == " Foreground color"){setClr(oldbghex,1)
}else if(document.getElementById("ctarget") && document.getElementById("ctarget").value == " Background color"){
setClr(oldfghex,1)
}
}

function togglewidth(){
var el = dd.elements.mainmenu;
if ( el.visible != false ) {
el.hide(true);
}
else {
el.show();
dd.elements.mainmenu.maximizeZ()
}
}


function togglefgbg(){
var el = document.getElementById("ctarget").value
if ( el != ' Foreground color' ) {
pickcolor('fgndcolor',' Foreground color',1)
document.getElementById("bgfgbtn").value="BG"
}else {
pickcolor('thebgcolor',' Background color',1)
document.getElementById("bgfgbtn").value="FG"
}
}

function setautoclose(state){
document.getElementById("accheckbox").value = state
}

function showtoolbar(){
dd.elements.toolbar.show();
dd.elements.toolbar.div.innerHTML = toolbarcontent();
dd.elements.toolbar.maximizeZ();
}

function toggleutils(){
var el = dd.elements.utils;
if ( el.visible != false ) {
el.hide();
}
else {
el.show();
el.maximizeZ()
}
}

function testusrinput(){
theurl=document.getElementById('thefile').value
if(theurl.substr(0,4)!="http"){alert("Something is wrong.  Please check the URL & try it again");return false;}
urltofg(theurl);
}

//-----------------------------Disk to FG----------------------------------------------------

function disktofg(thisfile,thistype){
showajax();
AjaxRequest.get(
    {
    'parameters':{ 	'thefile':thisfile, 'thetype':thistype }
     			,'url':'process-userpic.php'
			,'onSuccess':function(req) {disk2fg(req.responseText) }    }
  );
}

function disk2fg(result) {
result=result.split(',')
fname=result[0]
width=result[1]
height=result[2]
dd.elements.fbanner.hide(true)
dd.elements.xfgimg.swapImage(fname);
dd.elements.xfgimg.resizeTo(width,height); 
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
hideajax(true);
toggleutils();
}

function showfloodcursor(){
dd.elements.flooder.show()
dd.elements.flooder.maximizeZ()
}

function hidefloodcursor(){
dd.elements.flooder.hide()
}

function floodcolor(thetarget,targettext){
if(dd.elements.floodfiller.visible != false){dd.elements.floodfiller.hide();hidefloodcursor()
}else{
dd.elements.floodfiller.show();
if(dd.elements.floodfiller.div.innerHTML = "" || document.getElementsById != "Flood Color"){dd.elements.floodfiller.div.innerHTML = ffcontent(thetarget);}
dd.elements.floodfiller.maximizeZ();
document.getElementById("ctarget").value = targettext
document.getElementById("swatch").value=thetarget
showfloodcursor()
}
}

function pickcolor(thetarget,targettext,fgxbg){

if(dd.elements.floodfiller.visible == false || fgxbg){ // if cpicker is empty OR toggling fg x bg
		dd.elements.floodfiller.show();
		dd.elements.floodfiller.div.innerHTML = ffcontent(thetarget);
			if(document.getElementById("accheckbox").value=="true"){document.getElementById("autoclose").checked=true
			}else{
			document.getElementById("autoclose").checked=false
			}
		dd.elements.floodfiller.maximizeZ();
		document.getElementById("ctarget").value = targettext
		document.getElementById("swatch").value=thetarget
		if(thetarget=="fgndcolor"){
		document.getElementById("fcolor").value=document.getElementById("fgndcolor").value;
		document.getElementById("fcolorchip").style.backgroundColor=document.getElementById("fgndcolor").value;
		document.getElementById("bgfgbtn").value="BG"
		}
		if(thetarget=="thebgcolor"){
		document.getElementById("fcolor").value=document.getElementById("thebgcolor").value;
		document.getElementById("fcolorchip").style.backgroundColor=document.getElementById("thebgcolor").value;
		document.getElementById("bgfgbtn").value="FG"
		}
}else{dd.elements.floodfiller.hide();dd.elements.flooder.hide()} //if not toggling then hide it.  
}


function togglenotrans(){
var el = parent.document.getElementById("trans-no")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "trans-no.png" ) {
parent.document.getElementById("trans-no").src = "images/trans-no-sel.png"
parent.document.getElementById("trans-yes").src = "images/trans-yes.png"
parent.document.getElementById("istrans").value="false"
showinfo()
}else if(el != "trans-no-sel.png"){
parent.document.getElementById("trans-no").src = "images/trans-no.png"
}
}

function toggleyestrans(){
var el = parent.document.getElementById("trans-yes")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "trans-yes.png" ) {
if(parent.document.getElementById("ffmt").value=="png"){
parent.document.getElementById("trans-yes").src = "images/trans-yes-sel.png"
parent.document.getElementById("trans-no").src = "images/trans-no.png"
parent.document.getElementById("istrans").value="true"
showinfo()
}else if(el != "trans-yes-sel.png"){

parent.document.getElementById("trans-yes").src = "images/trans-yes.png"
}
if (parent.document.getElementById("ffmt").value=="jpeg"){alert("Sorry, JPG image format does not support transparency")}
if (parent.document.getElementById("ffmt").value=="gif"){alert("Sorry, transparent GIF not supported.  Please use transparent PNG instead")}
}
}

function togglejpg(){
var el = parent.document.getElementById("jpg")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "jpg.png" ) {
parent.document.getElementById("jpg").src = "images/jpg-sel.png"
parent.document.getElementById("png").src = "images/png.png"
parent.document.getElementById("gif").src = "images/gif.png"
parent.document.getElementById("ffmt").value="jpeg"
togglenotrans()
showinfo()
}else if(el != "jpg-sel.png"){
parent.document.getElementById("jpg").src = "images/jpg.png"
}
}

function togglepng(){
var el = parent.document.getElementById("png")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "png.png" ) {
parent.document.getElementById("png").src = "images/png-sel.png"
parent.document.getElementById("jpg").src = "images/jpg.png"
parent.document.getElementById("gif").src = "images/gif.png"
parent.document.getElementById("ffmt").value="png"
showinfo()
}else if(el != "png-sel.png"){
parent.document.getElementById("png").src = "images/png.png"
}
}

function togglegif(){
var el = parent.document.getElementById("gif")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "gif.png" ) {
parent.document.getElementById("gif").src = "images/gif-sel.png"
parent.document.getElementById("png").src = "images/png.png"
parent.document.getElementById("jpg").src = "images/jpg.png"
parent.document.getElementById("ffmt").value="gif"
showinfo()
}else if(el != "jpg-sel.png"){
parent.document.getElementById("jpg").src = "images/gif.png"
}
}

function togglevamiddle(){
var el = parent.document.getElementById("vamiddle")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "align-middle.png" ) {
parent.document.getElementById("vamiddle").src = "images/align-middle-sel.png"
parent.document.getElementById("vatop").src = "images/align-top.png"
parent.document.getElementById("vabottom").src = "images/align-bottom.png"
parent.document.getElementById("vertalign").value="middle"
showinfo()
}else if(el != "align-middle-sel.png"){
parent.document.getElementById("vamiddle").src = "images/align-middle.png"
}
}

function togglevatop(){
var el = parent.document.getElementById("vatop")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "align-top.png" ) {
parent.document.getElementById("vatop").src = "images/align-top-sel.png"
parent.document.getElementById("vamiddle").src = "images/align-middle.png"
parent.document.getElementById("vabottom").src = "images/align-bottom.png"
parent.document.getElementById("vertalign").value="top"
showinfo()
}else if(el != "align-top-sel.png"){
parent.document.getElementById("vatop").src = "images/align-top.png"
}
}

function togglevabottom(){
var el = parent.document.getElementById("vabottom")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "align-bottom.png" ) {
parent.document.getElementById("vabottom").src = "images/align-bottom-sel.png"
parent.document.getElementById("vamiddle").src = "images/align-middle.png"
parent.document.getElementById("vatop").src = "images/align-top.png"
parent.document.getElementById("vertalign").value="bottom"
showinfo()
}else if(el != "align-bottom-sel.png"){
parent.document.getElementById("vabottom").src = "images/align-bottom.png"
}
}

function togglehacenter(){
var el = parent.document.getElementById("hacenter")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "align-center.png" ) {
parent.document.getElementById("hacenter").src = "images/align-center-sel.png"
parent.document.getElementById("haleft").src = "images/align-left.png"
parent.document.getElementById("haright").src = "images/align-right.png"
parent.document.getElementById("horizalign").value="center"
showinfo()
}else if(el != "align-center-sel.png"){
parent.document.getElementById("hacenter").src = "images/align-center.png"
}
}

function togglehaleft(){
var el = parent.document.getElementById("haleft")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "align-left.png" ) {
parent.document.getElementById("haleft").src = "images/align-left-sel.png"
parent.document.getElementById("hacenter").src = "images/align-center.png"
parent.document.getElementById("haright").src = "images/align-right.png"
parent.document.getElementById("horizalign").value="left"
showinfo()
}else if(el != "align-left-sel.png"){
parent.document.getElementById("haleft").src = "images/align-left.png"
}
}

function toggleharight(){
var el = parent.document.getElementById("haright")
el = el.src.substring(el.src.lastIndexOf('/')+1)
if ( el == "align-right.png" ) {
parent.document.getElementById("haright").src = "images/align-right-sel.png"
parent.document.getElementById("hacenter").src = "images/align-center.png"
parent.document.getElementById("haleft").src = "images/align-left.png"
parent.document.getElementById("horizalign").value="right"
showinfo()
}else if(el != "align-right-sel.png"){
parent.document.getElementById("haright").src = "images/align-right.png"
}
}

function minding(setting){
	if(setting < 2){
	alert("Dingbat size set to 2 \(minimum\)");
	document.forms[0].dingsize.value=2;
	}
	if(setting >180){
	alert("Dingbat size set to 180 \(maximum\)");
	document.forms[0].dingbatsize.value=180;
}
}

function minfont(setting){
	if(setting < 2){
	alert("Font size set to 2 \(minimum\)");
	document.forms[0].fontsize.value=2;
	}
	if(setting >180){
	alert("Font size set to 180 \(maximum\)");
	document.forms[0].fontsize.value=180;
	}

}

function setslider(label,x,y,min,max,cur,mult){
if(mult==null){mult=0}
cur=Math.round(cur)
mult=Math.round(mult)
var rslider = dd.elements.rslider
var thumb = dd.elements.thumb
if(cur == false){cur=0}

if(rslider.visible != true){
	document.getElementById('slabel').innerHTML=label + ": ";
	document.getElementById('val').value=mult
	rslider.show();
	document.getElementById('val').style.display="block"
	rslider.maximizeZ();

rslider.moveTo(x,y)
		if(document.getElementById("slabel").innerHTML == "Rotate angle: " ){
	document.getElementById('val').style.display="block"
	document.getElementById('val').innerHTML=0
		rslider.moveTo(dd.elements.toolbar.x-157,dd.elements.toolbar.y+65);
		dd.elements.thumb.moveTo(dd.elements.track.x+90, dd.elements.track.y);
			dd.elements.thumb.defx = dd.elements.track.x+90;
			thumb.maxoffl=min;
			thumb.maxoffr=max;
	    dd.elements.rsliderhdr.resizeTo(211,14)
	    dd.elements.rslider.resizeTo(212,45)
	    dd.elements.track.resizeTo(192,16)
			
			}else{
			thumb.moveTo(dd.elements.track.x+cur, dd.elements.track.y);
			thumb.defx = dd.elements.track.x;
			thumb.maxoffl=min;
			thumb.maxoffr=max
			
	rslider.resizeTo(max+32,45)
	dd.elements.track.resizeTo(max+12,16)
    dd.elements.rsliderhdr.resizeTo(max+31,14)

document.getElementById('val').innerHTML=mult
			}			
		}else{
		closeslider()
		}
}

function showajax(){
parent.dd.elements.blanket.resizeTo(dd.getWndW()-10,dd.getWndH()-10)
parent.dd.elements.blanket.maximizeZ()
}

function hideajax(){
parent.dd.elements.blanket.resizeTo(1,1)
parent.dd.elements.blanket.setZ(dd.elements.appcontainer.z-82)
}

function toggleeffects(){
var el = dd.elements.effectbar;
if ( el.visible != false ) {
el.hide();
}
else {
showeffectbar()
}
}

function setsize(myImage) {
fgresize()
}

function setfuzz(){
document.getElementById("fuzzy").value=document.getElementById("filltol").value
}

function showfill(){
var el = dd.elements.flooder;
if ( el.visible != false ) {
el.hide();
}
else {
el.show();
el.maximizeZ()
}
}

function getsession(){
return document.getElementById("session").value
}


function togglecolor(){
var cl = document.getElementById('colorpicker');
      if ( cl.style.display != 'block' ) {cl.style.display = 'block';}
      else {cl.style.display = 'none'};
     }

function colors(citem,thexcolor){
var now = new Date();

if(document.getElementById("colorpicker").style.display=="block"){
togglecolor();
document.getElementById("size").style.display="block"
document.getElementById("vertalign").style.display="block"
document.getElementById("horalign").style.display="block"
document.getElementById("ffmt").style.display="block"
document.getElementById("istrans").style.display="block"
return false}

thexcolor=right(thexcolor,6)
document.all.fgcolor.src="farbastic/setcolors.php?theitem=" + citem + "&curcolor=" + thexcolor + "&kix=" + now.getTime()
document.getElementById("colorpicker").style.display="block"
}

function imgdims(){
message="Current foreground image &nbsp;width: " + dd.elements.xfgimg.w + "px.&nbsp;&nbsp;&nbsp;height: " + dd.elements.xfgimg.h +"px."
//document.getElementById('prompt').innerHTML="<span style='color:#888888;'>" + message + "</span>";
return(message)
}

//-----------------------------Submit----------------------------------------------------
function fgundo(){
if(document.getElementById("fundo").src == vpath + "images/tinyundo-off.gif"){return(false)}
parent.document.getElementById('fgpic').value = document.getElementById("prev_fgpic").value
parent.dd.elements.xfgimg.swapImage('php/files/' + document.getElementById("prev_fgpic").value)
fgresize()
parent.document.getElementById("fundo").src = vpath + "images/tinyundo-off.gif"
}

function setfgundo(){
document.getElementById("prev_fgpic").value = document.getElementById("fgpic").value
document.getElementById("fundo").src =  vpath + "images/tinyundo-on.gif"
}

function noundo(){
document.getElementById("prev_fgpic").value = ''
document.getElementById("fundo").src =  vpath + "images/tinyundo-off.gif"
}


function dosubmit(source) {
if(document.getElementById('mytext').value=='kamakalama'){jmenu();document.getElementById('mytext').value='Font Image Generator'
;return false}
showajax();

if(dd.elements.dlayer.visible==true){overlaymu();return false;}
if (document.getElementById('thewidth').value == '0'){document.getElementById('thewidth').value = ''}
if (document.getElementById('theheight').value == '0'){document.getElementById('theheight').value = ''}

if (!source && document.getElementById('aclose').checked==true && dd.elements.titlebar.visible==true){toggleff()}
//if (document.getElementById('dclose').checked==true && dd.elements.dtitlebar.visible==true){toggledm()}

if (document.getElementById('theheight').value != '' && document.getElementById('thewidth').value == '')
{alert('Width setting required if height is set');hideajax(true);return false;}

if(document.getElementById('mytext').value.length > 140){alert("Sorry, maximum text length is 140 characters");return false;}


setfgundo()
parent.dd.elements.fbanner.hide(true)

thisfont=document.getElementById('font').value.split("|");  //split font id from font name
thatfont="php/fonts/" +  thisfont[1]
//alert(thisfont[0])
//alert(thatfont)
newimage(thatfont)
}

function inputerror(){
alert("Illegal value in one of your settings.  Please check entries and try it again")
hideajax(true);
}

function newimage(dingfont){
//sitedown();hideajax();return false
filefmt=parent.document.getElementById("ffmt").value;
thesize=document.getElementById("size").value;

fghex="#"+right(parent.document.getElementById("fgndcolor").value,6);
bgcolor="#"+right(parent.document.getElementById("thebgcolor").value,6);
scolor="#"+right(parent.document.getElementById("scolor").value,6);

stroke=document.getElementById('strokewidth').value
padding=parent.document.forms[0].padding.value;
istrans=parent.document.getElementById("istrans").value;
thisheight=document.getElementById("theheight").value;
thiswidth=document.getElementById("thewidth").value;
vertalign=document.getElementById("vertalign").value;
horizalign=document.getElementById("horizalign").value;
thistext=document.getElementById('mytext').value

if(parent.document.getElementById("fgndcolor").value.length != 7){inputerror();return false;}
if(parent.document.getElementById("thebgcolor").value.length != 7){inputerror();return false;}
if(parent.document.getElementById("scolor").value.length != 7){inputerror();return false;}

if(left(parent.document.getElementById("fgndcolor").value,1) != "#"){inputerror();return false;}
if(left(parent.document.getElementById("thebgcolor").value,1) != "#"){inputerror();return false;}
if(left(parent.document.getElementById("scolor").value,1) != "#" && stroke && stroke > 0 ){inputerror();return false;}

colorval=parseInt(right(parent.document.getElementById("fgndcolor").value,6), 16)
if(isNaN(colorval)==true){inputerror();return false}
colorval=parseInt(right(parent.document.getElementById("thebgcolor").value,6), 16)
if(isNaN(colorval)==true){inputerror();return false}
colorval=parseInt(right(parent.document.getElementById("scolor").value,6), 16)
if(stroke && stroke > 0 && isNaN(colorval)==true){inputerror();return false}


if(thesize && isNaN(thesize)==true ){inputerror();return false;}
if(padding && isNaN(padding)==true ){inputerror();return false;}
if(thisheight && isNaN(thisheight)==true ){inputerror();return false;}
if(thiswidth && isNaN(thiswidth)==true ){inputerror();return false;}
if(stroke && isNaN(stroke)==true && stroke > 0 ){inputerror();return false;}

thistext=thistext.replace(/\\/g,'\\\\\\')
thistext=thistext.replace(/#/g,'\\#')
thistext=thistext.replace(/\"/g,'\\\\"')
thistext=thistext.replace(/'/g,"\\'")
//thistext=thistext.replace(/@/g,'_')
thistext=thistext.replace(/`/g,'\'')  //ascii 96 character
if(thistext.length==1){thistext=thistext.replace('*','* ')}



AjaxRequest.get(
    {
    'parameters':{'scolor':scolor,'strokewidth':stroke,'thistext':thistext,'vertalign':vertalign,'horizalign':horizalign,'height':thisheight,'width':thiswidth,'trans':istrans,'padding':padding,'type':filefmt,'size':thesize,'fghex':fghex,'curfont':trim(dingfont),'background':bgcolor, 'session':getsession() }
     			,'url':'magick.php'
			,'onSuccess':function(req) {  updatefgtmp(req.responseText) } ,'onTimeout':function(req) {  timedout() } }
  );
}

function toggleborder() {
var el = dd.elements.xfgimg;
btype=el.div.style.border.indexOf('1px')
if ( btype != -1 ) {
el.div.style.border = '0px dashed silver';
}
else {
el.div.style.border = '1px dashed silver';
}
}

function toggleframe() {
var el = dd.elements.appcontainer;
btype=el.div.style.border.indexOf('1px')
if ( btype != -1 ) {
el.div.style.border = '0px solid red';
}
else {
el.div.style.border = '1px solid #ffccff';
}
}

function dofloat() {
dd.elements.cropper.hide()
var el = dd.elements.floater;
if(el.visible==false){
el.show();
el.maximizeZ();
}else{
el.hide()
}
}

function docrop() {
dd.elements.floater.hide()
var el = dd.elements.cropper;
if(el.visible==false){
el.show();
el.maximizeZ();
}else{
el.hide()
}
}

function imeditclose(){
dd.elements.imedit.hide()
dd.elements.flooder.hide()
}

function fxmenuclose(){
dd.elements.subcontent2.hide()
dd.elements.flooder.hide()
}

function jpgtrans(){
if(document.forms[0].format.value=='jpeg' && document.forms[0].trans.value=='true'){alert("No transparency for JPG format.  Please use PNG instead")}
}

function figstat(message,color){
document.getElementById('prompt').innerHTML="<img  onclick='infomsg()' style='cursor:pointer;float:left;margin:3px 6px 2px 2px;' src='images/Image12.gif'><span style='float:left;'>" + message + "</span>";
if(color){dd.elements.prompt.div.style.color=color;}
}

function clearprompt(){
document.getElementById('prompt').innerHTML="";
showinfo()
}

function debug(){
window.open ('debug.htm', 'sywad', 'scrollbars=yes,status=no,width=800,height=170')
}

function forum(){
//window.open ('http://interactimage.proboards77.com', 'cmnt')
window.open ('http://fontimagegenerator.blogspot.com', 'cmnt')
}

function redborder(thebutton){
thebutton.style.border='1px solid green' 
}

function noborder(thebutton){
thebutton.style.border='none' 
}

function tborder(thebutton){
thebutton.style.border='1px solid #e6e6fa' 
}

function grayborder(thebutton){
thebutton.style.border='1px solid #c0c0c0' 
}

function lgrayborder(thebutton){
thebutton.style.border='1px solid #eaeaea' 
}

function whiteborder(thebutton){
thebutton.style.border='1px solid white' 
}
function yellowborder(thebutton){
thebutton.style.border='2px solid #e7e3e7' 
}

function youtube(tut,w,h){
window.open(tut, "mailx", "resizable=yes,toolbars=no,scrollbars=yes,status=no,width=" + w + ",height=" + h )
}

function cleartext(){
document.getElementById('mytext').value=""
document.getElementById('mytext').focus()
}

function resettext(){
document.getElementById('mytext').value="abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNO\nPQRSTUVWXYZ\n1234567890"
}

function loadff(){
if(document.getElementById("clientarea").innerHTML.length == 0){
var flist=""
initWindow();
fonttype=document.getElementById("fonttypes").value

var x=document.getElementById("fonttypes");
var y=document.getElementById("fftypes");
y.options.length = 0
	for (i=0;i<x.length;i++) { 
	 ftype=x.options[i].text
	fval=x.options[i].value
				 if(x.options[i].selected==true){
					sitem=i
				  y.options[y.options.length]=new Option(ftype,fval,true);
				 }else{
				  y.options[y.options.length]=new Option(ftype,fval);
				  }

	  }
document.getElementById("fftypes").selectedIndex=sitem
var x=document.getElementById("font")

for (i=0;i<x.length;i++){  
	flist=flist+ "<DIV><center><img style='padding:5px;border:1px solid white;' id='" + i + "' onmouseover='redborder(this)'  onmouseout='whiteborder(this)' onclick='setfont(" + i + ",&quot;" + x.options[i].text + "&quot;);parent.dosubmit();' src='php/fonts/thumbnails/" + x.options[i].text + ".gif' alt='"+x.options[i].text + "'></center></div>"
	}
document.getElementById("clientarea").innerHTML=flist
dd.elements.titlebar.moveTo(dd.elements.appcontainer.x+130,dd.elements.appcontainer.y)
maxff()
}else{
maxff()
}
}

function loadbats(search){
if(document.getElementById("dclientarea").innerHTML.length == 0){
dinitWindow();
getdingtypes(search)   // also loads font list and ding thumbs
dd.elements.dtitlebar.moveTo(dd.elements.appcontainer.x+130,dd.elements.appcontainer.y)
maxdm()
}else{
maxdm()
}
}

function golf(char,dingfont){
parent.showajax()
if(document.getElementById("dclose").checked==true){toggledm()}
filefmt=parent.document.getElementById("ffmt").value;
char=String.fromCharCode(char);

fghex="#"+right(parent.document.getElementById("fgndcolor").value,6);
bgcolor="#"+right(parent.document.getElementById("thebgcolor").value,6);

padding=parent.document.forms[0].padding.value;
thisheight=document.getElementById("theheight").value;
thiswidth=document.getElementById("thewidth").value;
thesize=document.getElementById("dingsize").value;

istrans=parent.document.getElementById("istrans").value;
vertalign=document.getElementById("vertalign").value;
horizalign=document.getElementById("horizalign").value;

if(left(parent.document.getElementById("fgndcolor").value,1) != "#"){inputerror();return false;}
if(left(parent.document.getElementById("thebgcolor").value,1) != "#"){inputerror();return false;}

colorval=parseInt(right(parent.document.getElementById("fgndcolor").value,6), 16)
if(isNaN(colorval)==true){inputerror();return false}
colorval=parseInt(right(parent.document.getElementById("thebgcolor").value,6), 16)
if(isNaN(colorval)==true){inputerror();return false}


if(thesize && isNaN(thesize)==true ){inputerror();return false;}
if(padding && isNaN(padding)==true ){inputerror();return false;}
if(thisheight && isNaN(thisheight)==true ){inputerror();return false;}
if(thiswidth && isNaN(thiswidth)==true ){inputerror();return false;}

AjaxRequest.get(
    {
    'parameters':{'vertalign':vertalign,'horizalign':horizalign,'height':thisheight,'width':thiswidth,'trans':istrans,'padding':padding,'type':filefmt,'size':thesize,'fghex':fghex,'curfont':dingfont,'background':bgcolor, 'txt':char, 'session':getsession() }
     			,'url':'dingmagick.php'
			,'onSuccess':function(req) {  updatefgtmp(req.responseText) } ,'onTimeout':function(req) {  timedout() } }
  );
}

function getdingpics(){

if(document.getElementById('dtypes').value==135){

AjaxRequest.get(
    {
    'parameters':{ 'set':document.getElementById('dfonts').value}
     ,'url':'getflickr.php'
		,'onSuccess':function(req) { updatedingpics(req.responseText) }    }
  );

return false;

}
if(!document.getElementById('dtypes').value){
thistype='New'
}else{
thistype=document.getElementById('dtypes').options[document.getElementById('dtypes').options.selectedIndex].text}

if(!document.getElementById('dfonts').value){thisfont=document.getElementById('dfonts').options[0].text
}else{thisfont=document.getElementById('dfonts').options[document.getElementById('dfonts').options.selectedIndex].text
}

thisfont=trim(thisfont)
AjaxRequest.get(
    {
    'parameters':{ 'dname':thisfont, 'dtype':thistype}
     ,'url':'getdingpics.php'
		,'onSuccess':function(req) { updatedingpics(req.responseText) }    }
  );
}

function updatedingpics(names){
document.getElementById("dclientarea").innerHTML = names
}

function getdingfonts(searchterm){
document.getElementById('searchdingbat').value=searchterm
closedingbanner()
dsterm=searchterm
if(!dsterm){dsterm=''}
if(!searchterm){
showdingfocus(document.getElementById("dtypes").options[document.getElementById("dtypes").selectedIndex].value)

targetcat=document.getElementById("dtypes").value

if(targetcat=='132' && !searchterm){alert('No search term entered.  Please click the search button');
document.getElementById("dtypes").selectedIndex=document.getElementById('oldding').value
return false;
}

var newtype=document.getElementById('dtypes').options[document.getElementById('dtypes').options.selectedIndex].text

if(newtype!='Favorites'){
document.getElementById('oldding').value=document.getElementById('dtypes').selectedIndex
}

if(!document.getElementById('dtypes').value){
thistype='130'
}else{
thistype=document.getElementById('dtypes').value
}
}

if(searchterm){var durl='searchding.php';var daction='search'}else{var durl='updatedingfonts.php'}

AjaxRequest.get(
    {
    'parameters':{ 'login':document.getElementById('username').value, 'dngfocus':document.getElementById('dngfocus').value, 'searchterm':searchterm, 'category':document.getElementById('dtypes').value}
     ,'url':durl
		,'onSuccess':function(req) { updatedingfonts(req.responseText,daction) }    }
  );
}


function updatedingfonts(names,search){
document.getElementById('dngfocus').value=""
if(trim(names)=='nonefound'){
document.getElementById("dclientarea").innerHTML='<center><img src="php/fonts/thumbnails/nonefound.gif"></center>'
document.getElementById("dtypes").selectedIndex=document.getElementById("dtypes").length-1
return false
}

names=trim(names).split("*");

if(names[1] && trim(names[1]).length>1){
document.getElementById("dingbanner").innerHTML=trim(names[1]);
opendingbanner()
}

names=names[0]

if(names=='none'){
alert('No favorites were found');
document.getElementById("dtypes").selectedIndex=document.getElementById('oldding').value
getdingfonts()
}else if (names=='no login') {
alert("Please login to use favorites.  Registration is free.")
document.getElementById("dtypes").selectedIndex=document.getElementById('oldding').value
return false
}

d=document.getElementById('dfonts')

d.options.length = 0;
var thelist = names.split(",");
for(i = 0; i < thelist.length; i++){
var dfont=thelist[i].split("|");
d.options[i] = new Option(dfont[1],dfont[0]);
}
if(search){
showdingfocus(132)
document.getElementById("dtypes").selectedIndex=document.getElementById("dtypes").length-1
}
getdingpics()
}

function searchfont(){
oldtext=document.getElementById("clientarea").innerHTML

sprompt="<div style='font-size:12px;margin:20px 0px 10px 20px;width:300px;'><b>Font Search</b><BR>Enter all or part of a font name<BR> - Single character entry does alphabetical search</div>"
sprompt+="<input type='text' style='margin-left:50px;width:200px;' id='sbox'>"
sprompt+="<p><center><input type='button' value='Search' onclick='getResponse(\"search\", document.getElementById(\"sbox\").value)'> <input type='button' value='Cancel' onclick='document.getElementById(\"clientarea\").innerHTML=oldtext'></center>"

document.getElementById("clientarea").innerHTML=sprompt
document.getElementById("sbox").value=sterm
document.getElementById("sbox").select()
}

function searchding(){
doldtext=document.getElementById("dclientarea").innerHTML
closedingbanner()
dsprompt="<div style='font-size:12px;margin:20px 0px 10px 20px;width:300px;'><b>Dingbat Search</b><BR>Enter all or part of a dingbat name<BR> - Single character entry does alphabetical search</div>"
dsprompt+="<input type='text' style='margin-left:50px;width:200px;' id='dsbox'>"
dsprompt+="<p><center><input type='button' value='Search' onclick='getdingfonts(document.getElementById(\"dsbox\").value)'> <input type='button' value='Cancel' onclick='document.getElementById(\"dclientarea\").innerHTML=doldtext'></center>"

document.getElementById("dclientarea").innerHTML=dsprompt
document.getElementById("dsbox").value=dsterm
document.getElementById("dsbox").select()
}

function getdingtypes(search){
AjaxRequest.get(
    {
    'parameters':{ 'path':rootpath + 'php/dingfonts', 'login':document.getElementById('username').value, 'type':document.getElementById('dtypes').value}
     ,'url':'updatedingtypes.php'
		,'onSuccess':function(req) { updatedingtypes(req.responseText,search) }    }
  );
}


function updatedingtypes(names,search){
d=document.getElementById('dtypes')
d.options.length = 0;
var thelist = names.split(",");

for(i = 0; i < thelist.length; i++){

var thiscat=thelist[i].split("|");
var id=thiscat[0]
var dcat=thiscat[1]

if(gup('dfocus') && gup('dfocus')==id){
d.options[i] = new Option(dcat,id,true);
}else{
d.options[i] = new Option(dcat,id)
}
}
if(!search){getdingfonts()}
}

//-----------------------------Update font list----------------------------------------------------
function getResponse(target,searchterm) {
showfocuscat(document.getElementById("fftypes").options[document.getElementById("fftypes").selectedIndex].value)
closefontbanner()
sterm=searchterm
if(!sterm){sterm=''}
document.getElementById("curfonttype").value=document.getElementById("fonttypes").value  //save the old font type before changing it

oldcat=document.getElementById("fonttypes").selectedIndex
document.getElementById("fonttypes").selectedIndex=document.getElementById("fftypes").selectedIndex
targetcat=document.getElementById("fonttypes").value
//alert(targetcat)
if(targetcat=='124' && (!document.getElementById("sbox") || document.getElementById("sbox").value=='')){alert('No search term entered.  Please click the search button');
document.getElementById("fftypes").selectedIndex=oldcat
return false;
}

if(target=="search"){var theurl='searchfont.php';var action='search'}else{var theurl='updatefontlist.php'}
AjaxRequest.get(
    {
    'parameters':{ 'login':document.getElementById('username').value, 'searchterm':searchterm, 'type':targetcat, 'clip':document.forms[0].clipflag.value }
     ,'url':theurl
		,'onSuccess':function(req) { updatefonts(req.responseText,action) }    }
  );
}


function updatefonts(names,search){
if(trim(names)=='nonefound'){
document.getElementById("clientarea").innerHTML='<center><img src="php/fonts/thumbnails/nonefound.gif"></center>'
document.getElementById("fftypes").selectedIndex=document.getElementById("fftypes").length-1
document.getElementById("ffid").innerHTML='--'
return false
}

names=names.split("*");
if(names[1] && names[1].length>6){document.getElementById("fontbanner").innerHTML=names[1];openfontbanner()}
names=names[0]

if(names=='none'){
alert('No favorites were found');
document.getElementById("fftypes").selectedIndex=oldcat;
return false
}else if (names=='no login') {
alert("Please login to use favorites.  Registration is free.")
document.getElementById("fftypes").selectedIndex=oldcat;
return false
}

var thelist = names.split(",");
var flist=""
var fonttype=document.getElementById("fonttypes").value
fontlist=document.getElementById('font')
document.getElementById('font').options.length = 0;  //kills all the options in the CP font select list

for(i = 0; i < thelist.length; i++){
thefont=thelist[i];
myfont=thefont;

thefont=thefont.split("|");  //split font id from font name
thefont=thefont[1];  //full font name
fontname=thefont.split(".")  // get the basename of the font

fontlist.options[i] = new Option(fontname[0],myfont);
flist=flist+ "<DIV><center><img style='padding:5px;border:1px solid white;' id='" + i + "' onmouseover='redborder(this)'  onmouseout='whiteborder(this)' onclick='setfont(" + i + ",&quot;" + fontname[0] + "&quot;);parent.dosubmit();' src='php/fonts/thumbnails/" + fontname[0] + ".gif'></center></div>"
}
document.getElementById("clientarea").innerHTML=flist
//openfontbanner()
if(search){document.getElementById("fftypes").selectedIndex=document.getElementById("fftypes").length-1
document.getElementById("ffid").innerHTML='--'
}
x=setTimeout("showinfo()",100)
}

function setfont(idx,ftext){
document.getElementById("font").selectedIndex=idx
showajax();
}

function clearbg() {
var conf = confirm("Are you sure?. The background image will be lost." );
if(conf == false){return false;}

document.getElementById('bgimg').src='php/files/xblank.jpg'
document.getElementById('bgpic').value='php/files/xblank.jpg'
}

//--------------------------------Reset all-------------------------------------------------
function resetall() {

fillcolor='ffffff'
var conf = confirm("Are you sure?. Everything will be lost." );
if(conf == false){return false;}

  AjaxRequest.get(
    {
    'parameters':{ 	'bgcolor':fillcolor  }
     			,'url':'bgfill.php'
			,'onSuccess':function(req) { resetfull(req.responseText) }    }
  );
}

function resetfull(ajax_result) {
document.getElementById('bgimg').src=ajax_result
document.getElementById('bgpic').value=ajax_result
document.getElementById('xfgimg').src='php/files/xtrans.png'
dd.elements.xfgimg.swapImage("images/xtrans.png");
document.getElementById("xfgimg").src=vpath + "php/files/xtrans.png"
dd.elements.xfgimg.resizeTo(1,1)
dd.elements.xfgimg.moveTo(dd.elements.appcontainer.x,dd.elements.appcontainer.y)
document.getElementById('fgpic').value='xtrans.png'
document.getElementById('fillcolor').value='#ffffff'
noundo()
}


//-----------------------------Flickr to FG----------------------------------------------------
function flickrtofg(picurl){
if(picurl==null){return false;}
if(picurl.length < 10){alert('Not a valid URL');return false;}
str="php/dingbats/thumbnails"
showajax();
AjaxRequest.get(
    {
    'parameters':{ 	'targeturl':picurl ,'session':getsession()   }
     			,'url':'tofg.php'
			,'onSuccess':function(req) {url2fg(req.responseText) }    }
  );
}




//-----------------------------URL to FG----------------------------------------------------
function urltofg(picurl){
//uploads webimages and dingmapper images from the tiles folder
if(picurl==null){return false;}
if(picurl.length < 10){alert('Not a valid URL');return false;}
//if(left(picurl,7).toLowerCase() != 'http://'){alert('Not a valid URL.  Must begin with http://');return false;}
str="php/dingbats/thumbnails"
if(picurl.indexOf(str)==-1){toggleutils();}
//alert(picurl)
showajax();
AjaxRequest.get(
    {
    'parameters':{ 	'targeturl':picurl ,'session':getsession()   }
     			,'url':'tofg.php'
			,'onSuccess':function(req) {url2fg(req.responseText) }    }
  );
}

function url2fg(result) {
//alert(result)
if(result.length <7){
alert("Operation failed.  Please check settings and try it again");
z=setTimeout("hideajax(true);",500)
return false
}

setfgundo()
if(dd.elements.dclientarea.visible==true && document.getElementById("dclose").checked==true){toggledm()}
result=result.split(',')
fname=result[0]
width=result[1]
height=result[2]
imgtype=result[3]
dd.elements.fbanner.hide(true)
dd.elements.xfgimg.swapImage(fname);
dd.elements.xfgimg.resizeTo(width,height);
parent.document.getElementById("xfgimg").src=vpath + fname 
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
hideajax(true);
}

//-----------------------------FontLinks----------------------------------------------------
function getfontlink() {
var tfont=trim(document.getElementById("font").value)
showajax();
AjaxRequest.get(
    {
    'parameters':{ 	'thefont':tfont  }
     			,'url':'getfont.php'
			,'onSuccess':function(req) {sayfontlink(req.responseText) }    }
  );
}

function sayfontlink(result){
//alert(result)
hideajax()
if(result=="none"){alert("Sorry, no link information available")
}else{
window.open (result, 'getfont')
}
}

//--------------------------------Flood fill-------------------------------------------------
function floodfill(){
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.');return false}
var offsetx=dd.elements.flooder.x+28 - dd.elements.xfgimg.x
var offsety=dd.elements.flooder.y+28 - dd.elements.xfgimg.y
var fillcolor=right(document.getElementById('fcolor').value,6)
var thefgpic="php/files/" + document.getElementById('fgpic').value
var thefuzz=document.getElementById('ftol').value

if(offsetx<0 || offsety<0){alert("Selected point is off the image");return false}
if(offsetx>dd.elements.xfgimg.w || offsety>dd.elements.xfgimg.h){alert("Selected position is off the image");return false}
showajax()
  AjaxRequest.get(
    {
    'parameters':{ 	'fillcolor':fillcolor,'offsetx':offsetx,'offsety':offsety,'session':getsession(), 'fgimg':thefgpic , 'fuzzfactor':thefuzz }
     			,'url':'floodfill.php'
			,'onSuccess':function(req) { updateflood(req.responseText) }    }
  );
}

function updateflood(result) {

if(result.length <7){
noinputimage()
return false;
}

setfgundo()

result=result.split(",")
fname=result[0]
width=result[1]
height=result[2]
document.getElementById('prev_xfgimg').value=dd.elements.xfgimg.src
dd.elements.xfgimg.swapImage(fname);
hideajax(true)
dd.elements.flooder.maximizeZ()
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
}

//--------------------------------Crop fg-------------------------------------------------
function crop() {
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.');return false}
var thefgpic=document.getElementById('fgpic').value
var cropwidth=dd.elements.cropper.w 
var cropheight=dd.elements.cropper.h 
var offsetx=dd.elements.cropper.x-dd.elements.xfgimg.x
var offsety=dd.elements.cropper.y-dd.elements.xfgimg.y
if(offsetx<0){cropwidth+=offsetx;offsetx=0;}
if(offsetx>dd.elements.xfgimg.w){offsetx=dd.elements.xfgimg.w}
if(offsety<0){cropheight+=offsety;offsety=0}
if(offsety>dd.elements.xfgimg.h){offsety=dd.elements.xfgimg.h}

if(cropwidth>dd.elements.xfgimg.w){cropwidth=dd.elements.xfgimg.w-offsetx}
if(cropheight>dd.elements.xfgimg.h){cropheight=dd.elements.xfgimg.h-offsety}
showajax()
  AjaxRequest.get(
    {
    'parameters':{ 	'bgimg':thefgpic , 'cropwidth':cropwidth , 'cropheight':cropheight , 'offsetx':offsetx , 'offsety':offsety ,'session':getsession() }
     			,'url':'crop.php'
			,'onSuccess':function(req) { cropfg(req.responseText) }    }
  );
}

function cropfg(result) {
noundo()
if(result.length <7){
noinputimage()
return false;
}

setfgundo()
result=result.split(',')
fname=result[0]
width=result[1]
height=result[2]
if(width==1){alert("Sorry, ImageMagick could not be crop this image.\nTry moving it to the composition layer & use float instead");hideajax(true);return false;}
//alert(result)
dd.elements.xfgimg.swapImage(fname)
dd.elements.xfgimg.moveTo(dd.elements.cropper.x,dd.elements.cropper.y)
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
dd.elements.xfgimg.resizeTo(width,height); 
hideajax(true)
dd.elements.cropper.hide()
}

//--------------------------------Float-------------------------------------------------
function float() {
var thebgpic=document.getElementById('bgimg').src
var floatwidth=dd.elements.floater.w
if(floatwidth>480){floatwidth=480}
var floatheight=dd.elements.floater.h
if(floatheight>320){floatheight=320}
var offsetx=dd.elements.floater.x-dd.elements.bgdiv.x
var offsety=dd.elements.floater.y-dd.elements.bgdiv.y
if(offsetx<0){offsetx=0}
if(offsety<0){offsety=0}

showajax();

  AjaxRequest.get(
    {
    'parameters':{ 	'bgimg':thebgpic , 'floatwidth':floatwidth , 'floatheight':floatheight , 'offsetx':offsetx , 'offsety':offsety ,'session':getsession()  }
     			,'url':'float.php'
			,'onSuccess':function(req) { floatbg(req.responseText) }    }
  );
}

function floatbg(ajax_result) {
noundo()

if(ajax_result.length <7){
alert("Operation failed.  The original image is probably gone from the server.\n\nPlease try it again.");
dd.elements.xfgimg.swapImage("php/files/xtrans.png");
document.getElementById('bgimg').src='php/files/xblank.jpg'
document.getElementById('bgpic').value='php/files/xblank.jpg'
z=setTimeout("hideajax(true);",500)
return false;
}

result=ajax_result.split(',')
fname=result[0]
width=result[1]
height=result[2]
dd.elements.xfgimg.swapImage(fname);
dd.elements.xfgimg.moveTo(dd.elements.floater.x,dd.elements.floater.y)
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
//document.getElementById('bgimg').src='php/files/xblank.jpg'
//document.getElementById('bgpic').value='php/files/xblank.jpg'
parent.document.getElementById("xfgimg").src=vpath +  fname
dd.elements.xfgimg.resizeTo(width,height); 
hideajax(true);
dd.elements.floater.hide()
}


function testmagick(cmdstring,flag) {
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.');return false}

//var curfont="php/charfonts/" + document.getElementById('fonttypes').value + "/" + document.getElementById('font').value
var curfont=document.getElementById('font').value.split('|')
var thefont=curfont[1]
var thefont="php/fonts/" + thefont
var txt=document.getElementById("mytext").value
var size=document.getElementById("size").value
var strokewidth=document.getElementById("strokewidth").value

var fghex=document.getElementById("fgndcolor").value
var strokecolor=document.getElementById("scolor").value
var bgcolor=document.getElementById('thebgcolor').value

var deadfile=document.getElementById('prev_fgpic').value.split(',')
var deadfile=deadfile[0]

if(cmdstring){var cmdtext=cmdstring}else{return(false)}
var cmdtext = cmdtext.replace(/,/g,"^")

if(document.getElementById('xfgimg').src==vpath + "php/files/xtrans.png"){var thefgpic='php/files/xtrans.png'}
else{var thefgpic=document.getElementById('fgpic').value}

if(document.getElementById('istrans').value=='true'){var bgcolor='none'}

if (left(thefgpic,3)!='php'){var thefgpic='php/files/' + thefgpic}
showajax();
AjaxRequest.get(
    {
    'parameters':{'strokewidth':strokewidth,'strokecolor':strokecolor,'size':size,'txt':txt,'fghex':fghex,'curfont':thefont,'fgimg':thefgpic,'background':bgcolor,'flag':flag,'commandline':cmdtext, 'deadfile':deadfile ,'session':getsession() }
     			,'url':'testmagick.php'
			,'onSuccess':function(req) {  updatefgtmp(req.responseText) } ,'onTimeout':function(req) {  timedout() } }
  );
}

function timedout(){
hideajax(true)
alert("Image creation timed out.\n\nPlease check settings and try it again.")
}

function updatefgtmp(result) {
//alert(result)
if(result.length <7){
noinputimage()
return false;
}

result=result.split(",")
hideajax()
setfgundo()

fname=result[0]
width=result[1]
height=result[2]

document.getElementById('prev_xfgimg').value=document.getElementById('xfgimg').src
dd.elements.xfgimg.swapImage(fname);
dd.elements.xfgimg.resizeTo(width,height);
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
document.getElementById("xfgimg").src=vpath + fname
dd.elements.fbanner.hide(true)
dd.elements.xfgimg.maximizeZ()
if(dd.elements.dlayer.visible==true){
dd.elements.xfgimg.setZ(dd.elements.dlayer.z-1)
dd.elements.dlayer.hide()
flopgo()
t=setTimeout("cleanwidget()",1250)
}
hideajax(true);

document.getElementById('lastfont').value=document.getElementById('font').value
showinfo()
}

function cleanwidget(){
//draw.Clean()
}

//-----------------------------DRAGSIZE----------------------------------------------------
function dragsize(width,height) {
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.');return false}

var thefgpic=document.getElementById('fgpic').value
//alert(thefgpic)
showajax();
AjaxRequest.get(
    {
    'parameters':{ 	'fgimg':thefgpic , 'thewidth':width , 'theheight':height ,'session':getsession() }
     			,'url':'dragsize.php'
			,'onSuccess':function(req) {dragnewsize(req.responseText) }    }
  );
}

function dragnewsize(result) {
if(result.length < 7){
noinputimage()
return false;
}
setfgundo()
result=result.split(',')
fname=result[0]
width=result[1]
height=result[2]
action=result[3]
hideajax(true);
dd.elements.xfgimg.swapImage(fname);
dd.elements.xfgimg.resizeTo(width,height);
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
dd.elements.imedit.maximizeZ()
}

//-----------------------------RESIZE----------------------------------------------------
function fgresize() {
var thefgpic=document.getElementById('fgpic').value
if (left(thefgpic,3)!='php'){thefgpic='php/files/' + thefgpic}
  
thefgpic=thefgpic.substring(thefgpic.lastIndexOf('/')+1);
AjaxRequest.get(
    {
    'parameters':{ 	'fgimg':thefgpic  }
     			,'url':'resizeim.php'
			,'onSuccess':function(req) {newsize(req.responseText) }    }
  );
}

function newsize(result) {
if(result.length < 7){
noinputimage()
return false;
}

result=result.split(',')
width=result[0]
height=result[1]
parent.dd.elements.xfgimg.resizeTo(width,height)
parent.hideajax(true)
}

//--------------------------------FG clone-------------------------------------------------
function clone() {
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.');return false}

var thebgpic=document.getElementById('bgimg').src
var thefgpic=document.getElementById('fgpic').value
var offsetx1=dd.elements.xfgimg.x
var offsety1=dd.elements.xfgimg.y
var offsetx2=dd.elements.bgdiv.x
var offsety2=dd.elements.bgdiv.y
var offsetx=offsetx1 - offsetx2
var offsety=offsety1 - offsety2
showajax();
  AjaxRequest.get(
    {
    'parameters':{ 	'bgimg':thebgpic ,'fgimg':thefgpic , 'offx':offsetx , 'offy':offsety ,'session':getsession()  }
     			,'url':'cloneim.php'
			,'onSuccess':function(req) { clonefg(req.responseText) }    }
  );
}

function clonefg(ajax_result) {
noundo()

if(ajax_result.length < 7){
document.getElementById('bgimg').src='php/files/xblank.jpg'
document.getElementById('bgpic').value='php/files/xblank.jpg'
alert("Operation failed.  The original image is probably gone from the server.\n\nPlease try it again.");
}else{
document.getElementById('bgimg').src=ajax_result
document.getElementById('bgpic').value=ajax_result
}
dd.elements.imedit.maximizeZ()
hideajax(true);
}

//--------------------------------SEND TO BG-------------------------------------------------
function overlay() {
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.');return false}

noundo()
var thebgpic=document.getElementById('bgimg').src
var thefgpic=document.getElementById('fgpic').value

var offsetx1=dd.elements.xfgimg.x
var offsety1=dd.elements.xfgimg.y

var offsetx2=dd.elements.bgdiv.x
var offsety2=dd.elements.bgdiv.y
var offsetx=offsetx1 - offsetx2-1
var offsety=offsety1 - offsety2-1

showajax();
  AjaxRequest.get(
    {
    'parameters':{ 	'bgimg':thebgpic ,'fgimg':thefgpic , 'offx':offsetx , 'offy':offsety ,'session':getsession()  }
     			,'url':'overlayim.php'
			,'onSuccess':function(req) { updatebg(req.responseText) }    }
  );
}

function overlaymu(){
dd.elements.overunder.hide()
var width=dd.elements.xfgimg.w
var height=dd.elements.xfgimg.h 
var offsetx1=dd.elements.xfgimg.x
var offsety1=dd.elements.xfgimg.y
var offsetx2=dd.elements.dlayer.x
var offsety2=dd.elements.dlayer.y
var offsetx=offsetx1 - offsetx2
var offsety=offsety1 - offsety2
var oe=document.getElementById("mergeloc").src
var imgtrans=document.getElementById("istrans").value
var bgcolor=document.getElementById('thebgcolor').value
var thebgpic=document.getElementById('bgimg').src
var thefgpic=document.getElementById('fgpic').value
var svg=document.getElementById("svgdraw").value
//alert(offsetx+ ',' + offsety)
showajax();
  AjaxRequest.post(
    {
    'parameters':{'bgcolor':bgcolor,'imgtrans':imgtrans,'sizey':height,'sizex':width,'oe':oe,'svg':svg,'fgimg':thefgpic , 'offx':offsetx , 'offy':offsety,'session':getsession()  }
     			,'url':'overlaymu.php'
			,'onSuccess':function(req) { updatefgtmp(req.responseText) }    }
  );
}


function updatebg(ajax_result) {
//alert(ajax_result)
if(ajax_result.length < 7){
document.getElementById('bgimg').src='php/files/xblank.jpg'
document.getElementById('bgpic').value='php/files/xblank.jpg'
alert("Operation failed.  The original image is probably gone from the server.\n\nPlease try it again.");
}else{
document.getElementById('bgimg').src=ajax_result
document.getElementById('bgpic').value=ajax_result
}
dd.elements.xfgimg.swapImage('php/files/xtrans.png');
dd.elements.xfgimg.resizeTo(1,1)
dd.elements.xfgimg.moveTo(dd.elements.bgdiv.x,dd.elements.bgdiv.y)
parent.document.getElementById("xfgimg").src=vpath + "php/files/xtrans.png"
document.getElementById('fgpic').value='xtrans.png'
dd.elements.imedit.maximizeZ()
hideajax(true)
}



function showslider(){
if(dd.elements.rslider.visible == false){
dd.elements.rslider.moveBy(20,-230);
dd.elements.rslider.show();
dd.elements.rslider.maximizeZ()
}else{
closeslider()
}
}

function closeslider(){
        dd.elements.rslider.moveTo(dd.elements.rslider.defx,dd.elements.rslider.defy+200);
 dd.elements.rslider.hide(true);
}

//-----------------------------FREEROTATE----------------------------------------------------
function freerotate(direction) {
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.  Nothing to rotate');return false}
var thefgpic=document.getElementById('fgpic').value
var theangle=direction
if(document.getElementById('fillcolor').value=='#ffffff'){var bgcolor=document.getElementById('thebgcolor').value}
else {var bgcolor=document.getElementById('fillcolor').value}

if(document.getElementById('istrans').value=='true'){bgcolor='none'}
showajax();
AjaxRequest.get(
    {
    'parameters':{ 	'fgimg':thefgpic , 'angle':direction  , 'background':bgcolor ,'session':getsession() }
     			,'url':'rotateim.php'
			,'onSuccess':function(req) {updatefg(req.responseText) }    }
  );
}


//-----------------------------FlipFlop----------------------------------------------------
function flipflop(whichone) {
if(right(document.getElementById('xfgimg').src,10)=="xtrans.png"){alert('No image on foreground layer.');return false}

var thefgpic=document.getElementById('fgpic').value
showajax();
AjaxRequest.get(
    {
    'parameters':{ 	'fgimg':thefgpic , 'whichway':whichone ,'session':getsession() }
     			,'url':'flipflop.php'
			,'onSuccess':function(req) {updatefg(req.responseText) }    }
  );
}

//-----------------------------Update Foreground----------------------------------------------------
function updatefg(result) {
if(result.length < 7){
noinputimage()
return false;
}
result=result.split(',')
setfgundo()
fname=result[0]
width=result[1]
height=result[2]
action=result[3]
dd.elements.xfgimg.resizeTo(width,height);
dd.elements.xfgimg.swapImage(fname);
z=setTimeout("hideajax(true);",1000)
fname=fname.substring(fname.lastIndexOf('/')+1)
document.getElementById('fgpic').value=fname
dd.elements.imedit.maximizeZ()
}

function clipartwindow(cmd){
clipwin = window.open (cmd, 'pplog', 'scrollbars=yes,status=no,width=400,height=300');
if (clipwin.opener == null) clipwin.opener = self;
	
}

function toolbarcontent(){

if( window.devicePixelRatio && !window.Opera){ var br=1}
var content ='<div class="menuhdr">'
	
content += '</div>'
	
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(13),TITLE,\'Compose: Move to Composition Layer\');redborder(this);figstat(\'Move foreground image to composition layer. Clear the foreground.\')"   onmouseout="UnTip();clearprompt();lgrayborder(this);"  onclick="overlay();" src="images/b-layeradd.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea;" onmouseover="Tip(tttext(14),TITLE,\'Compose: Copy to Composition Layer\');redborder(this);figstat(\'Copy the foreground image to composition layer. Leave original on foreground.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="clone()" src="images/b-layercopy.gif">'
	
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea;" onmouseover="Tip(tttext(15),TITLE,\'Flip\');redborder(this);figstat(\'Flip foreground image vertical\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="flipflop(0)" src="images/b-flipvert.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea;" onmouseover="Tip(tttext(16),TITLE,\'Flop\');redborder(this);figstat(\'Flop foreground image horizontal\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="flipflop(1)"src="images/b-fliphoriz.gif">'
	
content += '<img  style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(17),TITLE,\'Rotate\');redborder(this);figstat(\'Rotate foreground image.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="setslider(\'Rotate angle\',20,0,90,90, document.forms[0].rotateangle.value,document.forms[0].rotateangle.value)" src="images/b-rotatecw.gif">'
	
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(18),TITLE,\'Crop\');redborder(this);figstat(\'Crop the foreground image.  Double-click to execute\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="docrop()" src="images/b-crop.gif">'
	
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(19),TITLE,\'Float\');redborder(this);figstat(\'Crop from Composition layer - float to foreground. Resets composition layer. \')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="dofloat()" src="images/b-float.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(20),TITLE,\'Reset All\');redborder(this);figstat(\'Erase everything.  Clear both the foreground and backround layers.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="resetall()" src="images/b-resetall.gif">'
	
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea;" onmouseover="Tip(tttext(21),TITLE,\'Clear Compositons Layer\');redborder(this);figstat(\'Clear just the background layer.  Does not affect foreground.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="clearbg()"src="images/b-layerclear.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(22),TITLE,\'Flood Fill\');redborder(this);figstat(\'Flood fill the area under cursor.\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="floodcolor(\'fcolor\',\' Flood Color\')" src="images/b-fill.gif"><input type="hidden" name="bgfill">'

if(!br){	
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(23),TITLE,\'Toggle Foreground Border\');redborder(this);figstat(\'Toggle border around the foreground image\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="toggleborder()" src="images/b-border.gif">'


//content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(24),TITLE,\'Toggle Canvas Border\');redborder(this);figstat(\'Toggle border around the composition layer\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="toggleframe()" src="images/b-frame.gif">'
}
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(24),TITLE,\'Toggle Freehand Drawing\');redborder(this);figstat(\'Freehand draw\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="toggledlayer()" src="images/b-draw.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(25),TITLE,\'Upload Web Image\');redborder(this);figstat(\'Upload a web image\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="webup()" src="images/b-webup.gif">'

//content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(26),TITLE,\'Upload Disk Image\');redborder(this);figstat(\'Upload an image from your computer\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="featurenotavailable();return false;diskup()" src="images/b-diskup.gif">'
content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(26),TITLE,\'Upload Disk Image\');redborder(this);figstat(\'Upload an image from your computer\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="diskup()" src="images/b-diskup.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(27),TITLE,\'Image Gallery\');redborder(this);figstat(\'View image gallery\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="togglemonitor()" src="images/b-history.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(69),TITLE,\'FIG Mail\');redborder(this);figstat(\'Email current image\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="showfigmail()" src="images/b-email.gif">'

content += '<img style="margin:2px 1px 2px 1px;border:1px solid #eaeaea" onmouseover="Tip(tttext(28),TITLE,\'FIG Forum\');redborder(this);figstat(\'Link to the FIG blog\')" onmouseout="UnTip();clearprompt();lgrayborder(this)"  onclick="forum()" src="images/b-blog.gif">'

return content;
}

function webup(){
toggleutils()
dd.elements.utils.div.innerHTML=''

var content ='<div style="padding:2px 1px 1px 2px;background-color:#595FEE;height:17px;"><span style="color:white;font:700 11px arial;float:left;">Upload Image from Web</span>'
	
content += '<span style="float:right;"><img style="vertical-align:middle;" src="images/tinyclose.gif" onclick="dd.elements.utils.hide()" /></span></div>'

content += '<div style="padding:3px 3px 0px 3px;color:black;font:11px arial;">Upload a web image directly into the foreground.  Enter the full URL including below ( include  http:// ). See the help page for instructions.  <p>All images greater than 480(w)&nbsp;x&nbsp;320(h) pixels will be resized automatically.</div>'


 content += '<div style="padding:0px 3px 0px 10px;color:black;font:11px arial;"><FORM METHOD="POST" name="webimg" \><b>Enter URL \>\></b\> <INPUT style="background-color:#d5d6ff;margin-top:0px;" TYPE="text" SIZE="40" id="thefile" NAME="FILE1" value="http://"\><INPUT style="font-size:11px;margin-top:10px;" onclick="testusrinput()" TYPE=button VALUE="Upload"\> <input type="button" style="font-size:11px;margin-top:10px;" value="Cancel" onclick="toggleutils()"\></FORM\>'
  
// isolated HTML solution for adding form elements to MSIE:  http://domscripting.com/blog/display/99  
var newdiv = document.createElement("div");
newdiv.innerHTML = content;
var container = document.getElementById("utils");
container.appendChild(newdiv);

}

function diskup(){
toggleutils()
dd.elements.utils.div.innerHTML=''

var content ='<div style="padding:2px 1px 1px 2px;background-color:#595FEE;height:17px;"><span style="color:white;font:700 11px arial;float:left;">Upload Image From Disk</span>'
	
content += '<span style="float:right;"><img style="vertical-align:middle;" src="images/tinyclose.gif" onclick="dd.elements.utils.hide()" /></span></div>'

content += '<div style="padding:3px 3px 0px 3px;color:black;font:11px arial;">Upload your image directly into the foreground.  All images greater than 480(w)&nbsp;x&nbsp;320(h) pixels will be resized automatically. <form style="margin:3px 0px 0px 0px;" ><li>Upload <B>JPG, GIF, or PNG</B> images only.<li>Maximum file size 500K <li>Images are deleted automatically after use.</form></div>'

content += '<div style="padding:0px 3px 0px 5px;color:black;font:11px arial;"><FORM style="margin-top:5px;" METHOD="POST" target="ifrm" name="uplform" ENCTYPE="multipart/form-data"><b>Enter File \>\> </b\><input type="hidden" name="MAX_FILE_SIZE" value="500000" /><INPUT style="background-color:#d5d6ff;font-size:11px;margin-top:0px;" TYPE="FILE" SIZE="50" id="thefile" NAME="uploaded_file"><INPUT id="thedir" SIZE="40" NAME="userdir" style="font-size:11px;margin-top:10px;" TYPE="hidden" ><INPUT id="ftype" SIZE="40" NAME="filetype" style="font-size:11px;margin-top:10px;" TYPE="hidden" ><INPUT style="font-size:11px;margin-top:10px;" onclick="submitform()" TYPE=button VALUE="Upload"> <input type="button" style="font-size:11px;margin-top:10px;" value="Cancel" onclick="toggleutils()"></FORM>'

// isolated HTML solution for adding form elements to MSIE:  http://domscripting.com/blog/display/99  
var newdiv = document.createElement("div");
newdiv.innerHTML = content;
var container = document.getElementById("utils");
container.appendChild(newdiv);
}

// -------------- color picker ----------------------------------
function updatecolorchips(hex){
document.getElementById("fcolorchip").style.backgroundColor=hex

if(document.getElementById("ctarget").value==" Foreground color"){
document.getElementById("fgndcolorchip").style.backgroundColor=hex
document.getElementById("tfcolor").style.backgroundColor=hex
document.getElementById("fgndcolor").value=hex
}else{
document.getElementById("thebgcolorchip").style.backgroundColor=hex
document.getElementById("tbcolor").style.backgroundColor=hex
document.getElementById("thebgcolor").value=hex
}
}

function ffcontent(thetarget){
	var content = '<table width="325" border="0" cellpadding="0" cellspacing="1"><TR><TD colspan=2 style="color:white;background-color:#595FEE;height:20px;width:325px;"><input style="float:left;color:white;background-color:#595FEE;border:none;width:115px;font:700 11px arial;" type="text" id="ctarget">';
	
if(thetarget!="fcolor" && thetarget!="scolor"){	// show the button if its NOT floodfill
			content += '<input id="bgfgbtn" type="button"  onmouseover="Tip(tttext(58),FIX,[\'bgfgbtn\',30,-30],WIDTH,325,TITLE,\'BG / FG Button\');" onmouseout="UnTip();" style="font:9px arial;width:25px;height:17px;float:left;" onclick="togglefgbg()">';
}	
	
	content += '<span style="margin-right:1px;float:right;"><img style="vertical-align:middle;" src="images/tinyclose.gif" onclick="floodcolor();" /></span></td></tr>';

	content +='<tr><td valign="top" style="width:100px;" rowspan=2><center><span style="font:8pt arial black;">current value</span><BR><input value="#000000" type="text" onmouseover="Tip(tttext(59),FIX,[\'fcolor\',82,-17],WIDTH,325,TITLE,\'Color Hex Value\');" onmouseout="UnTip();" onchange="updatecolorchips(this.value)" style="height:18px;font:8pt arial;width:70px;" id="fcolor" name="fldcolor"><BR><input type="text"  onmouseover="Tip(tttext(60),FIX,[\'fcolorchip\',82,-40],WIDTH,325,TITLE,\'Color Chip\');" onmouseout="UnTip();" style="background-color:black;height:40px;width:70px;" id="fcolorchip" name="fldcolor"><br><input   onmouseover="Tip(tttext(61),FIX,[\'gcpicker_colorSample\',82,-27],WIDTH,325,TITLE,\'Proposed Color\');" onmouseout="UnTip();" id="gcpicker_colorSample" type=text style="margin-top:1px;height:25px;width:70px;">';

	if(thetarget!="fcolor"){  //show autoclose if its NOT floodfill

	if(dd.n6){content += '<div style="margin-top:12px;font:8pt Arial;">'
	}else{
	content += '<div style="margin-top:2px;font:8pt Arial;">'
	}
	
	content += 'Autoclose: <input onchange="setautoclose(this.checked)"  onmouseover="Tip(tttext(43),FIX,[\'autoclose\',30,-6],WIDTH,300,TITLE,\'Autoclose\');" onmouseout="UnTip();"  id="autoclose" type="checkbox"  style="margin-top:4px;" ></div> '

	}

	
	if(thetarget=="fcolor"){  // if it IS floodfill
			content += '<br><span  style="font:8pt Arial;">Tol: </span><input id="ftol" onmouseover = "Tip(tttext(62),FIX,[\'ftol\',30,-16],WIDTH,350,TITLE,\'Fill Tolerance\');"  onmouseout="UnTip();" onkeydown="closeslider()" onclick="setslider(\&#39;Fill Tolerance\&#39;,parent.dd.elements.floodfiller.x+5,parent.dd.elements.floodfiller.y+100,0,180,this.value*1.8,this.value)" type=text style="font:11px arial;margin-top:5px;width:20px;height:15px;" value=25> <img onmouseover = "Tip(tttext(63),FIX,[\'ftol\',70,-19],WIDTH,275,TITLE,\'Find Cursor\');"  onmouseout="UnTip();" onclick="findflooder()" style="vertical-align:middle;" src="images/cursor.gif">';
	}

	content += '</td></tr><tr><td>';

	content += colorTable()+'<div style="display:none;width:45px;font:8pt Arial;" id="gcpicker_colorCode">#cccccc</div><input style="display:none;margin-top:1px;background-color:#cccccc;width:106px;border:1px solid gray;font:8pt Arial;" type="text" id="ftarget"></td></tr></table>';
return content;	
}

function togglehelpmode(){
var scr="js/wz_tooltip.js"
if(document.getElementById("helpdelay").value!=1000){

j=setTimeout("loadscript('" + scr + "')",100)

document.getElementById("helpdelay").value=1000
showajax();
}
}

function Tip(){
var el=document.getElementById("tipcheck")
if(el.checked==false){return false;}
//alert("tip")
	tt_Tip(arguments, null);
}

function UnTip(){
var el=document.getElementById("tipcheck")
if(el.checked==false){ return false;}

	tt_OpReHref();
	if(tt_aV[DURATION] < 0 && (tt_iState & 0x2))
		tt_tDurt.Timer("tt_HideInit()", -tt_aV[DURATION], true);
	else if(!(tt_aV[STICKY] && (tt_iState & 0x2)))
		tt_HideInit();
		
}

function tttext(n){
var el=document.getElementById("tipcheck")
if(el.checked==false){ return false
 }else if(el.checked==true)
 {
 return gentext(n);
 }
 }

