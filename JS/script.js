// Typewriter
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap extrabold">' + this.txt + '</span>_';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === (fullTxt )) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewriter');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};

// scroll to home
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

const scrollDown = () => {
    $('html, body').animate({
        scrollTop: $("#main").offset().top
    }, 800);
};

$(document).ready(function() {
    $("#up").hide();
    var homePosition = $("#home").offset().top;
    $(window).scroll(function() {
        if ($(window).scrollTop() > homePosition) {
            $("#up").show();
            $("#down").hide();
        }
        if ($(window).scrollTop() == homePosition) {
            $("#up").hide();
            $("#down").show();
        }
    });

    $("#up").click(function(e) {
        scrollToTop();
    });

    $("#down").click(function(e) {
        scrollDown();
    });
});