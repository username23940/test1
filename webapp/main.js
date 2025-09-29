var http = require('http');
var fs = require('fs');
var url = require('url');
// module

var app = http.createServer(function(request,response){
  console.log(url.parse(_url, true)); // url 분석
  console.log(queryData.id); 

  var _url = request.url;
  var queryData = url.parse(request.url, true).query ; 
  var pathname = url.parse(_url, true).pathname ; // url의 pathname 저장 -> root 인지 확인하기 위해
  
  if(pathname === '/') {
    if(queryData.id === undefined) { // 홈 페이지(이중 조건문 활용)
        fs.readFile(`data/${queryData.id}`, "utf8", function(err, description){ // 홈 페이지는 이 부분 없어도 됨(들고 올 파일 없으니까)
        var title = 'Welcome' ; 
        var description = 'Hello, Node.js';

        fs.readdir('./data', function(err, filelist){ // readdir로 파일 목록 가져온 후. function 내부의 코드를 실행하도록 설계됨 
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
          while(i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i=i+1;
          }
          list = list + '</ul>';
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1> // 위에 조건문에서 걸림, 물론 이렇게 하면 본문은 그대로고 ${title}이 들어간 곳만 query string에 따라 변경. 실제 경로를 나타내지 않으니까...
            <p>    
              <input type='button' value='night' onclick="nightDayHandler(this)"> 
            </p>
          <ol>
            ${list} // readdir을 통해 파일 목록 배열로 저장한 것을 바탕으로 목록 재정의
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
          <p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/fRXilZ-GOXQ?si=Y-lRJnkE9ZpN50DB" 
              title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
              gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </p>
          </body>
          </html>
          `; 
          response.writeHead(200); 
          response.end(template); // template 출력
          }); 
        });
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function(err, description){ // description : 파일을 성공적으로 읽었을 때 파일의 문자열이 담김
      // 콜백함수를 활용해 description에 추가 동작(내용 출력, 응답 등을 함). 여기서는 template의 내용으로 사용
      // response.end()로 웹페이지(template) 출력
      var title = queryData.id ; // 가독성 좋게... 
      fs.readdir('./data', function(err, filelist){ // readdir로 파일 목록 가져온 후. function 내부의 코드를 실행하도록 설계됨 
        var list = '<ul>'; // 재정의 할 때, ul 태그는 기본으로 감싸두고, 반복문을 활용해 배열의 요소를 꺼내 ul 태그 안에 들어가게 함(각 요소는 template literal 활용)
        var i=0;
        while(i < filelist.length) {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i=i+1;
        }
        list = list + '</ul>';
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1> // 위에 조건문에서 걸림, 물론 이렇게 하면 본문은 그대로고 ${title}이 들어간 곳만 query string에 따라 변경. 실제 경로를 나타내지 않으니까...
          <p>    
            <input type='button' value='night' onclick="nightDayHandler(this)"> 
          </p>
        <ol>
          ${list} // readdir을 통해 파일 목록 배열로 저장한 것을 바탕으로 목록 재정의
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
        <p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/fRXilZ-GOXQ?si=Y-lRJnkE9ZpN50DB" 
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </p>
        </body>
        </html>
        `; 
        response.writeHead(200); 
        response.end(template); // template 출력
        }); 
      }
    }
  } else {
    response.writeHead(404)
    response.end('not founded')
  }
}

app.listen(3000);
