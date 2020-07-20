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

    if (!this.isDeleting && this.txt === (fullTxt)) {
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
    if (currentScrollPos < 75) {
        $(".logo").css({
            "transform": "scale(1)",
            "top": "5rem",
            "left": "-1rem"
        });
        $(".logo").removeAttr("href");
        $(".logo").html("<p class='extrabold'>Xin Chào &#x270C</p>");
        $(".navigation").css({
            "top": "0",
            "padding": "2rem 0"
        });
        $(".scroll").css({
            "transform": "scale(0)",
            "opacity": "0"
        });
    } else {
        $(".scroll").css({
            "transform": "scale(1)",
            "opacity": "1"
        });
        if (currentScrollPos > prevScrollpos) {
            $(".navigation").css({
                "top": "-10rem"
            });
            $(".logo").css({
                "top": "0rem",
                "transform": "scale(0.75)",
            });
        } else {
            $(".navigation").css({
                "top": "0",
                "padding": "0.5rem 0"
            });
            $(".logo").css({
                "top": "1rem",
                "transform": "scale(0.75)"
            });
            $(".logo").attr("href", "https://chithanhnguyen.github.io/");
            $(".logo").html("<p class='extrabold'>Home &#x1f448</p>");
        }

    }
    prevScrollpos = currentScrollPos;
}

$(document).ready(function() {
    $(".scroll").hover(function(e) {
        $(this).css({
            "transform": "scale(1.1)",
            "background-color": "var(--hyperlink)",
            "-webkit-box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)",
            "-moz-box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)",
            "box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)"
        });
    }, function() {
        $(this).css({
            "transform": "scale(1)",
            "background-color": "var(--bg-color-2)",
            "-webkit-box-shadow": "",
            "-moz-box-shadow": "",
            "box-shadow": ""
        });
    });

    $(".scroll").click(function(e) {
        scrollToTop();
    });

    $(".logo").hover(function(e) {
        if (window.pageYOffset > 75) {
            $(this).css({
                "transform": "scale(0.90)",
                "-webkit-box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)",
                "-moz-box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)",
                "box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)"
            });
        }
    }, function() {
        if (window.pageYOffset > 75) {
            $(this).css({
                "transform": "scale(0.75)",
                "-webkit-box-shadow": "",
                "-moz-box-shadow": "",
                "box-shadow": ""
            });
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
        $(".switch").html("Light On");
    } else {
        colorScheme = "light";
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        $(".switch").html("Light Off");
    }
}

$(document).ready(function() {
    if (colorScheme == "dark") {
        $(".switch").html("Light On");
    } else {
        $(".switch").html("Light Off");
    }

    $(".switch").click(function(e) {
        switchTheme();
    });
});