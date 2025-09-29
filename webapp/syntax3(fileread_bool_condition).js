var fs = require("fs");
fs.readFile("sample.txt", 'utf8', (err, data) => { // utf8 해야 인코딩? 가능
	if (err) throw err;
	console.log(data); // 실행할 때 webapp dir에서 실행해야 함. 상위 디렉토리에서 하면 sample.txt를 못찾음
});

console.log(1==1); //true
console.log(1==2); //false
console.log(1>2); //false
console.log(1<2); //false
console.log(1===1); //true
console.log(1===2); //false


console.log('A');
console.log('B');
if(false){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');

var args = process.argv; // python sys 모듈 sys.agrv 명령어.
console.log(args[2]); // argv는 배열로 저장. index 2 출력.
console.log('A');
console.log('B');
if(args[2] === '1'){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');
