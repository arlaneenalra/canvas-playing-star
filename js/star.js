/**
 * A little playing with canvas.  This is extremely inefficient but kind of cool
 * to look at.  Expect it to eat CPU like nothing.
 *
 * Chris Salch
 */

$(function ready () {
    // return a function that converts between two ranges.
    var makeScale = function makeScale (range1, range2) {
        var factor = range1 / range2;
        return function scaleValue (x) {
            var converted = Math.abs(Math.floor(x * factor));
            return converted > range1 ? 0 : range1 - converted;
        };
    };


    // Wraps a canvas context object and allows the setting of an 
    // arbitrary pixel by x and y coordinates.
    var makePixelSetter = function makePixelSetter(image) {
        return function pixelSetter (x, y, color) {
            var index = (y * image.width + x) * 4;
            var data = image.data;

            data[index] = color.r;
            data[index+1] = color.g;
            data[index+2] = color.b;
            data[index+3] = color.a;
        };
    };

    var canvas = $('canvas');
    var win = $(window);
    var convX = function () {};
    var convY = function () {};

    var mouseX = 0;
    var mouseY = 0;

    var redraw = function redraw (mouseX, mouseY) {
        var ctx = canvas[0].getContext('2d');
        var canX = canvas.width();
        var canY = canvas.height();

        var image = ctx.createImageData(canX, canY);
        var pixel = makePixelSetter(image);
        
        for (x = 0; x < canX; x++) {
            for (y = 0; y < canY; y++) {
                var colorX = convX(x - mouseX);
                var colorY = convY(y - mouseY);

                pixel(x, y, {
                    r: colorX,
                    g: colorY,
                    b: 0,
                    a: Math.floor((colorX + colorY) / 2)
                });
            }
        }
        
        ctx.putImageData(image, 0,0);
    };

    // register a resize tracker on the window;
    win.resize(function resizeHandler () {
        
        canvas.attr('width', win.width());
        canvas.attr('height', win.height());
       
        // setup a sliding scale based on the distance for each axis.
        convY = makeScale (255, canvas.height() / 2);
        convX = makeScale (255, canvas.width() / 2);

        // redraw the screen
        redraw(mouseX, mouseY);
    });

    win.trigger('resize');

    win.mousemove(function mouseMoveHandler (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;

        redraw(mouseX, mouseY);
    });
});
