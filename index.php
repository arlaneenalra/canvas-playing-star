<!DOCTYPE html>
<html>
    <head>
        <script src="//code.jquery.com/jquery-1.9.1.min.js"></script>
        <style type="text/css">
            body { color: black; }
            .pixel {
                width: 1em; height: 1em;/* margin: 0.25em;*/
                float: left; background-color: pink;
            }
        </style>
        <script type="text/javascript">
            $(function () {
                // return a function that converts between two ranges.
                var makeScale = function makeScale (range1, range2) {
                    var factor = range1 / range2;
                    return function (x) {
                        var converted = Math.abs(Math.floor(x * factor));
                        
                        return converted > range1 ? range1 : converted;
                    };
                };
             
                // setup a sliding scale based on the distance for each axis.
                var convY = makeScale (255, $(window).height());
                var convX = makeScale (255, $(window).width());

                $('.pixel').each(function (index, obj) {
                    var pixel = $(obj);
                    var pos = pixel.position();

                    $(document).mousemove(function (event) {
                        var distX = pos.left - event.pageX;
                        var distY = pos.top - event.pageY;
                        var color = 'rgb(0,' + convX(distX) + ',' + convY(distY) + ')';

                        console.log('(' + pos.left + ', ' + pos.top + ') = ' + color);
                        pixel.css('background-color', color);
                    });
                });
            });
        </script>
        <title>Field Strength</title>
    </head>
<body>
</body>
<?php for($i = 0; $i < 5000; $i++): ?>
<div class="pixel"></div>
<?php endfor; ?>
</html>
