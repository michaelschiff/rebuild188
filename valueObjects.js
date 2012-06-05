function vValue () {
		this.shape = null;
		this.x = null;
		this.y = null;
		this.height = null;
		var tempThis = this;
		this.drawShape = function (paper, topX, topY) {
				tempThis.shape = getTriangle(paper, topX, topY, 55, 80);
				tempThis.x = topX;
				tempThis.y = topY;
				tempThis.height = 55;
				tempThis.shape.node.onmouseover = function () { this.style.cursor = 'pointer'; }
				tempThis.shape.node.onclick = function () { window.alert("!!!!"); }
		}
}

function qValue () {
		this.shape = null;
		this.x = null;
		this.y = null;
		this.height = null;
		var tempThis = this;
		this.drawShape = function (paper, topX, topY) {
				tempThis.shape = paper.circle(topX, topY+30, 30);
				tempThis.x = topX;
				tempThis.y = topY;
				tempThis.height = 30*2;
				tempThis.shape.node.onmouseover = function () { this.style.cursor = 'pointer';}
				tempThis.shape.node.onclick = function () { window.alert("!!!!"); }
		}
}
				
