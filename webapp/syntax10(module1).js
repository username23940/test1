var M = {
  v : 'v';
  f : function() {
    console.log(this.v);
  }
}

module.exports = M; 

// 우리가 만드는 모듈인 이 파일의 여러 기능 중 M이라는 객체만 바깥에서 사용할 수 있도록 export
// module을 가져올 때는 var mod = require('./syntax10(module1).js') -> console.log(mod) 시 v, f 출력. mod.f();로 호출
