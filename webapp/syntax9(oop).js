var f = function(){
  console.log(1+1);
  console.log(1+2);
}
console.log(f); // Function : f 출력. like python function heap
f(); // 2 3


var a = [f]; // a라는 배열에 함수 f를 담음
a[0](); // f(); 

var o = { // o라는 객체에 func라는 key, property에 f라는 함수를 담음.
  func:f
}
o.func(); // f();




var p = {
  var v1 : 'v1';
  var v2 : 'v2';
  f1: function() {
    console.log(this.v1);
  }
  f2 : function () {
    console.log(this.v2);
  }
}

p.f1();
p.f2();
