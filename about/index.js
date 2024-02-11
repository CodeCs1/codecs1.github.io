var i =0;
var txt = `#include "webpage.h"
#include "animation.h"
using namespace webpage;

int main() {
\tauto x = createButton("Return to home", DEFAULT_X, DEFUALT_Y, 250, 50);
\tx.fontsize = size::large;
\tx.color = color::green;
\tx.border = false;
\treturn 0;
}`;

function isspace(s) {
   return (/\t/).test(s);
}

function is_string(s, t) {
   return (t).test(s);
}

var speed = 50;
function Write() {
   if (i < txt.length) {
    document.getElementById("codetext").innerHTML += txt.charAt(i);
    var mat = /\r|\n/.exec(txt.charAt(i));
    if (mat) {
      document.getElementById("codetext").innerHTML += '<br/>'
    }

    if (isspace(txt.charAt(i))) {
      document.getElementById("codetext").innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp';
    }

    if (txt.charAt(i).includes("int")) {
      console.log("h");
    }

    i++;
    setTimeout(Write, speed);
   } else {
    continuing();
   }
}

function return_w(html) {
   window.open(html);
}

function continuing() {
   text = 0;
   var x = document.createElement("button");
   x.id = "button1";
   var t = document.createTextNode("Return to home");
   x.appendChild(t);
   document.body.appendChild(x);
   var s = document.getElementById("button1");
   s.onclick = function() {
      window.location.href='../index.html'
   };
}