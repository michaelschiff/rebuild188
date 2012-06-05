(function () {
   var CalculatorNode, CirclularNodeDrawer, FONT_SIZE, NODE_HEIGHT, NODE_WIDTH, Node, NodeDrawer, ParametrizedProblem, Point, QNode, QNodeDrawer, QuadrilateralNodeDrawer, StateNode, StateNodeDrawer, TriangularNodeDrawer, ValueIterationProblem, blue, green, light_blue, light_yellow, red, saferEval, white, yellow, __hasProp = Object.prototype.hasOwnProperty,
      __extends = function (a, b) {
         function d() {
            this.constructor = a
         }
         for (var c in b) __hasProp.call(b, c) && (a[c] = b[c]);
         return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
      },
      __bind = function (a, b) {
         return function () {
            return a.apply(b, arguments)
         }
      };
   NODE_HEIGHT = 80, NODE_WIDTH = 65, FONT_SIZE = 13, green = "#0f0", red = "#f00", blue = "#00f", light_blue = "#BECFEB", yellow = "#ffc850", light_yellow = "#FCF9CF", white = "#fff", saferEval = function (script) {
      var p, _i, _len;
      for (_i = 0, _len = this.length; _i < _len; _i++) p = this[_i], p !== Math && (p = null);
      return eval(script)
   }, ParametrizedProblem = function () {
      function a(a, b) {
         this.paper = a, this.inputField = b.inputField, this.setInputFieldValue()
      }
      return a.prototype.setInputFieldValue = function () {
         return this.inputField.val(JSON.stringify(this.getData()))
      }, a
   }(), ValueIterationProblem = function (a) {
      function b(a, c, d) {
         var e, f, g, h, i, j, k, l, m, n, o, p, q;
         this.paper = a, this.container = c.container, this.numStates = c.numStates, this.numActions = c.numActions, this.numTimeSteps = c.numTimeSteps, this.H = this.numTimeSteps, this.displaySolution = (j = c.solution) != null ? j : !1, this.editable = (k = c.editable) != null ? k : !0, this.feedback = (l = c.feedback) != null ? l : !0, this.states = function () {
            p = [];
            for (var a = 0, b = this.numStates; 0 <= b ? a < b : a > b; 0 <= b ? a++ : a--) p.push(a);
            return p
         }.apply(this), this.actions = function () {
            q = [];
            for (var a = 0, b = this.numActions; 0 <= b ? a < b : a > b; 0 <= b ? a++ : a--) q.push(a);
            return q
         }.apply(this), this.stateColors = [blue, yellow], this.qColors = [light_blue, light_yellow], this.numLevels = this.numTimeSteps * 2 + 1, this.maxNodesPerLevel = this.numStates * this.numActions, d ? this.loadMDP(d) : this.createMDP(), this.solveMDP(), this.createNodes();
         if (d) {
            o = this.nodes;
            for (h = 0, i = o.length; h < i; h++) e = o[h], e.setData(d.values)
         }
         this.editable && this.createCalculator(), this.displaySolution && this.showSolution(), b.__super__.constructor.call(this, this.paper, c)
      }
      return __extends(b, a), b.prototype.randVal = function (a) {
         var b;
         a == null && (a = 5), b = 0;
         while (b === 0) b = Math.floor((Math.random() - .5) * a);
         return b
      }, b.prototype.createMDP = function () {
         var a, b, c, d, e, f, g, h, i, j, k;
         c = 5, this.T = [], this.R = [], j = this.states, k = [];
         for (h = 0, i = j.length; h < i; h++) d = j[h], this.T[d] = [], this.R[d] = [], k.push(function () {
            var c, h, i, j, k, l, m, n, o, q;
            m = this.actions, q = [];
            for (c = 0, j = m.length; c < j; c++) {
               a = m[c], this.T[d][a] = [], this.R[d][a] = [], n = this.states;
               for (h = 0, k = n.length; h < k; h++) e = n[h], this.R[d][a][e] = 0;
               g = 0, f = this.states.slice(0, this.states.length).sort(function () {
                  return .5 - Math.random()
               }), o = f.slice(0, f.length - 1);
               for (i = 0, l = o.length; i < l; i++) e = o[i], b = .1 * Math.round(Math.random() * 10), g += b, this.T[d][a][e] = b, this.R[d][a][e] = this.randVal();
               this.R[d][a][f[f.length - 1]] = this.randVal(), q.push(this.T[d][a][f[f.length - 1]] = 1 - g)
            }
            return q
         }.call(this));
         return k
      }, b.prototype.loadMDP = function (a) {
         return this.T = a.T, this.R = a.R
      }, b.prototype.initV = function () {
         var a, b, c, d, e, f, g;
         this.V = [];
         for (b = 0, e = this.H; 0 <= e ? b <= e : b >= e; 0 <= e ? b++ : b--) this.V[b] = [];
         f = this.states, g = [];
         for (c = 0, d = f.length; c < d; c++) a = f[c], g.push(this.V[0][a] = 0);
         return g
      }, b.prototype.initQ = function () {
         var a, b, c, d, e;
         this.Q = [], e = [];
         for (c = 0, d = this.H; 0 <= d ? c <= d : c >= d; 0 <= d ? c++ : c--) this.Q[c] = [], e.push(function () {
            var d, e, f, g;
            f = this.states, g = [];
            for (d = 0, e = f.length; d < e; d++) b = f[d], this.Q[c][b] = [], g.push(function () {
               var d, e, f, g;
               f = this.actions, g = [];
               for (d = 0, e = f.length; d < e; d++) a = f[d], g.push(this.Q[c][b][a] = 0);
               return g
            }.call(this));
            return g
         }.call(this));
         return e
      }, b.prototype.solveMDP = function () {
         var a, b, c, d, e, f;
         this.initV(), this.initQ(), f = [];
         for (d = 1, e = this.H; 1 <= e ? d <= e : d >= e; 1 <= e ? d++ : d--) f.push(function () {
            var e, f, g, h, i, j, k, l, m, n;
            k = this.states, n = [];
            for (e = 0, h = k.length; e < h; e++) {
               b = k[e], l = this.actions;
               for (f = 0, i = l.length; f < i; f++) {
                  a = l[f], m = this.states;
                  for (g = 0, j = m.length; g < j; g++) c = m[g], this.Q[d][b][a] += this.T[b][a][c] * (this.R[b][a][c] + this.V[d - 1][c])
               }
               n.push(this.V[d][b] = this.Q[d][b].reduce(function (a, b) {
                  return Math.max(a, b)
               }))
            }
            return n
         }.call(this));
         return f
      }, b.prototype.createStateNode = function (a, b) {
         var c;
         return c = {
            x: (1 + b * 1.3) * this.paper.width / (this.numStates + 2),
            y: this.paper.height - 70 - .25 * this.nodeHeight - a * 4 * this.nodeHeight,
            editable: this.editable,
            feedback: this.feedback,
            paper: this.paper,
            height: this.nodeHeight,
            width: this.nodeWidth,
            color: this.stateColors[b]
         }, new StateNode({
            problem: this,
            t: a,
            s: b,
            trueValue: this.V[a][b],
            drawerOpts: c
         })
      }, b.prototype.createQNode = function (a, b, c) {
         var d;
         return d = {
            x: (1 + this.numActions * b + c) * this.paper.width / (this.numStates * this.numActions + 2),
            y: this.paper.height - 70 - 2.5 * this.nodeHeight - (a - 1) * 4 * this.nodeHeight,
            editable: this.editable,
            feedback: this.feedback,
            paper: this.paper,
            height: this.nodeHeight,
            width: this.nodeWidth,
            color: this.stateColors[b],
            bgcolor: c > 0 ? this.qColors[b] : white
         }, new QNode({
            problem: this,
            t: a,
            s: b,
            a: c,
            trueValue: this.Q[a][b][c],
            drawerOpts: d
         })
      }, b.prototype.createNodes = function () {
         var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;
         this.nodes = [], this.nodeHeight = Math.min(NODE_HEIGHT, this.paper.height / this.numLevels * (1 / 1.5)), this.nodeWidth = Math.min(NODE_WIDTH, this.paper.width / this.maxNodesPerLevel * 1.5), d = [], r = this.states;
         for (j = 0, n = r.length; j < n; j++) f = r[j], g = this.createStateNode(0, f), this.nodes.push(g), d.push(g);
         v = [];
         for (i = 1, s = this.numTimeSteps; 1 <= s ? i < s : i > s; 1 <= s ? i++ : i--) {
            c = d, d = [], t = this.states;
            for (k = 0, o = t.length; k < o; k++) {
               f = t[k], d[f] = [], u = this.actions;
               for (l = 0, p = u.length; l < p; l++) {
                  a = u[l], e = this.createQNode(i, f, a), this.nodes.push(e);
                  for (m = 0, q = c.length; m < q; m++) b = c[m], e.children.push(b);
                  d[f].push(e)
               }
            }
            c = d, d = [], v.push(function () {
               var a, e, g, j, k, l, m;
               k = this.states, m = [];
               for (g = 0, a = k.length; g < a; g++) {
                  f = k[g], h = this.createStateNode(i, f), this.nodes.push(h), l = c[f];
                  for (j = 0, e = l.length; j < e; j++) b = l[j], h.children.push(b);
                  m.push(d.push(h))
               }
               return m
            }.call(this))
         }
         return v
      }, b.prototype.createCalculator = function () {
         var a, b;
         return b = {
            x: this.paper.width / 2.5,
            y: this.paper.height - 30,
            editable: this.editable,
            feedback: !1,
            paper: this.paper,
            height: 10,
            width: 300
         }, this.tempCalc = new CalculatorNode({
            drawerOpts: b
         }), this.tempCalc.draw(), a = this.container.prev(".calculator"), a.css("display", ""), this.calculator = a.children("input"), this.calculator.position({
            my: "left top",
            at: "center center",
            of: $(this.tempCalc.drawer.drawing.node)
         }), this.calculator.css("z-index", 1e4), this.calculator.attr("width", "300"), this.calculator.css("width", "300"), this.hideCalc(), $(this.tempCalc.drawer.drawing.node).hide(), this.calculator.attr("disabled", "disabled"), this.calculator.css("border", "none")
      }, b.prototype.hideCalc = function () {
         return this.calculator.attr("disabled", "disabled"), this.calculator.css("border", "1px solid white"), this.calculator.css("opacity", "0"), this.calculator.val(""), this.calculator.blur()
      }, b.prototype.showCalc = function () {
         return this.calculator.removeAttr("disabled"), this.calculator.css("border", "1px solid black"), this.calculator.css("opacity", "1")
      }, b.prototype.validate = function () {
         var a, b, c, d, e;
         d = this.nodes, e = [];
         for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.validate());
         return e
      }, b.prototype.stateToString = function (a) {
         return "\\(" + String.fromCharCode(65 + a) + "\\)"
      }, b.prototype.drawProblemInfo = function () {
         var a, b, c, d, e, f, g, h, i, j, k, l, m;
         this.infoContainer = this.container.children(".problem_info"), b = '<img src="/assets/vi_info.png"/ style="max-width: 290px">\n<table>\n  <tr> <th> \\(s\\) </th> <th> \\(a\\) </th> <th> \\(s\'\\) </th> <th> \\(T(s,a,s\')\\) </th> <th> \\(R(s, a, s\')\\)</th> </tr>', k = this.states;
         for (e = 0, h = k.length; e < h; e++) {
            c = k[e], l = this.actions;
            for (f = 0, i = l.length; f < i; f++) {
               a = l[f], m = this.states;
               for (g = 0, j = m.length; g < j; g++) d = m[g], b += "<tr> <td> " + this.stateToString(c) + " </td> <td> " + a + " </td> <td> " + this.stateToString(d) + " </td> <td> " + this.T[c][a][d].toPrecision(2) + " </td> <td> " + this.R[c][a][d].toPrecision(2) + "</td> </tr>"
            }
         }
         return b += "</table>", this.infoContainer.html(b), MathJax.Hub.Queue(["Typeset", MathJax.Hub])
      }, b.prototype.draw = function () {
         var a, b, c, d;
         this.drawProblemInfo(), d = this.nodes;
         for (b = 0, c = d.length; b < c; b++) a = d[b], a.draw();
         return this.validate()
      }, b.prototype.showSolution = function () {
         var a, b, c, d, e;
         d = this.nodes, e = [];
         for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.showSolution());
         return e
      }, b.prototype.getData = function () {
         var a, b, c, d, e, f, g, h, i, j, k;
         a = {}, e = [], j = this.nodes;
         for (f = 0, h = j.length; f < h; f++) c = j[f], c.getValueData(e);
         a.values = e, a.R = this.R, a.T = this.T, b = !0, k = this.nodes;
         for (g = 0, i = k.length; g < i; g++) c = k[g], b && (b = c.isCorrect());
         return d = (b ? "23" : "") + hex_md5(JSON.stringify(e) + JSON.stringify(b)), a.submission = d, a
      }, b
   }(ParametrizedProblem), Node = function () {
      function a(a) {
         var b, c;
         a == null && (a = {}), this.problem = a.problem, this.setValue = (b = a.setValue) != null ? b : null, this.trueValue = (c = a.trueValue) != null ? c : null, this.children = [], a.drawerOpts.node = this, this.createDrawer(a.drawerOpts)
      }
      return a.prototype.showSolution = function () {
         return this.setValue = this.trueValue, this.drawer.draw()
      }, a.prototype.draw = function () {
         var a, b, c, d, e;
         this.drawer.draw(), d = this.children, e = [];
         for (b = 0, c = d.length; b < c; b++) a = d[b], e.push(this.drawer.connectTo(a.drawer));
         return e
      }, a.prototype.validate = function () {
         return this.drawer.validate()
      }, a.prototype.isCorrect = function () {
         return this.trueValue === null && this.setValue === "" ? !0 : Math.abs(this.trueValue - this.setValue) < .01
      }, a.prototype.getValueData = function (a) {
         return a.push(this.setValue)
      }, a.prototype.setData = function (a) {
         return this.setValue = a.shift(), this.drawer.drawValue()
      }, a
   }(), CalculatorNode = function (a) {
      function b() {
         b.__super__.constructor.apply(this, arguments)
      }
      return __extends(b, a), b.prototype.createDrawer = function (a) {
         return this.drawer = new QuadrilateralNodeDrawer(a)
      }, b
   }(Node), StateNode = function (a) {
      function b(a) {
         a == null && (a = {}), this.t = a.t, this.s = a.s, b.__super__.constructor.call(this, a)
      }
      return __extends(b, a), b.prototype.createDrawer = function (a) {
         return this.drawer = new StateNodeDrawer(a)
      }, b
   }(Node), QNode = function (a) {
      function b(a) {
         a == null && (a = {}), this.t = a.t, this.s = a.s, b.__super__.constructor.call(this, a)
      }
      return __extends(b, a), b.prototype.createDrawer = function (a) {
         return this.drawer = new QNodeDrawer(a)
      }, b
   }(Node), Point = function () {
      function a(a, b, c) {
         this.paper = a, this.x = b, this.y = c
      }
      return a.prototype.arrowTo = function (a, b, c, d) {
         var e, f, g;
         return b == null && (b = 2), c == null && (c = 3), d == null && (d = "#000"), g = this.paper.arrow(this.x, this.y, a.x, a.y, c, d), f = g[0], e = g[1], g
      }, a.prototype.lineTo = function (a, b) {
         var c;
         return b == null && (b = 2), c = this.paper.path("M " + this.x + " " + this.y + "L" + a.x + " " + a.y), c.attr({
            stroke: "#000",
            "stroke-width": b
         }), c
      }, a.prototype.angleTo = function (a) {
         return Raphael.angle(this.x, this.y, a.x, a.y)
      }, a.prototype.midpointTo = function (b) {
         return new a(this.paper, (this.x + b.x) / 2, (this.y + b.y) / 2)
      }, a.prototype.pointAtPercent = function (b, c) {
         return new a(this.paper, this.x * (1 - c) + b.x * c, this.y * (1 - c) + b.y * c)
      }, a.prototype.drawText = function (a, b) {
         var c, d, e, f, g, h, i, j, k, l, m, n = this;
         return b == null && (b = {}), a === Number.POSITIVE_INFINITY ? a = "∞" : a === Number.NEGATIVE_INFINITY && (a = "-∞"), e = (i = b.fontSize) != null ? i : 16, d = (j = b.color) != null ? j : "#000", c = (k = b.backgroundColor) != null ? k : "#fff", f = (l = b.outlineColor) != null ? l : "#fff", g = (m = b.outlineWidth) != null ? m : 2, a = this.paper.text(this.x, this.y, a), a.attr({
            "font-size": e,
            "font-family": "sans-serif",
            fill: d
         }), h = this.paper.rect(this.x - a.getBBox().width / 2, this.y - a.getBBox().height / 2, a.getBBox().width * 1.1, a.getBBox().height).attr({
            fill: c,
            stroke: f,
            "stroke-width": g
         }), a.rect = h, a.updateBox = function (b) {
            return b == null && (b = 5), a.rect.attr({
               x: n.x - a.getBBox(!0).width / 2,
               y: n.y - a.getBBox(!0).height / 2,
               width: a.getBBox(!0).width * 1.1 + b,
               height: a.getBBox(!0).height
            })
         }, a.updateBoxColor = function (b) {
            return a.rect.attr({
               stroke: b
            })
         }, a.updateBoxFill = function (b) {
            return a.rect.attr({
               fill: b
            })
         }, b.angle != null && (b.angle < 270 && (b.angle += 180), a.rotate(b.angle), a.rotation = b.angle, h.rotate(b.angle)), a.toFront(), a
      }, a
   }(), NodeDrawer = function () {
      function a(a) {
         this.unHighlight = __bind(this.unHighlight, this), this.highlight = __bind(this.highlight, this), this.editValue = __bind(this.editValue, this), this.clearFocus = __bind(this.clearFocus, this);
         var b, c;
         this.paper = a.paper, this.node = a.node || null, this.x = a.x, this.y = a.y, this.width = a.width || NODE_WIDTH, this.height = a.height || NODE_HEIGHT, this.color = a.color || blue, this.bgcolor = a.bgcolor || white, this.editable = (b = a.editable) != null ? b : !1, this.feedback = (c = a.feedback) != null ? c : !1, this.correct = !1, this.error = !1, this.green = "#0f0", this.red = "#f00", this.blue = "#00f", this.yellow = "#d4c84a", this.white = "#fff"
      }
      return a.prototype.draw = function () {
         return this.makeDrawing(), this.unHighlight(), this.setCallbacks(), this.drawValue()
      }, a.prototype.setCallbacks = function () {
         if (this.editable) return $(this.drawing.node).mouseover(this.highlight), $(this.drawing.node).mouseout(this.unHighlight), $(this.drawing.node).click(this.editValue)
      }, a.prototype.clearFocus = function () {
         return this.paper.focused = null, this.paper.focusedTime = 0, this.tempValue = this.node.problem.calculator.val(), this.updateValue(), this.text && this.text.removeCursor(), this.node.problem.hideCalc()
      }, a.prototype.editValue = function (a) {
         var b, c, d = this;
         (c = this.paper.focused) != null && c.clearFocus(), this.paper.focused = this, this.paper.focusedTime = (new Date).getTime();
         if (this.tempValue != null && this.tempValue !== null) try {
            b = saferEval(this.tempValue)
         } catch (e) {
            b = ""
         } else b = "";
         return b = b != null && b.toPrecision != null ? b.toPrecision(3) : "", this.text != null ? this.text.attr({
            text: b
         }) : (this.text = this.paper.text(this.x, this.y, b), this.text.attr({
            "font-size": FONT_SIZE,
            "font-family": "Trebuchet MS"
         }), $(this.text.node).click(this.editValue)), this.text.addCursor(), this.node.problem.showCalc(), this.node.problem.calculator.val(this.tempValue), this.node.problem.calculator.focus(), this.node.problem.calculator.unbind().bind("keypress", function (a) {
            console.log("returning false");
            if (a.which === 13) return d.clearFocus(), console.log("returning false"), !1
         })
      }, a.prototype.updateValue = function () {
         var a;
         switch (this.tempValue) {
         case "":
         case void 0:
            this.node.setValue = null;
            break;
         default:
            try {
               this.node.setValue = saferEval(this.tempValue)
            } catch (b) {
               this.node.setValue = null
            }
         }
         return a = this.node.setValue !== null ? this.node.setValue : "", a = a != null && a.toPrecision != null ? a.toPrecision(3) : "", this.text.attr({
            text: a
         }), this.text.updateCursor(), this.node.problem.setInputFieldValue(), this.validate()
      }, a.prototype.validate = function () {
         if (this.feedback) return this.validateValue(), this.updateValueBoxColor()
      }, a.prototype.validateValue = function () {
         return this.error = !this.node.isCorrect(), this.correct = this.node.isCorrect()
      }, a.prototype.highlight = function (a) {
         return this.drawing.attr({
            stroke: this.color,
            "stroke-width": 5
         })
      }, a.prototype.unHighlight = function (a) {
         return this.updateValueBoxColor()
      }, a.prototype.updateValueBoxColor = function () {
         return this.error ? this.drawing.attr({
            stroke: "#f00",
            fill: "#fee",
            "stroke-width": 4
         }) : this.correct ? this.drawing.attr({
            stroke: "#0f0",
            fill: "#fff",
            "stroke-width": 4
         }) : this.drawing.attr({
            fill: this.bgcolor,
            stroke: this.color,
            "stroke-width": 3
         })
      }, a.prototype.connectTo = function (a) {
         var b;
         return b = this.bottomAnchor.arrowTo(a.topAnchor, 2, 5, this.color), a.parentConnection = b[0], a.parentArrow = b[1], b
      }, a.prototype.drawValue = function () {
         var a;
         if (this.node.setValue != null) {
            this.text != null && ($(this.text.node).remove(), delete this.text), a = this.node.setValue !== null ? this.node.setValue.toPrecision(3) : "", this.text = this.paper.text(this.x, this.y, a), this.text.attr({
               "font-size": FONT_SIZE,
               "font-family": "Trebuchet MS"
            });
            if (this.editable) return $(this.text.node).click(this.editValue)
         }
      }, a
   }(), CirclularNodeDrawer = function (a) {
      function b(a) {
         b.__super__.constructor.call(this, a), this.radius = this.height / 2, this.topAnchor = new Point(this.paper, this.x, this.y - this.radius), this.bottomAnchor = new Point(this.paper, this.x, this.y + this.radius)
      }
      return __extends(b, a), b.prototype.makeDrawing = function () {
         return this.drawing = this.paper.circle(this.x, this.y, this.radius)
      }, b
   }(NodeDrawer), TriangularNodeDrawer = function (a) {
      function b(a) {
         b.__super__.constructor.call(this, a), this.width = this.height * 1.2, this.topX = this.x, this.topY = this.y - this.height * .75, this.leftX = this.x - this.width / 2, this.leftY = this.y + this.height * .25, this.rightX = this.x + this.width / 2, this.rightY = this.y + this.height * .25, this.topAnchor = new Point(this.paper, this.topX, this.topY), this.bottomAnchor = new Point(this.paper, (this.leftX + this.rightX) / 2, this.leftY), this.top = new Point(this.paper, this.topX, this.topY), this.left = new Point(this.paper, this.leftX, this.leftY), this.right = new Point(this.paper, this.rightX, this.rightY)
      }
      return __extends(b, a), b.prototype.makeDrawing = function () {
         return this.drawing = this.paper.path("M " + this.top.x + "   " + this.top.y + "                            L" + this.right.x + "  " + this.right.y + "                            L" + this.left.x + "   " + this.left.y + "                            L" + this.top.x + "    " + this.top.y)
      }, b
   }(NodeDrawer), StateNodeDrawer = function (a) {
      function b() {
         b.__super__.constructor.apply(this, arguments)
      }
      return __extends(b, a), b
   }(TriangularNodeDrawer), QNodeDrawer = function (a) {
      function b() {
         b.__super__.constructor.apply(this, arguments)
      }
      return __extends(b, a), b
   }(CirclularNodeDrawer), QuadrilateralNodeDrawer = function (a) {
      function b(a) {
         b.__super__.constructor.call(this, a), this.minX = this.x - this.width / 2, this.minY = this.y - this.height / 2, this.maxX = this.x + this.width / 2, this.maxY = this.y + this.height / 2, this.topLeft = new Point(this.paper, this.minX, this.minY), this.topRight = new Point(this.paper, this.maxX, this.minY), this.bottomLeft = new Point(this.paper, this.minX, this.maxY), this.bottomRight = new Point(this.paper, this.maxX, this.maxY), this.topAnchor = new Point(this.paper, (this.minX + this.maxX) / 2, this.minY), this.bottomAnchor = new Point(this.paper, (this.minX + this.maxX) / 2, this.maxY)
      }
      return __extends(b, a), b.prototype.makeDrawing = function () {
         return this.drawing = this.paper.path("M " + this.topLeft.x + "     " + this.topLeft.y + "                            L" + this.topRight.x + "     " + this.topRight.y + "                            L" + this.bottomRight.x + "  " + this.bottomRight.y + "                            L" + this.bottomLeft.x + "   " + this.bottomLeft.y + "                            L" + this.topLeft.x + "      " + this.topLeft.y)
      }, b
   }(NodeDrawer), $(document).ready(function () {
      var a, b, c;
      return Raphael.el.addCursor = function () {
         var a, b = this;
         return this.rotation != null && this.rotate(-this.rotation), this.cursor = this.paper.text(0, 0, "|"), this.updateCursor(), this.rotation != null && (this.rotate(this.rotation), this.cursor.rotate(this.rotation, this.attrs.x, this.attrs.y)), this.cursor.attr({
            "font-size": FONT_SIZE,
            "font-family": "Trebuchet MS"
         }), this.cursor.visible = !0, a = function () {
            var a;
            return b.cursor.visible = !b.cursor.visible, a = b.cursor.visible ? "|" : "", b.cursor.attr({
               text: a
            }), b.updateCursor()
         }, this.cursor.blinker = setInterval(function () {
            return a()
         }, 500)
      }, Raphael.el.updateCursor = function () {
         var a;
         if (this.cursor == null) return;
         return this.attr("text") === "" ? a = 0 : a = this.getBBox(!0).width / 2, this.cursor.attr({
            x: this.attrs.x + a + 2,
            y: this.attrs.y - 2
         })
      }, Raphael.el.removeCursor = function () {
         if (this.cursor == null) return;
         return clearInterval(this.cursor.blinker), $(this.cursor.node).remove(), delete this.cursor
      }, Raphael.fn.arrow = function (a, b, c, d, e, f) {
         var g, h, i, j, k, l;
         return f == null && (f = "#000"), g = Math.atan2(a - c, d - b), g = g / (2 * Math.PI) * 360, j = .9, k = a * (1 - j) + c * j, l = b * (1 - j) + d * j, i = this.path("M" + a + " " + b + " L" + c + " " + d), h = this.path("M" + k + " " + l + " L" + (k - e) + " " + (l - e) + " L" + (k - e) + " " + (l + e) + " L" + k + " " + l).attr("fill", f).rotate(90 + g, k, l), [i, h]
      }, b = [], c = [], $(".value_iteration").each(function (a) {
         var d, e, f, g, h, i, j, k, l, m, n, o = this;
         return j = JSON.parse($(this).siblings(".parameters").text()), e = JSON.parse($(this).siblings(".data").text()), f = $(this).siblings(".json_submission").find("input"), j.inputField = f, j.container = $(this), h = j.numTimeSteps * 2, g = h - 2, n = NODE_HEIGHT * .5, l = h * NODE_HEIGHT + g * n, i = new Raphael(this, $(this).parents(":first").width() * .6, l), k = new ValueIterationProblem(i, j, e), $(this).css("margin", "auto"), m = $("<div>").addClass("problem_info").css("float", "left").css("padding-top", l * .1), d = $("<div>").addClass("clearfix").css("clear", "both"), $(i.canvas).css("float", "left"), $(i.canvas).after(m), $(m).after(d), k.draw(), $(i.canvas).click(function (a) {
            if ($(i.canvas)[0] === a.target && i.focused != null) return i.focused.clearFocus()
         }), b.push(i), c.push(k)
      }), a = function () {
         var a, c, d, e, f, g, h, i, j;
         c = 0, d = null, a = 0;
         for (f = 0, h = b.length; f < h; f++) e = b[f], e.focused != null && (a += 1, e.focusedTime > c && (d = e, c = e.focusedTime));
         if (a > 1) {
            j = [];
            for (g = 0, i = b.length; g < i; g++) e = b[g], e !== d && e.focused != null ? j.push(e.focused.clearFocus()) : j.push(void 0);
            return j
         }
      }, $(document).click(function (b) {
         return a(), !0
      }), $(document).keyup(function (c) {
         var d, e, f, g;
         a(), g = [];
         for (e = 0, f = b.length; e < f; e++) {
            d = b[e];
            if (d.focused != null) switch (c.which) {
            case 9:
            case 10:
            case 13:
               g.push(d.focused.clearFocus());
               break;
            default:
               g.push(void 0)
            } else g.push(void 0)
         }
         return g
      })
   })
}).call(this);
