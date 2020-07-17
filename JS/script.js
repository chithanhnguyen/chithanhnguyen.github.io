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

    this.el.innerHTML = this.txt + '_';

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

// Check scroll position
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos < 50) {
        $(".logo").css("top", "11vh");
        $(".logo").css("left", "5vw");
        $(".logo").css("transform", "scale(1)");
    } else {
        $(".logo").css("top", "1vh");
        $(".logo").css("left", "1vw");
        $(".logo").css("transform", "scale(0.5)");
    }

    if (currentScrollPos == 0) {
        $(".scroll").css("transform", "scale(0)");
        $(".scroll").css("opacity", "0");
    }
    else {
        $(".scroll").css("transform", "scale(1)");
        $(".scroll").css("opacity", "1");
    }
    prevScrollpos = currentScrollPos;
}

$(document).ready(function() {
    $(".scroll").css("transform", "scale(0)");
    $(".scroll").hover(function(e) {
        $(this).css("transform", "scale(1.1)");
        }, function(){
        $(this).css("transform", "scale(1)");
    });

    $(".scroll").click(function(e) {
        scrollToTop();
    });
});

// Dark light mode switch

var colorScheme;

const savedColorScheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (savedColorScheme) {
    document.documentElement.setAttribute('data-theme', savedColorScheme);
    colorScheme = savedColorScheme;
} else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        colorScheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        colorScheme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        colorScheme = e.matches ? "dark" : "light";
    });
}

function switchTheme() {
    if (colorScheme == 'light') {
        colorScheme = "dark";
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); 
    }
    else {
        colorScheme = "light";
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

$(document).ready(function() {
    $(".switch").click(function(e) {
        switchTheme();
    });
});
