var vVals = new Array();
var qVals = new Array();

function vValue (id) {
		vVals.push(this);
		this.shape = null;
		this.x = null;
		this.y = null;
		this.height = null;
		this.id = id;
		this.data = null;
		var tempThis = this;
		this.drawShape = function (paper, topX, topY) {
				tempThis.shape = getTriangle(paper, topX, topY, 55, 80);
				tempThis.x = topX;
				tempThis.y = topY;
				tempThis.height = 55;
				tempThis.data = paper.text(topX, topY+35, "");
				tempThis.data.attr("font-size", 16);
				tempThis.shape.node.onmouseover = function () { this.style.cursor = 'pointer'; }
				tempThis.shape.node.onclick = function () { 	
						for (var i = 0; i < vVals.length; i++) {
								var v = vVals[i];
								document.getElementById(v.id).type = 'hidden';
								v.data.attr({"text": document.getElementById(v.id).value});
						}
						for (var i = 0; i < qVals.length; i++) {
								var q = qVals[i];
								document.getElementById(q.id).type = 'hidden';
								q.data.attr({"text": document.getElementById(q.id).value});
						}
						document.getElementById(tempThis.id).type = 'text';
						document.getElementById(tempThis.id).focus();
						document.getElementById(tempThis.id).onkeypress = function(e) {
								if (e.charCode == 13) {
										document.getElementById(tempThis.id).type = 'hidden';
										tempThis.data.attr({"text": document.getElementById(tempThis.id).value});
								}
						}
				}
		}
}

function qValue (id) {
		qVals.push(this);
		this.shape = null;
		this.x = null;
		this.y = null;
		this.height = null;
		this.id = id;
		this.data = null;
		var tempThis = this;
		this.drawShape = function (paper, topX, topY) {
				tempThis.shape = paper.circle(topX, topY+30, 30);
				tempThis.x = topX;
				tempThis.y = topY;
				tempThis.height = 30*2;
				tempThis.data = paper.text(topX, topY+30, "");
				tempThis.data.attr("font-size", 16);
				tempThis.shape.node.onmouseover = function () { this.style.cursor = 'pointer';}
				tempThis.shape.node.onclick = function () {
						for (var i = 0; i < qVals.length; i++) {
								var q = qVals[i];
								document.getElementById(q.id).type = 'hidden';
								q.data.attr({"text": document.getElementById(q.id).value});
						}
						for (var i = 0; i < vVals.length; i++)  {
								var v = vVals[i];
								document.getElementById(v.id).type = 'hidden';
								v.data.attr({"text": document.getElementById(v.id).value});
						}
						document.getElementById(tempThis.id).type = 'text';
						document.getElementById(tempThis.id).focus();
						document.getElementById(tempThis.id).onkeypress = function(e) {
								if (e.charCode == 13) {
										document.getElementById(tempThis.id).type = 'hidden';
										tempThis.data.attr({"text": document.getElementById(tempThis.id).value});
								}
						}
				}
		}
}
				
