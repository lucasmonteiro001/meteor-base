import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { colaboradoresController } from '../../../api/colaborador/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import { UtilsView } from '../../utils/ViewUtils';
import './colaborador.html';

let template;

Template.colaborador.onCreated(() => {
  template = Template.instance();
  template.data.canUserInsert = colaboradoresController.canUserDo('insert');
  UtilsView.applySubscribe(colaboradoresController, 'view', template, '', function () {
      }
  );

});
Template.colaborador.onRendered(() => {
  template = Template.instance();

});
Template.colaborador.helpers({});

Template.colaboradorAdd.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate

  formGen.formRender('formContext', true, colaboradoresController, 'insert', '', 'formTag');

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
Template.colaboradorAdd.events({
  'click a[id="testeModal"]': function () {
    UtilsView.showModalWithTemplateHTML("<div>Ola</div>", {});
  },

  //Eventos do template de inserção
  'submit form'(event, templateInstance){
    event.preventDefault();
    const colaboradorData = formGen.getFormData(colaboradoresController, 'insert', templateInstance);

    colaboradoresController.insert(colaboradorData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/colaboradorView/' + data);
      }

    });
  }
});

Template.colaboradorView.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  template.data.canUserUpdate = colaboradoresController.canUserDo('update');
  template.data.canUserRemove = colaboradoresController.canUserDo('remove');
  template.data.canUserAccessActions = colaboradoresController.canUserDo('update') || colaboradoresController.canUserDo('remove');

  UtilsView.applySubscribe(colaboradoresController, 'view', template, id, ()=> {
    template.collectionData = colaboradoresController.get({ _id: id });
    formGen.formViewRender('formContext', colaboradoresController, 'view', id);
  });

});
Template.colaboradorView.onRendered(() => {

});
Template.colaboradorView.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return colaboradoresController.get({ _id: id });
  },
});


Template.colaboradorView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o colaborador?', 'Não é possível recuperar um colaborador removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            colaboradoresController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('colaborador');
                Message.showSuccessNotification('O colaborador foi removido com sucesso!');
              }
            });
          }
        });
  },
});

Template.colaboradorEdit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  UtilsView.applySubscribe(colaboradoresController, 'update', template, id, ()=> {
    template.collectionData = colaboradoresController.get({ _id: id });
    formGen.formRender('formContext', true, colaboradoresController, 'update', id, 'formTag');
  });

});
Template.colaboradorEdit.onRendered(() => {

});
Template.colaboradorEdit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return colaboradoresController.get({ _id: id });
  },
});
Template.colaboradorEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const colaboradorData = formGen.getFormData(colaboradoresController, 'update', template);

    colaboradoresController.update(id, colaboradorData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/colaboradorView/' + id);
      }

    });
  },
});

Template.colaboradorList.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(colaboradoresController, 'tableview', template, '', function () {
  });
});

let dataTableData = function () {

  return colaboradoresController.getAll().fetch();

};

let optionsObject = UtilsView.getDataTableConfig(colaboradoresController, 'tableview');

Template.colaboradorList.helpers({
  reactiveDataFunction: function () {

    return dataTableData;
  },
  optionsObject: optionsObject,
});
Template.colaboradorList.onRendered(() => {

});
Template.colaboradorList.events({});
