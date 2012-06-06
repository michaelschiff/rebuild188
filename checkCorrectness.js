var checkCorrect = function () {
	for (var i = 0; i < vVals.length; i++) {
			var v = vVals[i];
			v.shape.node.onclick = null;
			v.data.node.onclick = null;
			if (v.correct) { v.shape.attr({"stroke":"#0f0", "fill":"#0f0", "fill-opacity":0.5}); } 
			else {v.shape.attr({"stroke": "#f00", "fill":"#f00", "fill-opacity":0.5}); }
	}
	for (var i = 0; i < qVals.length; i++) {
			var q = qVals[i];
			q.shape.node.onclick = null;
			q.data.node.onclick = null;
			if (q.correct) { q.shape.attr({"stroke":"#0f0", "fill":"#0f0", "fill-opacity":0.5}); }
			else { q.shape.attr({"stroke": "#f00", "fill":"#f00", "fill-opacity":0.5}); }
	}
}
var submitButton = document.getElementById("submitbutton");
submitButton.setAttribute("onclick", "checkCorrect()");
