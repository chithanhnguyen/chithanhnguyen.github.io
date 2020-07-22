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
    if (currentScrollPos < 470) {
        $(".navigation").css({
            "top": "0",
            "padding": "2rem 0",
            "background-color": "",
            "backdrop-filter": "none"
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
            });
        } else {
            $(".navigation").css({
                "top": "0",
                "padding": "0.5rem 0",
                "background-color": "var(--nav)",
                "backdrop-filter": "blur(30px) saturate(125%)"
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

    $(".logo").hover(function(e) {
        $(this).css({
            "transform": "scale(0.8)",
            "-webkit-box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)",
            "-moz-box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)",
            "box-shadow": "10px 10px 25px -12px rgba(0, 0, 0, .5)"
        });
    }, function() {
        $(this).css({
            "transform": "scale(0.75)",
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

// Toggle responsive menu

var menuExpanded = false;

function toggleMenu(){
    if (menuExpanded == true) {
        $(".menu").css("margin-left", "");
        $(".menu > i").attr("class","fas fa-bars");
        $(".menu > a").css({
            "display": "none",
            "opacity": "0"
        });
        $(".logo").css("display", "");
        menuExpanded = false;
    } else {
        $(".menu").css("margin-left", "auto");
        $(".menu > i").attr("class","fas fa-times");
        $(".menu > a").addClass('inline').outerWidth();
        $(".menu > a").css({
            "display": "inline",
            "opacity": "1"
        });
        $(".logo").css("display", "none");
        menuExpanded = true;
    }
}

$(document).ready(function() {
    $(".menu > i").click(function(e) {
        toggleMenu();
    });
});

// Zooming expandables
$(document).ready(function() {
    $(".expandable").hover(function(e) {
        if ($(this).css("overflow-x") != "scroll") {
            $(this).find("img").css({
                "transform": "scale(1.05)"
            });
        }
    }, function() {
        $(this).find("img").css({
            "transform": "scale(1)"
        });
    });

    $(".expandable").click(function(e) {
        if ($(this).css("overflow-x") == "scroll") {
            console.log("Expanded. Collapsing");
            $(this).css({
                "overflow-x": "visible", 
                "white-space": "nowrap",
                "cursor": "zoom-in"
            });
            $(this).find("img").css({
                "min-height": " ",
                "max-height": " ",
                "width": "100%"
            });
        } else {
            console.log("Collapsed. Expanding");
            $(this).css({
                "overflow-x": "scroll", 
                "white-space": "nowrap",
                "cursor": "zoom-out"
            });
            $(this).find("img").css({
                "transform": "scale(1)",
                "max-height": "40vh",
                "width": "auto",
                "left": ""
            });
        }
    });
});