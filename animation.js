var ctx = document.getElementById("menu_act").getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 400, 20);
ctx.fillRect(0,50, 400, 20);
ctx.fillRect(0, 100, 400, 20);

document.getElementById("menu_act").onclick = function () {
  var ele = getComputedStyle(document.getElementById("menu"));
  if (ele.display == "none"){document.getElementById("menu").style.display = "block";}
  else {document.getElementById("menu").style.display = "none";}
}




