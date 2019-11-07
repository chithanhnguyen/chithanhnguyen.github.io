// Scrolling instead of jumping to an anchor
function scrollToAnchor(id){
	var taggedObject = $(id);
    $('html,body').animate({scrollTop: taggedObject.offset().top},'slow');
}

// Scrolling instead of jumping to an anchor
function scrollToTop(){
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

// Navigation Bar & Scroll Button Styling
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
    	$('.nav-menu').css("top", "0");
    	if (currentScrollPos != 0){
    		$('.up').removeAttr('hidden');
    		$('.scroll').css("background-color", "rgba(255, 255, 255, 0.65)");
            $('.scroll').css("backdrop-filter", "blur(2em)");
    		$('.scroll').css("cursor", "pointer");
    		$('.scroll').css("animation", "0");
    		$('.scroll').css("-moz-animation", "0");
    		$('.scroll').css("-webkit-animation", "0");
            $('.up').css("color", "#F7797D");
    		$('.down').attr('hidden', 'true');
    	}
    } else {
    	$('.up').attr('hidden','true');
    	$('.down').attr('hidden','true');
        $('.down').css("color", "#888");
    }

    if (currentScrollPos == 0){
    	$('.scroll').css("background-color", "rgba(255, 255, 255, 1)");
    	$('.scroll').css("cursor", "");
		$('.scroll').css("animation", "bounce 2s infinite 2s");
		$('.scroll').css("-moz-animation", "bounce 2s infinite 2s");
		$('.scroll').css("-webkit-animation", "bounce 2s infinite 2s");
        $('.up').css("color", "#888");
    	$('.up').attr('hidden','true');
    	$('.down').removeAttr('hidden');
    }
    prevScrollpos = currentScrollPos;
}

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

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

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


