var T = new Array();
var R = new Array();
var Table = new Array();
for (var i = 0; i < 8; i++) {
	T.push(Math.round(Math.random()*10)/10);
	R.push(Math.floor(-3 + (1+2+3)*Math.random()));
}

var body = document.getElementById("right");
var tag = document.createElement("div");

var tbl = document.createElement("table");
var tblBody = document.createElement("tbody");
for (var i = 0; i < 10; i++) {
		var row = document.createElement("tr");
		Table.push(row);
}
for (var i = 0; i < 5; i++) {
		var cell = document.createElement("th");
		var cellText;
		if (i == 0) { cellText = document.createTextNode("s"); }
		if (i == 1) { cellText = document.createTextNode("a"); }
		if (i == 2) { cellText = document.createTextNode("s'");}
		if (i == 3) { cellText = document.createTextNode("T(s,a,s')"); }
		if (i == 4) { cellText = document.createTextNode("R(s,a,s')"); }
		cell.appendChild(cellText);
		Table[1].appendChild(cell);
}
for (var i = 2; i < 6; i++) { 
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode("A"));
		Table[i].appendChild(cell);
}
for (var i = 6; i < 10; i++) {
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode("B"));
		Table[i].appendChild(cell);
}
for (var i = 2; i < 10; i++) {
		var cell = document.createElement("td");
		if (i == 2 || i == 3 || i == 6 || i == 7) { cell.appendChild(document.createTextNode("0")); }
		else { cell.appendChild(document.createTextNode("1")); }
		Table[i].appendChild(cell);
}
for (var i = 2; i < 10; i++) {
		var cell = document.createElement("td");
		if (i % 2 == 0) { cell.appendChild(document.createTextNode("A")); }
		else { cell.appendChild(document.createTextNode("B")); }
		Table[i].appendChild(cell);
}
for (var i = 0; i < 8; i++) {
		var cell = document.createElement("td");
		cell.appendChild(document.createTextNode(T[i]));
		Table[i+2].appendChild(cell);
		cell = document.createElement("td");
		cell.appendChild(document.createTextNode(R[i]));
		Table[i+2].appendChild(cell);
}



for (var i = 0; i < 10; i++) {
		tblBody.appendChild(Table[i]);
}
tbl.appendChild(tblBody);
tag.appendChild(tbl);
body.appendChild(tag);
tag.setAttribute("style", "padding-top:10px;"+"padding-left:115px;");
tbl.setAttribute("border", "1");
//for (var j = 0; j < 2; j++) {
//	var row = document.createElement("tr");
//	for (var i = 0; i < 2; i++) {
//		var cell = document.createElement("th");
//	    var cellText = document.createTextNode("cell is row "+j+", column "+i);		
//		cell.appendChild(cellText);
//		row.appendChild(cell);
//	}
//	tblBody.appendChild(row);
//}					  
//tbl.appendChild(tblBody);  
//body.appendChild(tbl);
//tbl.setAttribute("border", "2");
