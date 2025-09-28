var fs = require("fs");
fs.readFile("sample.txt", (err, data) => {
	if (err) throw err;
	console.log(data);
});
