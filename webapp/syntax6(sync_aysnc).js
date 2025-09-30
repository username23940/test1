var fs = require('fs');

console.log('A');
result = fs.readFileSync('sample.txt', 'utf8'); // return 값을 줌
console.log(result);
console.log('C');
// ABC

console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result){ // return 값을 안주기 때문에 var 사용 X. 그래서 함수를 3번째 parameter로 줌
  // nodejs가 파일 읽는 데 오래 걸리니 C 출력 먼저.
  // 파일을 읽는 작업이 끝나면 function(callback func) 실행하는데. err가 있으면 첫번째 인자로 err, 두번째 인자로 파일의 내용인 B를 인자로 공급(fs.readFile API에 의해 이미 정해짐)
  // 하지만 function의 기능은 우리가 자유롭게 정할 수 있음(여기서는 result 출력)
 console.log(result);
});
console.log('C');
// ACB


function slowfunc(callback){ // 어떤 작업을 수행하는 함수. 오래걸릴 수 있으니 slow...(like readfile, 파일 읽기, 네트워크 요청)
  
  // 여기에 파일읽기, 네트워크 요청 등... 오래걸리는 작업 추가!
  callback();   // callback은 a라는 함수를 가지게 됨. A 출력
}
slowfunc(a);
console.log('already'); // 오래걸리는 작업 때문에 already 출력 먼저 

function a(){ // 이름 있는 함수
  console.log('A');
}

/*
function(){ // 같은 역할이지만 이름 없는 익명함수
  console.log('A');
}
var b= function() { // 변수에 함수를 넣음... JS에서 함수는 값이다! 매개변수에도 함수 넣을 수 있음.. = 콜백함수
  console.log('A');
}
*/
