#!/usr/bin/env node
const fs = require('fs');

var createFile = require('create-file');
var writeFile = require('write');
var Input = require('prompt-input');

var resetCssContent = "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}";

var indexHtmlResetContent = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t<title>Document<\/title>\n\t<link rel="stylesheet" href="css/reset.css">\n\t<link rel="stylesheet" href="css/style.css">\n</head>\n<body>\n\n</body>\n</html>';

var indexHtmlContent = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t<title>Document<\/title>\n\t<link rel="stylesheet" href="css/style.css">\n</head>\n<body>\n\n</body>\n</html>';

var flaskLayoutHtml = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Flask App</title>\n\t</head>\n\t<body>\n\n\t\t<header>\n\t\t\t<div class="container">\n\t\t\t\t<h1 class="logo">Flask App</h1>\n\t\t\t</div>\n\t\t</header>\n\n\t\t<div class="container">\n\t\t\t{% block content %}\n\t\t\t{% endblock %}\n\t\t</div>\n\n\t</body>\n</html>';

var flaskHomeHtml = '{% extends "layout.html" %}\n{% block content %}\n\t<div class="jumbo">\n\t\t<h2>Welcome to the Flask app<h2>\n\t\t<h3>This is the home page for the Flask app<h3>\n\t</div>\n{% endblock %}';

var flaskRoutesPy = "from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n\treturn render_template('home.html')\n\nif __name__ =='__main__':\n\tapp.run(debug=True)";

// *********** functions ***********
function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      if (err) {
        onError(err);
        return;
      }
      onFileContent(filename);
    });
  });
}

function html() {
  // ********** css check ***********
  if (fs.existsSync("css")) {
  } else {
    fs.mkdirSync("./css");
    console.log("CREATED: 'css/'");
    writeFile("css/style.css", '', function (err) {
      if (err) console.log(err);
    });
    console.log("CREATED: 'css/style.css'");
  }

  // *********** index.html check ***********
  if (fs.existsSync("./index.html")) {
  } else {
    writeFile('index.html', indexHtmlContent, function (err) {
      if (err) console.log(err);
    });
    console.log("CREATED: 'index.html'");
  }

  // *********** js file check ***********
  if (fs.existsSync("js")) {
  } else {
    fs.mkdirSync("./js");

    console.log("CREATED: 'js/'");
  }

  // *********** img file check ***********
  if (fs.existsSync("img")) {
  } else {
    fs.mkdirSync("./img");

    console.log("CREATED: 'img/'");
  }
}

function htmlWithResetCss() {
  // ********** css check ***********
  if (fs.existsSync("css")) {
    var data = {};
    var exists = false;
    readFiles("css/", function (filename) {
      data = filename;
      if (data == "reset.css") {
        exists = true;
      } else if (exists == false) {
        createFile('css/reset.css', indexHtmlResetContent, function (err) {
          // file either already exists or is now created (including non existing directories)
        });
        exists = true;
        console.log("CREATED: 'css/reset.css'");
      }
    }, function (err) {
      throw err;
    });
  } else {
    fs.mkdirSync("./css");
    console.log("CREATED: 'css/'");
    writeFile("css/reset.css", resetCssContent, function (err) {
      if (err) console.log(err);
    });
    console.log("CREATED: 'css/reset.css'");
    writeFile("css/style.css", '', function (err) {
      if (err) console.log(err);
    });
    console.log("CREATED: 'css/style.css'");
  }

  // *********** index.html check ***********
  if (fs.existsSync("./index.html")) {
  } else {
    writeFile('index.html', indexHtmlResetContent, function (err) {
      if (err) console.log(err);
    });

    console.log("CREATED: 'index.html'");
  }

  // *********** js file check ***********
  if (fs.existsSync("js")) {
  } else {
    fs.mkdirSync("./js");

    console.log("CREATED: 'js/'");
  }

  // *********** img file check ***********
  if (fs.existsSync("img")) {
  } else {
    fs.mkdirSync("./img");

    console.log("CREATED: 'img/'");
  }
}

function flask() {
  // *********** app folder check ***********
  if (fs.existsSync("app")) {
  } else {
    fs.mkdirSync("./app");
    console.log("CREATED: 'app/'");
    fs.mkdirSync("./app/templates");
    console.log("CREATED: 'app/templates/'");
    fs.mkdirSync("./app/static");
    console.log("CREATED: 'app/static/'");
    fs.mkdirSync("./app/static/css");
    console.log("CREATED: 'app/static/css/'");
    fs.mkdirSync("./app/static/img");
    console.log("CREATED: 'app/static/img/'");
    fs.mkdirSync("./app/static/js");
    console.log("CREATED: 'app/static/js/'");

    writeFile("app/templates/layout.html", flaskLayoutHtml, function (err) {
      if (err) console.log(err);
    });
    console.log("CREATED: 'app/templates/layout.html");

    writeFile("app/templates/home.html", flaskHomeHtml, function (err) {
      if (err) console.log(err);
    });
    console.log("CREATED: 'app/templates/home.html");

    writeFile("app/routes.py", flaskRoutesPy, function (err) {
      if (err) console.log(err);
    });
    console.log("CREATED: 'app/routes.py");
  }
}

function main() {
  console.log("1) Build HTML Template");
  console.log("2) Build HTML Template w/Reset.css");
  console.log("3) Build flask Template");

  var input = new Input({
    settingChoice: 'setting',
    message: 'pick a template: '
  });

  input.ask(function (answers) {
    if (answers == 1) {
      html();
      console.log("***BUILD COMPLETE!***");
    }

    if (answers == 2) {
      htmlWithResetCss();
      console.log("***BUILD COMPLETE!***");
    }

    if (answers == 3) {
      flask();
      console.log("***BUILD COMPLETE!***");
    }
  });
}

main();
//beapro