/**
 * Created by luizluz on 04/07/2016.
 */
var M = require('mstring');

var templates = [];

//collection.js - template do arquivo imports/api/collection_name/collection.js
templates['collection.js'] = M(function () {
  /***
   import { CollectionBase } from '../reuse/collectionBase';

   export const CollectionColaboradores = new CollectionBase('Colaboradores');

   CollectionColaboradores.setSchema({
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Nome',
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
    },
    dataTableConfig: {
      link: {
        router: 'ColaboradoresView',
        field: '_id',
      },
    },
  },
  dataNascimento: {
    type: Date,
    optional: true,
    label: 'Data de Nascimento',
    formOptions: {
      FIELD_TAG: 'inputDateH',
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
      FIELD_TAG: 'inputH',
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

   CollectionColaboradores.addSubSchema('insert',
   ['nome', 'dataNascimento','email']);

   CollectionColaboradores.addSubSchema('update',
   ['nome', 'dataNascimento']);

   CollectionColaboradores.addSubSchema('view',
   ['nome', 'dataNascimento','userId']);

   CollectionColaboradores.addSubSchema('tableview',
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

   CollectionColaboradores.setPermissions(permissions);

   ***/
});

templates['controller.js'] = M(function () {
  /***
   import { CollectionColaboradores } from './collection';
   import { ControllerBase } from '../reuse/controllerBase';

   class ControllerColaboradores extends ControllerBase {

}

   export const ColaboradoresController = new ControllerColaboradores(CollectionColaboradores);


   ***/
});

templates['model.js'] = M(function () {
  /***
   import {CollectionColaboradores} from "./collection.js";
   import {ModelBase} from "../reuse/modelBase";

   class ModelColaboradores extends ModelBase {

}

   export const MdlColaboradores = new ModelColaboradores(CollectionColaboradores);

   //Aplicar os métodos que serão utilizados no Client através do "Meteor.Call"
   MdlColaboradores.applyAllMethods();

   //Aplicar as publicações que serão consideradas quando no Client for executado
   // o "Template.subscribe"
   MdlColaboradores.applyPublications();

   ***/
});

templates['uiTemplateCRUD.html'] = M(function () {
  /***

   <template name="Colaboradores">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> Lista de Colaboradores </h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li class="active">
   <strong> Lista de Colaboradores </strong>
   </li>
   </ol>
   </div>
   </div>

   <div class="wrapper wrapper-content white-bg animated fadeIn">

   {{#if canUserInsert}}
   <div class="row">
   <div class="col-lg-12">
   <div class="pull-right btAdd">
   <a href="{{pathFor 'ColaboradoresAdd'}}" id="insert" class="btn btn-success" name="insert">
   <i class="fa fa-plus-circle" aria-hidden="true"></i> Novo</a>
   </div>
   </div>
   </div>
   {{/if}}

   <div class="row">
   <div class="col-lg-12 fixedSWidthDiv">
   {{> ColaboradoresList}}
   </div>
   </div>
   </div>
   </template>

   <template name="ColaboradoresAdd">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> Cadastrar Colaborador </h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li>
   <a href="{{pathFor route='Colaboradores'}}">Lista de Colaboradores</a>
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
   <a href="{{pathFor 'Colaboradores'}}" class="btn">Voltar</a>
   </div>
   </div>
   </div>
   </form>
   </div>
   </template>

   <template name="ColaboradoresEdit">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-12">
   <h2> {{ collectionData.nome }}</h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li>
   <a href="{{pathFor route='Colaboradores'}}">Lista de Colaboradores</a>
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
   <a href="{{pathFor 'ColaboradoresView'}}/{{collectionData._id}}" class="btn">Voltar</a>
   </div>
   </div>
   </div>
   </form>
   </div>
   </template>

   <template name="ColaboradoresView">
   <div class="row wrapper border-bottom white-bg page-heading">
   <div class="col-lg-8">
   <h2> {{ collectionData.nome }}</h2>
   <ol class="breadcrumb">
   <li>
   <a href="{{pathFor route='index'}}">Página Principal</a>
   </li>
   <li>
   <a href="{{pathFor route='Colaboradores'}}">Lista de Colaboradores</a>
   </li>

   <li class="active">
   <strong> {{ collectionData.nome }}</strong>
   </li>
   </ol>
   </div>
   <div class="col-lg-4">
   <div class="pull-right">
   <a id="btn-criar-chamado-voltar" class="btn btn-default" href="{{pathFor 'Colaboradores'}}">
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
   <li><a id="linkEdit" href="{{pathFor 'ColaboradoresEdit'}}/{{collectionData._id}}"
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

   <template name="ColaboradoresList">
   {{> ReactiveDatatable tableData=reactiveDataFunction options=optionsObject}}
   </template>

   ***/
});

templates['uiTemplateCRUD.js'] = M(function () {
  /***

   import { Template } from 'meteor/templating';
   import { FlowRouter } from 'meteor/kadira:flow-router';
   import { ColaboradoresController } from '../../../api/Colaboradores/controller.js';
   import { Message } from '../../utils/message';
   import { formGen } from '../../utils/formGenerator';
   import { UtilsView } from '../../utils/ViewUtils';
   import './Colaboradores.html';

   let template;

   Template.Colaboradores.onCreated(() => {
  template = Template.instance();
  template.data.canUserInsert = ColaboradoresController.canUserDo('insert');
  UtilsView.applySubscribe(ColaboradoresController, 'view', template, '', function () {
      }
  );

});
   Template.Colaboradores.onRendered(() => {
  template = Template.instance();

});
   Template.Colaboradores.helpers({});

   Template.ColaboradoresAdd.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate

  formGen.formRender('formContext', true, ColaboradoresController, 'insert', '', 'formTag');

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
   Template.ColaboradoresAdd.events({
  'click a[id="testeModal"]': function () {
    UtilsView.showModalWithTemplateHTML("<div>Ola</div>", {});
  },

  //Eventos do template de inserção
  'submit form'(event, templateInstance){
    event.preventDefault();
    const ColaboradoresData = formGen.getFormData(ColaboradoresController, 'insert', templateInstance);

    ColaboradoresController.insert(ColaboradoresData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/ColaboradoresView/' + data);
      }

    });
  }
});

   Template.ColaboradoresView.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  template.data.canUserUpdate = ColaboradoresController.canUserDo('update');
  template.data.canUserRemove = ColaboradoresController.canUserDo('remove');
  template.data.canUserAccessActions = ColaboradoresController.canUserDo('update') || ColaboradoresController.canUserDo('remove');

  UtilsView.applySubscribe(ColaboradoresController, 'view', template, id, ()=> {
    template.collectionData = ColaboradoresController.get({ _id: id });
    formGen.formViewRender('formContext', ColaboradoresController, 'view', id);
  });

});
   Template.ColaboradoresView.onRendered(() => {

});
   Template.ColaboradoresView.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return ColaboradoresController.get({ _id: id });
  },
});


   Template.ColaboradoresView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o Colaboradores?', 'Não é possível recuperar um Colaboradores removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            ColaboradoresController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('Colaboradores');
                Message.showSuccessNotification('O Colaboradores foi removido com sucesso!');
              }
            });
          }
        });
  },
});

   Template.ColaboradoresEdit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  UtilsView.applySubscribe(ColaboradoresController, 'update', template, id, ()=> {
    template.collectionData = ColaboradoresController.get({ _id: id });
    formGen.formRender('formContext', true, ColaboradoresController, 'update', id, 'formTag');
  });

});
   Template.ColaboradoresEdit.onRendered(() => {

});
   Template.ColaboradoresEdit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return ColaboradoresController.get({ _id: id });
  },
});
   Template.ColaboradoresEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const ColaboradoresData = formGen.getFormData(ColaboradoresController, 'update', template);

    ColaboradoresController.update(id, ColaboradoresData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/ColaboradoresView/' + id);
      }

    });
  },
});

   Template.ColaboradoresList.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(ColaboradoresController, 'tableview', template, '', function () {
  });
});

   let dataTableData = function () {

  return ColaboradoresController.getAll().fetch();

};

   let optionsObject = UtilsView.getDataTableConfig(ColaboradoresController, 'tableview');

   Template.ColaboradoresList.helpers({
  reactiveDataFunction: function () {

    return dataTableData;
  },
  optionsObject: optionsObject,
});
   Template.ColaboradoresList.onRendered(() => {

});
   Template.ColaboradoresList.events({});



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

   UtilsRouter.applyRoutersForCRUD(authenticatedRoutes,'Colaboradores',FlowRouter,BlazeLayout);

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

