/*jslint browser: true, esversion: 6*/
/*global $, jQuery, alert*/
/*eslint linebreak-style: "off", indent:"off", no-undef: "warn", no-console:"off"*/

var d3, customChordLayout, stretchedChord = {};
jQuery(document).ready(function (window, document, $) {
    /* REDUNDANT CONSTANT VARIABLES */
    const ε = 1e-6,
        //ε2 = ε * ε,
        π = Math.PI,
        τ = 2 * π,
        //τε = τ - ε,
        halfπ = π / 2
        /*, d3_radians = π / 180, d3_degrees = 180 / π*/
    ;

    // DATA-RELATED FUNCTIONS
    function convert(d) {
        return typeof d === "undefined" ? 0 : +d;
    }

    function addAll(a) {
        var x = a,
            xSum = 0;
        x = x.reduce(function (a, b) {
            return a.concat(b);
        });
        for (var i = 0; i < x.length; i++) {
            switch (typeof x[i]) {
            case "number":
                xSum += x[i];
                break;
            case "string":
                xSum += !isNaN(x[i]) ? +x[i] : null;
                break;
            case "object":
            case "function":
                xSum += addAll(x[i]);
                break;
            case "undefined":
                xSum += 0;
                break;
            default:
                xSum += +x[i];
            }
        }
        return +xSum;
    }

    var nameArea = [
            /* 2016 */
            "Stayed where they were", "2016 NT Rural", "2016 NT Towns",
            "2016 Kowloon", "2016 HK Island", "2016 Dead/Went Out of HK",
            /* 2011 */
            "Born meanwhile", "From Out of HK", "2011 HK Island",
            "2011 Kowloon", "2011 NT Towns", "2011 NT Rural"
        ],

        emptyPct = 0.4,

        matrix = [
            [
                0, 0.2187, 0.8448, 0.619, 0.3287, 0,
                0, 0, 0, 0, 0, 0
            ],
            /*2011 Aged 0-5 2.0112*/
            [
                0, 0.8533, 2.0223, 2.0668, 1.4433, 0,
                0, 0, 0, 0, 0, 0
            ],
            /*2011 Outside HK 6.3867*/
            [
                0, 0.2865, 0.4591, 0.5712, 2.3933, 2.2368,
                0, 0, 12.1188, 0, 0, 0
            ],
            /* 2011 HKIsland 18.0657*/
            [
                0, 0.4285, 1.0185, 3.9381, 0.3275, 1.7151,
                0, 0, 0, 21.8983, 0, 0
            ],
            /* 2011 Kowloon 29.3260 */
            [
                0, 0.8549, 4.6287, 1.2877, 0.4233, 2.1028,
                0, 0, 0, 0, 33.1215, 0
            ],
            /* 2011 NT Town 42.4189 */
            [
                0, 1.0267, 0.3026, 0.1628, 0.07, 1.3741,
                0, 0, 0, 0, 0, 6.285
            ],
            /* 2011 NT Rural 9.113 */
            [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke,
            ],
            /* 2016 Stationary [40]*/
            [
                0, 0, 0, 0, 0, 0,
                0.2187, 0.8533, 0.2865, 0.4285, 0.8549, 1.0267
            ],
            /* 2016 NT Rural 3.6687*/
            [
                0, 0, 0, 0, 0, 0, 0.8448,
                2.0223, 0.4591, 1.0185, 4.6287, 0.3026
            ],
            /* 2016 NT Towns 9.2761*/
            [
                0, 0, 0, 0, 0, 0,
                0.619, 2.0668, 0.5712, 3.9381, 1.2977, 0.1628
            ],
            /* 2016 Kowloon 8.6456 */
            [
                0, 0, 0, 0, 0, 0,
                0.3287, 1.4433, 2.3933, 0.3275, 0.4233, 0.07
            ],
            /* 2016 HK Island 4.9861 */
            [
                emptyStroke, 0, 0, 0, 0, 0,
                0, 0, 1.3741, 2.1028, 1.7151, 2.2368
            ] /*2016 Dead/OutsideHK 7.4288 */
        ];

    var emptyStroke = emptyPct * addAll(matrix);

    // COLORS
    var colors = [
            "#F2EDDA", "#4C3D40", "#112288", "#B11633", "#118877", "#111110",
            "#7F733F", "#2B2B2B", "#134B24", "#FF99AC", "#AABBDD", "#AA8888"
        ],

        /*Initiate the color scale*/
        fill = d3.scale.ordinal()
        .domain(d3.range(nameArea.length))
        .range(colors);

    var screenWidth = $(window).width(),
        mobileScreen = screenWidth > 400 ? false : true,
        margin = {
            left: 50,
            top: 10,
            right: 50,
            bottom: 10
        },
        wWidth = Math.min(screenWidth, 800) - margin.left - margin.right,
        hHeight = (mobileScreen ? 300 : Math.min(screenWidth, 800) * 5 / 6) - margin.top - margin.bottom,
        outerRadius = Math.min(wWidth, hHeight) / 2 - (mobileScreen ? 80 : 100),
        innerRadius = outerRadius * 0.95,
        pullOutSize = mobileScreen ? 20 : 50,
        opacityDefault = 0.7, //default opacity of chords
        opacityLow = 0.2; //hover opacity of those chords not hovered over

    /* Build in offset in start & end angle to rotate the Chord diagram clockwise*/
    var startAngle = function (d) {
            return isNaN(+d) ? 0 :
                d.startAngle + offset;
        },

        endAngle = function (d) {
            return isNaN(+d) ? 0 :
                d.endAngle + offset;
        };

    /* d3.js Codes - Container */
    var svg = d3.select("#chart").append("svg")
        .attr("width", wWidth + margin.left + margin.right)
        .attr("height", hHeight + margin.top + margin.bottom);

    var wrapper = svg.append("g")
        .attr("class", "chordWrapper")
        .attr("transform", "translate(" + (wWidth / 2 + margin.left) + "," + (hHeight / 2 + margin.top) + ")");

    /*  Offset for middle empty split = (emptyStroke / 2) / {2 * (emptyStroke + totalPopn)} * 2pi    */
    /*  % to rotate = Offset / 2pi (a full circle in radians)   */
    var offset = halfπ * (emptyStroke / (addAll(matrix) + emptyStroke));

    /* CHORDS.LAYOUTSORT CUSTOM */
    customChordLayout = function () {
        var chord = {},
            chords = [],
            groups = [],
            matrix = [],
            n = 0,
            padding = 0,
            sortGroups, sortSubgroups, sortChords;

        function relayout() {
            var subgroups = {},
                groupSums = [],
                groupIndex = d3.range(n),
                subgroupIndex = [],
                k = 0,
                x = 0,
                x0 = 0,
                I = 0,
                j = 0;
            chords = [];
            groups = [];
            k = 0;
            I = -1;
            while (++I < n) {
                x = 0;
                j = -1;
                while (++j < n) {
                    x += matrix[I][j];
                }
                groupSums.push(x);
                subgroupIndex.push(d3.range(n).reverse());
                k += x;
            }
            if (sortGroups) {
                groupIndex.sort(function (a, b) {
                    return sortGroups(groupSums[a] - groupSums[b]);
                });
            }
            if (sortSubgroups) {
                subgroupIndex.forEach(function (d, I) {
                    d.sort(function (a, b) {
                        return sortSubgroups(matrix[I][a] - matrix[I][b]);
                    });
                });
            }
            k = (τ - padding * n) / k;
            x = 0;
            I = -1;
            while (++I < n) {
                x0 = x;
                j = -1;
                while (++j < n) {
                    var di = +groupIndex[I],
                        dj = +subgroupIndex[di][j],
                        v = matrix[di][dj],
                        a0 = x,
                        a1 = x += v * k;
                    subgroups[di + "-" + dj] = {
                        index: di,
                        subindex: dj,
                        startAngle: a0,
                        endAngle: a1,
                        value: v
                    };

                    groups[di] = {
                        index: di,
                        startAngle: x0,
                        endAngle: x,
                        value: (x - x0) / k /*Custom Line*/
                    };
                    x += padding;
                }
            }
            I = -1;
            while (++I < n) {
                j = I - 1;
                while (++j < n) {
                    var source = subgroups[I + "-" + j],
                        target = subgroups[j + "-" + I];
                    if (source.value || target.value) {
                        chords.push(source.value < target.value ? {
                            source: target,
                            target: source
                        } : {
                            source: source,
                            target: target
                        });
                    }
                }
            }
            if (sortChords) resort();
        }

        function resort() {
            chords.sort(function (a, b) {
                return sortChords((a.source.value + a.target.value) / 2 - (b.source.value + b.target.value) / 2);
            });
        }

        chord.matrix = function (x) {
            if (!arguments.length) return matrix;
            n = (matrix = x) && matrix.length;
            chords = groups = null;
            return chord;
        };
        chord.padding = function (x) {
            if (!arguments.length) return padding;
            padding = x;
            chords = groups = null;
            return chord;
        };
        chord.sortGroups = function (x) {
            if (!arguments.length) return sortGroups;
            sortGroups = x;
            chords = groups = null;
            return chord;
        };
        chord.sortSubgroups = function (x) {
            if (!arguments.length) return sortSubgroups;
            sortSubgroups = x;
            chords = null;
            return chord;
        };
        chord.sortChords = function (x) {
            if (!arguments.length) return sortChords;
            sortChords = x;
            if (chords) resort();
            return chord;
        };
        chord.chords = function () {
            if (!chords) relayout();
            return chords;
        };
        chord.groups = function () {
            if (!groups) relayout();
            return groups;
        };

        return chord;
    };

    //CHORDS.LAYOUTSORT CUSTOM 
    /*  Custom Sort Order --- replacing d3.layout.chord() with custom layout function in chords.layoutSort.js  */
    var chord = customChordLayout()
        .padding(0.02)
        .sortChords(d3.descending) /*which chord should be shown on top when chords cross. Now the biggest chord is at the bottom*/
        .matrix(matrix);

    /* d3.js Codes - Draw */
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);

    /* STRETCHED CHORD --- CUSTOM FUNCTION */
    stretchedChord = function () {
        var source = d3_source,
            target = d3_target,
            radius = d3_svg_chordRadius,
            startAngle = d3_svg_arcStartAngle,
            endAngle = d3_svg_arcEndAngle,
            pullOutSize = 0;

        function subgroup(self, f, d, i) {
            var subgroup = f.call(self, d, i),
                r = radius.call(self, subgroup, i),
                a0 = startAngle.call(self, subgroup, i) - halfπ,
                a1 = endAngle.call(self, subgroup, i) - halfπ;
            return {
                r: r,
                a0: [a0],
                a1: [a1],
                p0: [r * Math.cos(a0), r * Math.sin(a0)],
                p1: [r * Math.cos(a1), r * Math.sin(a1)]
            };
        }

        function arc(r, p, a) {
            var sign = p[0] >= 0 ? 1 : -1;
            return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + (p[0] + sign * pullOutSize) + "," + p[1];
        }

        function curve(p1) {
            var sign = p1[0] >= 0 ? 1 : -1;
            return "Q 0,0 " + (p1[0] + sign * pullOutSize) + "," + p1[1];
        }

        /* M = moveto [M x,y]
        Q = quadratic Bézier curve [Q control-point-x,control-point-y end-point-x, end-point-y]
        A = elliptical Arc [A rx, ry x-axis-rotation large-arc-flag, sweep-flag  end-point-x, end-point-y]
        Z = closepath */

        /* M251.5579641956022,87.98204731514328
        A266.5,266.5 0 0,1 244.49937503334525,106.02973926358392
        Q 0,0 -177.8355222451483,198.48621369706098
        A266.5,266.5 0 0,1 -191.78901944612068,185.0384338992728
        Q 0,0 251.5579641956022,87.98204731514328
        Z */

        function chord(d, i) {
            var s = subgroup(this, source, convert(+d.value), i),
                t = subgroup(this, target, convert(+d.value), i);
            return "M" + (s.p0[0] + pullOutSize) + "," + s.p0[1] +
                arc(s.r, s.p1, s.a1 - s.a0) +
                curve(t.p0) +
                arc(t.r, t.p1, t.a1 - t.a0) +
                curve(s.p0) +
                "Z";
        } //chord

        /* Methods of Chord()*/
        chord.radius = function (v) {
            if (!arguments.length) return radius;
            radius = d3_functor(v);
            return chord;
        };
        chord.pullOutSize = function (v) {
            if (!arguments.length) return pullOutSize;
            pullOutSize = v;
            return chord;
        };
        chord.source = function (v) {
            if (!arguments.length) return source;
            source = d3_functor(v);
            return chord;
        };
        chord.target = function (v) {
            if (!arguments.length) return target;
            target = d3_functor(v);
            return chord;
        };
        chord.startAngle = function (v) {
            if (!arguments.length) return startAngle;
            startAngle = d3_functor(v);
            return chord;
        };
        chord.endAngle = function (v) {
            if (!arguments.length) return endAngle;
            endAngle = d3_functor(v);
            return chord;
        };
        // Methods of Chord()

        /* Custom Functions */
        function d3_svg_chordRadius(d) {
            return d.radius;
        }

        function d3_source(d) {
            return d.source;
        }

        function d3_target(d) {
            return d.target;
        }

        function d3_svg_arcStartAngle(d) {
            return d.startAngle;
        }

        function d3_svg_arcEndAngle(d) {
            return d.endAngle;
        }

        function d3_functor(v) {
            return typeof v === "function" ?
                v :
                function () {
                    return v;
                };
        }
        return chord;
    };

    //GRADIENTS ANIMATION
    //Append a defs (for definition) element that must be added to hold special elements e.g. gradients and filters
    var defs = wrapper.append("defs");

    //Create a gradient definition for each chord
    var grads = defs.selectAll("linearGradient")
        .data(chord.chords())
        .enter().append("linearGradient")
        //Create a unique gradient id per chord: e.g. "chordGradient-0-4"
        .attr("id", function (d) { return "chordGradient-" + +d.source.index + "-" + +d.target.index; })
        //Instead of the object bounding box, use the entire SVG for setting locations in pixel locations instead of percentages (which is more typical)
        .attr("gradientUnits", "userSpaceOnUse")
        //The full mathematical formula to find the x and y locations of the Avenger's source chord
        .attr("x1", function (d) {
            var D = (d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - π / 2;
            return +innerRadius * Math.cos(D);
        })
        .attr("y1", function (d) {
            var D = (d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - π / 2;
            return +innerRadius * Math.sin(D);
        })
        //Find the location of the target Avenger's chord 
        .attr("x2", function (d) {
            var D = (d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - π / 2;
            return +innerRadius * Math.cos(D);
        })
        .attr("y2", function (d) {
            var D = (d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - π / 2;
            return +innerRadius * Math.sin(D);
        });

    //Set the starting color (at 0%)
    grads.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", function (d) { return colors[d.source.index]; });

    //Set the ending color (at 100%)
    grads.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", function (d) { return colors[d.target.index]; });

    /* Animated Gradient */

    grads.append("animate")
        .attr("attributeName", "x1")
        //.attr("values", "0%;100%")
        .attr("from", "0%")
        .attr("to", "100%")
        .attr("dur", "7s")
        .attr("repeatCount", "indefinite");

    grads.append("animate")
        .attr("attributeName", "x2")
        //.attr("values", "100%;200%")
        .attr("from", "100%")
        .attr("to", "200%")
        .attr("dur", "7s")
        .attr("repeatCount", "indefinite");

    /* replace d3.svg.chord() with custom chord function in chords.stretchedChord.js*/
    var path = stretchedChord()
        .radius(innerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .pullOutSize(pullOutSize);

    /* Grouping of the Outer Arcs */
    var g = wrapper.selectAll("g.group")
        .data(chord.groups).enter()
        .append("wrapper:g")
        .attr("id", function (d, i) { return "group-" + i; })
        .attr("class", function (d, i) {
            var z = nameArea[i].replace(/\s/gi, "-");
            return "group group-" + z;
        })
        .on("mouseover", fade(opacityLow))
        .on("mouseout", fade(opacityDefault));

    /*var outerArcs =*/
    g.append("path")
        .attr("class", "arc")
        .style("stroke", function (d) {
            return nameArea[d.index] === null ? "none" : fill(d.index);
        })
        .style("fill", function (d) {
            return nameArea[d.index] === null ? "none" : fill(d.index);
        })
        .style("pointer-events", function (d, i) {
            return nameArea[i] === "" ? "none" : "auto";
        })
        .attr("d", arc)
        .attr("transform", function (d, i) {
            //Add the transform step to pull the arcs away from the center
            //The pullOutSize should be added to the arcs on the right and subtracted from the arcs on the left
            //Therefore check if starting angle is larger than half of a circle to figure out when to flip between these two options
            //Save the pullOutSize in the data so it can be use again for the text in a following step
            d.pullOutSize = pullOutSize * (d.startAngle + 0.001 > π ? -1 : 1); //The 0.01 is for rounding errors
            return "translate(" + d.pullOutSize + ",0)";
        })
        .style("opacity", 0.2)
        .transition().duration(5000).ease("linear")
        .style("opacity", 0.8);

    wrapper.append("g").selectAll("path.chord")
        .data(chord.chords)
        .enter().append("path")
        .attr("class", "chord")
        //Change the fill to reference the unique gradient ID of the source-target combination
        .style("fill", function (d) { return "url(#chordGradient-" + d.source.index + "-" + d.target.index + ")"; })
        .style("opacity", 0.8)
        .attr("d", path);

    /* APPEND NAMES */
    //The text needs to be displaced horizontally and rotated with the offset in the clockwise direction
    //Slightly altered function where the offset is added to the angle

    /*var outerArcText =*/
    g.append("text")
        .each(function (d, i) {
            d = convert(d.value);
            d.angle = +(d.startAngle + d.endAngle) / 2 + +offset;
        })
        .attr("dy", ".35em")
        .attr("class", "titles")
        .attr("text-anchor", function (d) {
            return +d.angle > π ? "end" : null;
        })
        .attr("transform", function (d) {
            var c = arc.centroid(+d);
            return "translate(" + (+c[0] + +d.pullOutSize) + "," + +c[1] + ") " +
                "rotate(" + (d.angle * 180 / π - 90) + ") " +
                "translate(" + (innerRadius + 55) + ",0) " +
                (+d.angle > π ? "rotate(180)" : "");
        })
        .text(function (d, i) {
            return nameArea[i];
        })
        .call(wrapChord, 100);

    /*DRAW INNER CHORDS*/
    var chords = wrapper.selectAll("path.chord")
        .data(chord.chords).enter()
        .append("path")
        .attr("class", "chord")
        .style("stroke", function (d) {
            return d3.rgb(fill(d.source.index)).darker();
        })
        .style("fill", "url(#animatedGradient)")
        .style("opacity", function (d) {
            return nameArea[d.source.index] === "" ? 0 : opacityDefault;
        }) //Make the dummy strokes have a zero opacity (invisible)
        .style("pointer-events", function (d, i) {
            return nameArea[d.source.index] === "" ? "none" : "auto";
        }) //Remove pointer events from dummy strokes
        .attr("d", path)
        .on("mouseover", fadeOnChord)
        .on("mouseout", fade(opacityDefault));


    // === TOOLTIP
    //var xPos = wWidth - parseFloat(d3.select(this).attr("x")),
    //    yPos = parseFloat(d3.select(this).attr("y")) - 14;
    //Arcs
    /*var ttipArcs =*/
    g.append("text")
        .attr("class", "tooltip tooltip-arcs")
        //.attr("x", xPos)
        //.attr("y", yPos)
        .text(function (d, i) {
            return Math.round(d.value) + " " + nameArea[i] + " people";
        })
        .on("mouseout", function () {
            d3.select(".tooltip-arcs")
                .transition()
                .delay(300)
                .remove();
        });

    //Chords
    /*   ttipChords =*/
    chords.append("text")
        .attr("class", "tooltip tooltip-chords")
        //.attr("x", xPos)
        //.attr("y", yPos)
        .text(function (d) {
            return Math.round(d.source.value) + " people from " + nameArea[d.target.index] + " moved to " + nameArea[d.source.index];
        })
        .on("mouseout", function () {
            d3.select("#tooltip-chords")
                .transition()
                .delay(300)
                .remove();
        });


    //TITLES
    var titleOffset = mobileScreen ? 15 : 40,
        titleSeparate = mobileScreen ? 30 : 0;
    /* Titles On Top */
    var titleWrapper = svg.append("g")
        .attr("class", "chordTitleWrapper"),
        /*Title	top left*/
        titleTopLeft = titleWrapper.append("text")
        .attr("class", "title left")
        .style("font-size", mobileScreen ? "12px" : "16px")
        .attr("x", wWidth / 2 + margin.left - outerRadius - titleSeparate)
        .attr("y", titleOffset)
        .text("2011"),

        titleLineTopLeft = titleWrapper.append("line")
        .attr("class", "titleLine left")
        .attr("x1", (wWidth / 2 + margin.left - outerRadius - titleSeparate) * 0.6)
        .attr("x2", (wWidth / 2 + margin.left - outerRadius - titleSeparate) * 1.4)
        .attr("y1", titleOffset + 8)
        .attr("y2", titleOffset + 8)
        .attr("stroke", "silver")
        .attr("stroke-width", titleTopLeft.size * 0.02);

    /*Title top right*/
    var titleTopRight = titleWrapper.append("text")
        .attr("class", "title right")
        .style("font-size", mobileScreen ? "12px" : "16px")
        .attr("x", wWidth / 2 + margin.left + outerRadius + titleSeparate)
        .attr("y", titleOffset)
        .text("2016"),

        titleLineTopRight = titleWrapper.append("line")
        .attr("class", "titleLine right")
        .attr("x1", (wWidth / 2 + margin.left - outerRadius - titleSeparate) * 0.6 + 2 * (outerRadius + titleSeparate))
        .attr("x2", (wWidth / 2 + margin.left - outerRadius - titleSeparate) * 1.4 + 2 * (outerRadius + titleSeparate))
        .attr("y1", titleOffset + 8)
        .attr("y2", titleOffset + 8)
        .attr("stroke", "silver")
        .attr("stroke-width", titleTopRight.size * 0.02);

    //Wraps SVG text
    function wrapChord(text, wWidth) {
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = "1.1ems",
                y = 0,
                x = 0,
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");
            while (word === words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > wWidth) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }



    /* Returns an event handler for fading a given chord group*/
    function fade(op) {
        return function (d, i) {
            svg.selectAll("path.chord").filter(function (d, i) {
                    return d.source.index !== i && d.target.index !== i && nameArea[d.source.index] !== "";
                })
                .transition("fadeOnChord")
                .style("opacity", op);
        };
    }

    // Fade function when hovering over chord
    function fadeOnChord(d) {
        var chosen = d;
        wrapper.selectAll("path.chord")
            .transition()
            .ease("elastic")
            .style("opacity", function (d) {
                return d.source.index === chosen.source.index && d.target.index === chosen.target.index ? opacityDefault : opacityLow;
            });
    }



    /* PROGRESS BAR*/
    /* Initiate variables for progress bar*/
    var progressColor = ["#b3d9ff", "#144683"],
        progressClass = ["prgsBehind", "prgsFront"],
        prgsWidth = 0.4 * 650,
        prgsHeight = 3;

    var progressBar = d3.selectAll("#progress").append("svg")
        .attr("width", prgsWidth)
        .attr("height", 3 * prgsHeight);

    /*Create two bars of which one has a width of zero*/
    progressBar.selectAll("rect")
        .data([prgsWidth, 0]).enter()
        .append("rect")
        .attr("class", function (d, i) {
            return progressClass[i];
        })
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", function (d) {
            return d;
        })
        .attr("height", prgsHeight)
        .attr("fill", function (d, i) {
            return progressColor[i];
        });



}(window, document, window.jQuery));