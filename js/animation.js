//console.clear();


//change color when il roll ------------

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


// Canvas_info ------------

var canvas_info = document.getElementById("info_canvas");
var ctx = canvas_info.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 280, 68);
ctx.fillRect(0, 82, 220, 82);


