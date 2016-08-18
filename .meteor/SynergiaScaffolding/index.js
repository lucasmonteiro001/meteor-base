var uf = require('./utilities_File'),
    msg = require('./utilities_Msg'),
    error = require('./errors.js'),
    templates = require('./templates.js'),
    fs = require('fs');

//################## FUNCTIONS ##########################

var beHappy = function (appDataConfig, path, tags) {
  for (var key in appDataConfig) {
    if (typeof appDataConfig[key].type == 'undefined' && Object.keys(appDataConfig[key]).length > 0) {
      var dirPath = path + '/' + key;
      uf.mkdir(dirPath);
      beHappy(appDataConfig[key], dirPath, tags);
    } else {
      var filePath = path + '/' + key;

      if (typeof appDataConfig[key].type != 'undefined' && (appDataConfig[key].type == 'newfile' || uf.fileExists(filePath) == false)) {
        uf.createFile(filePath);
      }

      var fileConfig = appDataConfig[key];
      for (var key2 in fileConfig) {
        switch (key2) {
          case 'append':
            if (fileConfig[key2] != "")
              uf.append(filePath, fileConfig[key2]);
            break;
          case 'prepend':
            if (fileConfig[key2] != "")
              uf.prepend(filePath, fileConfig[key2]);
            break;
          case 'setTemplateFile':
            if (fileConfig[key2] != "")
              uf.setTemplateFile(filePath, fileConfig[key2], tags);
            break;
          case 'setTemplate':
            if (fileConfig[key2] != "")
              uf.setTemplate(filePath, templates.getTemplate(fileConfig[key2]), tags, fileConfig["insertBeforeLine"]);
            break;
          case 'setTemplateFileAndReplaceTags':
            if (fileConfig[key2] != "")
              uf.replaceTagInFileFromTemplateFile(filePath, fileConfig[key2].templateFile, tags, fileConfig[key2].tag);
            break;



          default:
            //do nothing
        }
      }
    }
  }
}

//#################### END FUNCTIONS ####################

var params = [],
    basePath = '.',
    tags = {},
    collectionName = "",
    jsonScaffoldingConfig = "",
    configData = {};

// checar se a chamada possui mais de 2 parametros
process.argv.forEach(function (val, index, array) {
  if (index > 1) { // pega a partir do segundo valor
    params.push(val);
  }
});

// verifica se ha mais de 2 parametros
if (params.length === 0) {
  console.error(error.erroUso);
  return;
}

if (params[0] && params[1]) {
  console.log('collectionName/Tags: ' + params[0]);

  if (uf.fileExists('./' + params[0])) {
    console.log("O arquivo existe.");
    fs.readFile('./' + params[0], 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      tags = JSON.parse(data);
    });

  } else {
    collectionName = msg.toCamelCase(params[0]);
    tags['{COLLECTION_NAME}'] = collectionName;
  }

  console.log('jsonScaffoldingConfig: ' + params[1]);
  jsonScaffoldingConfig = params[1];

  setTimeout(function () {

    if (uf.fileExists('./' + jsonScaffoldingConfig)) {
      fs.readFile('./' + jsonScaffoldingConfig, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }

        for (var key in tags) {
          data = data.replace(
              new RegExp(key, 'g'), tags[key]);
        }

        setTimeout(function () {
          configData = JSON.parse(data);
          console.log(configData);
          setTimeout(function () {
            beHappy(configData, basePath, tags);
          }, 500);
        }, 500);

      });

    }

  }, 500);

}

/*

 //#################### Criação dos arquivos da pasta API ################
 //var path = basePath + 'api/' + collectionName,
 // collectionJS = path + '/collection.js',
 // controllerJS = path + '/controller.js',
 // modelJS = path + '/model.js';

 //msg.inicio('API - ' + collectionName);

 //uf.mkdir(path);

 //uf.createFile(collectionJS);
 //uf.createFile(controllerJS);
 //uf.createFile(modelJS);

 //console.log(templates.getTemplate('collection.js'));

 //uf.setTemplateFile



 uf.setTemplateFile(model, 'model', template, collectionName, function (err, data) {
 });

 uf.createFile(methods);
 uf.setTemplateFile(methods, 'methods', template, collectionName, function (err, data) {
 getAllCollectionFieldsForCheck(listaDeCampos, function (err, data2) {
 uf.updateFileWithOneTag(methods, 'COLLECTION_FIELDS_FOR_CHECK', data2);
 });
 });

 uf.createFile(collectionJS);
 uf.setTemplateFile(collectionJS, 'collectionJS', template, collectionName, function (err, data) {
 getAllSchemaFieldItens(tagsDetalhesCampos, listaDeCampos, function (err, data2) {
 uf.updateFileWithOneTag(collectionJS, 'SCHEMA_FIELD_ITENS', data2);
 });
 });

 uf.createFile(publications);
 uf.setTemplateFile(publications, 'publications', template, collectionName, function (err, data) {
 });

 uf.mkdir(path + "/client");

 msg.fim(API);

 msg.inicio("startup/server");

 uf.prepend(serverAPI, msg.getImport('../../api/' + collectionName + '/model.js'));

 msg.fim("startup/server");

 /*

 // constantes de acao
 var ALL = "all",
 API = "api",
 ROUTE = "route",
 UI = "ui";


 // constantes de permissao
 var AUTHENTICATED = "authenticated",
 PUBLIC = "public";

 // constante de separacao do parametro de permissao
 var SEP = "--";

 // checar se a chamada possui mais de 2 parametros
 process.argv.forEach(function (val, index, array) {
 if (index > 1) { // pega a partir do segundo valor
 params.push(val);
 }
 });

 // verifica se ha mais de 2 parametros
 if (params.length === 0) {
 console.error(error.erroUso);
 return;
 }

 //CARREGA INFORMAÇÕES DOS CAMPOS
 var tagsDetalhesCampos = [];
 var listaDeCampos = [];



 // obtem a acao (all, api, ui, route),
 // o nome da colecao,
 // a permissao (public ou authenticated)
 tmpAction = params[0].split(":");
 action = tmpAction[0];
 if (tmpAction.length > 1) {
 template = tmpAction[1];
 isTemplate = true;

 if (template != "" && uf.fileExists('./node_modules/synergia-scaffolding/templates/' + template + '/fields.csv')) {
 tagsDetalhesCampos = uf.getFieldsDescriptionsTAGFromCSV('./node_modules/synergia-scaffolding/templates/' + template + '/fields.csv');
 listaDeCampos = uf.getFieldsFromCSV('./node_modules/synergia-scaffolding/templates/' + template + '/fields.csv');
 }

 } else {
 if (template != "" && uf.fileExists('./node_modules/synergia-scaffolding/templates/fields.csv')) {
 tagsDetalhesCampos = uf.getFieldsDescriptionsTAGFromCSV('./node_modules/synergia-scaffolding/templates/fields.csv');
 listaDeCampos = uf.getFieldsFromCSV('./node_modules/synergia-scaffolding/templates/fields.csv');
 }

 }
 collectionName = params[1];
 permission = params[2];

 // verifica se o nome da collection foi passado
 if (!collectionName) {
 console.error(error.erroNomeCollection);
 return;
 }

 // se a acao nao eh 'api', ela precisa do parametro de permissao
 if (action !== API) {

 // se a acao nao foi passada como parametro
 if (permission === undefined) {

 if (action === ROUTE) {
 console.error(error.erroRoute);
 }
 else if (action === UI) {
 console.error(error.erroUI);
 }
 else if (action === ALL) {
 console.error(error.erroAll);
 }
 else {
 console.error(error.erroUso);
 }
 return;

 }
 else {

 permission = permission.split(SEP);

 // se a permissao nao foi passada como --[permission]
 if (permission[0] === "") {

 if (permission[1] !== undefined
 && (permission[1] === AUTHENTICATED || permission[1] === PUBLIC)) {
 permission = permission[1];
 }
 else {
 console.error(error.erroSucessao);
 return;
 }
 } else {
 console.error(error.erroUso);
 return;
 }
 }
 }

 // funcao para criar os arquivos relacionados a API
 var createAPI = function () {

 var path = basePath + 'api/' + collectionName,
 collectionJS = path + '/' + collectionName + '.js',
 publications = server + '/publications.js',
 serverAPI = basePath + 'startup/server/api.js',
 model = path + '/model.js';

 msg.inicio(API);

 uf.mkdir(path);

 uf.createFile(model);
 uf.setTemplateFile(model,'model',template,collectionName, function(err, data){
 });

 uf.createFile(methods);
 uf.setTemplateFile(methods,'methods',template,collectionName, function(err, data){
 getAllCollectionFieldsForCheck(listaDeCampos, function(err, data2){
 uf.updateFileWithOneTag(methods,'COLLECTION_FIELDS_FOR_CHECK',data2);
 });
 });

 uf.createFile(collectionJS);
 uf.setTemplateFile(collectionJS,'collectionJS',template,collectionName, function(err, data){
 getAllSchemaFieldItens(tagsDetalhesCampos,listaDeCampos, function(err, data2) {
 uf.updateFileWithOneTag(collectionJS,'SCHEMA_FIELD_ITENS',data2);
 });
 });


 uf.createFile(publications);
 uf.setTemplateFile(publications,'publications',template,collectionName, function(err, data){
 });


 uf.mkdir(path + "/client");

 msg.fim(API);

 msg.inicio("startup/server");

 uf.prepend(serverAPI, msg.getImport('../../api/' + collectionName + '/model.js'));

 msg.fim("startup/server");

 }

 // funcao para criar os arquivos relacionados a Route
 var createRoute = function () {

 var flowRouterName = "",
 flowRouter = "",
 fileImport = "",
 location = "",
 path = "",
 route = "";

 if (permission === AUTHENTICATED) {
 location = '/authenticated.js';
 flowRouterName = "authenticatedRoutes";
 }
 else if (permission === PUBLIC) {
 location = '/public.js';
 flowRouterName = "publicRoutes";
 }
 else {
 console.error(error.erroUso);
 }


 path = basePath + 'startup/client';
 route = path + '/routes' + location;
 fileImport = msg.getImport('../../../ui/' + permission + '/' + collectionName + '/' + collectionName);
 msg.getFlowRouterFunction(flowRouterName, template, collectionName, function(err, flowRouter){

 msg.inicio(ROUTE);

 uf.exists(route);
 uf.prepend(route, fileImport);
 uf.append(route, flowRouter);

 msg.fim(ROUTE);

 });


 }

 // funcao para criar os arquivos relacionados a UI
 var createUI = function () {

 var location = "";


 msg.inicio(UI);

 if (permission !== AUTHENTICATED && permission !== PUBLIC) {
 console.error(error.erroSucessao);
 return;
 }

 var path = basePath + 'ui/';
 var folder = path + permission + '/' + collectionName;
 var uiHTMLFile = folder + '/' + collectionName + '.html';
 var uiJSFile = folder + '/' + collectionName + '.js';
 var fileImport = msg.getImport('../../../ui/' + permission + '/' + collectionName);
 var menuFileAuthenticated = path + 'globals' + '/authenticated-menu.html',
 menuFilePublic = path + 'globals' + '/public-menu.html';

 //Alterar o Menu Principal
 var itemDeMenu = "<li class=\"{{currentRoute '"+collectionName+"'}}\"><a href=\"{{pathFor '"+collectionName+"'}}\"><i class=\"fa fa-diamond\"></i> <span class=\"nav-label\">"+msg.toCamelCase(collectionName)+"</span></a></li>";
 if(permission=='authenticated') {
 uf.insertLineInFileIfNotExists(menuFileAuthenticated,itemDeMenu,'</template>');
 } else if(permission=='public') {
 uf.insertLineInFileIfNotExists(menuFilePublic,itemDeMenu,'</template>');
 }

 uf.mkdir(folder);
 uf.createFile(uiHTMLFile);
 uf.setTemplateFile(uiHTMLFile,'uiHTMLFile',template,collectionName, function(err, data){
 getAllFormItens(tagsDetalhesCampos,listaDeCampos, function(err, data2){
 uf.updateFileWithOneTag(uiHTMLFile,'FORM_STRUTURE',data2);
 });
 setTimeout(function(){
 getAllFormItens(tagsDetalhesCampos,listaDeCampos, function(err, data3){
 uf.updateFileWithOneTag(uiHTMLFile,'FORM_EDIT_STRUTURE',data3);
 });

 }, 1500);

 setTimeout(function(){
 getAllSpanItens(tagsDetalhesCampos,listaDeCampos, function(err, data4){
 uf.updateFileWithOneTag(uiHTMLFile,'VIEW_DATA_STRUTURE',data4);
 });

 }, 2500);

 setTimeout(function(){
 if(listaDeCampos[0]) {
 var primeiroCampo = listaDeCampos[0];
 uf.updateFileWithOneTag(uiHTMLFile,'COLLECTION_FIRST_FIELD',primeiroCampo['FIELD_NAME']);
 }


 }, 2800);


 });


 uf.createFile(uiJSFile);
 uf.setTemplateFile(uiJSFile,'uiJSFile',template,collectionName, function(err, data){
 getAllVarFormItens(listaDeCampos, function(err, data2){
 uf.updateFileWithOneTag(uiJSFile,'COLLECTION_FIELDS_JS',data2);
 });

 setTimeout(function(){
 getAllVarFormItensForUpdate(listaDeCampos, function(err, data3){
 uf.updateFileWithOneTag(uiJSFile,'COLLECTION_UPDATE_FIELDS_JS',data3);
 });

 }, 1500);


 setTimeout(function(){
 getAllVarFormItensForView(listaDeCampos, function(err, data4){
 uf.updateFileWithOneTag(uiJSFile,'COLLECTION_VIEW_FIELDS_JS',data4);
 });

 }, 2500);

 setTimeout(function(){
 getAllVarFormItensForList(listaDeCampos, function(err, data5){
 uf.updateFileWithOneTag(uiJSFile,'COLLECTION_COLUMNS_LIST',data5);
 });

 }, 3500);

 setTimeout(function(){
 if(listaDeCampos[0]) {
 var primeiroCampo = listaDeCampos[0];
 uf.updateFileWithOneTag(uiJSFile,'COLLECTION_FIRST_FIELD',primeiroCampo['FIELD_NAME']);
 }


 }, 3800);


 });






 msg.fim(UI);
 }

 getAllFormItens = function(tagsDetalhesCampos,listaDeCampos, callback) {

 var onComplete = function() {
 callback(null, formEstrutura);
 };
 var tasksToGo = listaDeCampos.length;

 var formEstrutura = "";
 for (var i = 0; i < listaDeCampos.length; i++) {

 uf.getFormItemFromTemplateFile(template,listaDeCampos[i],tagsDetalhesCampos,function(err, data){
 formEstrutura = formEstrutura+data;
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 });

 }

 }


 getAllVarFormItens = function(listaDeCampos, callback) {
 var allVarFormItens = "";
 var onComplete = function() {
 callback(null, allVarFormItens);
 };
 var tasksToGo = listaDeCampos.length;


 for (var i = 0; i < listaDeCampos.length; i++) {
 var campo = listaDeCampos[i];
 if(i!=0) {
 allVarFormItens = allVarFormItens +",\n";
 }
 allVarFormItens = allVarFormItens + campo['FIELD_NAME'] + ": template.find('[id=\"" + campo['FIELD_NAME'] + "\"]').value.trim()";
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 }

 }


 getAllVarFormItensForUpdate = function(listaDeCampos, callback) {
 var allVarFormItens = "";
 var onComplete = function() {
 callback(null, allVarFormItens);
 };
 var tasksToGo = listaDeCampos.length;


 for (var i = 0; i < listaDeCampos.length; i++) {
 var campo = listaDeCampos[i];
 if(i!=0) {
 allVarFormItens = allVarFormItens +"\n";
 }
 allVarFormItens = allVarFormItens + "template.find('[id=\""+campo['FIELD_NAME']+"\"]').value = "+collectionName+"s."+campo['FIELD_NAME']+";";
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 }

 }

 getAllVarFormItensForView = function(listaDeCampos, callback) {
 var allVarFormItens = "";
 var onComplete = function() {
 callback(null, allVarFormItens);
 };
 var tasksToGo = listaDeCampos.length;


 for (var i = 0; i < listaDeCampos.length; i++) {
 var campo = listaDeCampos[i];
 if(i!=0) {
 allVarFormItens = allVarFormItens +"\n";
 }
 allVarFormItens = allVarFormItens + "template.find('[id=\""+campo['FIELD_NAME']+"\"]').textContent = "+collectionName+"s."+campo['FIELD_NAME']+";";
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 }

 }


 getAllVarFormItensForList = function(listaDeCampos, callback) {
 var allVarFormItens = "";
 var onComplete = function() {
 callback(null, allVarFormItens);
 };
 var tasksToGo = listaDeCampos.length;


 for (var i = 0; i < listaDeCampos.length; i++) {
 var campo = listaDeCampos[i];
 if(i!=0) {
 allVarFormItens = allVarFormItens +",\n";
 allVarFormItens = allVarFormItens + "{key:'"+campo['FIELD_NAME']+"', label:'"+campo['FIELD_LABEL']+"'}";
 } else {
 allVarFormItens = allVarFormItens + "{key:'"+campo['FIELD_NAME']+"', label:'"+campo['FIELD_LABEL']+"', tmpl: Template."+collectionName+"Tmpl}";
 }

 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 }

 }

 getAllSpanItens = function(tagsDetalhesCampos,listaDeCampos, callback) {

 var onComplete = function() {
 callback(null, formEstrutura);
 };
 var tasksToGo = listaDeCampos.length;

 var formEstrutura = "";
 for (var i = 0; i < listaDeCampos.length; i++) {

 uf.getSpanItemFromTemplateFile(template,listaDeCampos[i],tagsDetalhesCampos,function(err, data){
 formEstrutura = formEstrutura+data;
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 });

 }

 }


 getFieldsForViewCollections = function(listaDeCampos, callback) {
 var fieldsForViewCollections = "";
 var onComplete = function() {
 callback(null, fieldsForViewCollections);
 };
 var tasksToGo = listaDeCampos.length;


 for (var i = 0; i < listaDeCampos.length; i++) {
 var campo = listaDeCampos[i];
 fieldsForViewCollections = fieldsForViewCollections +"{{"+ campo['FIELD_NAME'] +"}} | ";
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 }

 }

 getAllCollectionFieldsForCheck = function(listaDeCampos, callback) {
 var allCollectionFieldsForCheck = "";
 var onComplete = function() {
 callback(null, allCollectionFieldsForCheck);
 };
 var tasksToGo = listaDeCampos.length;


 for (var i = 0; i < listaDeCampos.length; i++) {
 var campo = listaDeCampos[i];
 allCollectionFieldsForCheck = allCollectionFieldsForCheck + campo['FIELD_NAME'] + ": " + campo['COLLECTION_FIELD__TYPE'] + ", ";
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 }

 }

 getAllSchemaFieldItens = function(tagsDetalhesCampos,listaDeCampos, callback) {

 var onComplete = function() {
 callback(null, schemaEstrutura);
 };
 var tasksToGo = listaDeCampos.length;

 var schemaEstrutura = "";
 for (var i = 0; i < listaDeCampos.length; i++) {

 uf.getSchemaFieldItemFromTemplateFile(template,listaDeCampos[i],tagsDetalhesCampos,function(err, data){
 schemaEstrutura = schemaEstrutura+data;
 if (--tasksToGo === 0) {
 // No tasks left, good to go
 onComplete();
 }
 });

 }

 }


 setTimeout(function(){
 // CODIGO PRINCIPAL
 if (action === ALL) {


 createAPI();
 createRoute();
 createUI();


 }
 else if (action === API) {
 createAPI();
 }
 else if (action === ROUTE) {
 createRoute();
 }
 else if (action === UI) {
 createUI();
 }
 else {
 console.error(errorr.erroUso);
 }

 }, 1000);

 */