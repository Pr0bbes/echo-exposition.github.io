console.clear();
//alert(document.title);
//document.html.classList.add("NoOverfloat");
// $("#index").addClass("NoOverfloat");


//change color when il roll ------------

/*
function changeBgc() {
  if (this.scrollY >= window.screen.height/2) {
    if (this.scrollY >= window.screen.height*1.5) {
      document.body.classList.add("col_yellow");
      document.body.classList.remove("col_red");
      //alert("Hii");
    } else {
      document.body.classList.add("col_red");
      document.body.classList.remove("col_yellow");
      }
  } else {
      document.body.classList.add("col_linear");
      document.body.classList.remove("col_red");     
  }
}

window.addEventListener('scroll', changeBgc);
*/

// Canvas_info ------------

//var canvas_info = document.getElementById("info_canvas");
//var ctx = canvas_info.getContext("2d");
//ctx.fillStyle = "#000000";
//ctx.fillRect(0, 0, 280, 68);
//ctx.fillRect(0, 82, 220, 82);


var canvas_info = document.getElementById("menu_act");
var ctx = canvas_info.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 400, 20);
ctx.fillRect(0,50, 400, 20);
ctx.fillRect(0, 100, 400, 20);

$("body").on("click", function(){
  var ele = $(".menu").css("display");
  if ( ele == "block" ) {
    $(".menu").css("display", "none"); 
  }
});

$("#menu_act").click(function(e) {
  var ele = $(".menu").css("display");
  //alert( "Handler for .click() called." );
  if ( ele == "none" ) {
    $(".menu").css("display", "block");
  } else {
    $(".menu").hide(); 
  }
  e.stopPropagation();
});

// Max value of the block Reservation
var res = $(".reservation").outerHeight(); 
//alert(res);
if (res >= 430) {
  $(".reservation").css("width", "349px");
  $(".reservation").css("margin", "59px 118px 83px 118px");
  $(".reservation").css("padding-top", "35.5px");
  $(".reservation").css("padding-bottom", "47.4px");
  $(".reservation").children("h3").css("margin-bottom", "35.5px");
  $(".reservation").children("h3").css("font-size", "16px");
  $(".reservation").children("ul").children("li").css("margin-bottom", "23.7px");
  $(".reservation").children("ul").children("li").css("width", "349px");
  $(".reservation").children("ul").children("li").css("height", "30.8px");
  $(".reservation").children("ul").children("li").children("input").css("width", "174.5px");
  $(".reservation").children("ul").children("li").children("input").css("height", "30.8px");
  $(".reservation").children("button").css("width", "162.5px");
  $(".reservation").children("button").css("height", "38.3px");
  $(".reservation").children("button").css("font-size", "14px");
}

var winWidth = $(window).width();
var winHeight = $(window).height();
if (winWidth <= 580 && winHeight >=800){
  $("#index").css("height", winHeight);
}

var indexHeight = $("#index").outerHeight();
if (indexHeight >= winHeight) {
  $("#index").css("height", indexHeight);
} else {
  $("#index").css("height", winHeight);
}



