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
    var delta = 150 - Math.random() * 100;

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
        $(".logo").removeClass("overlay");
        $(".logo").css("top", "0");
        $(".logo").css("left", "-1rem");
        $(".logo").css("transform", "scale(1)");
    } else {
        $(".logo").addClass("overlay");
        $(".logo").css("top", "1.5rem");
        $(".logo").css("left", "1.5rem");
        $(".logo").css("transform", "scale(0.75)");
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
        $(this).css("transform", "scale(1.05)");
        $(this).css("background-color", "rgba(255, 255, 255, .25)");
        }, function(){
        $(this).css("transform", "scale(1)");
        $(this).css("background-color", "rgba(255, 255, 255, .1)");
    });

    $(".scroll").click(function(e) {
        scrollToTop();
    });
    
    $(".logo").hover(function(e) {
            if (window.pageYOffset < 50) {
                $(this).css("transform", "scale(1.1)");
            } else {
                $(this).css("transform", "scale(0.85)");
            }
        }, function(){
            if (window.pageYOffset < 50) {
                $(this).css("transform", "scale(1)");
            } else {
                $(this).css("transform", "scale(0.75)");
            }
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
