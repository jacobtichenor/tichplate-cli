#!/usr/bin/env node
const fs = require('fs');
var createFile = require('create-file');
var writeFile = require('write');

var resetCssContent = "a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}";

var indexHtmlContent = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t<title>Document<\/title>\n\t<link rel="stylesheet" href="css/reset.css">\n</head>\n<body>\n\n</body>\n</html>';

// ********** css check ***********
if (fs.existsSync("css")) {
  console.log("css directory is here.");

  var data = {};
  var exists = false;
  readFiles("css/", function(filename) {
    data = filename;
    if(data == "reset.css") {
      console.log("reset.css already exists.");
      exists = true;
    } else if (exists == false) {
      createFile('css/reset.css', resetCssContent, function (err) {
        // file either already exists or is now created (including non existing directories)
      });
      exists = true;
      console.log("reset.css has been created! make sure it's linked in the html :)");
    } 
  }, function(err) {
    throw err;
  });
} else {
  fs.mkdirSync("./css");
  console.log("css directory has been created!");
  writeFile("css/reset.css", resetCssContent, function(err) {
    if (err) console.log(err);
  });
  console.log("css/reset.css has been created!");
}

// *********** index.html check ***********
if (fs.existsSync("./index.html")) { 
  console.log("index.html already exists.");
} else {
  writeFile('index.html', indexHtmlContent, function(err) {
    if (err) console.log(err);
  });
}

// *********** js file check ***********
if (fs.existsSync("js")) { 
  console.log("js directory already exists.");
} else {
  fs.mkdirSync("./js");
  console.log("js directory has been created!");
}

// *********** img file check ***********
if (fs.existsSync("img")) { 
  console.log("img directory already exists.");
} else {
  fs.mkdirSync("./img");
  console.log("img directory has been created!");
}

// *********** functions ***********
function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      if (err) {
        onError(err);
        return;
      }
      onFileContent(filename);
    });
  });
}
