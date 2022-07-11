const http = require('http');
const fs = require('fs');
const url = require('url');
let server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url, true);
    let path = urlParse.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler;
    if (typeof router[trimPath] === "undefined") {
        chosenHandler = handlers.notFound;
    } else {
        chosenHandler = router[trimPath];
    }
    chosenHandler(req, res);
});
server.listen(3000, () => {
    console.log('Server is running on port 3000!')
})
let handlers = {};
handlers.home = (req, res) => {
    getTemplate(req, res, 'views/index.html');
}
handlers.login = (req, res) => {
    getTemplate(req, res, 'views/login.html');
}
handlers.register = (req, res) => {
    getTemplate(req, res, 'views/register.html')
}
handlers.notFound = (req, res) => {
    getTemplate(req, res, 'views/not-found.html');
}

let getTemplate = (req, res, path) =>{
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}

let router = {
    'register': handlers.register,
    'login': handlers.login,
    '': handlers.home
}