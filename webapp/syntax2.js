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
    <p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are
        identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the
        Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser
        computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN
        in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in
        August 1991.
    </p>
    <p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/fRXilZ-GOXQ?si=Y-lRJnkE9ZpN50DB" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </p>
    </body>
    </html>
    `;
    response.end(template); // template 출력
 
});
app.listen(3000);
