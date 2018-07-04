(function ($) {


    $('.slider').slick({
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows:false,
        dots:false,
        fade:true,
    });


})(jQuery); // Fully reference jQuery after this point.

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
