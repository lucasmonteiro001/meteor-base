import { Blaze } from 'meteor/blaze';
import './formGeneratorTemplates.html';
import { formGen } from './formGenerator';
import { UtilsView } from './ViewUtils';

let template;

Template.select2Collection.onCreated(() => {
  template = Template.instance();
  template.controller = Blaze._globalHelpers.getController(template.data.COLLECTION);
  let collectionData = template.data;

  UtilsView.applySubscribe(collectionData.COLLECTION, collectionData.COLLECTION_SCHEMA, template,
      '', function () {
        $(document).ready(function () {
          $('#' + collectionData.FIELD_NAME).select2();
          console.log('#' + collectionData.FIELD_NAME);
        });
      }
  );

});
Template.select2Collection.onRendered(() => {

});

Template.select2Collection.getFieldValue = (object, fieldName)=> {
  return object[fieldName];
}

Template.select2Collection.helpers({
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

let fieldObjectManagement = {};

Template.fieldObjectManagement.onCreated(() => {
  template = Template.instance();
  if (typeof template.data.listOfObjects != 'undefined')
    fieldObjectManagement.objectsData = template.data.listOfObjects;
  else
    fieldObjectManagement.objectsData = [];
  fieldObjectManagement.schema = template.data.schema;
});
Template.fieldObjectManagement.onRendered(() => {
  template = Template.instance();

  let replaceWith = $('<input name="temp" type="text" />');
  let connectWith = $('input[name="hiddenField"]');

  $.fn.inlineEdit = function (replaceWith, connectWith) {

    $(this).hover(function () {
      $(this).addClass('hover');
    }, function () {
      $(this).removeClass('hover');
    });

    $(this).click(function () {
      replaceWith.val($(this).text());
      console.log($(this));
      let elem = $(this);

      elem.hide();
      elem.after(replaceWith);
      replaceWith.focus();

      let line = $(this).attr('id');
      let field = $(this).attr('name');

      replaceWith.blur(function () {
        let val = $(this).val();
        let fieldInput = document.getElementById(template.data.fieldName);
        fieldObjectManagement.objectsData[line][field] = val;
        fieldInput.value = JSON.stringify(fieldObjectManagement.objectsData);
        connectWith.val($(this).val()).change();
        elem.text($(this).val());

        $(this).remove();
        elem.show();
      });
    });
  };

  let fieldInput = document.getElementById(template.data.fieldName);
  fieldInput.value = JSON.stringify(fieldObjectManagement.objectsData);
  document.getElementById('tableview').innerHTML =
      UtilsView.getTableViewFromSchemaAndListOfObjects(fieldObjectManagement.schema, fieldObjectManagement.objectsData, true,
          'table dataTable no-footer', 'tableEdit-' + template.data.fieldName);

  $('#' + 'tableEdit-' + template.data.fieldName + ' td.val').each(function () {
    $(this).inlineEdit(replaceWith, connectWith);
  });

});
Template.fieldObjectManagement.helpers(() => {
});
Template.fieldObjectManagement.events({
  'click button[data-target=".addInfo"]': function () {
    formGen.simpleFormRender('formModal', fieldObjectManagement.schema);
  },
  'click button[data-dismiss="modal"]': function () {
  },
  'click button[id="save"]': function () {
    template = Template.instance();
    let newObject = formGen.getSimpleFormData(fieldObjectManagement.schema, template);
    fieldObjectManagement.objectsData.push(newObject);
    let fieldInput = document.getElementById(template.data.fieldName);
    fieldInput.value = JSON.stringify(fieldObjectManagement.objectsData);
    document.getElementById('tableview').innerHTML =
        UtilsView.getTableViewFromSchemaAndListOfObjects(fieldObjectManagement.schema, fieldObjectManagement.objectsData, true,
            'table dataTable no-footer', 'tableEdit-' + template.data.fieldName);

  },
  'click a[id="delObj"]': function (evt) {
    let linha = $(evt.currentTarget).attr("value");
    if (linha > -1) {
      fieldObjectManagement.objectsData.splice(linha, 1);
    }
    let fieldInput = document.getElementById(template.data.fieldName);
    fieldInput.value = JSON.stringify(fieldObjectManagement.objectsData);
    document.getElementById('tableview').innerHTML =
        UtilsView.getTableViewFromSchemaAndListOfObjects(fieldObjectManagement.schema, fieldObjectManagement.objectsData, true,
            'table dataTable no-footer', 'tableEdit-' + template.data.fieldName);

  }

});
