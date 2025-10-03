var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

// module

var template = {
  html : 
    function(_title, _list, _body, _control){ // template : 재사용할 수 있는 껍데기(HTML로 된)
      return `            
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${_title}</title>
        <meta charset="utf-8">
      </head>
      <body>
      <h1><a href="/">WEB</a></h1> <!--위에 조건문에서 걸림, 물론 이렇게 하면 본문은 그대로고 $ {title}이 들어간 곳만 query string에 따라 변경. 실제 경로를 나타내지 않으니까...-->    

        <p>    
          <input type='button' value='night' onclick="nightDayHandler(this)"> 
        </p>
        ${_list} <!-- readdir을 통해 파일 목록 배열로 저장한 것을 바탕으로 목록 재정의-->
        ${_control} <!-- 실행경로 webapp-->
        ${_body} <!--페이지가 바뀌면 h2, p 태그로 이루어진 코드가 아닐 수도 있음--> 
      <p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/fRXilZ-GOXQ?si=Y-lRJnkE9ZpN50DB" 
          title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
          gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </p>
      </body>
      </html>
      `; 
    },
  list: 
    function(_filelist){
      /*
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
        <li><a href="/?id=교보문고">내가 만든 교보문고 홈페이지</a></li>
        <li><a href="/?id=JS Exercise">js 연습</a></li>
        <li><a href="/?id=CSS Exercise">css 연습</a></li>
        <li><a href="/?id=Box Grid Exercise">box, grid 연습</a></li>
      */
      var list = '<ul>'; // 재정의 할 때, ul 태그는 기본으로 감싸두고, 반복문을 활용해 배열의 요소를 꺼내 ul 태그 안에 들어가게 함(각 요소는 template literal 활용)
      var i=0;
      while(i < _filelist.length) {
        list = list + `<li><a href="/?id=${_filelist[i]}">${_filelist[i]}</a></li>`;
        i=i+1;
      }
      list = list + '</ul>';
      return list ;

    }
}


var app = http.createServer(function(request,response){

  var _url = request.url;
  var queryData = url.parse(request.url, true).query ; 
  var pathname = url.parse(_url, true).pathname ; // url의 pathname 저장 -> root 인지 확인하기 위해
  var filepath = path.join(__dirname, "data");
    
  if(pathname === '/') { // localhost:3000/ or username23940.github.io/test1/ (사실 안됨) 일 때.
    if(queryData.id === undefined) { // 홈 페이지(이중 조건문 활용)
        fs.readdir(filepath, function(err, filelist){ // readdir로 파일 목록 가져온 후. function 내부의 코드를 실행하도록 설계됨
          // 실행 경로 /webapp
          var title = 'Welcome' ; 
          var description = 'Hello, Node.js';
          /*
          var list = templateList(filelist);
          var template = templateHTML(title, list, 
              `<h2>${title}</h2><p>${description}</p>`, 
              `<a href="/create">create</a>`); // parameter는 위 10줄 내에서 가져옴. argument는 함수 정의 부분 내에서 가져옴
          // 현재 페이지는 h2, p 태그로 이루어지니까 parameter는 그대로..
          */
          var list = template.list(filelist); // template 변수는 객체 이름이니까 이제 다른거로 바꿈
          var html = template.html(title, list, 
              `<h2>${title}</h2><p>${description}</p>`, 
              `<a href="/create">create</a>`); // parameter는 위 10줄 내에서 가져옴. argument는 함수 정의 부분 내에서 가져옴
          // 현재 페이지는 h2, p 태그로 이루어지니까 parameter는 그대로..
          response.writeHead(200); 
          response.end(html); // template 출력
          }); 
    } else { // `./data/${queryData.id}`
      fs.readFile(path.join(filepath, queryData.id), "utf8", function(err, description){ // description : 파일을 성공적으로 읽었을 때 파일의 문자열이 담김
      // 콜백함수를 활용해 description에 추가 동작(내용 출력, 응답 등을 함). 여기서는 template의 내용으로 사용
      // response.end()로 웹페이지(template) 출력
      // 홈페이지는 이 부분 없어도 됨(들고 올 파일 없으니까)
        fs.readdir(filepath, function(err, filelist){ // readdir로 파일 목록 가져온 후. function 내부의 코드를 실행하도록 설계됨 
          var title = queryData.id ; // 가독성 좋게... 
          var list = template.list(filelist);
          var html = template.html(title, list, 
                `<h2>${title}</h2><p>${description}</p>`, 
                `<a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
                <form action="https://test1-3433.onrender.com/delete_process" method="post" onsubmit="return confirm('really?');">
                  <input type="hidden" name="id" value="${title}">
                  <input type="submit" value="delete">
                </form>
                <a href="/delete">delete</a>`);
          response.writeHead(200); 
          response.end(html); // template 출력
        }); 
      })
    }
  } else if (pathname === '/create') { //pathname === / 일 때 바로 뒤에 query string 없으면 홈, 있으면 메인이므로, /create.html은 /에서 else if로 분기
      // pathname === / 안에서 이중 분기시 queryData.id와 로직 섞임
      fs.readdir(filepath, function(err, filelist){ // readdir로 파일 목록 가져온 후. function 내부의 코드를 실행하도록 설계됨
        // 실행 경로 /webapp
        var title = 'WEB - create' ; 
        var list = template.list(filelist);
        var html = template.html(title, list, `
          <form action="https://test1-3433.onrender.com/create_process" method="post"> <!-- github은 node.js(동적페이지) 안되지만 된다고 가정-->
            <p><input type="text" name="title" placeholder="title"></p> 
            <p>
              <textarea name="description" placeholder="description"></textarea> 
            </p>
            <p>
              <input type="submit"> 
            </p>
          </form>`, ''); // parameter는 위 10줄 내에서 가져옴. argument는 함수 정의 부분 내에서 가져옴
        // 4번째 parameter는 create 페이지에서 필요 없으므로 공백
        response.writeHead(200); 
        response.end(html); // template 출력
        }); 
    } else if(pathname === '/create_process') {
        var body = '';
        request.on('data', function(data){
          body = body + data; // body에 데이터가 조각조각 들어옴.
        });
        request.on('end', function(){
          var post = qs.parse(body); // body에 들어있는 데이터를 post로 파싱
          var title = post.title; // . 뒤의 title, description은 form 태그의 name 속성값과 동일해야 함. name 속성값 안에 들어간 내용이 실제 데이터
          var description = post.description;
          fs.writeFile(path.join(filepath, title), description, 'utf8', function(err) { // 콜백함수로 저장이 된 다음 302 신호 보내야 함.
            // 실행경로 webapp
            response.writeHead(302, {Location : `/?id=${title}`}); // 302 : redirection(다른 페이지로 이동) -> if - else 루트. 301은 영구적 이동
            response.end();
          });
        });
          // request는 createServer로 들어온 콜백함수의 parameter -> post로 전송된 데이터 받음
          // createServer로 접속이 들어올 때마다 node.js는 익명 콜백함수 호출
          // req ; 요청할 때 사용하는 객체, res ; 응답할 때 사용하는 객체
    } else if (pathname === '/update') { // 수정할 form 만듦(내용 넣어두기) -> create와 달리 readfile, readdir 필요
      fs.readFile(path.join(filepath, queryData.id), "utf8", function(err, description){ 
        fs.readdir(filepath, function(err, filelist){ 
          var title = queryData.id ; 
          var list = template.list(filelist);
          var template = template.html(title, list, 
            `
            <form action="https://test1-3433.onrender.com/update_process" method="post"> 
              <input type="hidden" name="id" value="${title}"> <!-- name 속성값이 id인 폼을 만들고, 숨김 처리. 이 폼의 value(=id)를 사용해 수정하고자 하는 파일 탐색-->
              <p><input type="text" name="title" placeholder="title" value="${title}"></p> 
              <p>
                <textarea name="description" placeholder="description">${description}</textarea> <!-- textarea는 value 속성 없음-->
              </p>
              <p>
                <input type="submit"> 
              </p>
            </form>
            `, 
            `<a href="/create">create</a><a href="/update?id=${title}">update</a>`);
          response.writeHead(200); 
          response.end(html); 
        }); 
      })
    } else if (pathname === '/update_process') {
      var body = '';
      request.on('data', function(data){
        body = body + data; // body에 데이터가 조각조각 들어옴.
      });
      request.on('end', function(){
        var post = qs.parse(body); // body에 들어있는 데이터를 post로 파싱
        var id = post.id; // . 뒤의 title, description은 form 태그의 name 속성값과 동일해야 함. name 속성값 안에 들어간 내용이 실제 데이터
        var title = post.title; // update에서 본 title과는 다른 것(다른 스코프라 변수 중복 아님. if문 안에서 선언된 변수는 그 안에서만 유효)
        var description = post.description;
        fs.rename(path.join(filepath, id), path.join(filepath, title), function(err){ // 파일명 바꾸기, 바꾼 후에 콜백함수로 writeFile이 실행되도록(내용 수정)
          fs.writeFile(path.join(filepath, title), description, 'utf8', function(err) { // 콜백함수로 저장이 된 다음 302 신호 보내야 함.
            // 실행경로 webapp
            response.writeHead(302, {Location : `/?id=${title}`}); 
            response.end();
          });
        });
      });
    } else if (pathname==='/delete_process') {
      var body = '';
      request.on('data', function(data){
        body = body + data; // body에 데이터가 조각조각 들어옴.
      });
      request.on('end', function(){
        var post = qs.parse(body); // body에 들어있는 데이터를 post로 파싱
        var id = post.id; // . 뒤의 title, description은 form 태그의 name 속성값과 동일해야 함. name 속성값 안에 들어간 내용이 실제 데이터
        fs.unlink(path.join(filepath, id), function(err){
          response.writeHead(302, {Location : `/`});  // 삭제하면 홈으로 이동 
          response.end();
        });
      });
    } else {
        response.writeHead(404)
        response.end('not founded')
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
