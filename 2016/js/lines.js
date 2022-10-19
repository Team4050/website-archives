﻿/*
 This file contains the code for the animation behind the header
 */

function makeLines() {
    var lines = [];
    var $canvas;
    var ctx;

    // generate lines to be drawn behind the header
    var buildAnimation = function () {
        lines = [];
        linesAmount = window.innerWidth / 15;
        $canvas = $("#animation");
        ctx = $canvas.get(0).getContext("2d");
        var w = $canvas.parent().width();
        var h = $canvas.parent().height();
        $canvas.attr('width', w);
        $canvas.attr('height', h);
        for (var x = 0; x < linesAmount; x++) {
            var tx = (Math.random() * (w + 100)) - 50;
            var bx = tx + (Math.random() * 500) - 250;
            var line = {
                tx: tx,
                bx: bx,
                ty: -20,
                by: h - 200 + (Math.random() * 200),
                opacity: 0.2,
                direction: Math.random() > 0.5 ? 1 : -1
            };
            lines.push(line);
        }
    };

    // Update the animation every animation frame
    var updateLines = function () {
        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
        for (var x = 0; x < lines.length; x++) {
            line = lines[x];
            ctx.beginPath();
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = "#e0e0e0";
            ctx.moveTo(line.tx, line.ty);
            ctx.lineTo(line.bx, line.by);
            ctx.stroke();
            ctx.closePath();
            line.opacity += (Math.random() * 0.1) - 0.05;
            if (line.opacity < 0) {
                line.opacity = 0;
            }
            else if (line.opacity > 1) {
                line.opacity = 1;
            }
            line.bx += (Math.random() * 0.2) * line.direction;
            if (line.bx < line.tx - 250) {
                line.bx = line.tx - 250;
                line.direction = 1;
            }
            else if (line.bx > line.tx + 250) {
                line.bx = line.tx + 250;
                line.direction = -1;
            }
        }
        requestAnimationFrame(updateLines);
    };

    // make request animation frame for browsers that require a vendor prefix
    (function () {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());

    // handle window resizes
    $(window).on('resize', function () {
        setTimeout(buildAnimation, 1);
    });

    // start the animation
    buildAnimation();
    updateLines();
}

