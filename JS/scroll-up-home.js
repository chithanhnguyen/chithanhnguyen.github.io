const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
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
    })
});

