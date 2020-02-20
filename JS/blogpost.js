$(document).ready(function() {
    //Title Banner: Theming
    'use strict';

    var caption = $('.caption');

    $(window).scroll(function() {
        var a = $(window).scrollTop();

        if (a > $('#banner').height()) {
            caption.css({
                "box-shadow": "0 0 5em rgba(0, 0, 0, 0.2)",
                "position": "sticky"
            });
        } else {
            caption.css({
                "box-shadow": "0 0 0em rgba(0, 0, 0, 0)",
                "position": "sticky"
            });
        }
    });
    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };

    //Scroll Up Button - Theming
    $("#up").hide();
    var homePosition = $("#banner").offset().top;
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
    })

});

$(window).on('load', function() {
    // Flex Slider
    $('.flexslider').flexslider();

    //Apex Chart
    var optionsadbanner = {
        chart: {
            height: 360,
            type: "radialBar",
        },
        series: [85, 90, 100, 100],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    showOn: "always",
                    total: {
                        show: true,
                        label: 'Commitment'
                    },
                    name: {
                        offsetY: -5,
                        show: true,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "1rem"
                    },
                    value: {
                        offsetY: 3,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "1.5rem",
                        show: true
                    }
                }
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: ['Analysis', 'Prototyping', 'Execution', 'Finalization']
    }
    var optionsgtr = {
        chart: {
            height: 360,
            type: "radialBar",
        },
        series: [65, 50, 85, 75],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    showOn: "always",
                    total: {
                        show: true,
                        label: 'Commitment'
                    },
                    name: {
                        offsetY: -5,
                        show: true,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "1rem"
                    },
                    value: {
                        offsetY: 3,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "1.5rem",
                        show: true
                    }
                }
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: ['Analysis', 'Planning', 'Execution', 'Finalization']
    }
    var optionsgreencheck = {
        chart: {
            height: 360,
            type: "radialBar",
        },
        series: [50, 75, 50, 100, 65],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    showOn: "always",
                    total: {
                        show: true,
                        label: 'Commitment'
                    },
                    name: {
                        offsetY: -5,
                        show: true,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "1rem"
                    },
                    value: {
                        offsetY: 3,
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: "1.5rem",
                        show: true
                    }
                }
            }
        },
        stroke: {
            lineCap: "round",
        },
        labels: ['Analysis', 'Wireframe', 'Prototype', 'UI Design', 'Evaluation']
    }

    if (document.querySelector(".chart").id == "chart-gtr") {
        new ApexCharts(document.querySelector(".chart"), optionsgtr).render();
    } else if (document.querySelector(".chart").id == "chart-adbanner") {
        new ApexCharts(document.querySelector(".chart"), optionsadbanner).render();
    } else if (document.querySelector(".chart").id == "chart-greencheck") {
        new ApexCharts(document.querySelector(".chart"), optionsgreencheck).render();
    }
});