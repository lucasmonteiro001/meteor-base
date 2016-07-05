var fs = require('fs');
var prependFile = require('prepend-file');
var fse = require('fs-extra');
var path = require('path');
var msg = require('./utilities_Msg');
var readline = require('readline');

var fileExists = function (filePath) {
  try {
    return fs.statSync(filePath).isFile();
  }
  catch (err) {
    return false;
  }
}

var readFile = function (file) {
  fs.readFile(file, 'utf8', function (err, contents) {
    if (err) console.log(err);
  });
};

var append = function (file, content) {

  try {
    console.log('caminho:' + file);
    contentExistisIntheFile(file, content, function (err, data) {

      if (data === false) {

        fs.appendFile(file, content, function (err) {
          if (err) {
            console.log('Try:' + err);
            return;
          }
        });
      } else {
        console.log(file + ": O conteúdo já foi inserido");
      }
    });

  } catch (e) {
    if (fileExists(file) == false) {
      createFile(file);
    }
    fs.appendFile(file, content, function (err) {
      if (err) {
        console.log('Catch:' + err);
        return;
      }
    });
  }

  console.log("Upd - " + file);
}

var prepend = function (file, content) {

  // fs.appendFileSync(file, content, encoding='utf8');
  try {
    contentExistisIntheFile(file, content, function (err, data) {

      if (data === false) {

        prependFile.sync(file, content);

      } else {
        console.log(file + ": O conteúdo já foi inserido");
      }
    });

  } catch (e) {
    if (fileExists(file) == false) {
      createFile(file);
    }
    content = content + "\n";
    prependFile.sync(file, content);
  }

  console.log("Upd - " + file);
}

var rmDir = function (path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        rmDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
      // console.log("Del - " + curPath);
    });
    fs.rmdirSync(path);
    console.log("Del - " + path);
  }
};

var mkdir = function (folder) {

  var r = fse.mkdirsSync(folder);
  if (r) console.log("Crt - " + folder);
}

// deletar arquivo ou pasta
var removeFile = function (el) {
  try {
    fs.unlinkSync(el);
    console.log("Del - " + el);
  } catch (e) {

  }
}

var createFile = function (file) {
  // primeiro remove o arquivo, depois cria
  try {
    removeFile(file);
  } catch (e) {

  }
  fse.createFileSync(file);
  console.log("Crt - " + file);
}

var exists = function (file) {
  fse.ensureFileSync(file);
}

var setTemplateFile = function (filePath, templateFilePath, tags) {

  if (fileExists(templateFilePath)) {
    fs.readFile(templateFilePath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      for (var key in tags) {
        data = data.replace(
            new RegExp(key, 'g'), tags[key]);
      }

      setTimeout(function () {
        append(filePath, data);
      }, 1000);

    });
  }
}

var setTemplate = function (filePath, template, tags, insertBeforeLine) {
  var tmpTemplate = template.replace("#$%", "");
  console.log("tags:" + tags);
  for (var key in tags) {
    console.log("tag:" + key);
    tmpTemplate = tmpTemplate.replace(
        new RegExp(key, 'g'), tags[key]);
  }

  setTimeout(function () {
    if (typeof insertBeforeLine != 'undefined' && insertBeforeLine != "") {
      insertLineInFileIfNotExists(filePath, tmpTemplate, insertBeforeLine);
    } else {
      append(filePath, tmpTemplate);
    }
  }, 1000);

}

var insertLineInFileIfNotExists = function (filePath, newLine, beforeLine) {
  console.log('#######################ENTROU - insertLineInFileIfNotExists');
  var newFile = "";
  var existis = false;

  var onComplete = function (result) {
    if (existis == false && newLine != beforeLine) {
      fs.truncate(filePath, 0, function () {
        append(filePath, result);
      })
    }

  };

  var rd = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  rd.on('line', function (line) {
    if (beforeLine == line) {
      newFile = newFile + newLine + "\n";
      newFile = newFile + line + "\n";
    }
    else {
      if (newLine == line) {
        existis = true;
      } else {
        newFile = newFile + line + "\n";
      }

    }

  }).on('close', function () {
    onComplete(newFile);
  });
  ;

}

var contentExistisIntheFile = function (filePath, newLine, callback) {

  var conteudo = "";
  var onComplete = function () {

    if (conteudo.length > 0 && conteudo.search(new RegExp(newLine, 'g')) > -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }

  };

  var rd = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
  });

  rd.on('line', function (line) {
    conteudo = conteudo + line;

  }).on('close', function () {
    onComplete();
  });
  ;

}

module.exports = {
  createFile: createFile,
  mkdir: mkdir,
  prepend: prepend,
  append: append,
  readFile: readFile,
  exists: exists,
  setTemplateFile: setTemplateFile,
  setTemplate: setTemplate,
  fileExists: fileExists
}
