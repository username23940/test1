var fs = require("fs");
fs.readFile("sample.txt", 'utf8', (err, data) => { // utf8 해야 인코딩? 가능
	if (err) throw err;
	console.log(data); // 실행할 때 webapp dir에서 실행해야 함. 상위 디렉토리에서 하면 sample.txt를 못찾음
});
