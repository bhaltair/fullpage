document.body.addEventListener(
  "touchmove",
  function(event) {
    event = event ? event : window.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  {
      passive: false
  }
);

var pages = function(obj) {
  var box = document.getElementById(obj.wrap),
    box2 = document.getElementById(obj.wrap2),
    len = obj.len,
    n = obj.n,
    startY,
    moveY,
    cliH,
    getH = function() {
      cliH = document.body.clientHeight;
    };
  getH();
  window.addEventListener("resize", getH, false);
  var touchstart = function(event) {
    if (!event.touches.length) {
      return;
    }
    startY = event.touches[0].pageY;
    moveY = 0;
  };
  var touchmove = function(event) {
    if (!event.touches.length) {
      return;
    }
    moveY = event.touches[0].pageY - startY;
    box2.style.transform = "translateY(" + (-n * cliH + moveY) + "px";
  };
  var touchend = function(event) {
    if (moveY < -50) n++;
    if (moveY > 50) n--;
    if (n < 0) n = 0;
    if (n > len - 1) n = len - 1;
    box2.style.transform = "translateY(" + -n * 10 + "%)";
  };
  box.addEventListener(
    "touchstart",
    function(event) {
      touchstart(event);
    },
    { passive: true }
  );
  box.addEventListener(
    "touchmove",
    function(event) {
      touchmove(event);
    },
    { passive: true }
  );
  box.addEventListener(
    "touchend",
    function(event) {
      touchend(event);
    },
    { passive: true }
  );
};
