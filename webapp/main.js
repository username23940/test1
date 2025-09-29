var http = require('http');
var fs = require('fs');
var url = require('url');
// module

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(request.url, true).query ; // url 입력 시 query string 부분 변수 저장
    var title = queryData.id ; // 가독성 좋게...
    console.log(queryData.id) 
    if(_url == '/'){
      title = "Welcome";
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, "utf8", function(err, description){ // description : 파일을 성공적으로 읽었을 때 파일의 문자열이 담김
        // 콜백함수를 활용해 description에 추가 동작(내용 출력, 응답 등을 함). 여기서는 template의 내용으로 사용
        // response.end()로 웹페이지(template) 출력
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
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
        <li><a href="/?id=교보문고">내가 만든 교보문고 홈페이지</a></li>
        <li><a href="/?id=JS Exercise">js 연습</a></li>
        <li><a href="/?id=CSS Exercise">css 연습</a></li>
        <li><a href="/?id=Box Grid Exercise">box, grid 연습</a></li> // 물론 이렇게 하면 본문은 그대로고 ${title}이 들어간 곳만 query string에 따라 변경. 실제 경로를 나타내지 않으니까...
    
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
    }); // url 입력 시 query string의 부분을 활용해 그 경로의 파일을 읽음. 
    response.end(template); // template 출력
 
});
app.listen(3000);
