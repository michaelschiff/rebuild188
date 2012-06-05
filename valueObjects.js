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
		}
		this.initialize = function () {
				tempThis.shape.node.onclick = function () {
						//document.getElementById("worker").setAttribute("type", "text");
						window.alert("!!!!!!!!!!");
				}
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
		}
}
				
