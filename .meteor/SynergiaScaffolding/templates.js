/**
 * Created by luizluz on 04/07/2016.
 */
var M = require('mstring');

var templates = [];

//collection.js - template do arquivo imports/api/collection_name/collection.js
templates['collection.js'] = M(function () {
  /***
   import { CollectionBase } from '../reuse/collectionBase';

   export const Collection{COLLECTION_NAME} = new CollectionBase('{COLLECTION_NAME}');

   Collection{COLLECTION_NAME}.setSchema({
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_COMPONENT: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Nome',
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    },
    dataTableConfig: {
      link: {
        router: '{COLLECTION_NAME}View',
        field: '_id',
      },
    },
  },
  dataNascimento: {
    type: Date,
    optional: true,
    label: 'Data de Nascimento',
    formOptions: {
      FIELD_COMPONENT: 'inputDateH',
      FIELD_TYPE: 'date',
    },
    formValidation: {
      required: { value: true, message: 'A Data de Nascimento é obrigatória' },
    },
  },
  email: {
    type: String,
    defaultValue: '',
    optional: true,
    label: 'Email',
    formOptions: {
      FIELD_COMPONENT: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Email',

    },
    formValidation: {
      required: { value: true, message: 'O email é obrigatório' },
      email: { value: true, message: 'O email informado não é válido' },
    },
    dataTableConfig: {
      label: 'Email',
    },
  },
  userId: {
    type: String,
    label: 'Associated User ID',
    autoValue: function () {
      return this.userId;
    },

    dataTableConfig: {
      visible: false,
      orderable: false,
      searchable: false,
    },
  },
});

   Collection{COLLECTION_NAME}.addSubSchema('insert',
   ['nome', 'dataNascimento','email']);

   Collection{COLLECTION_NAME}.addSubSchema('update',
   ['nome', 'dataNascimento']);

   Collection{COLLECTION_NAME}.addSubSchema('view',
   ['nome', 'dataNascimento','userId']);

   Collection{COLLECTION_NAME}.addSubSchema('tableview',
   ['nome', 'dataNascimento','userId']);

   //################################################
   //############ RESTRIÇÃO DE ACESSO ###############
   //################################################

   let permissions = [{
  actions: ['insert', 'update'],
  groups: ['administrador'], //Permissions by Functionality
  data: { userId: "{_UserID_}" }, //Filter/Permissions by Data
}
   ];

   Collection{COLLECTION_NAME}.setPermissions(permissions);

   ***/
});

templates['controller.js'] = M(function () {
  /***
   import { Collection{COLLECTION_NAME} } from './collection';
   import { ControllerBase } from '../reuse/controllerBase';

   class Controller{COLLECTION_NAME} extends ControllerBase {

}

   export const {COLLECTION_NAME}Controller = new Controller{COLLECTION_NAME}(Collection{COLLECTION_NAME});


   ***/
});

templates['model.js'] = M(function () {
  /***
   import {Collection{COLLECTION_NAME}} from "./collection.js";
   import {ModelBase} from "../reuse/modelBase";

   class Model{COLLECTION_NAME} extends ModelBase {

}

   export const Mdl{COLLECTION_NAME} = new Model{COLLECTION_NAME}(Collection{COLLECTION_NAME});

   //Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
   Mdl{COLLECTION_NAME}.applyAllMethods();

   //Aplicar as publicações que serão consideradas quando no Client for executado
   // o "Template.subscribe"
   Mdl{COLLECTION_NAME}.applyPublications();

   ***/
});

templates['uiTemplateCRUD.html'] = M(function () {
  /***

   <template name="{COLLECTION_NAME}">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> Lista de {COLLECTION_NAME} </h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li class="active">
   <strong> Lista de {COLLECTION_NAME} </strong>
   </li>
   </ol>
   </div>
   </div>

   <div class="wrapper wrapper-content white-bg animated fadeIn">

   {{#if canUserInsert}}
   <div class="row">
   <div class="col-lg-12">
   <div class="pull-right btAdd">
   <a href="{{pathFor '{COLLECTION_NAME}Add'}}" id="insert" class="btn btn-success" name="insert">
   <i class="fa fa-plus-circle" aria-hidden="true"></i> Novo</a>
   </div>
   </div>
   </div>
   {{/if}}

   <div class="row">
   <div class="col-lg-12 fixedSWidthDiv">
   {{> {COLLECTION_NAME}List}}
   </div>
   </div>
   </div>
   </template>

   <template name="{COLLECTION_NAME}Add">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> Cadastrar Colaborador </h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li>
   <a href="{{pathFor route='{COLLECTION_NAME}'}}">Lista de {COLLECTION_NAME}</a>
   </li>
   <li class="active">
   <strong> Cadastrar Colaborador </strong>
   </li>
   </ol>
   </div>
   </div>


   <div class="wrapper wrapper-content white-bg animated fadeIn" style="padding-bottom:10px;">
   <form class="form-horizontal row-border" id="formTag" data-toggle="validator" role="form">
   <div class="row">
   <div class="col-lg-12">
   <div class="panel-body" id="formContext"></div>
   </div>
   </div>

   <div class="row">
   <div class="col-lg-12">
   <div class="pull-right btAdd">
   <button type="submit" class="btn btn-primary">Salvar</button>
   <a href="{{pathFor '{COLLECTION_NAME}'}}" class="btn">Voltar</a>
   </div>
   </div>
   </div>
   </form>
   </div>
   </template>

   <template name="{COLLECTION_NAME}Edit">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-12">
   <h2> {{ collectionData.nome }}</h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li>
   <a href="{{pathFor route='{COLLECTION_NAME}'}}">Lista de {COLLECTION_NAME}</a>
   </li>

   <li class="active">
   <strong> {{ collectionData.nome }}</strong>
   </li>
   </ol>
   </div>
   </div>


   <div class="wrapper wrapper-content white-bg animated fadeIn" style="padding-bottom:10px;">
   <form class="form-horizontal row-border" id="formTag" data-toggle="validator" role="form">
   <div class="row">
   <div class="col-lg-12">
   <div class="panel-body" id="formContext"></div>
   </div>
   </div>
   <div class="row">
   <div class="col-lg-12">
   <div class="pull-right btAdd">
   <button type="submit" class="btn btn-primary">Salvar</button>
   <a href="{{pathFor '{COLLECTION_NAME}View'}}/{{collectionData._id}}" class="btn">Voltar</a>
   </div>
   </div>
   </div>
   </form>
   </div>
   </template>

   <template name="{COLLECTION_NAME}View">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> {{ collectionData.nome }}</h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li>
   <a href="{{pathFor route='{COLLECTION_NAME}'}}">Lista de {COLLECTION_NAME}</a>
   </li>

   <li class="active">
   <strong> {{ collectionData.nome }}</strong>
   </li>
   </ol>
   </div>
   <div class="col-lg-4">
   <div class="pull-right">
   <a id="btn-criar-chamado-voltar" class="btn btn-default" href="{{pathFor '{COLLECTION_NAME}'}}">
   <i class="fa fa-arrow-left" aria-hidden="true"></i>
   Voltar
   </a>
   {{#if canUserAccessActions}}

   <div class="btn-group">
   <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
   aria-expanded="false">
   Ações <span class="caret"></span>
   </button>
   <ul class="dropdown-menu dropdown-menu-right" role="menu">

   {{#if canUserUpdate}}
   <li><a id="linkEdit" href="{{pathFor '{COLLECTION_NAME}Edit'}}/{{collectionData._id}}"
   name="update"><i
   class="icon icon-pencil"></i>
   Editar</a></li>
   {{/if}}
   <li class="divider"></li>
   {{#if canUserRemove}}
   <li><a id="linkExcluir" href="#!" value="{{collectionData._id}}" name="remove"><i
   class="icon icon-pencil"></i>
   Excluir</a>
   </li>
   {{/if}}
   </ul>
   </div>
   {{/if}}
   </div>
   </div>
   </div>


   <div class="wrapper wrapper-content white-bg animated fadeIn" style="padding-bottom:10px;">
   <div class="row form-horizontal row-border">
   <div class="col-lg-12">
   <div class="panel-body" id="formContext"></div>
   </div>
   </div>
   </div>
   </template>

   <template name="{COLLECTION_NAME}List">
   {{> ReactiveDatatable tableData=reactiveDataFunction options=optionsObject}}
   </template>

   ***/
});

templates['uiTemplateCRUD.js'] = M(function () {
  /***

   import { Template } from 'meteor/templating';
   import { FlowRouter } from 'meteor/kadira:flow-router';
   import { {COLLECTION_NAME}Controller } from '../../../api/{COLLECTION_NAME}/controller.js';
   import { Message } from '../../utils/message';
   import { formGen } from '../../utils/formGenerator';
   import { UtilsView } from '../../utils/ViewUtils';
   import './{COLLECTION_NAME}.html';

   let template;

   Template.{COLLECTION_NAME}.onCreated(() => {
  template = Template.instance();
  template.data.canUserInsert = {COLLECTION_NAME}Controller.canUserDo('insert');
  UtilsView.applySubscribe({COLLECTION_NAME}Controller, 'view', template, '', function () {
      }
  );

});
   Template.{COLLECTION_NAME}.onRendered(() => {
  template = Template.instance();

});
   Template.{COLLECTION_NAME}.helpers({});

   Template.{COLLECTION_NAME}Add.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate

  formGen.formRender('formContext', true, {COLLECTION_NAME}Controller, 'insert', '', 'formTag');

  // Set options for cropper plugin

  var $image = $(".image-crop > img")
  $($image).cropper({
    aspectRatio: 1.1,
    preview: ".img-preview",
    background: true,
    done: function (data) {
      // Output the result data for cropping image.
    }
  });

  var $inputImage = $("#inputImage");
  if (window.FileReader) {
    $inputImage.change(function () {
      var fileReader = new FileReader(),
          files = this.files,
          file;

      if (!files.length) {
        return;
      }

      file = files[0];

      if (/^image\/\w+$/.test(file.type)) {
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
          $inputImage.val("");
          $image.cropper("reset", true).cropper("replace", this.result);
        };
      } else {
        showMessage("Please choose an image file.");
      }
    });
  } else {
    $inputImage.addClass("hide");
  }

  $("#salvar").click(function () {
    window.open($image.cropper("getDataURL"));
  });
  $("#zoomIn").click(function () {
    $image.cropper("zoom", 0.1);
  });
  $("#zoomOut").click(function () {
    $image.cropper("zoom", -0.1);
  });
  $("#rotateLeft").click(function () {
    $image.cropper("rotate", 45);
  });
  $("#rotateRight").click(function () {
    $image.cropper("rotate", -45);
  });
  $("#setDrag").click(function () {
    $image.cropper("setDragMode", "crop");
  });
  $("#moveUp").click(function () {
    $image.cropper("move", 0, -10);
  });
  $("#moveDown").click(function () {
    $image.cropper("move", 0, 10);
  });
  $("#moveLeft").click(function () {
    $image.cropper("move", -10, 0);
  });
  $("#moveRight").click(function () {
    $image.cropper("move", 10, 0);
  });

  $('#myModal').modal('show');

});
   Template.{COLLECTION_NAME}Add.events({
  'click a[id="testeModal"]': function () {
    UtilsView.showModalWithTemplateHTML("<div>Ola</div>", {});
  },

  //Eventos do template de inserção
  'submit form'(event, templateInstance){
    event.preventDefault();
    const {COLLECTION_NAME}Data = formGen.getFormData({COLLECTION_NAME}Controller, 'insert', templateInstance);

    {COLLECTION_NAME}Controller.insert({COLLECTION_NAME}Data, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/{COLLECTION_NAME}View/' + data);
      }

    });
  }
});

   Template.{COLLECTION_NAME}View.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  template.data.canUserUpdate = {COLLECTION_NAME}Controller.canUserDo('update');
  template.data.canUserRemove = {COLLECTION_NAME}Controller.canUserDo('remove');
  template.data.canUserAccessActions = {COLLECTION_NAME}Controller.canUserDo('update') || {COLLECTION_NAME}Controller.canUserDo('remove');

  UtilsView.applySubscribe({COLLECTION_NAME}Controller, 'view', template, id, ()=> {
    template.collectionData = {COLLECTION_NAME}Controller.get({ _id: id });
    formGen.formViewRender('formContext', {COLLECTION_NAME}Controller, 'view', id);
  });

});
   Template.{COLLECTION_NAME}View.onRendered(() => {

});
   Template.{COLLECTION_NAME}View.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return {COLLECTION_NAME}Controller.get({ _id: id });
  },
});


   Template.{COLLECTION_NAME}View.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o {COLLECTION_NAME}?', 'Não é possível recuperar um {COLLECTION_NAME} removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            {COLLECTION_NAME}Controller.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('{COLLECTION_NAME}');
                Message.showSuccessNotification('O {COLLECTION_NAME} foi removido com sucesso!');
              }
            });
          }
        });
  },
});

   Template.{COLLECTION_NAME}Edit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  UtilsView.applySubscribe({COLLECTION_NAME}Controller, 'update', template, id, ()=> {
    template.collectionData = {COLLECTION_NAME}Controller.get({ _id: id });
    formGen.formRender('formContext', true, {COLLECTION_NAME}Controller, 'update', id, 'formTag');
  });

});
   Template.{COLLECTION_NAME}Edit.onRendered(() => {

});
   Template.{COLLECTION_NAME}Edit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return {COLLECTION_NAME}Controller.get({ _id: id });
  },
});
   Template.{COLLECTION_NAME}Edit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const {COLLECTION_NAME}Data = formGen.getFormData({COLLECTION_NAME}Controller, 'update', template);

    {COLLECTION_NAME}Controller.update(id, {COLLECTION_NAME}Data, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/{COLLECTION_NAME}View/' + id);
      }

    });
  },
});

   Template.{COLLECTION_NAME}List.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe({COLLECTION_NAME}Controller, 'tableview', template, '', function () {
  });
});

   let dataTableData = function () {

  return {COLLECTION_NAME}Controller.getAll().fetch();

};

   let optionsObject = UtilsView.getDataTableConfig({COLLECTION_NAME}Controller, 'tableview');

   Template.{COLLECTION_NAME}List.helpers({
  reactiveDataFunction: function () {

    return dataTableData;
  },
  optionsObject: optionsObject,
});
   Template.{COLLECTION_NAME}List.onRendered(() => {

});
   Template.{COLLECTION_NAME}List.events({});



   ***/
});

templates['uiTemplateSimple.js'] = M(function () {
  /***
   import { Template } from 'meteor/templating';
   import './{COLLECTION_NAME}.html';

   let template;

   Template.{COLLECTION_NAME}.onCreated(() => {
  template = Template.instance();
});

   Template.{COLLECTION_NAME}.helpers({});
   ***/
});

templates['uiTemplateSimple.html'] = M(function () {
  /***
   <template name="{COLLECTION_NAME}">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> Lista de {COLLECTION_NAME} </h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li class="active">
   <strong> {COLLECTION_NAME} </strong>
   </li>
   </ol>
   </div>
   </div>

   <div class="wrapper wrapper-content white-bg animated fadeIn">
   <div class="row">
   <div class="col-lg-12">
   <div class="text-center m-t-lg">

   <h1>
   {COLLECTION_NAME}
   </h1>
   </div>

   </div>
   <br>
   <div>


   </div>
   </div>
   </div>



   </template>

   ***/
});

templates['authenticated-routes-simple'] = M(function () {
  /***
   authenticatedRoutes.route('/{COLLECTION_NAME}', {
  name: '{COLLECTION_NAME}',
  triggersEnter: [blockUnauthorizedAdmin],
  action() {
    BlazeLayout.render('default', { yield: '{COLLECTION_NAME}' });
  },
});
   ***/
});

templates['authenticated-routes-crud'] = M(function () {
  /***

   UtilsRouter.applyRoutersForCRUD(authenticatedRoutes,'{COLLECTION_NAME}',FlowRouter,BlazeLayout);

   ***/
});

templates['Item-Menu'] = M(function () {
  /***
   <li class="{{currentRoute '{COLLECTION_NAME}'}}"><a href="{{pathFor '{COLLECTION_NAME}'}}"><i
   class="fa fa-user"></i><span
   class="nav-label">{COLLECTION_NAME}</span></a>
   </li>
   ***/
});


templates['template-getController'] = M(function () {
  /***
   case '{COLLECTION_NAME}':
   return {COLLECTION_NAME}Controller;
   break;
   ***/
});

templates['template_model'] = M(function () {
  /***

   ***/
});

var getTemplate = function (templateName) {
  return templates[templateName];
}

module.exports = {
  getTemplate: getTemplate

}

