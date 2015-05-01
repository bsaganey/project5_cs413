function getPickerContent(){

	var content = 	'<table align="right" width="222" border="0" cellpadding="0" cellspacing="1"><tr><td>';

	content += '<table width="100%" border="0" cellpadding="0" cellspacing="1" class="color_table"><tr><td bgcolor="#cccccc" id="gcpicker_colorSample" width="40px" class="choosed_color_cell">&nbsp;</td><td align="left"><div style="width:45px;font:8pt Arial;" id="gcpicker_colorCode">#cccccc</div></td><td width=160px align="center"><input style="margin-top:1px;background-color:#cccccc;width:106px;border:1px solid gray;font:8pt Arial;"type="text" id="ctarget"> <img style="vertical-align:middle;" src="images/tinyclose.gif" onclick="dd.elements.floodfiller.hide()" /></td></tr></table>';

	content += '</td></tr><tr><td>';

	content += colorTable()+'</td></tr></table>';
	return content;	
}

function clearchip(){
alert("clear")
}

function colorTable(){
	var clrfix = Array("#000000","#333333","#666666","#999999","#cccccc","#ffffff","#ff0000","#00ff00","#0000ff","#ffff00","#00ffff","#ff00ff");
	var table ='<table border="0"  cellpadding="0" cellspacing="0" bgcolor="#000000"><tr>';
	table += '';


	for(var j=0;j<3;j++){
		table += '<td width="11"><table bgcolor="#000000"  border="0"  cellpadding="0" cellspacing="1"  class="color_table">';
		for(var i=0;i<12;i++){
			var clr ='#000000';
			if(j==1){
				clr = clrfix[i];	
			}
			table += '<tr><td bgcolor="'+clr+'" class="cell_color" onmouseover="showClr('+"'"+clr+"'"+')" onclick="setClr('+"'"+clr+"'"+')"></td></tr>';
		}
		table += '</table></td>';		
	}
	
	
	
	table +='<td><table border="0" cellpadding="0" cellspacing="0">';	
	for (var c = 0; c<6; c++) {
		if(c==0 || c==3){
			table +="<tr>";	
		}
		table += "<td>"	
		
		table = table+'<table border="0" cellpadding="0" cellspacing="1" class="color_table"> ';

		
		
		for (var j = 0; j<6; j++) {
			table +="<tr>";
			for (var i = 0; i<6; i++) {
				var clrhex = rgb2hex(j*255/5,i*255/5,c*255/5);
				table += '<td bgcolor="'+clrhex+'" class="cell_color" onmouseover="showClr('+"'"+clrhex+"'"+')" onclick="setClr('+"'"+clrhex+"'"+')"></td>';
			}
			table +="</tr>";
		}

		
		
		table +="</table>";
		table += "</td>"	
		if(c==2 || c==5){
			table +="</tr>";	
		}	
	}


	table +='</table></td></tr></table>';

	
	table +='<div style="text-align:center;vertical-align:middle;padding:5px;margin-top:2px;border-top:1px solid silver;"><input type="button" style="width:50px;height:20px;font:11px arial;" value="OK" onclick="dd.elements.flooder.hide();dd.elements.floodfiller.hide();"></div>'
	
	return table;
}

function showClr(color){
	Obj = document.getElementById("gcpicker_colorSample");
	Obj.style.backgroundColor=color;
	Obj = document.getElementById("gcpicker_colorCode");
	Obj.innerHTML = color;
}

function setClr(color,flip){
	target=document.getElementById("swatch").value;
	Obj = document.getElementById(target);
	Obj.value = color;
	Obj = document.getElementById(target + "chip");
	Obj.style.backgroundColor=color;
	document.getElementById("fcolorchip").style.backgroundColor=color;
	if(Obj.id == 'fgndcolorchip' || Obj.id == 'thebgcolorchip'){
	if(target=='fgndcolor'){dd.elements.tfcolor.div.style.backgroundColor=color
	}else{dd.elements.tbcolor.div.style.backgroundColor=color
	}
}
	document.getElementById("fcolor").value=color;
 if(!flip && document.getElementById("ctarget").value != "Flood Color" && document.getElementById("autoclose").checked == true){dd.elements.floodfiller.hide();dosubmit();}
	}


function rgb2hex(red, green, blue)
{
    var decColor = red + 256 * green + 65536 * blue;
    var clr = decColor.toString(16);
	for(var i =clr.length;i<6;i++){
		clr = "0"+clr;	
	}
	return "#"+clr;
}
