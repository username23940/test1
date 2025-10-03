var members = ['egoing', 'k8805', 'hoya']; // arr
console.log(members[1]); // k8805
 
var roles = { // obj
  'programmer':'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}
console.log(roles.designer); // k8805. roles['designer']도 같음


// arr loop
var i =0 ;
while(i<members.length) {
 console.log('arr loop', memebers[i]) /
 i=i+1;
}

// obj loop
for (var name in roles) { // name은 변수. python의 반복자(아무거나 사용 가능) 
 // in 키워드. roles는 반복적으로 처리하려는 객체. python의 iterator
 console.log('obj loop', name, 'value', roles[name]);
} // name에는 객체의 식별자, 키가 들어옴(value를 얻으려면 점 붙여서 호출)
