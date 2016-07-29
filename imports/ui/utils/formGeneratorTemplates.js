import { Blaze } from 'meteor/blaze';
import { Utils } from '.././../api/reuse/utils';
import './formGeneratorTemplates.html';
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
        });
      }
  );

});
Template.select2Collection.onRendered(() => {

});
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

Template.selectImage.onCreated(() => {
  template = Template.instance();
  template.controller = Blaze._globalHelpers.getController(template.data.COLLECTION);
  let imageData = template.data;
});

Template.selectImage.onRendered(() => {
  template = Template.instance();

  var $image = $(".image-crop > img")
  $($image).cropper({
    aspectRatio: 1.1,
    preview: ".img-preview",
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

  var $dataURLInto = $("#imageInto"),
      $dataURLView = $("#imageView");

  $("#getDataURL2").click(function () {
    var dataURL = $image.cropper("getDataURL", "image/jpeg");

    $dataURLInto.val(dataURL);
    $dataURLView.html('<img src="' + dataURL + '">');
  });

  $("#salvar").click(function () {
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
Template.selectImage.helpers(() => {
});
Template.selectImage.events({

  'click button[data-target=".imageModal"]': function () {
  },
  'click button[data-dismiss="modal"]': function () {
  }
});

Template.addInfo.onCreated(() => {
  template = Template.instance();
  template.controller = Blaze._globalHelpers.getController(template.data.COLLECTION);
  let infoData = template.data;
});
Template.addInfo.onRendered(() => {
  template = Template.instance();
  template.controller = Blaze._globalHelpers.getController(template.data.schema);
  let collectionData = template.data;
  document.getElementById('tableview_field').innerHTML = UtilsView.getTableViewFromSchemaAndListOfObjects(template.data.schema, template.data.values);
  // template.data.values.push(object);

});
Template.addInfo.helpers(() => {
});
Template.addInfo.events({
  'click button[data-target=".addInfo"]': function () {},
  'click button[data-dismiss="modal"]': function () {},
  'click button[id="save"]': function () {

    var $infoInto = $("#teste"),
        $infoView = $("#teste");

    var data = $("#namefield-nome").val();

    $infoInto.val(data);
    $infoView.val(data);

  }
});