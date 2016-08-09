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

$.fn.inlineEdit = function (replaceWith = '<input name="temp" type="text" />', connectWith = 'input[name="hiddenField"]') {

  let rWith = $(replaceWith);
  let cWith = $(connectWith);
  $(this).hover(function () {
    $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');
  });

  $(this).click(function () {
    rWith.val($(this).text());
    let elem = $(this);

    elem.hide();
    elem.after(rWith);
    rWith.focus();

    let line = $(this).attr('id');
    let field = $(this).attr('name');

    rWith.blur(function () {
      let val = $(this).val();
      let fieldInput = document.getElementById(template.data.fieldName);
      fieldObjectManagement.objectsData[line][field] = val;
      fieldInput.value = JSON.stringify(fieldObjectManagement.objectsData);
      cWith.val($(this).val()).change();
      elem.text($(this).val());

      $(this).remove();
      elem.show();
    });
  });
};

let fieldObjectManagement = {};

Template.fieldObjectManagement.updateTable = (template)=> {
  let fieldInput = document.getElementById(template.data.fieldName);
  fieldInput.value = JSON.stringify(fieldObjectManagement.objectsData);
  document.getElementById('tableview-' + template.data.fieldName).innerHTML =
      UtilsView.getTableViewFromSchemaAndListOfObjects(fieldObjectManagement.schema, fieldObjectManagement.objectsData, true,
          'table dataTable no-footer', 'tableEdit-' + template.data.fieldName);

  $('#' + 'tableEdit-' + template.data.fieldName + ' td.val').each(function () {
    $(this).inlineEdit();
  });
};

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

  Template.fieldObjectManagement.updateTable(template);


});
Template.fieldObjectManagement.helpers(() => {
});
Template.fieldObjectManagement.events({
  'click button[data-target=".addInfo"]': function () {
    template = Template.instance();
    console.log('formModal-' + template.data.fieldName);
    formGen.simpleFormRender('formModal-' + template.data.fieldName, fieldObjectManagement.schema);
  },
  'click button[data-dismiss="modal"]': function () {
  },
  'click button[id="save"]': function () {
    template = Template.instance();
    if ($('#formModal-' + template.data.fieldName).valid()) {

      let newObject = formGen.getSimpleFormData(fieldObjectManagement.schema, template);
      fieldObjectManagement.objectsData.push(newObject);
      Template.fieldObjectManagement.updateTable(template);
      $('#modal-' + template.data.fieldName).modal('hide');
      return true;
    } else {
      return false;
      console.log('Validação = false');
    }

  },
  'click a[id="delObj"]': function (evt) {
    template = Template.instance();
    let linha = $(evt.currentTarget).attr("value");
    if (linha > -1) {
      fieldObjectManagement.objectsData.splice(linha, 1);
    }
    Template.fieldObjectManagement.updateTable(template);

  }

});
