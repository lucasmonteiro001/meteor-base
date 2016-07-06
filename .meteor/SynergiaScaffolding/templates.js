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

   //Definição dos Schemas
   Collection{COLLECTION_NAME}.setSchema({
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Nome'
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    },
    tableView: {
      label: 'Nome',
      template: 'tmpl',
    },
  },
  DataNascimento: {
    type: Date,
    defaultValue: '',
    optional: true,
    label: 'Data de Nascimento',
    formOptions: {
      FIELD_TAG: 'inputdate',
      FIELD_TYPE: 'date',
    },
    formValidation: {
      required: { value: true, message: 'A Data de Nascimento é obrigatória' },
    },
  },
  userId: {
    type: String,
    label: 'Associated User ID',
  },
});

   Collection{COLLECTION_NAME}.addSubSchema('insert', ['nome', 'DataNascimento', 'userId']);

   Collection{COLLECTION_NAME}.addSubSchema('update',
   ['nome', 'DataNascimento']);

   Collection{COLLECTION_NAME}.addSubSchema('view',
   ['nome', 'DataNascimento']);

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
   import { Collection{COLLECTION_NAME} } from './collection.js';
   import { ModelBase } from '../reuse/modelBase';

   class Model{COLLECTION_NAME} extends ModelBase {

}

   export const Mdl{COLLECTION_NAME} = new Model{COLLECTION_NAME}(Collection{COLLECTION_NAME});

   //Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
   Mdl{COLLECTION_NAME}.applyAllMethods();

   //Aplicar as publicações que serão consideradas quando no Client for executado
   // o "Template.subscribe"
   Mdl{COLLECTION_NAME}.applyPublications();

   //################################################
   //############ RESTRIÇÃO POR FUNCIONALIDADE ######
   //################################################
   //Por default, somente administradores conseguem editar as informações.
   //Mais informações: https://atmospherejs.com/ongoworks/security

   //Grupos que podem realizar operações no banco de dados
   let groups = ['administrador'];
   Mdl{COLLECTION_NAME}.setGroupPermissions(['insert', 'update', 'remove', 'read'], groups);

   //################################################
   //############ RESTRIÇÃO POR DADOS ###############
   //################################################



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
   <div class="col-lg-12">
   {{> {COLLECTION_NAME}List}}
   </div>
   </div>
   </div>
   </template>

   <template name="{COLLECTION_NAME}Add">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> Cadastrar {COLLECTION_NAME} </h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li class="active">
   <strong> Cadastrar {COLLECTION_NAME} </strong>
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
   {{> reactiveTable settings=settings}}
   </template>

   <template name="{COLLECTION_NAME}Tmpl">
   <a href="{{pathFor '{COLLECTION_NAME}View'}}/{{_id}}">  {{nome}} </a>
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
  UtilsView.applySubscribe({COLLECTION_NAME}Controller, 'view', template, '', function () {
      }
  );
  template.canInsert = new ReactiveVar(false);
});
   Template.{COLLECTION_NAME}.onRendered(() => {
  template = Template.instance();
  {COLLECTION_NAME}Controller.checkIfCanUserInsert(template.canInsert);
});
   Template.{COLLECTION_NAME}.helpers({
  'canUserInsert': () => {
    template = Template.instance();
    {COLLECTION_NAME}Controller.checkIfCanUserInsert(template.canInsert);
    return template.canInsert.get();
  },
});

   Template.{COLLECTION_NAME}Add.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate

  formGen.formRender('formContext', true, {COLLECTION_NAME}Controller, 'insert', '', 'formTag');

});
   Template.{COLLECTION_NAME}Add.events({

  //Eventos do template de inserção
  'submit form'(event, templateInstance) {
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
  },
});

   Template.{COLLECTION_NAME}View.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  template.canUpdate = new ReactiveVar(false);
  template.canRemove = new ReactiveVar(false);

  UtilsView.applySubscribe({COLLECTION_NAME}Controller, 'view', template, id, ()=> {
    {COLLECTION_NAME}Controller.checkIfCanUserUpdate(template.canUpdate, id);
    {COLLECTION_NAME}Controller.checkIfCanUserRemove(template.canRemove, id);
    template.collectionData = {COLLECTION_NAME}Controller.get({ _id: id });
    formGen.formViewRender('formContext', {COLLECTION_NAME}Controller, 'view', id);
  });

});
   Template.{COLLECTION_NAME}View.onRendered(() => {

});
   Template.{COLLECTION_NAME}View.helpers({
  'canUserUpdate': () => {
    let template = Template.instance();
    {COLLECTION_NAME}Controller.checkIfCanUserUpdate(template.canUpdate, FlowRouter.getParam('_id'));
    return template.canUpdate.get();
  },

  'canUserRemove': () => {
    let template = Template.instance();
    {COLLECTION_NAME}Controller.checkIfCanUserRemove(template.canRemove, FlowRouter.getParam('_id'));
    return template.canRemove.get();
  },

  'canUserAccessActions': () => {
    let template = Template.instance();
    if (typeof template.canRemove != 'undefined' && template.canUpdate != 'undefined') {
      return template.canRemove.get() || template.canUpdate.get();
    }
  },

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
  UtilsView.applySubscribe({COLLECTION_NAME}Controller, 'view', template, '', function () {
  });
});
   Template.{COLLECTION_NAME}List.helpers({
  'settings': function () {
    let templates = { tmpl: Template.{COLLECTION_NAME}Tmpl };
    return {
      collection: {COLLECTION_NAME}Controller.getCollection(),
      rowsPerPage: false,
      showFilter: false,
      showRowCount: false,
      showColumnToggles: false,
      multiColumnSort: false,
      showNavigationRowsPerPage: false,
      showNavigation: true,
      currentPage: false,
      sortable: false,
      fields: formGen.getTableViewData({COLLECTION_NAME}Controller, 'view', templates),
    };
  },
});


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
   authenticatedRoutes.route('/{COLLECTION_NAME}', {
  name: '{COLLECTION_NAME}',
  action() {
    BlazeLayout.render('default', { yield: '{COLLECTION_NAME}' });
  },
});
   authenticatedRoutes.route('/{COLLECTION_NAME}Add', {
  name: '{COLLECTION_NAME}Add',
  action() {
    BlazeLayout.render('default', { yield: '{COLLECTION_NAME}Add' });
  },
});
   authenticatedRoutes.route('/{COLLECTION_NAME}Edit/:_id', {
  name: '{COLLECTION_NAME}Edit',
  action() {
    cvFunction = new CanViewFunction(function () {
      BlazeLayout.render('default', { yield: '{COLLECTION_NAME}Edit' });
    });

    const id = FlowRouter.getParam('_id');
    {COLLECTION_NAME}Controller.checkIfCanUserUpdate(cvFunction, id);
  },
});
   authenticatedRoutes.route('/{COLLECTION_NAME}View/:_id', {
  name: '{COLLECTION_NAME}View',
  action() {
    cvFunction = new CanViewFunction(function () {
      BlazeLayout.render('default', { yield: '{COLLECTION_NAME}View' });
    });

    const id = FlowRouter.getParam('_id');
    {COLLECTION_NAME}Controller.checkIfCanUserView(cvFunction, id);
  },
});
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

