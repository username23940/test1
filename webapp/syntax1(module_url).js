var http = require('http');
var fs = require('fs'); 
var url = require('url');
// module

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(request.url, true).query ; // url 입력 시 query string 부분 변수 저장
    console.log(queryData.id) 
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    response.end(fs.readFileSync(queryData.id)); // querystring 그대로 출력
 
});
app.listen(3000);
