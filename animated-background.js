// Include this JavaScript code in animated-background.js

(function () {
    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
    var winAmount = 100; // Assuming this is your magic number

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: 0, y: height };

        largeHeader = document.querySelector('.large-header');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);

            // Calculate the proximity of the total scores to the magic number
            var proximityFactor0 = Math.abs(totalPlayer0 - winAmount) / winAmount;
            var proximityFactor1 = Math.abs(totalPlayer1 - winAmount) / winAmount;

            // Calculate the number of circles based on the proximity
            var maxCircles = 6; // Adjust this value to control the maximum number of circles
            var numCircles0 = Math.floor(maxCircles * (1 - proximityFactor0));
            var numCircles1 = Math.floor(maxCircles * (1 - proximityFactor1));

            // Add new circles to the array based on the proximity
            for (var x = 0; x < numCircles0; x++) {
                var c = new Circle();
                circles.push(c);
            }

            for (var y = 0; y < numCircles1; y++) {
                var c = new Circle();
                circles.push(c);
            }

            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function () {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.5;
            _this.scale = 0.1 + Math.random() * 0.6;
            _this.velocity = 1 + Math.random() * 2; // Adjusted velocity for slower movement
        }

        _this.draw = function () {
            if (_this.alpha <= 0 || _this.pos.y < 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.00005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);

            // Use orange for the fill style
            ctx.fillStyle = 'rgba(237, 223, 204,' + _this.alpha + ')';

            ctx.fill();
        };
    }

})();


