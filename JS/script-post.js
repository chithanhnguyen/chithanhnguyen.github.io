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
    if (currentScrollPos < 145) {
        $(".navigation").css({
            "top": "0",
            "padding-top": "3rem",
            "background-color": ""
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
                "top": "-10rem",
                "padding-top": "0.75rem",
                "background-color": "var(--grey)"
            });
        } else {
            $(".navigation").css({
                "top": "0",
                "padding-top": "0.75rem",
                "background-color": "var(--grey)"
            });
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