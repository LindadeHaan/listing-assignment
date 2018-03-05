var http = require('http');
var fs = require('fs');
var path = require('path');

var mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.png': 'image/png'
}

// var routes = {
//   '/about': 'This is the about page\n',
//   '/': 'Hello World!\n'
// }

http.createServer(onrequest).listen(8000);

function onrequest(req, res) {
  var route = req.url

  if (route === '/') {
    route = 'index.html'
  }

  fs.readFile(path.join('static', route), onread)

  function onread(err, buf) {
    res.setHeader('Content-Type', 'text/html')

    if (err) {
      res.statusCode = 404
      console.log("Request for unvalid page")
      fs.createReadStream("./static/nonexistent-file.html").pipe(res)
    } //if /assets is requested.
  else if(req.url === "./assets")
  {
    console.log("Request for index.html in assets document");
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream("./assets/index.html").pipe(res);
  }

    else {
      var extension = path.extname(route)
      var type =  mime[extension] || 'text/plain'
      res.statusCode = 200
      res.setHeader('Content-Type', type)
      res.end(buf)
    }
  }




  // res.statusCode =200
  // res.setHeader('Content-Type', 'text/html')
  //
  // if (req.url in routes) {
  //   res.statusCode = 200
  //   res.end(routes[req.url])
  // } else {
  //   res.statusCode = 404
  //   res.end('Not found\n')
  // }
}

//   if (req.url === '/about') {
//     res.statusCode = 200
//     res.end('This is the about page\n')
//   } else if (req.url === '/') {
//     res.statusCode = 200
//     res.end('Hellow World!\n')
//   } else {
//     res.statusCode = 404
//     res.end('Not found\n')
//   }
//
//   console.log(req.url)
//   res.end('Hello World!\n')
// }
