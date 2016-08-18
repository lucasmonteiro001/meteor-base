import { Blaze } from 'meteor/blaze';
import './formGeneratorTemplates.html';
import { formGen } from './formGenerator';
import { UtilsView } from './ViewUtils';
import { Message } from './message';

let template;

Template.select2Collection.onCreated(() => {
  template = Template.instance();
  template.controller = Blaze._globalHelpers.getController(template.data.COLLECTION);
  let collectionData = template.data;

  UtilsView.applySubscribe(collectionData.COLLECTION, collectionData.COLLECTION_SCHEMA, template,
      '', function () {
        $(document).ready(function () {
          $('#' + collectionData.FIELD_NAME).select2();
        });
      }
  );

});
Template.select2Collection.onRendered(() => {

});

Template.select2Collection.helpers({
  'getFieldValue': (object, fieldName) => {
    return object[fieldName];
  },
  'collectionData': () => {
    template = Template.instance();
    if (template.controller) {
      return template.controller.getAll();
    } else {
      return {};
    }
  },
});
Template.select2Collection.events({});

Template.selectImageTemplate.onCreated(() => {
  template = Template.instance();
  let imageData = template.data;
});
Template.selectImageTemplate.onRendered(() => {
  template = Template.instance();
  let imageData = template.data;
  let $buttomInsert = $("#insertImg");

  if (typeof imageData.image != 'undefined') {
    $dataURLInto = $("#" + imageData.FIELD_NAME);
    $dataURLInto.val(imageData.image);
    $buttomInsert.html("Atualizar Imagem");
  }

  let $image = $(".image-crop > img")
  $($image).cropper({
    aspectRatio: 1.1,
    preview: ".img-preview",
    done: function (data) {
      // Output the result data for cropping image.
    }
  });

  let $inputImage = $("#inputImage");
  if (window.FileReader) {
    $inputImage.change(function () {
      let fileReader = new FileReader(),
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

  let $dataURLInto = $("#" + imageData.FIELD_NAME),
      $dataURLView = $("#imageView");

  $("#getDataURL2").click(function () {
    let dataURL = $image.cropper("getDataURL", "image/jpeg");

    $dataURLInto.val(dataURL);
    $buttomInsert.html("Atualizar Imagem");
    $dataURLView.attr('src', dataURL);
  });

  $("#sallet").click(function () {
    window.open($image.cropper("getDataURL", "image/jpeg"));
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
    $image.cropper("reset");
  });

});
Template.selectImageTemplate.helpers(() => {
});
Template.selectImageTemplate.events({

  'click button[data-target=".imageModal"]': function () {
  },
  'click button[data-dismiss="modal"]': function () {
  }
});

let actualObjectFieldInEditionByField = {};

$.fn.inlineEdit = function (fieldName, schema, template) {

  $(this).hover(function () {
    $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');
  });

  $(this).click(function () {

    let inputType = 'text';
    let validation = {};
    let field = $(this).attr('name');

    if (typeof actualObjectFieldInEditionByField.fieldName != 'undefined' &&
        actualObjectFieldInEditionByField.fieldName != "" &&
        typeof actualObjectFieldInEditionByField.formTemp != 'undefined' &&
        typeof actualObjectFieldInEditionByField.elem != 'undefined' &&
        actualObjectFieldInEditionByField.fieldName != field) {

      actualObjectFieldInEditionByField.formTemp.remove();
      actualObjectFieldInEditionByField.elem.show();
      actualObjectFieldInEditionByField.fieldName = field;
    } else {
      actualObjectFieldInEditionByField.fieldName = field;
    }

    if (typeof schema[field] != 'undefined' &&
        typeof schema[field].formOptions != 'undefined' &&
        typeof schema[field].formOptions.FIELD_TYPE != 'undefined') {

      inputType = schema[field].formOptions.FIELD_TYPE;

      if (typeof schema[field].formValidation != 'undefined')
        validation = schema[field].formValidation;

      let formTemp = $('<form id="tempInlineForm"> </form>');

      actualObjectFieldInEditionByField.formTemp = formTemp;

      let rWith = $('<input name="tempInLIneField" type="text" style="width:100%;border:0px;" />');

      rWith.keydown(function (e) {
        if (e.which == 13) {
          $(this).blur();
          return false;
        }

      });

      rWith.val($(this).text());
      let elem = $(this);
      actualObjectFieldInEditionByField.elem = elem;

      //rWith.appendTo(formTemp);

      elem.hide();
      elem.after(formTemp);

      if (validation != {}) {
        let rules = { tempInLIneField: {} };
        let message = { tempInLIneField: {} };

        for (let rulesKey in validation) {

          rules["tempInLIneField"][rulesKey] = validation[rulesKey].value;
          message["tempInLIneField"][rulesKey] = validation[rulesKey].message;
        }

        //Jquery Validation - https://jqueryvalidation.org/validate
        formTemp.validate({
          rules: rules,
          messages: message,
        });

      } else {
        formTemp.validate().currentForm = '';
      }

      rWith.appendTo(formTemp);
      rWith.focus();

      let line = $(this).attr('id');

      rWith.blur(function () {

        let validationOK = true;

        if (validation != {})
          validationOK = formTemp.valid();

        if (validationOK) {
          let val = $(this).val();
          let fieldInput = document.getElementById(fieldName);
          template.data.fieldObjectManagement.objectsData[line][field] = val;
          fieldInput.value = JSON.stringify(template.data.fieldObjectManagement.objectsData);
          elem.text($(this).val());

          formTemp.remove();
          elem.show();

          actualObjectFieldInEditionByField.fieldName = "";

        }
        ;
      });

    }

  });

};

Template.fieldObjectManagement.updateTable = (template)=> {
  let fieldInput = document.getElementById(template.data.fieldName);
  fieldInput.value = JSON.stringify(template.data.fieldObjectManagement.objectsData);
  document.getElementById('tableview-' + template.data.fieldName).innerHTML =
      UtilsView.getTableViewFromSchemaAndListOfObjects(template.data.fieldObjectManagement.schema, template.data.fieldObjectManagement.objectsData, true,
          'table dataTable no-footer', 'tableEdit-' + template.data.fieldName);

  $('#' + 'tableEdit-' + template.data.fieldName + ' td.val').each(function () {
    $(this).inlineEdit(template.data.fieldName, template.data.FIELD_SCHEMA, template);
  });
};

Template.fieldObjectManagement.onCreated(() => {
  template = Template.instance();

  //Objeto que guardará a Lista de Objetos do Campo
  template.data.fieldObjectManagement = {};

  if (typeof template.data.listOfObjects != 'undefined')
    template.data.fieldObjectManagement.objectsData = template.data.listOfObjects;
  else
    template.data.fieldObjectManagement.objectsData = [];

  template.data.fieldObjectManagement.schema = template.data.FIELD_SCHEMA;

});
Template.fieldObjectManagement.onRendered(() => {
  template = Template.instance();

  Template.fieldObjectManagement.updateTable(template);

  //Resonvendo problema quando é exibida mais de uma tela modal - On Show
  $('#modal-' + template.data.fieldName).on('show.bs.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $('#modal-' + template.data.fieldName).css('z-index', zIndex);
    setTimeout(function () {
      $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
  })

  //Resonvendo problema quando é exibida mais de uma tela modal - On Hide
  $('#modal-' + template.data.fieldName).on('hidden.bs.modal', function (e) {
    if ($('.modal:visible').length > 0) {
      // restore the modal-open class to the body element, so that scrolling works
      // properly after de-stacking a modal.
      setTimeout(function () {
        $('body').addClass('modal-open');
      }, 0);
    }
  })



});
Template.fieldObjectManagement.helpers(() => {
});
Template.fieldObjectManagement.events({
  'click button[id="showModalButton"]': function (event) {
    template = Template.instance();
    if (event.target.value == template.data.fieldName) {

      $('#modal-' + template.data.fieldName).modal('show');
      formGen.simpleFormRender('formModal-' + template.data.fieldName, template.data.fieldObjectManagement.schema);
    }

  },
  'click button[id="closeModalButton"]': function (event) {
    template = Template.instance();
    if (event.target.value == template.data.fieldName) {

      $('#modal-' + template.data.fieldName).modal('hide');

    }
  },
  'click button[id="save"]': function (event) {
    template = Template.instance();
    if (event.target.value == template.data.fieldName) {

      if ($('#formModal-' + template.data.fieldName).valid()) {

        let newObject = formGen.getSimpleFormData(template.data.fieldObjectManagement.schema, template);
        template.data.fieldObjectManagement.objectsData.push(newObject);
        Template.fieldObjectManagement.updateTable(template);
        $('#modal-' + template.data.fieldName).modal('hide');

        return true;
      } else {
        return false;
      }
    }
  },
  'click a[id="delObj"]': function (evt) {
    let template = Template.instance();
    let linha = $(evt.currentTarget).attr("value");
    Message.showConfirmation('Confirmar remoção', 'você deseja remover o item?', 'Sim', (e, result)=> {
      if (linha > -1 && result) {
        template.data.fieldObjectManagement.objectsData.splice(linha, 1);
        Template.fieldObjectManagement.updateTable(template);
      }

    });

  }

});
