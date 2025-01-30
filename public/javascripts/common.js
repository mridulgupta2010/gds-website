// document.addEventListener('DOMContentLoaded', (event) => {
//     let loadingText = document.getElementById('loadingText');
//     let percentLoaded = 0;

//     // Simulate loading progress
//     let loadingInterval = setInterval(() => {
//         percentLoaded++;
//         loadingText.innerText = `Loading... ${percentLoaded}%`;

//         if (percentLoaded >= 100) {
//             clearInterval(loadingInterval);
//             document.getElementById('loadingIndicator').style.display = 'none';
//         }
//     }, 15); // Update the percentage every 100ms
// });

$("#nav-reseller-btn").mouseover(function() {
    $("#reseller-btn-spot").addClass("reseller-btn-spot");
    $("#nav-reseller-btn").addClass("reseller-btn-active");
    $("#nav-reseller-btn").mouseleave(function() {
        $("#reseller-btn-spot").removeClass("reseller-btn-spot");
        $("#nav-reseller-btn").removeClass("reseller-btn-active");
    })
})

var swingActive    = [$(".sliding-ul"),$(".barrier-ul")];
var slidingActive  = [$(".swing-ul"),$(".barrier-ul")];
var barrierActive  = [$(".swing-ul"),$(".sliding-ul")];

var tArticleActive = [$(".gallery-ul"),$(".i-manual-ul"),$(".brochure-ul")];
var galleryActive  = [$(".i-manual-ul"),$(".brochure-ul"),$(".t-article-ul")];
var iManualActive  = [$(".gallery-ul"),$(".brochure-ul"),$(".t-article-ul")];
var brochureActive = [$(".i-manual-ul"),$(".gallery-ul"),$(".t-article-ul")];

$(".dropdown-div div").mouseover(function(){

    $("#sliding").mouseover(function() {
        console.log();
        // Change the display styles
        $("#sliding-ul").css("display", "flex");
        slidingActive.forEach(function($el) {
            $el.css("display","none");
          });

        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");
        })
    });
    
    $("#swing").on("mouseover", ()=> {
        console.log("Swing");
        $("#swing-ul").css("display","flex");
        swingActive.forEach(function($el) {
            $el.css("display","none");
          });

        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })
    
    $("#barrier").on("mouseover", ()=> {
        console.log("Barrier");
        $("#barrier-ul").css("display","flex");
        barrierActive.forEach(function($el) {
            $el.css("display","none");
          });
        
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })

    $("#t-article").on("mouseover", ()=> {
        console.log("Barrier");
        $(".t-article-ul").css("display","flex");
        tArticleActive.forEach(function($el) {
            $el.css("display","none");
          });
        
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })

    $("#gallery").on("mouseover", ()=> {
        console.log("Barrier");
        $(".gallery-ul").css("display","flex");
        galleryActive.forEach(function($el) {
            $el.css("display","none");
          });
        
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })

    $("#brochure").on("mouseover", ()=> {
        console.log("Barrier");
        $(".brochure-ul").css("display","flex");
        brochureActive.forEach(function($el) {
            $el.css("display","none");
          });
        
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })

    $("#i-manual").on("mouseover", ()=> {
        console.log("Barrier");
        $(".i-manual-ul").css("display","flex");
        iManualActive.forEach(function($el) {
            $el.css("display","none");
          });
        
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })

    var stdActive = [$(".bdrive-ul"),$(".cdrive-ul"),$(".lvl-ul")];
    var lvlActive = [$(".bdrive-ul"),$(".cdrive-ul"),$(".std-ul")];
    var bDriveActive = [$(".lvl-ul"),$(".cdrive-ul"),$(".std-ul")];
    var cDriveActive = [$(".bdrive-ul"),$(".lvl-ul"),$(".std-ul")];

    $("#sliding-std").on("mouseover", ()=> {
        
        $("#sliding-std-ul").css("display","flex");
        stdActive.forEach(function($el) {
            $el.css("display","none");
          });

        $("#sliding-std-ul").mouseleave(function(){
            $("#sliding-lowv-ul").css("display","none");
        })
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })
    
    $("#lvl").on("mouseover", ()=> {
        
        $("#sliding-lowv-ul").css("display","flex");
        lvlActive.forEach(function($el) {
            $el.css("display","none");
          });

        $("#sliding-lowv-ul").mouseleave(function(){
            $("#sliding-lowv-ul").css("display","none");
        })
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })

    $("#b-drive").on("mouseover", ()=> {
    
        $("#sliding-bdrive-ul").css("display","flex");
        bDriveActive.forEach(function($el) {
            $el.css("display","none");
          });

        $("#sliding-bdrive-ul").mouseleave(function(){
            $("#sliding-bdrive-ul").css("display","none");
        })
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })

    $("#c-drive").on("mouseover", ()=> {

        $("#sliding-cdrive-ul").css("display","flex");
        cDriveActive.forEach(function($el) {
            $el.css("display","none");
          });

        $("#sliding-cdrive-ul").mouseleave(function(){
            $("#sliding-cdrive-ul").css("display","none");
        })
    
        $(".dropdown-div div").mouseleave(function(){
            $(".dropdown-div ul:not(:first-child)").css("display", "none");

        })
    })
    
})
