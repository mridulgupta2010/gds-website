$(document).ready(function() {
    $(".burger").click(function() {
        $(".line2").toggleClass("burger-clicked-line2");
        $(".line1").toggleClass("burger-clicked-line1");
        $(".line3").toggleClass("burger-clicked-line3");
        $('#side-menu').toggleClass('active');
        $('.ul-side-menu').toggleClass('active');
    });
});