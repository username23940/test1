console.log('A');
console.log('B');
 
var i = 0;
while(i < 2){
  console.log('C1');
  console.log('C2');
  i = i + 1;
}
 
console.log('D');





array literal : var arr = [‘a’, ‘b’, ‘c’, ‘d’]; // C
console.log(arr[1]); // b (0 index)

arr[2] = 3 ; // R
console.log(arr[2]); // 3

console.log(arr.length); // 배열의 길이 (1 index)

arr.push(‘e’); // U
console.log(arr[4]); // e




var number = [1,400,12,34];
var i = 0;
var total = 0;
while(i < number.length){
  total = total + number[i];
  i = i + 1;
}
console.log(`total : ${total}`); // template literal
