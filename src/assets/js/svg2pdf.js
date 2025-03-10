/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015-2021 yWorks GmbH
 * Copyright (c) 2013-2015 by Vitaly Puzrin
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jspdf"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jspdf"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).svg2pdf =
          {}),
        t.jspdf
      );
})(this, function (t, e) {
  "use strict";
  var r = "default" in e ? e.default : e,
    i = function (t, e) {
      return (i =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        })(t, e);
    };
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ function n(
    t,
    e
  ) {
    function r() {
      this.constructor = t;
    }
    i(t, e),
      (t.prototype =
        null === e ? Object.create(e) : ((r.prototype = e.prototype), new r()));
  }
  var a = function () {
    return (a =
      Object.assign ||
      function (t) {
        for (var e, r = 1, i = arguments.length; r < i; r++)
          for (var n in (e = arguments[r]))
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t;
      }).apply(this, arguments);
  };
  function s(t, e, r, i) {
    return new (r || (r = Promise))(function (n, a) {
      function s(t) {
        try {
          l(i.next(t));
        } catch (t) {
          a(t);
        }
      }
      function o(t) {
        try {
          l(i.throw(t));
        } catch (t) {
          a(t);
        }
      }
      function l(t) {
        var e;
        t.done
          ? n(t.value)
          : ((e = t.value),
            e instanceof r
              ? e
              : new r(function (t) {
                  t(e);
                })).then(s, o);
      }
      l((i = i.apply(t, e || [])).next());
    });
  }
  function o(t, e) {
    var r,
      i,
      n,
      a,
      s = {
        label: 0,
        sent: function () {
          if (1 & n[0]) throw n[1];
          return n[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (a = { next: o(0), throw: o(1), return: o(2) }),
      "function" == typeof Symbol &&
        (a[Symbol.iterator] = function () {
          return this;
        }),
      a
    );
    function o(a) {
      return function (o) {
        return (function (a) {
          if (r) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((r = 1),
                i &&
                  (n =
                    2 & a[0]
                      ? i.return
                      : a[0]
                      ? i.throw || ((n = i.return) && n.call(i), 0)
                      : i.next) &&
                  !(n = n.call(i, a[1])).done)
              )
                return n;
              switch (((i = 0), n && (a = [2 & a[0], n.value]), a[0])) {
                case 0:
                case 1:
                  n = a;
                  break;
                case 4:
                  return s.label++, { value: a[1], done: !1 };
                case 5:
                  s.label++, (i = a[1]), (a = [0]);
                  continue;
                case 7:
                  (a = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !((n = s.trys),
                    (n = n.length > 0 && n[n.length - 1]) ||
                      (6 !== a[0] && 2 !== a[0]))
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === a[0] && (!n || (a[1] > n[0] && a[1] < n[3]))) {
                    s.label = a[1];
                    break;
                  }
                  if (6 === a[0] && s.label < n[1]) {
                    (s.label = n[1]), (n = a);
                    break;
                  }
                  if (n && s.label < n[2]) {
                    (s.label = n[2]), s.ops.push(a);
                    break;
                  }
                  n[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              a = e.call(t, s);
            } catch (t) {
              (a = [6, t]), (i = 0);
            } finally {
              r = n = 0;
            }
          if (5 & a[0]) throw a[1];
          return { value: a[0] ? a[1] : void 0, done: !0 };
        })([a, o]);
      };
    }
  }
  var l = (function () {
      function t(t) {
        if (
          ((this.a = void 0),
          (this.r = 0),
          (this.g = 0),
          (this.b = 0),
          (this.simpleColors = {}),
          (this.colorDefs = []),
          (this.ok = !1),
          t)
        ) {
          for (var e in ("#" == t.charAt(0) && (t = t.substr(1, 6)),
          (t = (t = t.replace(/ /g, "")).toLowerCase()),
          (this.simpleColors = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "00ffff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000000",
            blanchedalmond: "ffebcd",
            blue: "0000ff",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "00ffff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgrey: "a9a9a9",
            darkgreen: "006400",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            feldspar: "d19275",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "ff00ff",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            grey: "808080",
            green: "008000",
            greenyellow: "adff2f",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgrey: "d3d3d3",
            lightgreen: "90ee90",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslateblue: "8470ff",
            lightslategray: "778899",
            lightslategrey: "778899",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "00ff00",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "ff00ff",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370d8",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "d87093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "ff0000",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            violetred: "d02090",
            wheat: "f5deb3",
            white: "ffffff",
            whitesmoke: "f5f5f5",
            yellow: "ffff00",
            yellowgreen: "9acd32",
          }),
          this.simpleColors))
            t == e && (t = this.simpleColors[e]);
          this.colorDefs = [
            {
              re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
              example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
              process: function (t) {
                return [parseInt(t[1]), parseInt(t[2]), parseInt(t[3])];
              },
            },
            {
              re: /^(\w{2})(\w{2})(\w{2})$/,
              example: ["#00ff00", "336699"],
              process: function (t) {
                return [
                  parseInt(t[1], 16),
                  parseInt(t[2], 16),
                  parseInt(t[3], 16),
                ];
              },
            },
            {
              re: /^(\w{1})(\w{1})(\w{1})$/,
              example: ["#fb0", "f0f"],
              process: function (t) {
                return [
                  parseInt(t[1] + t[1], 16),
                  parseInt(t[2] + t[2], 16),
                  parseInt(t[3] + t[3], 16),
                ];
              },
            },
          ];
          for (var r = 0; r < this.colorDefs.length; r++) {
            var i = this.colorDefs[r].re,
              n = this.colorDefs[r].process,
              a = i.exec(t);
            if (a) {
              var s = n(a);
              (this.r = s[0]), (this.g = s[1]), (this.b = s[2]), (this.ok = !0);
            }
          }
          (this.r =
            this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r),
            (this.g =
              this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g),
            (this.b =
              this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b);
        }
      }
      return (
        (t.prototype.toRGB = function () {
          return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        }),
        (t.prototype.toRGBA = function () {
          return (
            "rgba(" +
            this.r +
            ", " +
            this.g +
            ", " +
            this.b +
            ", " +
            (this.a || "1") +
            ")"
          );
        }),
        (t.prototype.toHex = function () {
          var t = this.r.toString(16),
            e = this.g.toString(16),
            r = this.b.toString(16);
          return (
            1 == t.length && (t = "0" + t),
            1 == e.length && (e = "0" + e),
            1 == r.length && (r = "0" + r),
            "#" + t + e + r
          );
        }),
        (t.prototype.getHelpXML = function () {
          for (var e = [], r = 0; r < this.colorDefs.length; r++)
            for (var i = this.colorDefs[r].example, n = 0; n < i.length; n++)
              e[e.length] = i[n];
          for (var a in this.simpleColors) e[e.length] = a;
          var s = document.createElement("ul");
          s.setAttribute("id", "rgbcolor-examples");
          for (r = 0; r < e.length; r++)
            try {
              var o = document.createElement("li"),
                l = new t(e[r]),
                u = document.createElement("div");
              (u.style.cssText =
                "margin: 3px; border: 1px solid black; background:" +
                l.toHex() +
                "; color:" +
                l.toHex()),
                u.appendChild(document.createTextNode("test"));
              var h = document.createTextNode(
                " " + e[r] + " -> " + l.toRGB() + " -> " + l.toHex()
              );
              o.appendChild(u), o.appendChild(h), s.appendChild(o);
            } catch (t) {}
          return s;
        }),
        t
      );
    })(),
    u = (function () {
      function t(t) {
        this.color = t;
      }
      return (
        (t.prototype.getFillData = function (t, e) {
          return s(this, void 0, void 0, function () {
            return o(this, function (t) {
              return [2, void 0];
            });
          });
        }),
        t
      );
    })(),
    h = (function () {
      function t() {
        (this.xmlSpace = ""),
          (this.fill = null),
          (this.fillOpacity = 1),
          (this.fontFamily = ""),
          (this.fontSize = 16),
          (this.fontStyle = ""),
          (this.fontWeight = ""),
          (this.opacity = 1),
          (this.stroke = null),
          (this.strokeDasharray = null),
          (this.strokeDashoffset = 0),
          (this.strokeLinecap = ""),
          (this.strokeLinejoin = ""),
          (this.strokeMiterlimit = 4),
          (this.strokeOpacity = 1),
          (this.strokeWidth = 1),
          (this.alignmentBaseline = ""),
          (this.textAnchor = ""),
          (this.visibility = ""),
          (this.color = null);
      }
      return (
        (t.prototype.clone = function () {
          var e = new t();
          return (
            (e.xmlSpace = this.xmlSpace),
            (e.fill = this.fill),
            (e.fillOpacity = this.fillOpacity),
            (e.fontFamily = this.fontFamily),
            (e.fontSize = this.fontSize),
            (e.fontStyle = this.fontStyle),
            (e.fontWeight = this.fontWeight),
            (e.opacity = this.opacity),
            (e.stroke = this.stroke),
            (e.strokeDasharray = this.strokeDasharray),
            (e.strokeDashoffset = this.strokeDashoffset),
            (e.strokeLinecap = this.strokeLinecap),
            (e.strokeLinejoin = this.strokeLinejoin),
            (e.strokeMiterlimit = this.strokeMiterlimit),
            (e.strokeOpacity = this.strokeOpacity),
            (e.strokeWidth = this.strokeWidth),
            (e.textAnchor = this.textAnchor),
            (e.alignmentBaseline = this.alignmentBaseline),
            (e.visibility = this.visibility),
            (e.color = this.color),
            e
          );
        }),
        (t.default = function () {
          var e = new t();
          return (
            (e.xmlSpace = "default"),
            (e.fill = new u(new l("rgb(0, 0, 0)"))),
            (e.fillOpacity = 1),
            (e.fontFamily = "times"),
            (e.fontSize = 16),
            (e.fontStyle = "normal"),
            (e.fontWeight = "normal"),
            (e.opacity = 1),
            (e.stroke = null),
            (e.strokeDasharray = null),
            (e.strokeDashoffset = 0),
            (e.strokeLinecap = "butt"),
            (e.strokeLinejoin = "miter"),
            (e.strokeMiterlimit = 4),
            (e.strokeOpacity = 1),
            (e.strokeWidth = 1),
            (e.alignmentBaseline = "baseline"),
            (e.textAnchor = "start"),
            (e.visibility = "visible"),
            (e.color = new l("rgb(0, 0, 0)")),
            e
          );
        }),
        t
      );
    })(),
    f = /url\(["']?#([^"']+)["']?\)/,
    c = {
      bottom: "bottom",
      "text-bottom": "bottom",
      top: "top",
      "text-top": "top",
      hanging: "hanging",
      middle: "middle",
      central: "middle",
      center: "middle",
      mathematical: "middle",
      ideographic: "ideographic",
      alphabetic: "alphabetic",
      baseline: "alphabetic",
    },
    p = (function () {
      function t() {
        this.measureMethods = {};
      }
      return (
        (t.prototype.getTextOffset = function (t, e) {
          var r = e.textAnchor;
          if ("start" === r) return 0;
          var i = this.measureTextWidth(t, e),
            n = 0;
          switch (r) {
            case "end":
              n = i;
              break;
            case "middle":
              n = i / 2;
          }
          return n;
        }),
        (t.prototype.measureTextWidth = function (t, e) {
          if (0 === t.length) return 0;
          var r = e.fontFamily;
          return this.getMeasureFunction(r).call(
            this,
            t,
            e.fontFamily,
            e.fontSize + "px",
            e.fontStyle,
            e.fontWeight
          );
        }),
        (t.prototype.getMeasurementTextNode = function () {
          if (!this.textMeasuringTextElement) {
            this.textMeasuringTextElement = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            var t = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            );
            t.appendChild(this.textMeasuringTextElement),
              t.style.setProperty("position", "absolute"),
              t.style.setProperty("visibility", "hidden"),
              document.body.appendChild(t);
          }
          return this.textMeasuringTextElement;
        }),
        (t.prototype.canvasTextMeasure = function (t, e, r, i, n) {
          var a = document.createElement("canvas").getContext("2d");
          return null != a
            ? ((a.font = [i, n, r, e].join(" ")), a.measureText(t).width)
            : 0;
        }),
        (t.prototype.svgTextMeasure = function (t, e, r, i, n, a) {
          void 0 === a && (a = this.getMeasurementTextNode());
          var s = a;
          return (
            s.setAttribute("font-family", e),
            s.setAttribute("font-size", r),
            s.setAttribute("font-style", i),
            s.setAttribute("font-weight", n),
            s.setAttributeNS(
              "http://www.w3.org/XML/1998/namespace",
              "xml:space",
              "preserve"
            ),
            (s.textContent = t),
            s.getBBox().width
          );
        }),
        (t.prototype.getMeasureFunction = function (e) {
          var r = this.measureMethods[e];
          if (!r) {
            var i = this.canvasTextMeasure(
                t.testString,
                e,
                "16px",
                "normal",
                "normal"
              ),
              n = this.svgTextMeasure(
                t.testString,
                e,
                "16px",
                "normal",
                "normal"
              );
            (r =
              Math.abs(i - n) < t.epsilon
                ? this.canvasTextMeasure
                : this.svgTextMeasure),
              (this.measureMethods[e] = r);
          }
          return r;
        }),
        (t.prototype.cleanupTextMeasuring = function () {
          if (this.textMeasuringTextElement) {
            var t = this.textMeasuringTextElement.parentNode;
            t && document.body.removeChild(t),
              (this.textMeasuringTextElement = void 0);
          }
        }),
        (t.testString =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789!\"$%&/()=?'\\+*-_.:,;^}][{#~|<>"),
        (t.epsilon = 0.1),
        t
      );
    })(),
    d = (function () {
      function t(t, e) {
        var r, i, n, a, s, o;
        (this.pdf = t),
          (this.svg2pdfParameters = e.svg2pdfParameters),
          (this.attributeState = e.attributeState
            ? e.attributeState.clone()
            : h.default()),
          (this.viewport = e.viewport),
          (this.refsHandler =
            null !== (r = e.refsHandler) && void 0 !== r ? r : null),
          (this.styleSheets =
            null !== (i = e.styleSheets) && void 0 !== i ? i : null),
          (this.textMeasure =
            null !== (n = e.textMeasure) && void 0 !== n ? n : new p()),
          (this.transform =
            null !== (a = e.transform) && void 0 !== a
              ? a
              : this.pdf.unitMatrix),
          (this.withinClipPath =
            null !== (s = e.withinClipPath) && void 0 !== s && s),
          (this.withinUse = null !== (o = e.withinUse) && void 0 !== o && o);
      }
      return (
        (t.prototype.clone = function (e) {
          var r, i, n, a, s, o, l, u;
          return (
            void 0 === e && (e = {}),
            new t(this.pdf, {
              svg2pdfParameters:
                null !== (r = e.svg2pdfParameters) && void 0 !== r
                  ? r
                  : this.svg2pdfParameters,
              attributeState: e.attributeState
                ? e.attributeState.clone()
                : this.attributeState.clone(),
              viewport:
                null !== (i = e.viewport) && void 0 !== i ? i : this.viewport,
              refsHandler:
                null !== (n = e.refsHandler) && void 0 !== n
                  ? n
                  : this.refsHandler,
              styleSheets:
                null !== (a = e.styleSheets) && void 0 !== a
                  ? a
                  : this.styleSheets,
              textMeasure:
                null !== (s = e.textMeasure) && void 0 !== s
                  ? s
                  : this.textMeasure,
              transform:
                null !== (o = e.transform) && void 0 !== o ? o : this.transform,
              withinClipPath:
                null !== (l = e.withinClipPath) && void 0 !== l
                  ? l
                  : this.withinClipPath,
              withinUse:
                null !== (u = e.withinUse) && void 0 !== u ? u : this.withinUse,
            })
          );
        }),
        t
      );
    })(),
    g = {}.hasOwnProperty,
    m = /[ -,\.\/:-@\[-\^`\{-~]/,
    y = /[ -,\.\/:-@\[\]\^`\{-~]/,
    v = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,
    b = function t(e, r) {
      "single" !=
        (r = (function (t, e) {
          if (!t) return e;
          var r = {};
          for (var i in e) r[i] = g.call(t, i) ? t[i] : e[i];
          return r;
        })(r, t.options)).quotes &&
        "double" != r.quotes &&
        (r.quotes = "single");
      for (
        var i = "double" == r.quotes ? '"' : "'",
          n = r.isIdentifier,
          a = e.charAt(0),
          s = "",
          o = 0,
          l = e.length;
        o < l;

      ) {
        var u = e.charAt(o++),
          h = u.charCodeAt(),
          f = void 0;
        if (h < 32 || h > 126) {
          if (h >= 55296 && h <= 56319 && o < l) {
            var c = e.charCodeAt(o++);
            56320 == (64512 & c)
              ? (h = ((1023 & h) << 10) + (1023 & c) + 65536)
              : o--;
          }
          f = "\\" + h.toString(16).toUpperCase() + " ";
        } else
          f = r.escapeEverything
            ? m.test(u)
              ? "\\" + u
              : "\\" + h.toString(16).toUpperCase() + " "
            : /[\t\n\f\r\x0B]/.test(u)
            ? "\\" + h.toString(16).toUpperCase() + " "
            : "\\" == u ||
              (!n && (('"' == u && i == u) || ("'" == u && i == u))) ||
              (n && y.test(u))
            ? "\\" + u
            : u;
        s += f;
      }
      return (
        n &&
          (/^-[-\d]/.test(s)
            ? (s = "\\-" + s.slice(1))
            : /\d/.test(a) && (s = "\\3" + a + " " + s.slice(1))),
        (s = s.replace(v, function (t, e, r) {
          return e && e.length % 2 ? t : (e || "") + r;
        })),
        !n && r.wrap ? i + s + i : s
      );
    };
  (b.options = {
    escapeEverything: !1,
    isIdentifier: !1,
    quotes: "single",
    wrap: !1,
  }),
    (b.version = "3.0.0");
  var x = b,
    S = (function () {
      function t(e) {
        (this.renderedElements = {}),
          (this.idMap = e),
          (this.idPrefix = String(t.instanceCounter++));
      }
      return (
        (t.prototype.getRendered = function (t, e, r) {
          return s(this, void 0, void 0, function () {
            var i, n;
            return o(this, function (a) {
              switch (a.label) {
                case 0:
                  return (
                    (i = this.generateKey(t, e)),
                    this.renderedElements.hasOwnProperty(i)
                      ? [2, this.renderedElements[t]]
                      : ((n = this.get(t)),
                        (this.renderedElements[i] = n),
                        [4, r(n)])
                  );
                case 1:
                  return a.sent(), [2, n];
              }
            });
          });
        }),
        (t.prototype.get = function (t) {
          return this.idMap[x(t, { isIdentifier: !0 })];
        }),
        (t.prototype.generateKey = function (t, e) {
          return (
            this.idPrefix + "|" + t + "|" + (e || new l("rgb(0,0,0)")).toRGBA()
          );
        }),
        (t.instanceCounter = 0),
        t
      );
    })();
  function w(t, e) {
    return Math.atan2(e[1] - t[1], e[0] - t[0]);
  }
  function k(t, e) {
    return [(2 / 3) * (e[0] - t[0]) + t[0], (2 / 3) * (e[1] - t[1]) + t[1]];
  }
  function M(t) {
    var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    return [t[0] / e, t[1] / e];
  }
  function C(t, e) {
    return M([e[0] - t[0], e[1] - t[1]]);
  }
  function A(t, e) {
    return [t[0] + e[0], t[1] + e[1]];
  }
  function F(t, e) {
    var r = t[0],
      i = t[1];
    return [e.a * r + e.c * i + e.e, e.b * r + e.d * i + e.f];
  }
  var T = (function () {
      function t() {
        this.segments = [];
      }
      return (
        (t.prototype.moveTo = function (t, e) {
          return this.segments.push(new P(t, e)), this;
        }),
        (t.prototype.lineTo = function (t, e) {
          return this.segments.push(new B(t, e)), this;
        }),
        (t.prototype.curveTo = function (t, e, r, i, n, a) {
          return this.segments.push(new N(t, e, r, i, n, a)), this;
        }),
        (t.prototype.close = function () {
          return this.segments.push(new L()), this;
        }),
        (t.prototype.transform = function (t) {
          this.segments.forEach(function (e) {
            if (e instanceof P || e instanceof B || e instanceof N) {
              var r = F([e.x, e.y], t);
              (e.x = r[0]), (e.y = r[1]);
            }
            if (e instanceof N) {
              var i = F([e.x1, e.y1], t),
                n = F([e.x2, e.y2], t);
              (e.x1 = i[0]), (e.y1 = i[1]), (e.x2 = n[0]), (e.y2 = n[1]);
            }
          });
        }),
        (t.prototype.draw = function (t) {
          var e = t.pdf;
          this.segments.forEach(function (t) {
            t instanceof P
              ? e.moveTo(t.x, t.y)
              : t instanceof B
              ? e.lineTo(t.x, t.y)
              : t instanceof N
              ? e.curveTo(t.x1, t.y1, t.x2, t.y2, t.x, t.y)
              : e.close();
          });
        }),
        t
      );
    })(),
    P = function (t, e) {
      (this.x = t), (this.y = e);
    },
    B = function (t, e) {
      (this.x = t), (this.y = e);
    },
    N = function (t, e, r, i, n, a) {
      (this.x1 = t),
        (this.y1 = e),
        (this.x2 = r),
        (this.y2 = i),
        (this.x = n),
        (this.y = a);
    },
    L = function () {};
  function E(t, e) {
    return e.split(",").indexOf((t.nodeName || t.tagName).toLowerCase()) >= 0;
  }
  function O(t, e, r, i) {
    var n;
    void 0 === i && (i = r);
    var a =
      null === (n = t.style) || void 0 === n ? void 0 : n.getPropertyValue(i);
    if (a) return a;
    var s = e.getPropertyValue(t, i);
    return s || (t.hasAttribute(r) && t.getAttribute(r)) || void 0;
  }
  function I(t, e, r) {
    if ("none" === O(t.element, r.styleSheets, "display")) return !1;
    var i = e,
      n = O(t.element, r.styleSheets, "visibility");
    return n && (i = "hidden" !== n), i;
  }
  function _(t, e, r) {
    var i = I(t, e, r);
    return (
      0 !== t.element.childNodes.length &&
      (t.children.forEach(function (t) {
        t.isVisible(i, r) && (i = !0);
      }),
      i)
    );
  }
  var H = (function () {
      function t() {
        this.markers = [];
      }
      return (
        (t.prototype.addMarker = function (t) {
          this.markers.push(t);
        }),
        (t.prototype.draw = function (t) {
          return s(this, void 0, void 0, function () {
            var e, r, i, n, a, s, l;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  (e = 0), (o.label = 1);
                case 1:
                  return e < this.markers.length
                    ? ((r = this.markers[e]),
                      (i = void 0),
                      (n = r.angle),
                      (a = r.anchor),
                      (s = Math.cos(n)),
                      (l = Math.sin(n)),
                      (i = t.pdf.Matrix(s, l, -l, s, a[0], a[1])),
                      (i = t.pdf.matrixMult(
                        t.pdf.Matrix(
                          t.attributeState.strokeWidth,
                          0,
                          0,
                          t.attributeState.strokeWidth,
                          0,
                          0
                        ),
                        i
                      )),
                      (i = t.pdf.matrixMult(i, t.transform)),
                      t.pdf.saveGraphicsState(),
                      [
                        4,
                        t.refsHandler.getRendered(r.id, null, function (e) {
                          return e.apply(t);
                        }),
                      ])
                    : [3, 4];
                case 2:
                  o.sent(),
                    t.pdf.doFormObject(r.id, i),
                    t.pdf.restoreGraphicsState(),
                    (o.label = 3);
                case 3:
                  return e++, [3, 1];
                case 4:
                  return [2];
              }
            });
          });
        }),
        t
      );
    })(),
    D = function (t, e, r) {
      (this.id = t), (this.anchor = e), (this.angle = r);
    };
  function q(t, e) {
    var r;
    return (r = t && t.toString().match(/^([\-0-9.]+)em$/))
      ? parseFloat(r[1]) * e
      : (r = t && t.toString().match(/^([\-0-9.]+)(px|)$/))
      ? parseFloat(r[1])
      : 0;
  }
  function V(t) {
    return c[t] || "alphabetic";
  }
  function j(t) {
    for (
      var e,
        r = [],
        i = /[+-]?(?:(?:\d+\.?\d*)|(?:\d*\.?\d+))(?:[eE][+-]?\d+)?/g;
      (e = i.exec(t));

    )
      r.push(parseFloat(e[0]));
    return r;
  }
  function R(t, e) {
    if ("transparent" === t) {
      var r = new l("rgb(0,0,0)");
      return (r.a = 0), r;
    }
    if ("currentcolor" === t.toLowerCase()) return e || new l("rgb(0,0,0)");
    var i = /\s*rgba\(((?:[^,\)]*,){3}[^,\)]*)\)\s*/.exec(t);
    if (i) {
      var n = j(i[1]),
        a = new l("rgb(" + n.slice(0, 3).join(",") + ")");
      return (a.a = n[3]), a;
    }
    return new l(t);
  }
  var W = /[a-z0-9_-]/i,
    G = /[\s\t]/,
    U = function (t) {
      for (var e, r, i = !0, n = 0, a = "", s = 0, o = []; ; ) {
        if (((r = t[s]), 0 === n)) {
          if (!r && i) break;
          if (!r && !i) throw new Error("Parse error");
          if ('"' === r || "'" === r) (e = r), (n = 1), (i = !1);
          else if (G.test(r));
          else {
            if (!W.test(r)) throw new Error("Parse error");
            (n = 3), (i = !1), s--;
          }
        } else if (1 === n) {
          if (!r) throw new Error("Parse Error");
          "\\" === r
            ? (n = 2)
            : r === e
            ? (o.push(a), (a = ""), (n = 4))
            : (a += r);
        } else if (2 === n) {
          if (r !== e && "\\" !== r) throw new Error("Parse error");
          (a += r), (n = 1);
        } else if (3 === n) {
          if (!r) {
            o.push(a);
            break;
          }
          if (W.test(r)) a += r;
          else if ("," === r) o.push(a), (a = ""), (n = 0);
          else {
            if (!G.test(r)) throw new Error("Parse error");
            n = 5;
          }
        } else if (5 === n) {
          if (!r) {
            o.push(a);
            break;
          }
          if (W.test(r)) (a += " " + r), (n = 3);
          else if ("," === r) o.push(a), (a = ""), (n = 0);
          else if (!G.test(r)) throw new Error("Parse error");
        } else if (4 === n) {
          if (!r) break;
          if ("," === r) n = 0;
          else if (!G.test(r)) throw new Error("Parse error");
        }
        s++;
      }
      return o;
    },
    z = {
      "sans-serif": "helvetica",
      verdana: "helvetica",
      arial: "helvetica",
      fixed: "courier",
      monospace: "courier",
      terminal: "courier",
      serif: "times",
      cursive: "times",
      fantasy: "times",
    };
  var Y,
    X =
      ((Y = r.version.split(".")),
      2 === parseFloat(Y[0]) && 3 === parseFloat(Y[1]));
  function Q(t, e) {
    return X
      ? 400 == e
        ? "italic" == t
          ? "italic"
          : "normal"
        : 700 == e && "italic" !== t
        ? "bold"
        : t + "" + e
      : 400 == e || "normal" === e
      ? "italic" === t
        ? "italic"
        : "normal"
      : (700 != e && "bold" !== e) || "normal" !== t
      ? (700 == e ? "bold" : e) + "" + t
      : "bold";
  }
  function $(t, e) {
    if ("none" === O(e.element, t.styleSheets, "display")) return [0, 0, 0, 0];
    var r = [0, 0, 0, 0];
    return (
      e.children.forEach(function (e) {
        var i = e.getBoundingBox(t);
        r = [
          Math.min(r[0], i[0]),
          Math.min(r[1], i[1]),
          Math.max(r[0] + r[2], i[0] + i[2]) - Math.min(r[0], i[0]),
          Math.max(r[1] + r[3], i[1] + i[3]) - Math.min(r[1], i[1]),
        ];
      }),
      r
    );
  }
  function K(t, e) {
    var r = parseFloat,
      i =
        r(t.getAttribute("x1")) ||
        r(O(t, e.styleSheets, "x")) ||
        r(O(t, e.styleSheets, "cx")) - r(O(t, e.styleSheets, "r")) ||
        0,
      n =
        r(t.getAttribute("x2")) ||
        i + r(O(t, e.styleSheets, "width")) ||
        r(O(t, e.styleSheets, "cx")) + r(O(t, e.styleSheets, "r")) ||
        0,
      a =
        r(t.getAttribute("y1")) ||
        r(O(t, e.styleSheets, "y")) ||
        r(O(t, e.styleSheets, "cy")) - r(O(t, e.styleSheets, "r")) ||
        0,
      s =
        r(t.getAttribute("y2")) ||
        a + r(O(t, e.styleSheets, "height")) ||
        r(O(t, e.styleSheets, "cy")) + r(O(t, e.styleSheets, "r")) ||
        0;
    return [
      Math.min(i, n),
      Math.min(a, s),
      Math.max(i, n) - Math.min(i, n),
      Math.max(a, s) - Math.min(a, s),
    ];
  }
  function Z(t, e, r, i, n, a, s, o) {
    void 0 === o && (o = !1);
    var l,
      u,
      h = e[0],
      f = e[1],
      c = e[2],
      p = e[3],
      d = n / c,
      g = a / p,
      m = t.getAttribute("preserveAspectRatio");
    if (m) {
      var y = m.split(" ");
      "defer" === y[0] && (y = y.slice(1)), (l = y[0]), (u = y[1] || "meet");
    } else (l = "xMidYMid"), (u = "meet");
    if (
      ("none" !== l &&
        ("meet" === u
          ? (d = g = Math.min(d, g))
          : "slice" === u && (d = g = Math.max(d, g))),
      o)
    )
      return s.pdf.Matrix(d, 0, 0, g, 0, 0);
    var v = r - h * d,
      b = i - f * g;
    l.indexOf("xMid") >= 0
      ? (v += (n - c * d) / 2)
      : l.indexOf("xMax") >= 0 && (v += n - c * d),
      l.indexOf("YMid") >= 0
        ? (b += (a - p * g) / 2)
        : l.indexOf("YMax") >= 0 && (b += a - p * g);
    var x = s.pdf.Matrix(1, 0, 0, 1, v, b),
      S = s.pdf.Matrix(d, 0, 0, g, 0, 0);
    return s.pdf.matrixMult(S, x);
  }
  function J(t, e) {
    if (!t || "none" === t) return e.pdf.unitMatrix;
    for (
      var r,
        i,
        n = /^[\s,]*matrix\(([^)]+)\)\s*/,
        a = /^[\s,]*translate\(([^)]+)\)\s*/,
        s = /^[\s,]*rotate\(([^)]+)\)\s*/,
        o = /^[\s,]*scale\(([^)]+)\)\s*/,
        l = /^[\s,]*skewX\(([^)]+)\)\s*/,
        u = /^[\s,]*skewY\(([^)]+)\)\s*/,
        h = e.pdf.unitMatrix;
      t.length > 0 && t.length !== i;

    ) {
      i = t.length;
      var f = n.exec(t);
      if (
        (f &&
          ((r = j(f[1])),
          (h = e.pdf.matrixMult(
            e.pdf.Matrix(r[0], r[1], r[2], r[3], r[4], r[5]),
            h
          )),
          (t = t.substr(f[0].length))),
        (f = s.exec(t)))
      ) {
        r = j(f[1]);
        var c = (Math.PI * r[0]) / 180;
        if (
          ((h = e.pdf.matrixMult(
            e.pdf.Matrix(
              Math.cos(c),
              Math.sin(c),
              -Math.sin(c),
              Math.cos(c),
              0,
              0
            ),
            h
          )),
          r[1] || r[2])
        ) {
          var p = e.pdf.Matrix(1, 0, 0, 1, r[1], r[2]),
            d = e.pdf.Matrix(1, 0, 0, 1, -r[1], -r[2]);
          h = e.pdf.matrixMult(d, e.pdf.matrixMult(h, p));
        }
        t = t.substr(f[0].length);
      }
      (f = a.exec(t)) &&
        ((r = j(f[1])),
        (h = e.pdf.matrixMult(e.pdf.Matrix(1, 0, 0, 1, r[0], r[1] || 0), h)),
        (t = t.substr(f[0].length))),
        (f = o.exec(t)) &&
          ((r = j(f[1]))[1] || (r[1] = r[0]),
          (h = e.pdf.matrixMult(e.pdf.Matrix(r[0], 0, 0, r[1], 0, 0), h)),
          (t = t.substr(f[0].length))),
        (f = l.exec(t)) &&
          ((r = parseFloat(f[1])),
          (r *= Math.PI / 180),
          (h = e.pdf.matrixMult(e.pdf.Matrix(1, 0, Math.tan(r), 1, 0, 0), h)),
          (t = t.substr(f[0].length))),
        (f = u.exec(t)) &&
          ((r = parseFloat(f[1])),
          (r *= Math.PI / 180),
          (h = e.pdf.matrixMult(e.pdf.Matrix(1, Math.tan(r), 0, 1, 0, 0), h)),
          (t = t.substr(f[0].length)));
    }
    return h;
  }
  var tt = (function () {
      function t(t, e) {
        (this.element = t), (this.children = e), (this.parent = null);
      }
      return (
        (t.prototype.setParent = function (t) {
          this.parent = t;
        }),
        (t.prototype.getParent = function () {
          return this.parent;
        }),
        (t.prototype.getBoundingBox = function (t) {
          return "none" === O(this.element, t.styleSheets, "display")
            ? [0, 0, 0, 0]
            : this.getBoundingBoxCore(t);
        }),
        (t.prototype.computeNodeTransform = function (t) {
          var e = this.computeNodeTransformCore(t),
            r = O(this.element, t.styleSheets, "transform");
          return r ? t.pdf.matrixMult(e, J(r, t)) : e;
        }),
        t
      );
    })(),
    et = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.render = function (t) {
          return Promise.resolve();
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return [];
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        e
      );
    })(tt),
    rt = (function (t) {
      function r(e, r, i) {
        var n = t.call(this, r, i) || this;
        return (n.pdfGradientType = e), (n.contextColor = void 0), n;
      }
      return (
        n(r, t),
        (r.prototype.apply = function (t) {
          return s(this, void 0, void 0, function () {
            var r, i, n, a, s, l;
            return o(this, function (o) {
              return (r = this.element.getAttribute("id"))
                ? ((i = this.getStops(t.styleSheets)),
                  (n = 0),
                  (a = !1),
                  i.forEach(function (t) {
                    var e = t.opacity;
                    e && 1 !== e && ((n += e), (a = !0));
                  }),
                  a && (s = new e.GState({ opacity: n / i.length })),
                  (l = new e.ShadingPattern(
                    this.pdfGradientType,
                    this.getCoordinates(),
                    i,
                    s
                  )),
                  t.pdf.addShadingPattern(r, l),
                  [2])
                : [2];
            });
          });
        }),
        (r.prototype.getStops = function (t) {
          var e = this;
          if (this.stops) return this.stops;
          if (void 0 === this.contextColor) {
            this.contextColor = null;
            for (var i = this; i; ) {
              var n = O(i.element, t, "color");
              if (n) {
                this.contextColor = R(n, null);
                break;
              }
              i = i.getParent();
            }
          }
          var a = [];
          return (
            this.children.forEach(function (i) {
              if ("stop" === i.element.tagName.toLowerCase()) {
                var n = O(i.element, t, "color"),
                  s = R(
                    O(i.element, t, "stop-color") || "",
                    n ? R(n, null) : e.contextColor
                  ),
                  o = parseFloat(O(i.element, t, "stop-opacity") || "1");
                a.push({
                  offset: r.parseGradientOffset(
                    i.element.getAttribute("offset") || "0"
                  ),
                  color: [s.r, s.g, s.b],
                  opacity: o,
                });
              }
            }),
            (this.stops = a)
          );
        }),
        (r.prototype.getBoundingBoxCore = function (t) {
          return K(this.element, t);
        }),
        (r.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (r.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        (r.parseGradientOffset = function (t) {
          var e = parseFloat(t);
          return !isNaN(e) && t.indexOf("%") >= 0 ? e / 100 : e;
        }),
        r
      );
    })(et),
    it = (function (t) {
      function e(e, r) {
        return t.call(this, "axial", e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.getCoordinates = function () {
          return [
            parseFloat(this.element.getAttribute("x1") || "0"),
            parseFloat(this.element.getAttribute("y1") || "0"),
            parseFloat(this.element.getAttribute("x2") || "1"),
            parseFloat(this.element.getAttribute("y2") || "0"),
          ];
        }),
        e
      );
    })(rt),
    nt = (function (t) {
      function e(e, r) {
        return t.call(this, "radial", e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.getCoordinates = function () {
          var t = this.element.getAttribute("cx"),
            e = this.element.getAttribute("cy"),
            r = this.element.getAttribute("fx"),
            i = this.element.getAttribute("fy");
          return [
            parseFloat(r || t || "0.5"),
            parseFloat(i || e || "0.5"),
            0,
            parseFloat(t || "0.5"),
            parseFloat(e || "0.5"),
            parseFloat(this.element.getAttribute("r") || "0.5"),
          ];
        }),
        e
      );
    })(rt),
    at = (function () {
      function t(t, e) {
        (this.key = t), (this.gradient = e);
      }
      return (
        (t.prototype.getFillData = function (t, e) {
          return s(this, void 0, void 0, function () {
            var r, i, n;
            return o(this, function (a) {
              switch (a.label) {
                case 0:
                  return [
                    4,
                    e.refsHandler.getRendered(this.key, null, function (t) {
                      return t.apply(
                        new d(e.pdf, {
                          refsHandler: e.refsHandler,
                          textMeasure: e.textMeasure,
                          styleSheets: e.styleSheets,
                          viewport: e.viewport,
                          svg2pdfParameters: e.svg2pdfParameters,
                        })
                      );
                    }),
                  ];
                case 1:
                  return (
                    a.sent(),
                    this.gradient.element.hasAttribute("gradientUnits") &&
                    "objectboundingbox" !==
                      this.gradient.element
                        .getAttribute("gradientUnits")
                        .toLowerCase()
                      ? (r = e.pdf.unitMatrix)
                      : ((i = t.getBoundingBox(e)),
                        (r = e.pdf.Matrix(i[2], 0, 0, i[3], i[0], i[1]))),
                    (n = J(
                      O(
                        this.gradient.element,
                        e.styleSheets,
                        "gradientTransform",
                        "transform"
                      ),
                      e
                    )),
                    [2, { key: this.key, matrix: e.pdf.matrixMult(n, r) }]
                  );
              }
            });
          });
        }),
        t
      );
    })(),
    st = (function (t) {
      function r() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(r, t),
        (r.prototype.apply = function (t) {
          return s(this, void 0, void 0, function () {
            var r, i, n, a, s;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  if (!(r = this.element.getAttribute("id"))) return [2];
                  (i = this.getBoundingBox(t)),
                    (n = new e.TilingPattern(
                      [i[0], i[1], i[0] + i[2], i[1] + i[3]],
                      i[2],
                      i[3]
                    )),
                    t.pdf.beginTilingPattern(n),
                    (a = 0),
                    (s = this.children),
                    (o.label = 1);
                case 1:
                  return a < s.length
                    ? [
                        4,
                        s[a].render(
                          new d(t.pdf, {
                            attributeState: t.attributeState,
                            refsHandler: t.refsHandler,
                            styleSheets: t.styleSheets,
                            viewport: t.viewport,
                            svg2pdfParameters: t.svg2pdfParameters,
                          })
                        ),
                      ]
                    : [3, 4];
                case 2:
                  o.sent(), (o.label = 3);
                case 3:
                  return a++, [3, 1];
                case 4:
                  return t.pdf.endTilingPattern(r, n), [2];
              }
            });
          });
        }),
        (r.prototype.getBoundingBoxCore = function (t) {
          return K(this.element, t);
        }),
        (r.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (r.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        r
      );
    })(et),
    ot = (function () {
      function t(t, e) {
        (this.key = t), (this.pattern = e);
      }
      return (
        (t.prototype.getFillData = function (t, e) {
          return s(this, void 0, void 0, function () {
            var r, i, n, a, s, l, u, h, f, c, p, g;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  return [
                    4,
                    e.refsHandler.getRendered(this.key, null, function (t) {
                      return t.apply(
                        new d(e.pdf, {
                          refsHandler: e.refsHandler,
                          textMeasure: e.textMeasure,
                          styleSheets: e.styleSheets,
                          viewport: e.viewport,
                          svg2pdfParameters: e.svg2pdfParameters,
                        })
                      );
                    }),
                  ];
                case 1:
                  return (
                    o.sent(),
                    (r = {
                      key: this.key,
                      boundingBox: void 0,
                      xStep: 0,
                      yStep: 0,
                      matrix: void 0,
                    }),
                    (n = e.pdf.unitMatrix),
                    (this.pattern.element.hasAttribute("patternUnits") &&
                      "objectboundingbox" !==
                        this.pattern.element
                          .getAttribute("patternUnits")
                          .toLowerCase()) ||
                      ((i = t.getBoundingBox(e)),
                      (n = e.pdf.Matrix(1, 0, 0, 1, i[0], i[1])),
                      (s = this.pattern.getBoundingBox(e)),
                      (l = s[0] * i[0] || 0),
                      (u = s[1] * i[1] || 0),
                      (h = s[2] * i[2] || 0),
                      (f = s[3] * i[3] || 0),
                      (r.boundingBox = [l, u, l + h, u + f]),
                      (r.xStep = h),
                      (r.yStep = f)),
                    (a = e.pdf.unitMatrix),
                    this.pattern.element.hasAttribute("patternContentUnits") &&
                      "objectboundingbox" ===
                        this.pattern.element
                          .getAttribute("patternContentUnits")
                          .toLowerCase() &&
                      (i || (i = t.getBoundingBox(e)),
                      (a = e.pdf.Matrix(i[2], 0, 0, i[3], 0, 0)),
                      (s = r.boundingBox || this.pattern.getBoundingBox(e)),
                      (l = s[0] / i[0] || 0),
                      (u = s[1] / i[1] || 0),
                      (h = s[2] / i[2] || 0),
                      (f = s[3] / i[3] || 0),
                      (r.boundingBox = [l, u, l + h, u + f]),
                      (r.xStep = h),
                      (r.yStep = f)),
                    (c = e.pdf.unitMatrix),
                    (p = O(
                      this.pattern.element,
                      e.styleSheets,
                      "patternTransform",
                      "transform"
                    )) && (c = J(p, e)),
                    (g = a),
                    (g = e.pdf.matrixMult(g, n)),
                    (g = e.pdf.matrixMult(g, c)),
                    (g = e.pdf.matrixMult(g, e.transform)),
                    (r.matrix = g),
                    [2, r]
                  );
              }
            });
          });
        }),
        t
      );
    })();
  function lt(t, e) {
    var r = f.exec(t);
    if (r) {
      var i = r[1],
        n = e.refsHandler.get(i);
      return n && (n instanceof it || n instanceof nt)
        ? (function (t, e, r) {
            var i = e.getStops(r.styleSheets);
            if (0 === i.length) return null;
            if (1 === i.length) {
              var n = i[0].color,
                a = new l();
              return (
                (a.ok = !0),
                (a.r = n[0]),
                (a.g = n[1]),
                (a.b = n[2]),
                (a.a = i[0].opacity),
                new u(a)
              );
            }
            return new at(t, e);
          })(i, n, e)
        : n && n instanceof st
        ? new ot(i, n)
        : new u(new l("rgb(0, 0, 0)"));
    }
    var a = R(t, e.attributeState.color);
    return a.ok ? new u(a) : null;
  }
  function ut(t, e, r) {
    var i = r || e.element,
      n = O(i, t.styleSheets, "color");
    if (n) {
      var a = R(n, t.attributeState.color);
      a.ok
        ? (t.attributeState.color = a)
        : (t.attributeState.color = new l("rgb(0,0,0)"));
    }
    var s = O(i, t.styleSheets, "visibility");
    s && (t.attributeState.visibility = s);
    var o = O(i, t.styleSheets, "fill");
    o && (t.attributeState.fill = lt(o, t));
    var h = O(i, t.styleSheets, "fill-opacity");
    h && (t.attributeState.fillOpacity = parseFloat(h));
    var f = O(i, t.styleSheets, "stroke-opacity");
    f && (t.attributeState.strokeOpacity = parseFloat(f));
    var c = O(i, t.styleSheets, "opacity");
    c && (t.attributeState.opacity = parseFloat(c));
    var p = O(i, t.styleSheets, "stroke-width");
    void 0 !== p &&
      "" !== p &&
      (t.attributeState.strokeWidth = Math.abs(parseFloat(p)));
    var d = O(i, t.styleSheets, "stroke");
    if (d)
      if ("none" === d) t.attributeState.stroke = null;
      else {
        var g = R(d, t.attributeState.color);
        g.ok && (t.attributeState.stroke = new u(g));
      }
    var m = O(i, t.styleSheets, "stroke-linecap");
    m && (t.attributeState.strokeLinecap = m);
    var y = O(i, t.styleSheets, "stroke-linejoin");
    y && (t.attributeState.strokeLinejoin = y);
    var v = O(i, t.styleSheets, "stroke-dasharray");
    if (v) {
      var b = parseInt(O(i, t.styleSheets, "stroke-dashoffset") || "0");
      (t.attributeState.strokeDasharray = j(v)),
        (t.attributeState.strokeDashoffset = b);
    }
    var x = O(i, t.styleSheets, "stroke-miterlimit");
    void 0 !== x &&
      "" !== x &&
      (t.attributeState.strokeMiterlimit = parseFloat(x));
    var S = i.getAttribute("xml:space");
    S && (t.attributeState.xmlSpace = S);
    var w = O(i, t.styleSheets, "font-weight");
    w && (t.attributeState.fontWeight = w);
    var k = O(i, t.styleSheets, "font-style");
    k && (t.attributeState.fontStyle = k);
    var M = O(i, t.styleSheets, "font-family");
    if (M) {
      var C = U(M);
      t.attributeState.fontFamily = (function (t, e, r) {
        var i = Q(t.fontStyle, t.fontWeight),
          n = r.pdf.getFontList(),
          a = "";
        return (
          e.some(function (t) {
            var e = n[t];
            return e && e.indexOf(i) >= 0
              ? ((a = t), !0)
              : ((t = t.toLowerCase()), !!z.hasOwnProperty(t) && ((a = t), !0));
          }) || (a = "times"),
          a
        );
      })(t.attributeState, C, t);
    }
    var A = O(i, t.styleSheets, "font-size");
    if (A) {
      var F = t.pdf.getFontSize();
      t.attributeState.fontSize = q(A, F);
    }
    var T =
      O(i, t.styleSheets, "vertical-align") ||
      O(i, t.styleSheets, "alignment-baseline");
    if (T) {
      var P = T.match(
        /(baseline|text-bottom|alphabetic|ideographic|middle|central|mathematical|text-top|bottom|center|top|hanging)/
      );
      P && (t.attributeState.alignmentBaseline = P[0]);
    }
    var B = O(i, t.styleSheets, "text-anchor");
    B && (t.attributeState.textAnchor = B);
  }
  function ht(t, r, i) {
    var n = 1,
      a = 1;
    (n *= t.attributeState.fillOpacity),
      (n *= t.attributeState.opacity),
      t.attributeState.fill instanceof u &&
        void 0 !== t.attributeState.fill.color.a &&
        (n *= t.attributeState.fill.color.a),
      (a *= t.attributeState.strokeOpacity),
      (a *= t.attributeState.opacity),
      t.attributeState.stroke instanceof u &&
        void 0 !== t.attributeState.stroke.color.a &&
        (a *= t.attributeState.stroke.color.a);
    var s,
      o,
      l = n < 1,
      h = a < 1;
    if (
      (E(i, "use")
        ? ((l = !0),
          (h = !0),
          (n *= t.attributeState.fill ? 1 : 0),
          (a *= t.attributeState.stroke ? 1 : 0))
        : t.withinUse &&
          (t.attributeState.fill !== r.attributeState.fill
            ? ((l = !0), (n *= t.attributeState.fill ? 1 : 0))
            : l && !t.attributeState.fill && (n = 0),
          t.attributeState.stroke !== r.attributeState.stroke
            ? ((h = !0), (a *= t.attributeState.stroke ? 1 : 0))
            : h && !t.attributeState.stroke && (a = 0)),
      l || h)
    ) {
      var f = {};
      l && (f.opacity = n),
        h && (f["stroke-opacity"] = a),
        t.pdf.setGState(new e.GState(f));
    }
    if (
      (t.attributeState.fill &&
        t.attributeState.fill !== r.attributeState.fill &&
        t.attributeState.fill instanceof u &&
        t.attributeState.fill.color.ok &&
        !E(i, "text") &&
        t.pdf.setFillColor(
          t.attributeState.fill.color.r,
          t.attributeState.fill.color.g,
          t.attributeState.fill.color.b
        ),
      t.attributeState.strokeWidth !== r.attributeState.strokeWidth &&
        t.pdf.setLineWidth(t.attributeState.strokeWidth),
      t.attributeState.stroke !== r.attributeState.stroke &&
        t.attributeState.stroke instanceof u &&
        t.pdf.setDrawColor(
          t.attributeState.stroke.color.r,
          t.attributeState.stroke.color.g,
          t.attributeState.stroke.color.b
        ),
      t.attributeState.strokeLinecap !== r.attributeState.strokeLinecap &&
        t.pdf.setLineCap(t.attributeState.strokeLinecap),
      t.attributeState.strokeLinejoin !== r.attributeState.strokeLinejoin &&
        t.pdf.setLineJoin(t.attributeState.strokeLinejoin),
      (t.attributeState.strokeDasharray === r.attributeState.strokeDasharray &&
        t.attributeState.strokeDashoffset ===
          r.attributeState.strokeDashoffset) ||
        !t.attributeState.strokeDasharray ||
        t.pdf.setLineDashPattern(
          t.attributeState.strokeDasharray,
          t.attributeState.strokeDashoffset
        ),
      t.attributeState.strokeMiterlimit !== r.attributeState.strokeMiterlimit &&
        t.pdf.setLineMiterLimit(t.attributeState.strokeMiterlimit),
      t.attributeState.fontFamily !== r.attributeState.fontFamily &&
        (s = z.hasOwnProperty(t.attributeState.fontFamily)
          ? z[t.attributeState.fontFamily]
          : t.attributeState.fontFamily),
      t.attributeState.fill &&
        t.attributeState.fill !== r.attributeState.fill &&
        t.attributeState.fill instanceof u &&
        t.attributeState.fill.color.ok)
    ) {
      var c = t.attributeState.fill.color;
      t.pdf.setTextColor(c.r, c.g, c.b);
    }
    (t.attributeState.fontWeight === r.attributeState.fontWeight &&
      t.attributeState.fontStyle === r.attributeState.fontStyle) ||
      (o = Q(t.attributeState.fontStyle, t.attributeState.fontWeight)),
      (void 0 === s && void 0 === o) ||
        (void 0 === s &&
          (s = z.hasOwnProperty(t.attributeState.fontFamily)
            ? z[t.attributeState.fontFamily]
            : t.attributeState.fontFamily),
        t.pdf.setFont(s, o)),
      t.attributeState.fontSize !== r.attributeState.fontSize &&
        t.pdf.setFontSize(
          t.attributeState.fontSize * t.pdf.internal.scaleFactor
        );
  }
  function ft(t, e, r) {
    var i = f.exec(t);
    if (i) {
      var n = i[1];
      return r.refsHandler.get(n) || void 0;
    }
  }
  function ct(t, e, r) {
    return s(this, void 0, void 0, function () {
      var i, n;
      return o(this, function (a) {
        switch (a.label) {
          case 0:
            return (
              (i = r.clone()),
              e.element.hasAttribute("clipPathUnits") &&
                "objectboundingbox" ===
                  e.element.getAttribute("clipPathUnits").toLowerCase() &&
                ((n = t.getBoundingBox(r)),
                (i.transform = r.pdf.matrixMult(
                  r.pdf.Matrix(n[2], 0, 0, n[3], n[0], n[1]),
                  r.transform
                ))),
              [4, e.apply(i)]
            );
          case 1:
            return a.sent(), [2];
        }
      });
    });
  }
  var pt = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.render = function (t) {
          return s(this, void 0, void 0, function () {
            var e, r, i, n;
            return o(this, function (a) {
              switch (a.label) {
                case 0:
                  return this.isVisible(
                    "hidden" !== t.attributeState.visibility,
                    t
                  )
                    ? (((e = t.clone()).transform = e.pdf.matrixMult(
                        this.computeNodeTransform(e),
                        t.transform
                      )),
                      ut(e, this),
                      (r = O(this.element, e.styleSheets, "clip-path")),
                      (i = r && "none" !== r)
                        ? (n = ft(r, 0, e))
                          ? n.isVisible(!0, e)
                            ? (e.pdf.saveGraphicsState(), [4, ct(this, n, e)])
                            : [3, 2]
                          : [3, 4]
                        : [3, 5])
                    : [2];
                case 1:
                  return a.sent(), [3, 3];
                case 2:
                  return [2];
                case 3:
                  return [3, 5];
                case 4:
                  (i = !1), (a.label = 5);
                case 5:
                  return (
                    e.withinClipPath || e.pdf.saveGraphicsState(),
                    ht(e, t, this.element),
                    [4, this.renderCore(e)]
                  );
                case 6:
                  return (
                    a.sent(),
                    e.withinClipPath || e.pdf.restoreGraphicsState(),
                    i && e.pdf.restoreGraphicsState(),
                    [2]
                  );
              }
            });
          });
        }),
        e
      );
    })(tt),
    dt = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return n(e, t), e;
    })(pt),
    gt = (function (t) {
      function e(e, r, i) {
        var n = t.call(this, r, i) || this;
        return (n.cachedPath = null), (n.hasMarkers = e), n;
      }
      return (
        n(e, t),
        (e.prototype.renderCore = function (t) {
          return s(this, void 0, void 0, function () {
            var e;
            return o(this, function (r) {
              switch (r.label) {
                case 0:
                  return null === (e = this.getCachedPath(t)) ||
                    0 === e.segments.length
                    ? [2]
                    : (t.withinClipPath
                        ? e.transform(t.transform)
                        : t.pdf.setCurrentTransformationMatrix(t.transform),
                      e.draw(t),
                      [4, this.fillOrStroke(t)]);
                case 1:
                  return (
                    r.sent(),
                    this.hasMarkers ? [4, this.drawMarkers(t, e)] : [3, 3]
                  );
                case 2:
                  r.sent(), (r.label = 3);
                case 3:
                  return [2];
              }
            });
          });
        }),
        (e.prototype.getCachedPath = function (t) {
          return this.cachedPath || (this.cachedPath = this.getPath(t));
        }),
        (e.prototype.drawMarkers = function (t, e) {
          return s(this, void 0, void 0, function () {
            return o(this, function (r) {
              switch (r.label) {
                case 0:
                  return [
                    4,
                    this.getMarkers(e, t).draw(
                      t.clone({ transform: t.pdf.unitMatrix })
                    ),
                  ];
                case 1:
                  return r.sent(), [2];
              }
            });
          });
        }),
        (e.prototype.fillOrStroke = function (t) {
          return s(this, void 0, void 0, function () {
            var e, r, i, n, a;
            return o(this, function (s) {
              switch (s.label) {
                case 0:
                  return t.withinClipPath
                    ? [2]
                    : ((e = t.attributeState.fill),
                      (r =
                        t.attributeState.stroke &&
                        0 !== t.attributeState.strokeWidth),
                      e ? [4, e.getFillData(this, t)] : [3, 2]);
                case 1:
                  return (n = s.sent()), [3, 3];
                case 2:
                  (n = void 0), (s.label = 3);
                case 3:
                  return (
                    (i = n),
                    (a =
                      "evenodd" ===
                      O(this.element, t.styleSheets, "fill-rule")),
                    (e && r) || t.withinUse
                      ? a
                        ? t.pdf.fillStrokeEvenOdd(i)
                        : t.pdf.fillStroke(i)
                      : e
                      ? a
                        ? t.pdf.fillEvenOdd(i)
                        : t.pdf.fill(i)
                      : r
                      ? t.pdf.stroke()
                      : t.pdf.discardPath(),
                    [2]
                  );
              }
            });
          });
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          var e = this.getCachedPath(t);
          if (!e) return [0, 0, 0, 0];
          for (
            var r = Number.POSITIVE_INFINITY,
              i = Number.POSITIVE_INFINITY,
              n = Number.NEGATIVE_INFINITY,
              a = Number.NEGATIVE_INFINITY,
              s = 0,
              o = 0,
              l = 0;
            l < e.segments.length;
            l++
          ) {
            var u = e.segments[l];
            (u instanceof P || u instanceof B || u instanceof N) &&
              ((s = u.x), (o = u.y)),
              u instanceof N
                ? ((r = Math.min(r, s, u.x1, u.x2, u.x)),
                  (n = Math.max(n, s, u.x1, u.x2, u.x)),
                  (i = Math.min(i, o, u.y1, u.y2, u.y)),
                  (a = Math.max(a, o, u.y1, u.y2, u.y)))
                : ((r = Math.min(r, s)),
                  (n = Math.max(n, s)),
                  (i = Math.min(i, o)),
                  (a = Math.max(a, o)));
          }
          return [r, i, n - r, a - i];
        }),
        (e.prototype.getMarkers = function (t, e) {
          var r = O(this.element, e.styleSheets, "marker-start"),
            i = O(this.element, e.styleSheets, "marker-mid"),
            n = O(this.element, e.styleSheets, "marker-end"),
            a = new H();
          if (r || i || n) {
            n && (n = mt(n)), r && (r = mt(r)), i && (i = mt(i));
            for (
              var s = t.segments,
                o = [1, 0],
                l = void 0,
                u = !1,
                h = [1, 0],
                f = !1,
                c = function (t) {
                  var e = s[t],
                    c =
                      r &&
                      (1 === t ||
                        (!(s[t] instanceof P) && s[t - 1] instanceof P));
                  c &&
                    s.forEach(function (e, r) {
                      if (!f && e instanceof L && r > t) {
                        var i = s[r - 1];
                        f =
                          (i instanceof P ||
                            i instanceof B ||
                            i instanceof N) &&
                          i;
                      }
                    });
                  var p =
                      n &&
                      (t === s.length - 1 ||
                        (!(s[t] instanceof P) && s[t + 1] instanceof P)),
                    d = i && t > 0 && !(1 === t && s[t - 1] instanceof P),
                    g = s[t - 1] || null;
                  if (g instanceof P || g instanceof B || g instanceof N) {
                    if (e instanceof N)
                      c &&
                        a.addMarker(
                          new D(
                            r,
                            [g.x, g.y],
                            w(f ? [f.x, f.y] : [g.x, g.y], [e.x1, e.y1])
                          )
                        ),
                        p &&
                          a.addMarker(
                            new D(n, [e.x, e.y], w([e.x2, e.y2], [e.x, e.y]))
                          ),
                        d &&
                          ((l = C([g.x, g.y], [e.x1, e.y1])),
                          (l = g instanceof P ? l : M(A(o, l))),
                          a.addMarker(
                            new D(i, [g.x, g.y], Math.atan2(l[1], l[0]))
                          )),
                        (o = C([e.x2, e.y2], [e.x, e.y]));
                    else if (e instanceof P || e instanceof B) {
                      if (((l = C([g.x, g.y], [e.x, e.y])), c)) {
                        var m = f ? C([f.x, f.y], [e.x, e.y]) : l;
                        a.addMarker(
                          new D(r, [g.x, g.y], Math.atan2(m[1], m[0]))
                        );
                      }
                      if (
                        (p &&
                          a.addMarker(
                            new D(n, [e.x, e.y], Math.atan2(l[1], l[0]))
                          ),
                        d)
                      ) {
                        m =
                          e instanceof P ? o : g instanceof P ? l : M(A(o, l));
                        a.addMarker(
                          new D(i, [g.x, g.y], Math.atan2(m[1], m[0]))
                        );
                      }
                      o = l;
                    } else if (e instanceof L) {
                      if (((l = C([g.x, g.y], [u.x, u.y])), d)) {
                        m = g instanceof P ? l : M(A(o, l));
                        a.addMarker(
                          new D(i, [g.x, g.y], Math.atan2(m[1], m[0]))
                        );
                      }
                      if (p) {
                        m = M(A(l, h));
                        a.addMarker(
                          new D(n, [u.x, u.y], Math.atan2(m[1], m[0]))
                        );
                      }
                      o = l;
                    }
                  } else {
                    u = e instanceof P && e;
                    var y = s[t + 1];
                    (y instanceof P || y instanceof B || y instanceof N) &&
                      (h = C([u.x, u.y], [y.x, y.y]));
                  }
                },
                p = 0;
              p < s.length;
              p++
            )
              c(p);
          }
          return a;
        }),
        e
      );
    })(dt);
  function mt(t) {
    var e = f.exec(t);
    return (e && e[1]) || void 0;
  }
  var yt = (function (t) {
      function e(e, r) {
        return t.call(this, !0, e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.getPath = function (t) {
          if (t.withinClipPath || null === t.attributeState.stroke) return null;
          var e = parseFloat(this.element.getAttribute("x1") || "0"),
            r = parseFloat(this.element.getAttribute("y1") || "0"),
            i = parseFloat(this.element.getAttribute("x2") || "0"),
            n = parseFloat(this.element.getAttribute("y2") || "0");
          return e || i || r || n ? new T().moveTo(e, r).lineTo(i, n) : null;
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        (e.prototype.fillOrStroke = function (e) {
          return s(this, void 0, void 0, function () {
            return o(this, function (r) {
              switch (r.label) {
                case 0:
                  return (
                    (e.attributeState.fill = null),
                    [4, t.prototype.fillOrStroke.call(this, e)]
                  );
                case 1:
                  return r.sent(), [2];
              }
            });
          });
        }),
        e
      );
    })(gt),
    vt = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.apply = function (t) {
          return s(this, void 0, void 0, function () {
            var e, r, i, n, a;
            return o(this, function (s) {
              switch (s.label) {
                case 0:
                  return this.isVisible(
                    "hidden" !== t.attributeState.visibility,
                    t
                  )
                    ? (((e = t.clone()).transform = e.pdf.unitMatrix),
                      ut(e, this),
                      (r = O(this.element, e.styleSheets, "clip-path")),
                      r && "none" !== r && (i = ft(r, 0, e))
                        ? i.isVisible(!0, e)
                          ? [4, ct(this, i, e)]
                          : [3, 2]
                        : [3, 3])
                    : [2];
                case 1:
                  return s.sent(), [3, 3];
                case 2:
                  return [2];
                case 3:
                  ht(e, t, this.element),
                    (n = 0),
                    (a = this.children),
                    (s.label = 4);
                case 4:
                  return n < a.length ? [4, a[n].render(e)] : [3, 7];
                case 5:
                  s.sent(), (s.label = 6);
                case 6:
                  return n++, [3, 4];
                case 7:
                  return [2];
              }
            });
          });
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return $(t, this);
        }),
        (e.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          var e = parseFloat(O(this.element, t.styleSheets, "x") || "0"),
            r = parseFloat(O(this.element, t.styleSheets, "y") || "0"),
            i = this.element.getAttribute("viewBox");
          if (i) {
            var n = j(i),
              a = parseFloat(
                O(this.element, t.styleSheets, "width") ||
                  O(this.element.ownerSVGElement, t.styleSheets, "width") ||
                  i[2]
              ),
              s = parseFloat(
                O(this.element, t.styleSheets, "height") ||
                  O(this.element.ownerSVGElement, t.styleSheets, "height") ||
                  i[3]
              );
            return Z(this.element, n, e, r, a, s, t);
          }
          return t.pdf.Matrix(1, 0, 0, 1, e, r);
        }),
        e
      );
    })(et),
    bt = function (t, e) {
      (this.width = t), (this.height = e);
    },
    xt = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.renderCore = function (t) {
          return s(this, void 0, void 0, function () {
            var r, i, n, a, s, l, u, h, f, c, p, g, m;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  return (
                    (r = parseFloat),
                    (i =
                      this.element.getAttribute("href") ||
                      this.element.getAttribute("xlink:href"))
                      ? ((n = i.substring(1)),
                        (a = t.refsHandler.get(n)),
                        (s =
                          E(a.element, "symbol,svg") &&
                          a.element.hasAttribute("viewBox")),
                        (l = r(O(this.element, t.styleSheets, "x") || "0")),
                        (u = r(O(this.element, t.styleSheets, "y") || "0")),
                        (h = void 0),
                        (f = void 0),
                        s
                          ? ((h = r(
                              O(this.element, t.styleSheets, "width") ||
                                O(a.element, t.styleSheets, "width") ||
                                "0"
                            )),
                            (f = r(
                              O(this.element, t.styleSheets, "height") ||
                                O(a.element, t.styleSheets, "height") ||
                                "0"
                            )),
                            (l += r(O(a.element, t.styleSheets, "x") || "0")),
                            (u += r(O(a.element, t.styleSheets, "y") || "0")),
                            (p = j(a.element.getAttribute("viewBox"))),
                            (c = Z(a.element, p, l, u, h, f, t)))
                          : (c = t.pdf.Matrix(1, 0, 0, 1, l, u)),
                        (g = new d(t.pdf, {
                          refsHandler: t.refsHandler,
                          styleSheets: t.styleSheets,
                          withinUse: !0,
                          viewport: s ? new bt(h, f) : t.viewport,
                          svg2pdfParameters: t.svg2pdfParameters,
                        })),
                        (m = t.attributeState.color),
                        [
                          4,
                          t.refsHandler.getRendered(n, m, function (t) {
                            return e.renderReferencedNode(t, n, m, g);
                          }),
                        ])
                      : [2]
                  );
                case 1:
                  return (
                    o.sent(),
                    t.pdf.saveGraphicsState(),
                    t.pdf.setCurrentTransformationMatrix(t.transform),
                    s &&
                      "visible" !== O(a.element, t.styleSheets, "overflow") &&
                      (t.pdf.rect(l, u, h, f), t.pdf.clip().discardPath()),
                    t.pdf.doFormObject(t.refsHandler.generateKey(n, m), c),
                    t.pdf.restoreGraphicsState(),
                    [2]
                  );
              }
            });
          });
        }),
        (e.renderReferencedNode = function (t, e, r, i) {
          return s(this, void 0, void 0, function () {
            var n;
            return o(this, function (a) {
              switch (a.label) {
                case 0:
                  return (
                    (n = [
                      (n = t.getBoundingBox(i))[0] - 0.5 * n[2],
                      n[1] - 0.5 * n[3],
                      2 * n[2],
                      2 * n[3],
                    ]),
                    (i.attributeState.color = r),
                    i.pdf.beginFormObject(
                      n[0],
                      n[1],
                      n[2],
                      n[3],
                      i.pdf.unitMatrix
                    ),
                    t instanceof vt ? [4, t.apply(i)] : [3, 2]
                  );
                case 1:
                  return a.sent(), [3, 4];
                case 2:
                  return [4, t.render(i)];
                case 3:
                  a.sent(), (a.label = 4);
                case 4:
                  return (
                    i.pdf.endFormObject(i.refsHandler.generateKey(e, r)), [2]
                  );
              }
            });
          });
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return K(this.element, t);
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        e
      );
    })(dt),
    St = (function (t) {
      function e(e, r) {
        return t.call(this, !1, e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.getPath = function (t) {
          var e = parseFloat(O(this.element, t.styleSheets, "width") || "0"),
            r = parseFloat(O(this.element, t.styleSheets, "height") || "0");
          if (!isFinite(e) || e <= 0 || !isFinite(r) || r <= 0) return null;
          var i = O(this.element, t.styleSheets, "rx"),
            n = O(this.element, t.styleSheets, "ry"),
            a = Math.min(parseFloat(i || n || "0"), 0.5 * e),
            s = Math.min(parseFloat(n || i || "0"), 0.5 * r),
            o = parseFloat(O(this.element, t.styleSheets, "x") || "0"),
            l = parseFloat(O(this.element, t.styleSheets, "y") || "0"),
            u = (4 / 3) * (Math.SQRT2 - 1);
          return 0 === a && 0 === s
            ? new T()
                .moveTo(o, l)
                .lineTo(o + e, l)
                .lineTo(o + e, l + r)
                .lineTo(o, l + r)
                .close()
            : new T()
                .moveTo((o += a), l)
                .lineTo((o += e - 2 * a), l)
                .curveTo(
                  o + a * u,
                  l,
                  o + a,
                  l + (s - s * u),
                  (o += a),
                  (l += s)
                )
                .lineTo(o, (l += r - 2 * s))
                .curveTo(o, l + s * u, o - a * u, l + s, (o -= a), (l += s))
                .lineTo((o += 2 * a - e), l)
                .curveTo(o - a * u, l, o - a, l - s * u, (o -= a), (l -= s))
                .lineTo(o, (l += 2 * s - r))
                .curveTo(o, l - s * u, o + a * u, l - s, (o += a), (l -= s))
                .close();
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        e
      );
    })(gt),
    wt = (function (t) {
      function e(e, r) {
        return t.call(this, !1, e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.getPath = function (t) {
          var e = this.getRx(t),
            r = this.getRy(t);
          if (!isFinite(e) || r <= 0 || !isFinite(r) || r <= 0) return null;
          var i = parseFloat(O(this.element, t.styleSheets, "cx") || "0"),
            n = parseFloat(O(this.element, t.styleSheets, "cy") || "0"),
            a = (4 / 3) * (Math.SQRT2 - 1) * e,
            s = (4 / 3) * (Math.SQRT2 - 1) * r;
          return new T()
            .moveTo(i + e, n)
            .curveTo(i + e, n - s, i + a, n - r, i, n - r)
            .curveTo(i - a, n - r, i - e, n - s, i - e, n)
            .curveTo(i - e, n + s, i - a, n + r, i, n + r)
            .curveTo(i + a, n + r, i + e, n + s, i + e, n);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        e
      );
    })(gt),
    kt = (function (t) {
      function e(e, r) {
        return t.call(this, e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.getRx = function (t) {
          return parseFloat(O(this.element, t.styleSheets, "rx") || "0");
        }),
        (e.prototype.getRy = function (t) {
          return parseFloat(O(this.element, t.styleSheets, "ry") || "0");
        }),
        e
      );
    })(wt);
  function Mt(t) {
    var e = "invisible";
    return (
      t.fill && t.stroke
        ? (e = "fillThenStroke")
        : t.fill
        ? (e = "fill")
        : t.stroke && (e = "stroke"),
      e
    );
  }
  function Ct(t) {
    return t.replace(/[\n\r]/g, "");
  }
  function At(t) {
    return t.replace(/[\t]/g, " ");
  }
  function Ft(t) {
    return t.replace(/ +/g, " ");
  }
  function Tt(t, e, r) {
    switch (O(t, r.styleSheets, "text-transform")) {
      case "uppercase":
        return e.toUpperCase();
      case "lowercase":
        return e.toLowerCase();
      default:
        return e;
    }
  }
  var Pt = (function () {
      function t(t, e, r, i) {
        (this.textNode = t),
          (this.texts = []),
          (this.textNodes = []),
          (this.contexts = []),
          (this.textAnchor = e),
          (this.originX = r),
          (this.originY = i),
          (this.textMeasures = []);
      }
      return (
        (t.prototype.setX = function (t) {
          this.originX = t;
        }),
        (t.prototype.setY = function (t) {
          this.originY = t;
        }),
        (t.prototype.add = function (t, e, r) {
          this.texts.push(e), this.textNodes.push(t), this.contexts.push(r);
        }),
        (t.prototype.rightTrimText = function () {
          for (var t = this.texts.length - 1; t >= 0; t--)
            if (
              ("default" === this.contexts[t].attributeState.xmlSpace &&
                (this.texts[t] = this.texts[t].replace(/\s+$/, "")),
              this.texts[t].match(/[^\s]/))
            )
              return !1;
          return !0;
        }),
        (t.prototype.measureText = function (t) {
          for (var e = 0; e < this.texts.length; e++)
            this.textMeasures.push({
              width: t.textMeasure.measureTextWidth(
                this.texts[e],
                this.contexts[e].attributeState
              ),
              length: this.texts[e].length,
            });
        }),
        (t.prototype.put = function (t, e) {
          var r,
            i,
            n,
            a,
            s = [],
            o = [],
            l = [],
            u = this.originX,
            h = this.originY,
            f = u,
            c = u;
          for (r = 0; r < this.textNodes.length; r++) {
            (i = this.textNodes[r]),
              (n = this.contexts[r]),
              (a = this.textMeasures[r] || {
                width: t.textMeasure.measureTextWidth(
                  this.texts[r],
                  this.contexts[r].attributeState
                ),
                length: this.texts[r].length,
              });
            var p = u,
              d = h;
            if ("#text" !== i.nodeName && !s.includes(i)) {
              s.push(i);
              var g = i.getAttribute("dx");
              null !== g && (p += q(g, n.attributeState.fontSize));
              var m = i.getAttribute("dy");
              null !== m && (d += q(m, n.attributeState.fontSize));
            }
            (o[r] = p),
              (l[r] = d),
              (u = p + a.width + a.length * e),
              (h = d),
              (f = Math.min(f, p)),
              (c = Math.max(c, u));
          }
          var y = 0;
          switch (this.textAnchor) {
            case "start":
              y = 0;
              break;
            case "middle":
              y = (c - f) / 2;
              break;
            case "end":
              y = c - f;
          }
          for (r = 0; r < this.textNodes.length; r++)
            if (
              ((i = this.textNodes[r]),
              (n = this.contexts[r]),
              "#text" === i.nodeName ||
                "hidden" !== n.attributeState.visibility)
            ) {
              t.pdf.saveGraphicsState(), ht(n, t, i);
              var v = n.attributeState.alignmentBaseline,
                b = Mt(n.attributeState);
              t.pdf.text(this.texts[r], o[r] - y, l[r], {
                baseline: V(v),
                angle: t.transform,
                renderingMode: "fill" === b ? void 0 : b,
                charSpace: 0 === e ? void 0 : e,
              }),
                t.pdf.restoreGraphicsState();
            }
          return [u, h];
        }),
        t
      );
    })(),
    Bt = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.processTSpans = function (t, e, r, i, n, a) {
          for (
            var s = r.pdf.getFontSize(),
              o = r.attributeState.xmlSpace,
              l = !0,
              u = !1,
              h = 0;
            h < e.childNodes.length;
            h++
          ) {
            var f = e.childNodes[h];
            if (f.textContent) {
              var c = f.textContent;
              if ("#text" === f.nodeName) {
                var p = Ct(c);
                (p = At(p)),
                  "default" === o &&
                    ((p = Ft(p)),
                    l && p.match(/^\s/) && (u = !0),
                    p.match(/[^\s]/) && (l = !1),
                    a.prevText.match(/\s$/) && (p = p.replace(/^\s+/, "")));
                var d = Tt(e, p, r);
                n.add(e, d, r), (a.prevText = c), (a.prevContext = r);
              } else if (E(f, "title"));
              else if (E(f, "tspan")) {
                var g = f,
                  m = g.getAttribute("x");
                if (null !== m) {
                  var y = q(m, s);
                  (n = new Pt(
                    this,
                    O(g, r.styleSheets, "text-anchor") ||
                      r.attributeState.textAnchor,
                    y,
                    0
                  )),
                    i.push({ type: "y", chunk: n });
                }
                var v = g.getAttribute("y");
                if (null !== v) {
                  var b = q(v, s);
                  (n = new Pt(
                    this,
                    O(g, r.styleSheets, "text-anchor") ||
                      r.attributeState.textAnchor,
                    0,
                    b
                  )),
                    i.push({ type: "x", chunk: n });
                }
                var x = r.clone();
                ut(x, t, g), this.processTSpans(t, g, x, i, n, a);
              }
            }
          }
          return u;
        }),
        (e.prototype.renderCore = function (t) {
          return s(this, void 0, void 0, function () {
            var e,
              r,
              i,
              n,
              a,
              s,
              l,
              u,
              h,
              f,
              c,
              p,
              d,
              g,
              m,
              y,
              v,
              b,
              x,
              S,
              w,
              k,
              M;
            return o(this, function (o) {
              if (
                (t.pdf.saveGraphicsState(),
                (e = 0),
                (r = 0),
                (i = 1),
                (n = t.pdf.getFontSize()),
                (a = q(this.element.getAttribute("x"), n)),
                (s = q(this.element.getAttribute("y"), n)),
                (l = q(this.element.getAttribute("dx"), n)),
                (u = q(this.element.getAttribute("dy"), n)),
                (h = parseFloat(
                  this.element.getAttribute("textLength") || "0"
                )),
                (f = t.attributeState.visibility),
                0 === this.element.childElementCount)
              )
                (c = this.element.textContent || ""),
                  (p = (function (t, e) {
                    return (
                      (t = At((t = Ct(t)))),
                      "default" === e.xmlSpace && (t = Ft((t = t.trim()))),
                      t
                    );
                  })(c, t.attributeState)),
                  (d = Tt(this.element, p, t)),
                  (e = t.textMeasure.getTextOffset(d, t.attributeState)),
                  h > 0 &&
                    ((g = t.textMeasure.measureTextWidth(d, t.attributeState)),
                    "default" === t.attributeState.xmlSpace &&
                      c.match(/^\s/) &&
                      (i = 0),
                    (r = (h - g) / (d.length - i) || 0)),
                  "visible" === f &&
                    ((m = t.attributeState.alignmentBaseline),
                    (y = Mt(t.attributeState)),
                    t.pdf.text(d, a + l - e, s + u, {
                      baseline: V(m),
                      angle: t.transform,
                      renderingMode: "fill" === y ? void 0 : y,
                      charSpace: 0 === r ? void 0 : r,
                    }));
              else {
                for (
                  v = [],
                    b = new Pt(this, t.attributeState.textAnchor, a + l, s + u),
                    v.push({ type: "", chunk: b }),
                    x = this.processTSpans(this, this.element, t, v, b, {
                      prevText: " ",
                      prevContext: t,
                    }),
                    i = x ? 0 : 1,
                    S = !0,
                    w = v.length - 1;
                  w >= 0;
                  w--
                )
                  S && (S = v[w].chunk.rightTrimText());
                h > 0 &&
                  ((k = 0),
                  (M = 0),
                  v.forEach(function (e) {
                    var r = e.chunk;
                    r.measureText(t),
                      r.textMeasures.forEach(function (t) {
                        var e = t.width,
                          r = t.length;
                        (k += e), (M += r);
                      });
                  }),
                  (r = (h - k) / (M - i))),
                  v.reduce(
                    function (e, i) {
                      var n = i.type,
                        a = i.chunk;
                      return (
                        "x" === n ? a.setX(e[0]) : "y" === n && a.setY(e[1]),
                        a.put(t, r)
                      );
                    },
                    [0, 0]
                  );
              }
              return t.pdf.restoreGraphicsState(), [2];
            });
          });
        }),
        (e.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return K(this.element, t);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        e
      );
    })(dt),
    Nt = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 },
    Lt = [
      5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201,
      8202, 8239, 8287, 12288, 65279,
    ];
  function Et(t) {
    return t >= 48 && t <= 57;
  }
  function Ot(t) {
    return (t >= 48 && t <= 57) || 43 === t || 45 === t || 46 === t;
  }
  function It(t) {
    (this.index = 0),
      (this.path = t),
      (this.max = t.length),
      (this.result = []),
      (this.param = 0),
      (this.err = ""),
      (this.segmentStart = 0),
      (this.data = []);
  }
  function _t(t) {
    for (
      ;
      t.index < t.max &&
      (10 === (e = t.path.charCodeAt(t.index)) ||
        13 === e ||
        8232 === e ||
        8233 === e ||
        32 === e ||
        9 === e ||
        11 === e ||
        12 === e ||
        160 === e ||
        (e >= 5760 && Lt.indexOf(e) >= 0));

    )
      t.index++;
    var e;
  }
  function Ht(t) {
    var e = t.path.charCodeAt(t.index);
    return 48 === e
      ? ((t.param = 0), void t.index++)
      : 49 === e
      ? ((t.param = 1), void t.index++)
      : void (t.err =
          "SvgPath: arc flag can be 0 or 1 only (at pos " + t.index + ")");
  }
  function Dt(t) {
    var e,
      r = t.index,
      i = r,
      n = t.max,
      a = !1,
      s = !1,
      o = !1,
      l = !1;
    if (i >= n) t.err = "SvgPath: missed param (at pos " + i + ")";
    else if (
      ((43 !== (e = t.path.charCodeAt(i)) && 45 !== e) ||
        (e = ++i < n ? t.path.charCodeAt(i) : 0),
      Et(e) || 46 === e)
    ) {
      if (46 !== e) {
        if (
          ((a = 48 === e),
          (e = ++i < n ? t.path.charCodeAt(i) : 0),
          a && i < n && e && Et(e))
        )
          return void (t.err =
            "SvgPath: numbers started with `0` such as `09` are illegal (at pos " +
            r +
            ")");
        for (; i < n && Et(t.path.charCodeAt(i)); ) i++, (s = !0);
        e = i < n ? t.path.charCodeAt(i) : 0;
      }
      if (46 === e) {
        for (l = !0, i++; Et(t.path.charCodeAt(i)); ) i++, (o = !0);
        e = i < n ? t.path.charCodeAt(i) : 0;
      }
      if (101 === e || 69 === e) {
        if (l && !s && !o)
          return void (t.err =
            "SvgPath: invalid float exponent (at pos " + i + ")");
        if (
          ((43 !== (e = ++i < n ? t.path.charCodeAt(i) : 0) && 45 !== e) || i++,
          !(i < n && Et(t.path.charCodeAt(i))))
        )
          return void (t.err =
            "SvgPath: invalid float exponent (at pos " + i + ")");
        for (; i < n && Et(t.path.charCodeAt(i)); ) i++;
      }
      (t.index = i), (t.param = parseFloat(t.path.slice(r, i)) + 0);
    } else
      t.err = "SvgPath: param should start with 0..9 or `.` (at pos " + i + ")";
  }
  function qt(t) {
    var e, r;
    r = (e = t.path[t.segmentStart]).toLowerCase();
    var i = t.data;
    if (
      ("m" === r &&
        i.length > 2 &&
        (t.result.push([e, i[0], i[1]]),
        (i = i.slice(2)),
        (r = "l"),
        (e = "m" === e ? "l" : "L")),
      "r" === r)
    )
      t.result.push([e].concat(i));
    else
      for (
        ;
        i.length >= Nt[r] &&
        (t.result.push([e].concat(i.splice(0, Nt[r]))), Nt[r]);

      );
  }
  function Vt(t) {
    var e,
      r,
      i,
      n,
      a,
      s = t.max;
    if (
      ((t.segmentStart = t.index),
      (e = t.path.charCodeAt(t.index)),
      (r = 97 == (32 | e)),
      (function (t) {
        switch (32 | t) {
          case 109:
          case 122:
          case 108:
          case 104:
          case 118:
          case 99:
          case 115:
          case 113:
          case 116:
          case 97:
          case 114:
            return !0;
        }
        return !1;
      })(e))
    )
      if (
        ((n = Nt[t.path[t.index].toLowerCase()]),
        t.index++,
        _t(t),
        (t.data = []),
        n)
      ) {
        for (i = !1; ; ) {
          for (a = n; a > 0; a--) {
            if ((!r || (3 !== a && 4 !== a) ? Dt(t) : Ht(t), t.err.length))
              return;
            t.data.push(t.param),
              _t(t),
              (i = !1),
              t.index < s &&
                44 === t.path.charCodeAt(t.index) &&
                (t.index++, _t(t), (i = !0));
          }
          if (!i) {
            if (t.index >= t.max) break;
            if (!Ot(t.path.charCodeAt(t.index))) break;
          }
        }
        qt(t);
      } else qt(t);
    else
      t.err =
        "SvgPath: bad command " + t.path[t.index] + " (at pos " + t.index + ")";
  }
  function jt() {
    if (!(this instanceof jt)) return new jt();
    (this.queue = []), (this.cache = null);
  }
  (jt.prototype.matrix = function (t) {
    return (
      (1 === t[0] &&
        0 === t[1] &&
        0 === t[2] &&
        1 === t[3] &&
        0 === t[4] &&
        0 === t[5]) ||
        ((this.cache = null), this.queue.push(t)),
      this
    );
  }),
    (jt.prototype.translate = function (t, e) {
      return (
        (0 === t && 0 === e) ||
          ((this.cache = null), this.queue.push([1, 0, 0, 1, t, e])),
        this
      );
    }),
    (jt.prototype.scale = function (t, e) {
      return (
        (1 === t && 1 === e) ||
          ((this.cache = null), this.queue.push([t, 0, 0, e, 0, 0])),
        this
      );
    }),
    (jt.prototype.rotate = function (t, e, r) {
      var i, n, a;
      return (
        0 !== t &&
          (this.translate(e, r),
          (i = (t * Math.PI) / 180),
          (n = Math.cos(i)),
          (a = Math.sin(i)),
          this.queue.push([n, a, -a, n, 0, 0]),
          (this.cache = null),
          this.translate(-e, -r)),
        this
      );
    }),
    (jt.prototype.skewX = function (t) {
      return (
        0 !== t &&
          ((this.cache = null),
          this.queue.push([1, 0, Math.tan((t * Math.PI) / 180), 1, 0, 0])),
        this
      );
    }),
    (jt.prototype.skewY = function (t) {
      return (
        0 !== t &&
          ((this.cache = null),
          this.queue.push([1, Math.tan((t * Math.PI) / 180), 0, 1, 0, 0])),
        this
      );
    }),
    (jt.prototype.toArray = function () {
      if (this.cache) return this.cache;
      if (!this.queue.length)
        return (this.cache = [1, 0, 0, 1, 0, 0]), this.cache;
      if (((this.cache = this.queue[0]), 1 === this.queue.length))
        return this.cache;
      for (var t = 1; t < this.queue.length; t++)
        this.cache =
          ((e = this.cache),
          (r = this.queue[t]),
          [
            e[0] * r[0] + e[2] * r[1],
            e[1] * r[0] + e[3] * r[1],
            e[0] * r[2] + e[2] * r[3],
            e[1] * r[2] + e[3] * r[3],
            e[0] * r[4] + e[2] * r[5] + e[4],
            e[1] * r[4] + e[3] * r[5] + e[5],
          ]);
      var e, r;
      return this.cache;
    }),
    (jt.prototype.calc = function (t, e, r) {
      var i;
      return this.queue.length
        ? (this.cache || (this.cache = this.toArray()),
          [
            t * (i = this.cache)[0] + e * i[2] + (r ? 0 : i[4]),
            t * i[1] + e * i[3] + (r ? 0 : i[5]),
          ])
        : [t, e];
    });
  var Rt = jt,
    Wt = {
      matrix: !0,
      scale: !0,
      rotate: !0,
      translate: !0,
      skewX: !0,
      skewY: !0,
    },
    Gt =
      /\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,
    Ut = /[\s,]+/,
    zt = 2 * Math.PI;
  function Yt(t, e, r, i) {
    var n = t * r + e * i;
    return (
      n > 1 && (n = 1),
      n < -1 && (n = -1),
      (t * i - e * r < 0 ? -1 : 1) * Math.acos(n)
    );
  }
  function Xt(t, e) {
    var r = (4 / 3) * Math.tan(e / 4),
      i = Math.cos(t),
      n = Math.sin(t),
      a = Math.cos(t + e),
      s = Math.sin(t + e);
    return [i, n, i - n * r, n + i * r, a + s * r, s - a * r, a, s];
  }
  var Qt = function (t, e, r, i, n, a, s, o, l) {
      var u = Math.sin((l * zt) / 360),
        h = Math.cos((l * zt) / 360),
        f = (h * (t - r)) / 2 + (u * (e - i)) / 2,
        c = (-u * (t - r)) / 2 + (h * (e - i)) / 2;
      if (0 === f && 0 === c) return [];
      if (0 === s || 0 === o) return [];
      (s = Math.abs(s)), (o = Math.abs(o));
      var p = (f * f) / (s * s) + (c * c) / (o * o);
      p > 1 && ((s *= Math.sqrt(p)), (o *= Math.sqrt(p)));
      var d = (function (t, e, r, i, n, a, s, o, l, u) {
          var h = (u * (t - r)) / 2 + (l * (e - i)) / 2,
            f = (-l * (t - r)) / 2 + (u * (e - i)) / 2,
            c = s * s,
            p = o * o,
            d = h * h,
            g = f * f,
            m = c * p - c * g - p * d;
          m < 0 && (m = 0), (m /= c * g + p * d);
          var y = (((m = Math.sqrt(m) * (n === a ? -1 : 1)) * s) / o) * f,
            v = ((m * -o) / s) * h,
            b = u * y - l * v + (t + r) / 2,
            x = l * y + u * v + (e + i) / 2,
            S = (h - y) / s,
            w = (f - v) / o,
            k = (-h - y) / s,
            M = (-f - v) / o,
            C = Yt(1, 0, S, w),
            A = Yt(S, w, k, M);
          return (
            0 === a && A > 0 && (A -= zt),
            1 === a && A < 0 && (A += zt),
            [b, x, C, A]
          );
        })(t, e, r, i, n, a, s, o, u, h),
        g = [],
        m = d[2],
        y = d[3],
        v = Math.max(Math.ceil(Math.abs(y) / (zt / 4)), 1);
      y /= v;
      for (var b = 0; b < v; b++) g.push(Xt(m, y)), (m += y);
      return g.map(function (t) {
        for (var e = 0; e < t.length; e += 2) {
          var r = t[e + 0],
            i = t[e + 1],
            n = h * (r *= s) - u * (i *= o),
            a = u * r + h * i;
          (t[e + 0] = n + d[0]), (t[e + 1] = a + d[1]);
        }
        return t;
      });
    },
    $t = Math.PI / 180;
  function Kt(t, e, r) {
    if (!(this instanceof Kt)) return new Kt(t, e, r);
    (this.rx = t), (this.ry = e), (this.ax = r);
  }
  (Kt.prototype.transform = function (t) {
    var e = Math.cos(this.ax * $t),
      r = Math.sin(this.ax * $t),
      i = [
        this.rx * (t[0] * e + t[2] * r),
        this.rx * (t[1] * e + t[3] * r),
        this.ry * (-t[0] * r + t[2] * e),
        this.ry * (-t[1] * r + t[3] * e),
      ],
      n = i[0] * i[0] + i[2] * i[2],
      a = i[1] * i[1] + i[3] * i[3],
      s =
        ((i[0] - i[3]) * (i[0] - i[3]) + (i[2] + i[1]) * (i[2] + i[1])) *
        ((i[0] + i[3]) * (i[0] + i[3]) + (i[2] - i[1]) * (i[2] - i[1])),
      o = (n + a) / 2;
    if (s < 1e-10 * o)
      return (this.rx = this.ry = Math.sqrt(o)), (this.ax = 0), this;
    var l = i[0] * i[1] + i[2] * i[3],
      u = o + (s = Math.sqrt(s)) / 2,
      h = o - s / 2;
    return (
      (this.ax =
        Math.abs(l) < 1e-10 && Math.abs(u - a) < 1e-10
          ? 90
          : (180 *
              Math.atan(
                Math.abs(l) > Math.abs(u - a) ? (u - n) / l : l / (u - a)
              )) /
            Math.PI),
      this.ax >= 0
        ? ((this.rx = Math.sqrt(u)), (this.ry = Math.sqrt(h)))
        : ((this.ax += 90), (this.rx = Math.sqrt(h)), (this.ry = Math.sqrt(u))),
      this
    );
  }),
    (Kt.prototype.isDegenerate = function () {
      return this.rx < 1e-10 * this.ry || this.ry < 1e-10 * this.rx;
    });
  var Zt = Kt;
  function Jt(t) {
    if (!(this instanceof Jt)) return new Jt(t);
    var e = (function (t) {
      var e = new It(t),
        r = e.max;
      for (_t(e); e.index < r && !e.err.length; ) Vt(e);
      return (
        e.err.length
          ? (e.result = [])
          : e.result.length &&
            ("mM".indexOf(e.result[0][0]) < 0
              ? ((e.err = "SvgPath: string should start with `M` or `m`"),
                (e.result = []))
              : (e.result[0][0] = "M")),
        { err: e.err, segments: e.result }
      );
    })(t);
    (this.segments = e.segments), (this.err = e.err), (this.__stack = []);
  }
  (Jt.from = function (t) {
    if ("string" == typeof t) return new Jt(t);
    if (t instanceof Jt) {
      var e = new Jt("");
      return (
        (e.err = t.err),
        (e.segments = t.segments.map(function (t) {
          return t.slice();
        })),
        (e.__stack = t.__stack.map(function (t) {
          return Rt().matrix(t.toArray());
        })),
        e
      );
    }
    throw new Error("SvgPath.from: invalid param type " + t);
  }),
    (Jt.prototype.__matrix = function (t) {
      var e,
        r = this;
      t.queue.length &&
        this.iterate(function (i, n, a, s) {
          var o, l, u, h;
          switch (i[0]) {
            case "v":
              l =
                0 === (o = t.calc(0, i[1], !0))[0]
                  ? ["v", o[1]]
                  : ["l", o[0], o[1]];
              break;
            case "V":
              l =
                (o = t.calc(a, i[1], !1))[0] === t.calc(a, s, !1)[0]
                  ? ["V", o[1]]
                  : ["L", o[0], o[1]];
              break;
            case "h":
              l =
                0 === (o = t.calc(i[1], 0, !0))[1]
                  ? ["h", o[0]]
                  : ["l", o[0], o[1]];
              break;
            case "H":
              l =
                (o = t.calc(i[1], s, !1))[1] === t.calc(a, s, !1)[1]
                  ? ["H", o[0]]
                  : ["L", o[0], o[1]];
              break;
            case "a":
            case "A":
              var f = t.toArray(),
                c = Zt(i[1], i[2], i[3]).transform(f);
              if (
                (f[0] * f[3] - f[1] * f[2] < 0 && (i[5] = i[5] ? "0" : "1"),
                (o = t.calc(i[6], i[7], "a" === i[0])),
                ("A" === i[0] && i[6] === a && i[7] === s) ||
                  ("a" === i[0] && 0 === i[6] && 0 === i[7]))
              ) {
                l = ["a" === i[0] ? "l" : "L", o[0], o[1]];
                break;
              }
              l = c.isDegenerate()
                ? ["a" === i[0] ? "l" : "L", o[0], o[1]]
                : [i[0], c.rx, c.ry, c.ax, i[4], i[5], o[0], o[1]];
              break;
            case "m":
              (h = n > 0), (l = ["m", (o = t.calc(i[1], i[2], h))[0], o[1]]);
              break;
            default:
              for (
                l = [(u = i[0])], h = u.toLowerCase() === u, e = 1;
                e < i.length;
                e += 2
              )
                (o = t.calc(i[e], i[e + 1], h)), l.push(o[0], o[1]);
          }
          r.segments[n] = l;
        }, !0);
    }),
    (Jt.prototype.__evaluateStack = function () {
      var t, e;
      if (this.__stack.length) {
        if (1 === this.__stack.length)
          return this.__matrix(this.__stack[0]), void (this.__stack = []);
        for (t = Rt(), e = this.__stack.length; --e >= 0; )
          t.matrix(this.__stack[e].toArray());
        this.__matrix(t), (this.__stack = []);
      }
    }),
    (Jt.prototype.toString = function () {
      var t = "",
        e = "",
        r = !1;
      this.__evaluateStack();
      for (var i = 0, n = this.segments.length; i < n; i++) {
        var a = this.segments[i],
          s = a[0];
        s !== e || "m" === s || "M" === s
          ? ("m" === s && "z" === e && (t += " "), (t += s), (r = !1))
          : (r = !0);
        for (var o = 1; o < a.length; o++) {
          var l = a[o];
          1 === o ? r && l >= 0 && (t += " ") : l >= 0 && (t += " "), (t += l);
        }
        e = s;
      }
      return t;
    }),
    (Jt.prototype.translate = function (t, e) {
      return this.__stack.push(Rt().translate(t, e || 0)), this;
    }),
    (Jt.prototype.scale = function (t, e) {
      return this.__stack.push(Rt().scale(t, e || 0 === e ? e : t)), this;
    }),
    (Jt.prototype.rotate = function (t, e, r) {
      return this.__stack.push(Rt().rotate(t, e || 0, r || 0)), this;
    }),
    (Jt.prototype.skewX = function (t) {
      return this.__stack.push(Rt().skewX(t)), this;
    }),
    (Jt.prototype.skewY = function (t) {
      return this.__stack.push(Rt().skewY(t)), this;
    }),
    (Jt.prototype.matrix = function (t) {
      return this.__stack.push(Rt().matrix(t)), this;
    }),
    (Jt.prototype.transform = function (t) {
      return t.trim()
        ? (this.__stack.push(
            (function (t) {
              var e,
                r,
                i = new Rt();
              return (
                t.split(Gt).forEach(function (t) {
                  if (t.length)
                    if (void 0 === Wt[t])
                      switch (
                        ((r = t.split(Ut).map(function (t) {
                          return +t || 0;
                        })),
                        e)
                      ) {
                        case "matrix":
                          return void (6 === r.length && i.matrix(r));
                        case "scale":
                          return void (1 === r.length
                            ? i.scale(r[0], r[0])
                            : 2 === r.length && i.scale(r[0], r[1]));
                        case "rotate":
                          return void (1 === r.length
                            ? i.rotate(r[0], 0, 0)
                            : 3 === r.length && i.rotate(r[0], r[1], r[2]));
                        case "translate":
                          return void (1 === r.length
                            ? i.translate(r[0], 0)
                            : 2 === r.length && i.translate(r[0], r[1]));
                        case "skewX":
                          return void (1 === r.length && i.skewX(r[0]));
                        case "skewY":
                          return void (1 === r.length && i.skewY(r[0]));
                      }
                    else e = t;
                }),
                i
              );
            })(t)
          ),
          this)
        : this;
    }),
    (Jt.prototype.round = function (t) {
      var e,
        r = 0,
        i = 0,
        n = 0,
        a = 0;
      return (
        (t = t || 0),
        this.__evaluateStack(),
        this.segments.forEach(function (s) {
          var o = s[0].toLowerCase() === s[0];
          switch (s[0]) {
            case "H":
            case "h":
              return (
                o && (s[1] += n),
                (n = s[1] - s[1].toFixed(t)),
                void (s[1] = +s[1].toFixed(t))
              );
            case "V":
            case "v":
              return (
                o && (s[1] += a),
                (a = s[1] - s[1].toFixed(t)),
                void (s[1] = +s[1].toFixed(t))
              );
            case "Z":
            case "z":
              return (n = r), void (a = i);
            case "M":
            case "m":
              return (
                o && ((s[1] += n), (s[2] += a)),
                (n = s[1] - s[1].toFixed(t)),
                (a = s[2] - s[2].toFixed(t)),
                (r = n),
                (i = a),
                (s[1] = +s[1].toFixed(t)),
                void (s[2] = +s[2].toFixed(t))
              );
            case "A":
            case "a":
              return (
                o && ((s[6] += n), (s[7] += a)),
                (n = s[6] - s[6].toFixed(t)),
                (a = s[7] - s[7].toFixed(t)),
                (s[1] = +s[1].toFixed(t)),
                (s[2] = +s[2].toFixed(t)),
                (s[3] = +s[3].toFixed(t + 2)),
                (s[6] = +s[6].toFixed(t)),
                void (s[7] = +s[7].toFixed(t))
              );
            default:
              return (
                (e = s.length),
                o && ((s[e - 2] += n), (s[e - 1] += a)),
                (n = s[e - 2] - s[e - 2].toFixed(t)),
                (a = s[e - 1] - s[e - 1].toFixed(t)),
                void s.forEach(function (e, r) {
                  r && (s[r] = +s[r].toFixed(t));
                })
              );
          }
        }),
        this
      );
    }),
    (Jt.prototype.iterate = function (t, e) {
      var r,
        i,
        n,
        a = this.segments,
        s = {},
        o = !1,
        l = 0,
        u = 0,
        h = 0,
        f = 0;
      if (
        (e || this.__evaluateStack(),
        a.forEach(function (e, r) {
          var i = t(e, r, l, u);
          Array.isArray(i) && ((s[r] = i), (o = !0));
          var n = e[0] === e[0].toLowerCase();
          switch (e[0]) {
            case "m":
            case "M":
              return (
                (l = e[1] + (n ? l : 0)),
                (u = e[2] + (n ? u : 0)),
                (h = l),
                void (f = u)
              );
            case "h":
            case "H":
              return void (l = e[1] + (n ? l : 0));
            case "v":
            case "V":
              return void (u = e[1] + (n ? u : 0));
            case "z":
            case "Z":
              return (l = h), void (u = f);
            default:
              (l = e[e.length - 2] + (n ? l : 0)),
                (u = e[e.length - 1] + (n ? u : 0));
          }
        }),
        !o)
      )
        return this;
      for (n = [], r = 0; r < a.length; r++)
        if (void 0 !== s[r]) for (i = 0; i < s[r].length; i++) n.push(s[r][i]);
        else n.push(a[r]);
      return (this.segments = n), this;
    }),
    (Jt.prototype.abs = function () {
      return (
        this.iterate(function (t, e, r, i) {
          var n,
            a = t[0],
            s = a.toUpperCase();
          if (a !== s)
            switch (((t[0] = s), a)) {
              case "v":
                return void (t[1] += i);
              case "a":
                return (t[6] += r), void (t[7] += i);
              default:
                for (n = 1; n < t.length; n++) t[n] += n % 2 ? r : i;
            }
        }, !0),
        this
      );
    }),
    (Jt.prototype.rel = function () {
      return (
        this.iterate(function (t, e, r, i) {
          var n,
            a = t[0],
            s = a.toLowerCase();
          if (a !== s && (0 !== e || "M" !== a))
            switch (((t[0] = s), a)) {
              case "V":
                return void (t[1] -= i);
              case "A":
                return (t[6] -= r), void (t[7] -= i);
              default:
                for (n = 1; n < t.length; n++) t[n] -= n % 2 ? r : i;
            }
        }, !0),
        this
      );
    }),
    (Jt.prototype.unarc = function () {
      return (
        this.iterate(function (t, e, r, i) {
          var n,
            a,
            s,
            o = [],
            l = t[0];
          return "A" !== l && "a" !== l
            ? null
            : ("a" === l
                ? ((a = r + t[6]), (s = i + t[7]))
                : ((a = t[6]), (s = t[7])),
              0 === (n = Qt(r, i, a, s, t[4], t[5], t[1], t[2], t[3])).length
                ? [["a" === t[0] ? "l" : "L", t[6], t[7]]]
                : (n.forEach(function (t) {
                    o.push(["C", t[2], t[3], t[4], t[5], t[6], t[7]]);
                  }),
                  o));
        }),
        this
      );
    }),
    (Jt.prototype.unshort = function () {
      var t,
        e,
        r,
        i,
        n,
        a = this.segments;
      return (
        this.iterate(function (s, o, l, u) {
          var h,
            f = s[0],
            c = f.toUpperCase();
          o &&
            ("T" === c
              ? ((h = "t" === f),
                "Q" === (r = a[o - 1])[0]
                  ? ((t = r[1] - l), (e = r[2] - u))
                  : "q" === r[0]
                  ? ((t = r[1] - r[3]), (e = r[2] - r[4]))
                  : ((t = 0), (e = 0)),
                (i = -t),
                (n = -e),
                h || ((i += l), (n += u)),
                (a[o] = [h ? "q" : "Q", i, n, s[1], s[2]]))
              : "S" === c &&
                ((h = "s" === f),
                "C" === (r = a[o - 1])[0]
                  ? ((t = r[3] - l), (e = r[4] - u))
                  : "c" === r[0]
                  ? ((t = r[3] - r[5]), (e = r[4] - r[6]))
                  : ((t = 0), (e = 0)),
                (i = -t),
                (n = -e),
                h || ((i += l), (n += u)),
                (a[o] = [h ? "c" : "C", i, n, s[1], s[2], s[3], s[4]])));
        }),
        this
      );
    });
  var te = Jt,
    ee = (function (t) {
      function e(e, r) {
        return t.call(this, !0, e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        (e.prototype.getPath = function (t) {
          var e,
            r,
            i = new te(O(this.element, t.styleSheets, "d") || "")
              .unshort()
              .unarc()
              .abs(),
            n = new T();
          return (
            i.iterate(function (t) {
              switch (t[0]) {
                case "M":
                  n.moveTo(t[1], t[2]);
                  break;
                case "L":
                  n.lineTo(t[1], t[2]);
                  break;
                case "H":
                  n.lineTo(t[1], r);
                  break;
                case "V":
                  n.lineTo(e, t[1]);
                  break;
                case "C":
                  n.curveTo(t[1], t[2], t[3], t[4], t[5], t[6]);
                  break;
                case "Q":
                  var i = k([e, r], [t[1], t[2]]),
                    a = k([t[3], t[4]], [t[1], t[2]]);
                  n.curveTo(i[0], i[1], a[0], a[1], t[3], t[4]);
                  break;
                case "Z":
                  n.close();
              }
              switch (t[0]) {
                case "M":
                case "L":
                  (e = t[1]), (r = t[2]);
                  break;
                case "H":
                  e = t[1];
                  break;
                case "V":
                  r = t[1];
                  break;
                case "C":
                  (e = t[5]), (r = t[6]);
                  break;
                case "Q":
                  (e = t[3]), (r = t[4]);
              }
            }),
            n
          );
        }),
        e
      );
    })(gt),
    re =
      /^\s*data:(([^/,;]+\/[^/,;]+)(?:;([^,;=]+=[^,;=]+))?)?(?:;(base64))?,(.*\s*)$/i,
    ie = (function (t) {
      function e(r, i) {
        var n = t.call(this, r, i) || this;
        return (
          (n.imageLoadingPromise = null),
          (n.imageUrl =
            n.element.getAttribute("xlink:href") ||
            n.element.getAttribute("href")),
          n.imageUrl && (n.imageLoadingPromise = e.fetchImageData(n.imageUrl)),
          n
        );
      }
      return (
        n(e, t),
        (e.prototype.renderCore = function (t) {
          return s(this, void 0, void 0, function () {
            var e, r, i, n, a, s, l, u, h, f, c, p;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  return this.imageLoadingPromise
                    ? (t.pdf.setCurrentTransformationMatrix(t.transform),
                      (e = parseFloat(
                        O(this.element, t.styleSheets, "width") || "0"
                      )),
                      (r = parseFloat(
                        O(this.element, t.styleSheets, "height") || "0"
                      )),
                      (i = parseFloat(
                        O(this.element, t.styleSheets, "x") || "0"
                      )),
                      (n = parseFloat(
                        O(this.element, t.styleSheets, "y") || "0"
                      )),
                      !isFinite(e) || e <= 0 || !isFinite(r) || r <= 0
                        ? [2]
                        : [4, this.imageLoadingPromise])
                    : [2];
                case 1:
                  return (
                    (a = o.sent()),
                    (s = a.data),
                    0 !== (l = a.format).indexOf("svg")
                      ? [3, 3]
                      : ((u = new DOMParser()),
                        (h = u.parseFromString(
                          s,
                          "image/svg+xml"
                        ).firstElementChild),
                        (!(f = this.element.getAttribute(
                          "preserveAspectRatio"
                        )) ||
                          f.indexOf("defer") < 0 ||
                          !h.getAttribute("preserveAspectRatio")) &&
                          h.setAttribute("preserveAspectRatio", f || ""),
                        h.setAttribute("x", String(i)),
                        h.setAttribute("y", String(n)),
                        h.setAttribute("width", String(e)),
                        h.setAttribute("height", String(r)),
                        [
                          4,
                          de(h, (c = {})).render(
                            new d(t.pdf, {
                              refsHandler: new S(c),
                              styleSheets: t.styleSheets,
                              viewport: new bt(e, r),
                              svg2pdfParameters: t.svg2pdfParameters,
                            })
                          ),
                        ])
                  );
                case 2:
                  return o.sent(), [2];
                case 3:
                  p = "data:image/" + l + ";base64," + btoa(s);
                  try {
                    t.pdf.addImage(p, "", i, n, e, r);
                  } catch (t) {
                    "object" == typeof console &&
                      console.warn &&
                      console.warn(
                        "Could not load image " + this.imageUrl + ".\n" + t
                      );
                  }
                  o.label = 4;
                case 4:
                  return [2];
              }
            });
          });
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return K(this.element, t);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        (e.fetchImageData = function (t) {
          return s(this, void 0, void 0, function () {
            var r, i, n, a, s;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  if (!(n = t.match(re))) return [3, 1];
                  if (((a = n[2]), "image" !== (s = a.split("/"))[0]))
                    throw new Error("Unsupported image URL: " + t);
                  return (
                    (i = s[1]),
                    (r = n[5]),
                    (r = "base64" === n[4] ? atob(r) : decodeURIComponent(r)),
                    [3, 3]
                  );
                case 1:
                  return [4, e.fetchImage(t)];
                case 2:
                  (r = o.sent()),
                    (i = t.substring(t.lastIndexOf(".") + 1)),
                    (o.label = 3);
                case 3:
                  return [2, { data: r, format: i }];
              }
            });
          });
        }),
        (e.fetchImage = function (t) {
          return new Promise(function (e, r) {
            var i = new XMLHttpRequest();
            i.open("GET", t, !0),
              (i.responseType = "arraybuffer"),
              (i.onload = function () {
                if (200 !== i.status)
                  throw new Error(
                    "Error " + i.status + ": Failed to load image '" + t + "'"
                  );
                for (
                  var r = new Uint8Array(i.response), n = "", a = 0;
                  a < r.length;
                  a++
                )
                  n += String.fromCharCode(r[a]);
                e(n);
              }),
              (i.onerror = r),
              (i.onabort = r),
              i.send(null);
          });
        }),
        (e.getMimeType = function (t) {
          switch ((t = t.toLowerCase())) {
            case "jpg":
            case "jpeg":
              return "image/jpeg";
            default:
              return "image/" + t;
          }
        }),
        e
      );
    })(dt),
    ne = (function (t) {
      function e(e, r, i) {
        var n = t.call(this, !0, r, i) || this;
        return (n.closed = e), n;
      }
      return (
        n(e, t),
        (e.prototype.getPath = function (t) {
          if (
            !this.element.hasAttribute("points") ||
            "" === this.element.getAttribute("points")
          )
            return null;
          var r = e.parsePointsString(this.element.getAttribute("points")),
            i = new T();
          if (r.length < 1) return i;
          i.moveTo(r[0][0], r[0][1]);
          for (var n = 1; n < r.length; n++) i.lineTo(r[n][0], r[n][1]);
          return this.closed && i.close(), i;
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (e.parsePointsString = function (t) {
          for (var e = j(t), r = [], i = 0; i < e.length - 1; i += 2) {
            var n = e[i],
              a = e[i + 1];
            r.push([n, a]);
          }
          return r;
        }),
        e
      );
    })(gt),
    ae = (function (t) {
      function e(e, r) {
        return t.call(this, !0, e, r) || this;
      }
      return n(e, t), e;
    })(ne),
    se = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.render = function (t) {
          return Promise.resolve();
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return [0, 0, 0, 0];
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        (e.prototype.isVisible = function (t, e) {
          return I(this, t, e);
        }),
        e
      );
    })(tt),
    oe = (function (t) {
      function r() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(r, t),
        (r.prototype.apply = function (t) {
          return s(this, void 0, void 0, function () {
            var r, i, n, a, s;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  (r = this.computeNodeTransform(t)),
                    (i = this.getBoundingBox(t)),
                    t.pdf.beginFormObject(i[0], i[1], i[2], i[3], r),
                    (function (t) {
                      var r = t.attributeState,
                        i = t.pdf,
                        n = 1,
                        a = 1;
                      (n *= r.fillOpacity),
                        (n *= r.opacity),
                        r.fill instanceof u &&
                          void 0 !== r.fill.color.a &&
                          (n *= r.fill.color.a),
                        (a *= r.strokeOpacity),
                        (a *= r.opacity),
                        r.stroke instanceof u &&
                          void 0 !== r.stroke.color.a &&
                          (a *= r.stroke.color.a);
                      var s,
                        o = {};
                      if (
                        ((o.opacity = n),
                        (o["stroke-opacity"] = a),
                        i.setGState(new e.GState(o)),
                        r.fill && r.fill instanceof u && r.fill.color.ok
                          ? i.setFillColor(
                              r.fill.color.r,
                              r.fill.color.g,
                              r.fill.color.b
                            )
                          : i.setFillColor(0, 0, 0),
                        i.setLineWidth(r.strokeWidth),
                        r.stroke instanceof u
                          ? i.setDrawColor(
                              r.stroke.color.r,
                              r.stroke.color.g,
                              r.stroke.color.b
                            )
                          : i.setDrawColor(0, 0, 0),
                        i.setLineCap(r.strokeLinecap),
                        i.setLineJoin(r.strokeLinejoin),
                        r.strokeDasharray
                          ? i.setLineDashPattern(
                              r.strokeDasharray,
                              r.strokeDashoffset
                            )
                          : i.setLineDashPattern([], 0),
                        i.setLineMiterLimit(r.strokeMiterlimit),
                        (s = z.hasOwnProperty(r.fontFamily)
                          ? z[r.fontFamily]
                          : r.fontFamily),
                        r.fill && r.fill instanceof u && r.fill.color.ok)
                      ) {
                        var l = r.fill.color;
                        i.setTextColor(l.r, l.g, l.b);
                      } else i.setTextColor(0, 0, 0);
                      var h = "";
                      "bold" === r.fontWeight && (h = "bold"),
                        "italic" === r.fontStyle && (h += "italic"),
                        "" === h && (h = "normal"),
                        void 0 !== s || void 0 !== h
                          ? (void 0 === s &&
                              (s = z.hasOwnProperty(r.fontFamily)
                                ? z[r.fontFamily]
                                : r.fontFamily),
                            i.setFont(s, h))
                          : i.setFont("helvetica", h),
                        i.setFontSize(r.fontSize * i.internal.scaleFactor);
                    })(
                      (n = new d(t.pdf, {
                        refsHandler: t.refsHandler,
                        styleSheets: t.styleSheets,
                        viewport: t.viewport,
                        svg2pdfParameters: t.svg2pdfParameters,
                      }))
                    ),
                    (a = 0),
                    (s = this.children),
                    (o.label = 1);
                case 1:
                  return a < s.length ? [4, s[a].render(n)] : [3, 4];
                case 2:
                  o.sent(), (o.label = 3);
                case 3:
                  return a++, [3, 1];
                case 4:
                  return (
                    t.pdf.endFormObject(this.element.getAttribute("id")), [2]
                  );
              }
            });
          });
        }),
        (r.prototype.getBoundingBoxCore = function (t) {
          var e,
            r = this.element.getAttribute("viewBox");
          return (
            r && (e = j(r)),
            [
              (e && e[0]) || 0,
              (e && e[1]) || 0,
              (e && e[2]) ||
                parseFloat(this.element.getAttribute("markerWidth") || "3"),
              (e && e[3]) ||
                parseFloat(this.element.getAttribute("markerHeight") || "3"),
            ]
          );
        }),
        (r.prototype.computeNodeTransformCore = function (t) {
          var e,
            r = parseFloat(this.element.getAttribute("refX") || "0"),
            i = parseFloat(this.element.getAttribute("refY") || "0"),
            n = this.element.getAttribute("viewBox");
          if (n) {
            var a = j(n);
            (e = Z(
              this.element,
              a,
              0,
              0,
              parseFloat(this.element.getAttribute("markerWidth") || "3"),
              parseFloat(this.element.getAttribute("markerHeight") || "3"),
              t,
              !0
            )),
              (e = t.pdf.matrixMult(t.pdf.Matrix(1, 0, 0, 1, -r, -i), e));
          } else e = t.pdf.Matrix(1, 0, 0, 1, -r, -i);
          return e;
        }),
        (r.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        r
      );
    })(et),
    le = (function (t) {
      function e(e, r) {
        return t.call(this, e, r) || this;
      }
      return (
        n(e, t),
        (e.prototype.getR = function (t) {
          var e;
          return null !== (e = this.r) && void 0 !== e
            ? e
            : (this.r = parseFloat(O(this.element, t.styleSheets, "r") || "0"));
        }),
        (e.prototype.getRx = function (t) {
          return this.getR(t);
        }),
        (e.prototype.getRy = function (t) {
          return this.getR(t);
        }),
        e
      );
    })(wt),
    ue = (function (t) {
      function e(e, r) {
        return t.call(this, !1, e, r) || this;
      }
      return n(e, t), e;
    })(ne),
    he = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.renderCore = function (t) {
          return s(this, void 0, void 0, function () {
            var e, r;
            return o(this, function (i) {
              switch (i.label) {
                case 0:
                  (e = 0), (r = this.children), (i.label = 1);
                case 1:
                  return e < r.length ? [4, r[e].render(t)] : [3, 4];
                case 2:
                  i.sent(), (i.label = 3);
                case 3:
                  return e++, [3, 1];
                case 4:
                  return [2];
              }
            });
          });
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return $(t, this);
        }),
        e
      );
    })(pt),
    fe = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        (e.prototype.render = function (e) {
          return s(this, void 0, void 0, function () {
            var r, i, n, a, s;
            return o(this, function (o) {
              switch (o.label) {
                case 0:
                  return this.isVisible(
                    "hidden" !== e.attributeState.visibility,
                    e
                  )
                    ? ((r = this.getX(e)),
                      (i = this.getY(e)),
                      (n = this.getWidth(e)),
                      (a = this.getHeight(e)),
                      e.pdf.saveGraphicsState(),
                      (s = e.transform),
                      this.element.hasAttribute("transform") &&
                        (s = e.pdf.matrixMult(
                          J(this.element.getAttribute("transform"), e),
                          s
                        )),
                      e.pdf.setCurrentTransformationMatrix(s),
                      e.withinUse ||
                        "visible" ===
                          O(this.element, e.styleSheets, "overflow") ||
                        e.pdf.rect(r, i, n, a).clip().discardPath(),
                      [
                        4,
                        t.prototype.render.call(
                          this,
                          e.clone({
                            transform: e.pdf.unitMatrix,
                            viewport: e.withinUse ? e.viewport : new bt(n, a),
                          })
                        ),
                      ])
                    : [2];
                case 1:
                  return o.sent(), e.pdf.restoreGraphicsState(), [2];
              }
            });
          });
        }),
        (e.prototype.computeNodeTransform = function (t) {
          return this.computeNodeTransformCore(t);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          if (t.withinUse) return t.pdf.unitMatrix;
          var e,
            r = this.getX(t),
            i = this.getY(t),
            n = this.getViewBox();
          if (n) {
            var a = this.getWidth(t),
              s = this.getHeight(t);
            e = Z(this.element, n, r, i, a, s, t);
          } else e = t.pdf.Matrix(1, 0, 0, 1, r, i);
          return e;
        }),
        (e.prototype.getWidth = function (t) {
          if (void 0 !== this.width) return this.width;
          var e,
            r,
            i = t.svg2pdfParameters;
          if (this.isOutermostSvg(t))
            if (null != i.width) e = i.width;
            else if ((r = O(this.element, t.styleSheets, "width")))
              e = parseFloat(r);
            else {
              var n = this.getViewBox();
              if (
                n &&
                (null != i.height || O(this.element, t.styleSheets, "height"))
              ) {
                var a = n[2] / n[3];
                e = this.getHeight(t) * a;
              } else e = Math.min(300, t.viewport.width, 2 * t.viewport.height);
            }
          else
            e = (r = O(this.element, t.styleSheets, "width"))
              ? parseFloat(r)
              : t.viewport.width;
          return (this.width = e);
        }),
        (e.prototype.getHeight = function (t) {
          if (void 0 !== this.height) return this.height;
          var e,
            r,
            i = t.svg2pdfParameters;
          if (this.isOutermostSvg(t))
            if (null != i.height) e = i.height;
            else if ((r = O(this.element, t.styleSheets, "height")))
              e = parseFloat(r);
            else {
              var n = this.getViewBox();
              if (n) {
                var a = n[2] / n[3];
                e = this.getWidth(t) / a;
              } else e = Math.min(150, t.viewport.width / 2, t.viewport.height);
            }
          else
            e = (r = O(this.element, t.styleSheets, "height"))
              ? parseFloat(r)
              : t.viewport.height;
          return (this.height = e);
        }),
        (e.prototype.getX = function (t) {
          if (void 0 !== this.x) return this.x;
          if (this.isOutermostSvg(t)) return (this.x = 0);
          var e = O(this.element, t.styleSheets, "x");
          return (this.x = e ? parseFloat(e) : 0);
        }),
        (e.prototype.getY = function (t) {
          if (void 0 !== this.y) return this.y;
          if (this.isOutermostSvg(t)) return (this.y = 0);
          var e = O(this.element, t.styleSheets, "y");
          return (this.y = e ? parseFloat(e) : 0);
        }),
        (e.prototype.getViewBox = function () {
          if (void 0 !== this.viewBox) return this.viewBox;
          var t = this.element.getAttribute("viewBox");
          return (this.viewBox = t ? j(t) : void 0);
        }),
        (e.prototype.isOutermostSvg = function (t) {
          return t.svg2pdfParameters.element === this.element;
        }),
        e
      );
    })(he),
    ce = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        (e.prototype.computeNodeTransformCore = function (t) {
          return t.pdf.unitMatrix;
        }),
        e
      );
    })(he),
    pe = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        n(e, t),
        (e.prototype.apply = function (t) {
          return s(this, void 0, void 0, function () {
            var e, r, i;
            return o(this, function (n) {
              switch (n.label) {
                case 0:
                  if (!this.isVisible(!0, t)) return [2];
                  (e = t.pdf.matrixMult(
                    this.computeNodeTransform(t),
                    t.transform
                  )),
                    t.pdf.setCurrentTransformationMatrix(e),
                    (r = 0),
                    (i = this.children),
                    (n.label = 1);
                case 1:
                  return r < i.length
                    ? [
                        4,
                        i[r].render(
                          new d(t.pdf, {
                            refsHandler: t.refsHandler,
                            styleSheets: t.styleSheets,
                            viewport: t.viewport,
                            withinClipPath: !0,
                            svg2pdfParameters: t.svg2pdfParameters,
                          })
                        ),
                      ]
                    : [3, 4];
                case 2:
                  n.sent(), (n.label = 3);
                case 3:
                  return r++, [3, 1];
                case 4:
                  return (
                    t.pdf.clip().discardPath(),
                    t.pdf.setCurrentTransformationMatrix(e.inversed()),
                    [2]
                  );
              }
            });
          });
        }),
        (e.prototype.getBoundingBoxCore = function (t) {
          return $(t, this);
        }),
        (e.prototype.isVisible = function (t, e) {
          return _(this, t, e);
        }),
        e
      );
    })(et);
  function de(t, e) {
    var r,
      i = [];
    switch (
      ((function (t, e) {
        for (var r = [], i = 0; i < t.childNodes.length; i++) {
          var n = t.childNodes[i];
          "#" !== n.nodeName.charAt(0) && r.push(n);
        }
        for (i = 0; i < r.length; i++) e(i, r[i]);
      })(t, function (t, r) {
        return i.push(de(r, e));
      }),
      t.tagName.toLowerCase())
    ) {
      case "a":
      case "g":
        r = new ce(t, i);
        break;
      case "circle":
        r = new le(t, i);
        break;
      case "clippath":
        r = new pe(t, i);
        break;
      case "ellipse":
        r = new kt(t, i);
        break;
      case "lineargradient":
        r = new it(t, i);
        break;
      case "image":
        r = new ie(t, i);
        break;
      case "line":
        r = new yt(t, i);
        break;
      case "marker":
        r = new oe(t, i);
        break;
      case "path":
        r = new ee(t, i);
        break;
      case "pattern":
        r = new st(t, i);
        break;
      case "polygon":
        r = new ae(t, i);
        break;
      case "polyline":
        r = new ue(t, i);
        break;
      case "radialgradient":
        r = new nt(t, i);
        break;
      case "rect":
        r = new St(t, i);
        break;
      case "svg":
        r = new fe(t, i);
        break;
      case "symbol":
        r = new vt(t, i);
        break;
      case "text":
        r = new Bt(t, i);
        break;
      case "use":
        r = new xt(t, i);
        break;
      default:
        r = new se(t, i);
    }
    if (null != e && r.element.hasAttribute("id")) {
      var n = x(r.element.id, { isIdentifier: !0 });
      e[n] = e[n] || r;
    }
    return (
      r.children.forEach(function (t) {
        return t.setParent(r);
      }),
      r
    );
  }
  var ge = function (t) {
      var e,
        r,
        i = t,
        n = { a: 0, b: 0, c: 0 },
        a = [];
      return (
        (e = function (e, r) {
          var s, o, l, u, h, f;
          if (e.test(i))
            for (o = 0, l = (s = i.match(e)).length; o < l; o += 1)
              (n[r] += 1),
                (u = s[o]),
                (h = i.indexOf(u)),
                (f = u.length),
                a.push({
                  selector: t.substr(h, f),
                  type: r,
                  index: h,
                  length: f,
                }),
                (i = i.replace(u, Array(f + 1).join(" ")));
        }),
        (r = function (t) {
          var e, r, n, a;
          if (t.test(i))
            for (r = 0, n = (e = i.match(t)).length; r < n; r += 1)
              (a = e[r]), (i = i.replace(a, Array(a.length + 1).join("A")));
        })(/\\[0-9A-Fa-f]{6}\s?/g),
        r(/\\[0-9A-Fa-f]{1,5}\s/g),
        r(/\\./g),
        (function () {
          var t,
            e,
            r,
            n,
            a = /{[^]*/gm;
          if (a.test(i))
            for (e = 0, r = (t = i.match(a)).length; e < r; e += 1)
              (n = t[e]), (i = i.replace(n, Array(n.length + 1).join(" ")));
        })(),
        e(/(\[[^\]]+\])/g, "b"),
        e(/(#[^\#\s\+>~\.\[:\)]+)/g, "a"),
        e(/(\.[^\s\+>~\.\[:\)]+)/g, "b"),
        e(
          /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,
          "c"
        ),
        e(/(:(?!not|global|local)[\w-]+\([^\)]*\))/gi, "b"),
        e(/(:(?!not|global|local)[^\s\+>~\.\[:]+)/g, "b"),
        (i = (i = (i = (i = (i = (i = i.replace(/[\*\s\+>~]/g, " ")).replace(
          /[#\.]/g,
          " "
        )).replace(/:not/g, "    ")).replace(/:local/g, "      ")).replace(
          /:global/g,
          "       "
        )).replace(/[\(\)]/g, " ")),
        e(/([^\s\+>~\.\[:]+)/g, "c"),
        a.sort(function (t, e) {
          return t.index - e.index;
        }),
        {
          selector: t,
          specificity:
            "0," + n.a.toString() + "," + n.b.toString() + "," + n.c.toString(),
          specificityArray: [0, n.a, n.b, n.c],
          parts: a,
        }
      );
    },
    me = (function () {
      function t(t, e) {
        (this.rootSvg = t),
          (this.loadExternalSheets = e),
          (this.styleSheets = []);
      }
      return (
        (t.prototype.load = function () {
          return s(this, void 0, void 0, function () {
            var t;
            return o(this, function (e) {
              switch (e.label) {
                case 0:
                  return [4, this.collectStyleSheetTexts()];
                case 1:
                  return (t = e.sent()), this.parseCssSheets(t), [2];
              }
            });
          });
        }),
        (t.prototype.collectStyleSheetTexts = function () {
          return s(this, void 0, void 0, function () {
            var e, r, i, n, a;
            return o(this, function (s) {
              switch (s.label) {
                case 0:
                  if (
                    ((e = []),
                    this.loadExternalSheets && this.rootSvg.ownerDocument)
                  )
                    for (
                      n = 0;
                      n < this.rootSvg.ownerDocument.childNodes.length;
                      n++
                    )
                      "xml-stylesheet" ===
                        (r = this.rootSvg.ownerDocument.childNodes[n])
                          .nodeName &&
                        "string" == typeof r.data &&
                        e.push(
                          t.loadSheet(
                            r.data
                              .match(/href=["'].*?["']/)[0]
                              .split("=")[1]
                              .slice(1, -1)
                          )
                        );
                  for (
                    i = this.rootSvg.querySelectorAll("style,link"), n = 0;
                    n < i.length;
                    n++
                  )
                    E((a = i[n]), "style")
                      ? e.push(a.textContent)
                      : this.loadExternalSheets &&
                        E(a, "link") &&
                        "stylesheet" === a.getAttribute("rel") &&
                        a.hasAttribute("href") &&
                        e.push(t.loadSheet(a.getAttribute("href")));
                  return [4, Promise.all(e)];
                case 1:
                  return [
                    2,
                    s.sent().filter(function (t) {
                      return null !== t;
                    }),
                  ];
              }
            });
          });
        }),
        (t.prototype.parseCssSheets = function (e) {
          for (
            var r = document.implementation.createHTMLDocument(""),
              i = 0,
              n = e;
            i < n.length;
            i++
          ) {
            var a = n[i],
              s = r.createElement("style");
            (s.textContent = a), r.body.appendChild(s);
            var o = s.sheet;
            if (o instanceof CSSStyleSheet) {
              for (var l = o.cssRules.length - 1; l >= 0; l--) {
                var u = o.cssRules[l];
                if (u instanceof CSSStyleRule) {
                  var h = u;
                  if (h.selectorText.indexOf(",") >= 0) {
                    o.deleteRule(l);
                    for (
                      var f = h.cssText.substring(h.selectorText.length),
                        c = t.splitSelectorAtCommas(h.selectorText),
                        p = 0;
                      p < c.length;
                      p++
                    )
                      o.insertRule(c[p] + f, l + p);
                  }
                } else o.deleteRule(l);
              }
              this.styleSheets.push(o);
            }
          }
        }),
        (t.splitSelectorAtCommas = function (t) {
          for (
            var e,
              r = /,|["']/g,
              i = /[^\\]["]/g,
              n = /[^\\][']/g,
              a = [],
              s = "initial",
              o = -1,
              l = i,
              u = 0;
            u < t.length;

          )
            switch (s) {
              case "initial":
                (r.lastIndex = u),
                  (e = r.exec(t))
                    ? ("," === e[0]
                        ? (a.push(t.substring(o + 1, r.lastIndex - 1).trim()),
                          (o = r.lastIndex - 1))
                        : ((s = "withinQuotes"), (l = '"' === e[0] ? i : n)),
                      (u = r.lastIndex))
                    : (a.push(t.substring(o + 1).trim()), (u = t.length));
                break;
              case "withinQuotes":
                (l.lastIndex = u),
                  (e = l.exec(t)) && ((u = l.lastIndex), (s = "initial"));
            }
          return a;
        }),
        (t.loadSheet = function (t) {
          return new Promise(function (e, r) {
            var i = new XMLHttpRequest();
            i.open("GET", t, !0),
              (i.responseType = "text"),
              (i.onload = function () {
                200 !== i.status &&
                  r(
                    new Error(
                      "Error " + i.status + ": Failed to load '" + t + "'"
                    )
                  ),
                  e(i.responseText);
              }),
              (i.onerror = r),
              (i.onabort = r),
              i.send(null);
          }).catch(function () {
            return null;
          });
        }),
        (t.prototype.getPropertyValue = function (t, e) {
          for (var r = [], i = 0, n = this.styleSheets; i < n.length; i++)
            for (var a = n[i], s = 0; s < a.cssRules.length; s++) {
              var o = a.cssRules[s];
              o.style.getPropertyValue(e) &&
                t.matches(o.selectorText) &&
                r.push(o);
            }
          if (0 !== r.length) {
            var l = function (t, r) {
              var i = t.style.getPropertyPriority(e);
              return i !== r.style.getPropertyPriority(e)
                ? "important" === i
                  ? 1
                  : -1
                : (function (t, e) {
                    var r, i, n;
                    if ("string" == typeof t) {
                      if (-1 !== t.indexOf(",")) throw "Invalid CSS selector";
                      r = ge(t).specificityArray;
                    } else {
                      if (!Array.isArray(t))
                        throw "Invalid CSS selector or specificity array";
                      if (
                        4 !==
                        t.filter(function (t) {
                          return "number" == typeof t;
                        }).length
                      )
                        throw "Invalid specificity array";
                      r = t;
                    }
                    if ("string" == typeof e) {
                      if (-1 !== e.indexOf(",")) throw "Invalid CSS selector";
                      i = ge(e).specificityArray;
                    } else {
                      if (!Array.isArray(e))
                        throw "Invalid CSS selector or specificity array";
                      if (
                        4 !==
                        e.filter(function (t) {
                          return "number" == typeof t;
                        }).length
                      )
                        throw "Invalid specificity array";
                      i = e;
                    }
                    for (n = 0; n < 4; n += 1) {
                      if (r[n] < i[n]) return -1;
                      if (r[n] > i[n]) return 1;
                    }
                    return 0;
                  })(t.selectorText, r.selectorText);
            };
            return (
              r
                .reduce(function (t, e) {
                  return 1 === l(t, e) ? t : e;
                })
                .style.getPropertyValue(e) || void 0
            );
          }
        }),
        t
      );
    })();
  function ye(t, e, r) {
    var i, n, l;
    return (
      void 0 === r && (r = {}),
      s(this, void 0, void 0, function () {
        var s, u, h, f, c, p, g, m, y, v;
        return o(this, function (o) {
          switch (o.label) {
            case 0:
              return (
                (s = null !== (i = r.x) && void 0 !== i ? i : 0),
                (u = null !== (n = r.y) && void 0 !== n ? n : 0),
                (h =
                  null !== (l = r.loadExternalStyleSheets) &&
                  void 0 !== l &&
                  l),
                (c = new S((f = {}))),
                [4, (p = new me(t, h)).load()]
              );
            case 1:
              return (
                o.sent(),
                (g = new bt(
                  e.internal.pageSize.getWidth(),
                  e.internal.pageSize.getHeight()
                )),
                (m = a(a({}, r), { element: t })),
                (y = new d(e, {
                  refsHandler: c,
                  styleSheets: p,
                  viewport: g,
                  svg2pdfParameters: m,
                })),
                e.advancedAPI(),
                e.saveGraphicsState(),
                e.setCurrentTransformationMatrix(e.Matrix(1, 0, 0, 1, s, u)),
                e.setLineWidth(y.attributeState.strokeWidth),
                (v = y.attributeState.fill.color),
                e.setFillColor(v.r, v.g, v.b),
                e.setFont(y.attributeState.fontFamily),
                e.setFontSize(
                  y.attributeState.fontSize * e.internal.scaleFactor
                ),
                [4, de(t, f).render(y)]
              );
            case 2:
              return (
                o.sent(),
                e.restoreGraphicsState(),
                e.compatAPI(),
                y.textMeasure.cleanupTextMeasuring(),
                [2, e]
              );
          }
        });
      })
    );
  }
  (e.jsPDF.API.svg = function (t, e) {
    return void 0 === e && (e = {}), ye(t, this, e);
  }),
    (t.svg2pdf = ye),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
//# sourceMappingURL=svg2pdf.umd.min.js.map
