import { Utils } from '.././../api/reuse/utils';
import './formGeneratorTemplates.html';
import { UtilsView } from './ViewUtils';
import './formGeneratorTemplates';
import { Blaze } from 'meteor/blaze';

export class FormGenerator {
  constructor () {
    this.templates = {};

    this.templates['inputH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
               <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}"> \
          </div> \
        </div>';

    this.templates['inputV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
               <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}"> \
        </div>';

    this.templates['inputMaskH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
               <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}"  data-mask="{DATA_MASK}"> \
          </div> \
        </div>';

    this.templates['inputMaskV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
               <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}"  data-mask="{DATA_MASK}"> \
        </div>';

    this.templates['inputDateH'] = '<div class="form-group" id="data_1"> \
         <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
         <div class="col-md-10"> \
            <div class="input-group date"> \
              <span class="input-group-addon"><i class="fa fa-calendar"></i></span>\
              <input type="text" class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}" value="{VALUE}"> \
            </div>\
          </div> \
         </div>';

    this.templates['inputDateV'] = '<div class="form-group" id="data_1"> \
         <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label>\
            <div class="input-group date">\
              <span class="input-group-addon"><i class="fa fa-calendar"></i></span>\
              <input type="text" class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}" value="{VALUE}"> \
          </div> \
         </div>';

    this.templates['inputDisabledH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
        <input type="text" disabled="" name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}">\
        </div> \
        </div>';

    this.templates['inputDisabledV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
        <input type="text" disabled="" name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}">\
        </div>';

    this.templates['inputHourH'] = '<div class="form-group" id="hour_1"> \
         <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label>\
         <div class="col-md-10"> \
            <div class="input-group clockpicker" data-autoclose="true">\
              <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>\
              <input type="text" class="form-control" value="00:00" id="{FIELD_NAME}" name="{FIELD_NAME}"> \
            </div>\
          </div> \
         </div>';

    this.templates['inputHourV'] = '<div class="form-group" id="hour_1"> \
         <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label>\
            <div class="input-group clockpicker" data-autoclose="true">\
              <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>\
              <input type="text" class="form-control" value="00:00" id="{FIELD_NAME}" name="{FIELD_NAME}"> \
          </div> \
         </div>';

    this.templates['inputHelpH'] = '<div class="form-group">  \
    <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
            <div class="col-md-10">\
                <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" class="form-control">\
                <span class="help-block m-b-none">{HELP_TEXT}</span>\
            </div>\
            </div>';

    this.templates['inputHelpV'] = '<div class="form-group">  \
    <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
                <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" class="form-control">\
                <span class="help-block m-b-none">{HELP_TEXT}</span>\
            </div>';

    this.templates['textareaH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <textarea class="form-control" rows="{ROWS}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}">{VALUE}</textarea> \
          </div> \
          </div>';

    this.templates['textareaV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <textarea class="form-control" rows="{ROWS}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}">{VALUE}</textarea> \
          </div>';

    this.templates['spanH'] = '<div class="form-group"> \
          <label class="col-md-3 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-9"  style="overflow-x:auto;"> \
              <span id="{FIELD_NAME}">{VALUE}</span> \
          </div>\
          </div>';

    this.templates['spanV'] = '<div class="form-group"  style="overflow-x:auto;"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
              <span id="{FIELD_NAME}">{VALUE}</span> \
          </div>';

    this.templates['selectH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
        <select class="form-control js-example-placeholder-single" style="width: 100%" tabindex="-1" aria-hidden="true" id="{FIELD_NAME}" name="{FIELD_NAME}">\
           {FIELD_OPTIONS} \
        </select><span class="select2 select2-container select2-container--default select2-container--below" dir="ltr">\
        </div>\
    </div>';

    this.templates['selectV'] = '<div class="form-group"> \
        <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
      <select class="form-control js-example-placeholder-single" id="{FIELD_NAME}" name="{FIELD_NAME}">\
           {FIELD_OPTIONS} \
      </select>\
    </div>';

    this.templates['fieldWithDataFromCollection'] = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10" id="template-{FIELD_NAME}"> \
         </div>\
        </div>';

    this.templates['multipleH'] = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
        <select class="select2_demo_2 form-control" style="width: 100%" multiple="multiple" id="{FIELD_NAME}" name="{FIELD_NAME}">\
           {FIELD_OPTIONS} \
        </select>\
         </div>\
        </div>';

    this.templates['multipleV'] = '<div class="form-group"> \
        <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
        <select class="select2_demo_2 form-control" multiple="multiple" id="{FIELD_NAME}" name="{FIELD_NAME}">\
           {FIELD_OPTIONS} \
        </select>\
        </div>';

    this.templates['checkboxH'] = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
         <div class="col-md-10"> \
        <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
                 </div>\
        </div>';

    this.templates['checkboxV'] = '<div class="form-group"> \
        <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
        <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
        </div>';

    this.templates['radioButtonH'] = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
         <div class="col-md-10"> \
        <input type="{FIELD_TYPE}" disabled id="{FIELD_NAME}" name="{FIELD_NAME}" />\
                 </div>\
        </div>';

    this.templates['radioButtonV'] = '<div class="form-group"> \
        <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
        <input type="{FIELD_TYPE}" disabled id="{FIELD_NAME}" name="{FIELD_NAME}" />\
        </div>';

    this.templates['checkboxDisabledH'] = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
         <div class="col-md-10"> \
        <input type="{FIELD_TYPE}" disabled id="{FIELD_NAME}" name="{FIELD_NAME}" />\
                 </div>\
        </div>';

    this.templates['checkboxDisabledV'] = '<div class="form-group"> \
        <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
        <input type="{FIELD_TYPE}" disabled id="{FIELD_NAME}" name="{FIELD_NAME}" />\
        </div>';

    this.templates['radioButtonDisabledH'] = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
         <div class="col-md-10"> \
        <input type="{FIELD_TYPE}" disabled id="{FIELD_NAME}" name="{FIELD_NAME}" />\
                 </div>\
        </div>';

    this.templates['radioButtonDisabledV'] = '<div class="form-group"> \
        <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
        <input type="{FIELD_TYPE}" disabled id="{FIELD_NAME}" name="{FIELD_NAME}" />\
        </div>';

    this.templates['checkboxNH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10" id="{FIELD_NAME}">\
          {LABEL_OPTIONS} \
          </div> </div>';

    this.templates['checkboxNV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="{FIELD_NAME}">\
          {LABEL_OPTIONS} \
          </div> </div>';

    this.templates['radioNH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10" id="{FIELD_NAME}">\
          {LABEL_OPTIONS} \
          </div> </div>';

    this.templates['radioNV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="{FIELD_NAME}">\
          {LABEL_OPTIONS} \
          </div> </div>';

    this.templates['spanNH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="{FIELD_NAME}" class="col-md-10"> \
          {SPANS}\
          </div> </div>';

    this.templates['spanNV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="{FIELD_NAME}"> \
          {SPANS} \
          </div> </div>';

    this.templates['inputNV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="{FIELD_NAME}"> \
          {INPUTS} \
          </div> </div>';

    this.templates['inputNH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="div{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="div{FIELD_NAME}" class="col-md-10"> \
          {INPUTS} \
          </div> </div>';

    // AINDA NAO FUNCIONA.
    this.templates['imageCropper'] = '<div class="col-lg-12"><div class="ibox float-e-margins"><div class="ibox-content"><p></p><div class="row"><div class="col-md-6"><div class="image-crop"><img src="../../../public/img/userDefault.png"></div></div><div class="col-md-6"><h4>Preview image</h4><div class="img-preview img-preview-lg"></div><h4>Comon method</h4><p>You can upload new image to crop container and easy download new croppedimage.</p><div class="btn-group"><label title="Upload image file" for="inputImage" class="btn btn-primary"><input type="file" accept="image/*" name="file" id="inputImage"class="hide">Upload new image</label><label title="Donload image" id="download"class="btn btn-primary">Download</label></div><h4>Other method</h4><p>You may set cropper options with <code>$({image}).cropper(options)</code></p><div class="btn-group"><button class="btn btn-white" id="zoomIn" type="button">Zoom In</button><button class="btn btn-white" id="zoomOut" type="button">Zoom Out</button><button class="btn btn-white" id="rotateLeft" type="button">Rotate Left</button><button class="btn btn-white" id="rotateRight" type="button">Rotate Right</button><button class="btn btn-warning" id="setDrag" type="button">New crop</button></div></div></div></div></div></div>';
  }

  getTemplate (templateKey) {
    let template = "";
    if (typeof this.templates[templateKey] != 'undefined') {
      template = this.templates[templateKey];
    } else {
      console.log("O template " + templateKey + " NÃO existe!");
    }
    return template
  }

  // formView agora considera elementos do tipo vetor
  //todo Melhorar a escrita do código, há muita repetição
  formRender (idOfElement, applyValidation = true, controller, schemaName = 'default', searchFor = '', idOfForm = '') {
    let collectionFieldValues = [];
    let existsDataType = false;
    let existsCropperType = false;
    let existsSelectType = false;
    let existsMultipleType = false;
    let existsHourType = false;
    let collectionsFields = [];
    let result = '';
    let fieldTmp = '';
    let dadosCollection = {};
    let schema = controller.getSchemaJson(schemaName);

    if (searchFor != '' && typeof searchFor == 'string') {
      dadosCollection = controller.get({ _id: searchFor });
    } else if (searchFor != '' && typeof searchFor == 'object') {
      dadosCollection = controller.get(searchFor);
    }

    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {

        fieldTmp = this.getTemplate(schema[key].formOptions.FIELD_TAG);

        if (schema[key].formOptions.FIELD_TAG == 'inputDateH' || schema[key].formOptions.FIELD_TAG == 'inputDateV') {
          existsDataType = true;
        }

        if (schema[key].formOptions.FIELD_TAG == 'inputHourH' || schema[key].formOptions.FIELD_TAG == 'inputHourH') {
          existsHourType = true;
        }

        if (schema[key].formOptions.FIELD_TAG == 'multipleH' || schema[key].formOptions.FIELD_TAG == 'multipleV') {
          existsMultipleType = true;
          let optionsTmp = '';
          let optionsCollections = schema[key].formOptions.OPTIONSCOLLECTION;
          if (optionsCollections) {
            fieldTmp = this.getTemplate('fieldWithDataFromCollection');
            collectionsFields.push(key);
          } else {
            let options = schema[key].formOptions.OPTIONS;
            for (let oKey in options) {
              if (typeof options[oKey].VALUE == 'object') {
                optionsTmp = optionsTmp + "<option value='" + JSON.stringify(options[oKey].VALUE) + "'>" + options[oKey].LABEL + '</option>';
              } else {
                optionsTmp = optionsTmp + '<option value="' + options[oKey].VALUE + '">' + options[oKey].LABEL + '</option>';
              }

            }

            fieldTmp = fieldTmp.replace(
                new RegExp('{FIELD_OPTIONS}', 'g'), optionsTmp);
          }

        }

        if (schema[key].formOptions.FIELD_TAG == 'selectH' || schema[key].formOptions.FIELD_TAG == 'selectV') {
          existsSelectType = true;
          let optionsTmp = '';
          let options = schema[key].formOptions.OPTIONS;
          for (let oKey in options) {

            if (typeof options[oKey].VALUE == 'object') {

              console.log(options[oKey].VALUE);
              optionsTmp = optionsTmp + '<option value=' + options[oKey].VALUE + '>' + options[oKey].LABEL + '</option>';
            } else {
              optionsTmp = optionsTmp + '<option value="' + options[oKey].VALUE + '">' + options[oKey].LABEL + '</option>';
            }
          }

          fieldTmp = fieldTmp.replace(
              new RegExp('{FIELD_OPTIONS}', 'g'), optionsTmp);
        }

        if (schema[key].formOptions.FIELD_TAG == 'checkboxNH' || schema[key].formOptions.FIELD_TAG == 'checkboxNV') {
          existsMultipleType = true;
          let labelsTmp = '';
          let labels = schema[key].formOptions.LABELS;
          for (let oKey in labels) {
            labelsTmp = labelsTmp + '<input type="checkbox" name="' + labels[oKey].NAME + '  " value="' + labels[oKey].VALUE + '"> \
                                 <label class="control-label" for="' + labels[oKey].FOR + '">' + labels[oKey].LABEL + ' </label><br>';
          }

          fieldTmp = fieldTmp.replace(
              new RegExp('{LABEL_OPTIONS}', 'g'), labelsTmp);
        }

        if (schema[key].formOptions.FIELD_TAG == 'radioNH' || schema[key].formOptions.FIELD_TAG == 'radioNV') {
          existsMultipleType = true;
          let labelsTmp = '';
          let labels = schema[key].formOptions.LABELS;
          for (let oKey in labels) {
            labelsTmp = labelsTmp + '<input type="radio" name="' + labels[oKey].NAME + '  " value="' + labels[oKey].VALUE + '"> \
                                 <label class="control-label" for="' + labels[oKey].FOR + '">' + labels[oKey].LABEL + ' </label><br>';
          }

          fieldTmp = fieldTmp.replace(
              new RegExp('{LABEL_OPTIONS}', 'g'), labelsTmp);
        }

        if (schema[key].formOptions.FIELD_TAG == 'spanNH' || schema[key].formOptions.FIELD_TAG == 'spanNV') {
          existsMultipleType = true;
          let spansTmp = '';
          let spans = schema[key].formOptions.SPANS;
          for (let oKey in spans) {
            spansTmp = spansTmp + '<span id="' + spans[oKey].ID + '">' + spans[oKey].VALUE + '</span> <br><br>';
          }

          fieldTmp = fieldTmp.replace(
              new RegExp('{SPANS}', 'g'), spansTmp);
        }

        if (schema[key].formOptions.FIELD_TAG == 'inputNH' || schema[key].formOptions.FIELD_TAG == 'inputNV') {
          existsMultipleType = true;
          let inputsTmp = '';
          let inputs = schema[key].formOptions.INPUTS;
          for (let oKey in inputs) {
            inputsTmp = inputsTmp + '<input type="{FIELD_TYPE}" id="' + inputs[oKey].ID + '" name="' + inputs[oKey].NAME + '" class="form-control" value="" placeholder="' + inputs[oKey].PLACEHOLDER + '"> <br>';
          }

          fieldTmp = fieldTmp.replace(
              new RegExp('{INPUTS}', 'g'), inputsTmp);
        }

        if (schema[key].formOptions.FIELD_TAG == 'imageCropper') {
          existsCropperType = true;

        }

        //FIELD_NAME = key
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_NAME}', 'g'), key);

        //FIELD_LABEL = schema[key].label
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_LABEL}', 'g'), schema[key].label);

        for (let fieldOptions in schema[key].formOptions) {
          fieldTmp = fieldTmp.replace(
              new RegExp('{' + fieldOptions + '}', 'g'), schema[key].formOptions[fieldOptions]);
        }

        //INICIO Valor dos campos
        if (typeof dadosCollection != 'undefined') {

            let valor = dadosCollection[key];
            if (schema[key].type == Date && valor) {
              let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
              valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
            }
          if (schema[key].formOptions.FIELD_TAG == 'input3H') {
            for (let i = 0; i < 3; i++) {
              fieldTmp = fieldTmp.replace(new RegExp('{VALUE' + i + '}', 'g'), valor || '');
            }
            } else {
            fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), valor || '');
            }

          if (schema[key].formOptions && schema[key].formOptions.OPTIONSCOLLECTION) {
            collectionFieldValues[key] = valor;
          }

          //FIM Valor dos Campos

        }

        //Resultado Final
        result = result + fieldTmp;

      }

    }

    document.getElementById(idOfElement).innerHTML = result;

    if (applyValidation) {
      if (idOfForm != '') {
        idOfElement = idOfForm;
      }
      this.applyJQueryValidation(controller, schemaName, idOfElement);
    }

    if (Meteor.isCordova) {
      console.log("Printed only in mobile Cordova apps");
    } else {
      if (existsDataType) {
        $('#data_1 .input-group.date').datepicker({
          startView: 1,
          todayBtn: "linked",
          keyboardNavigation: false,
          forceParse: false,
          autoclose: true,
          format: "dd/mm/yyyy"
        });
      }

      if (existsHourType) {
        $('.clockpicker').clockpicker();
      }
    }

    if (existsMultipleType) {
      $('.select2_demo_2').select2();
    }

    if (existsSelectType) {
      $(".js-example-placeholder-single").select2({
        placeholder: "Selecione uma opção"
      });
    }

    if (existsCropperType) {

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

      $("#download").click(function () {
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
    }

    for (let fieldKey in collectionsFields) {
      let data = schema[collectionsFields[fieldKey]].formOptions.OPTIONSCOLLECTION;
      data['FIELD_NAME'] = collectionsFields[fieldKey];
      data['FIELD_VALUES'] = collectionFieldValues;

      UtilsView.templateRender('select2Collection', 'template-' + collectionsFields[fieldKey], data);
    }

  }

  // formViewRender agora considera elementos do tipo vetor
  //todo Melhorar a escrita do código, há muita repetição
  formViewRender (idOfElement, controller, schemaName = 'default', searchFor = '') {
    let result = '';
    let fieldTmp = '';
    let dadosCollection = {};
    let schema = controller.getSchemaJson(schemaName);

    if (searchFor != '' && typeof searchFor == 'string') {
      dadosCollection = controller.get({ _id: searchFor });
    } else if (searchFor != '' && typeof searchFor == 'object') {
      dadosCollection = controller.get(searchFor);
    }

    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {

        fieldTmp = this.getTemplate('spanH');

        //FIELD_NAME = key
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_NAME}', 'g'), key);

        //FIELD_LABEÇ = schema[key].label
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_LABEL}', 'g'), schema[key].label);

        for (let fieldOptions in schema[key].formOptions) {
          fieldTmp = fieldTmp.replace(
              new RegExp('{' + fieldOptions + '}', 'g'), schema[key].formOptions[fieldOptions]);
        }

        //Valor dos campos
        if (typeof dadosCollection != 'undefined') {
          let valor = dadosCollection[key];

          if (schema[key].type == Date && valor) {
            let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
            valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
          } else if (schema[key].type == Object) {

            if (schema[key].formOptions && typeof schema[key].formOptions.OPTIONSCOLLECTION != 'undefined') {
              let controllerTmp = Blaze._globalHelpers.getController(schema[key].formOptions.OPTIONSCOLLECTION.COLLECTION);
              let collectionSchema = schema[key].formOptions.OPTIONSCOLLECTION.COLLECTION_SCHEMA;
              valor = this.getTableViewFromFieldSchema(controllerTmp.getSubSchemaJson(collectionSchema), valor)
            } else {
              valor = this.getTableViewFromFieldSchema(controller.getFieldSchemaJson(key), valor)
            }


          }
          fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), valor || '');
        }

        //Resultado Final
        result = result + fieldTmp;

      }

    }
    document.getElementById(idOfElement).innerHTML = result;
  }

  getTableViewFromFieldSchema (schema, listOfObjects) {

    let fieldTmp = '<table class="table"> \
        <thead><tr> ';

    for (let key in schema) {
      if (typeof schema[key].label != 'undefined') {
        fieldTmp = fieldTmp + '<th>' + schema[key].label + '</th>';
      }
    }
    fieldTmp = fieldTmp + '</tr></thead>';

    fieldTmp = fieldTmp + '<tbody>';

    for (let keyObject in listOfObjects) {
      fieldTmp = fieldTmp + '<tr>';
      for (let key in schema) {
        if (typeof schema[key].label != 'undefined') {

          if (typeof listOfObjects[keyObject] != 'undefined') {
            let valor = listOfObjects[keyObject][key];
            console.log("ValorDoObjeto:" + valor);
            if (schema[key].type == Date && valor) {
              let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
              valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
            } else if (schema[key].type == Object && typeof schema[key].formOptions["FIELD_SCHEMA"] != 'undefined' && valor) {
              console.log('TODo - Campo = Objeto');

            }
            fieldTmp = fieldTmp + '<td>' + valor + '</td>';
          }

        }
      }
      fieldTmp = fieldTmp + '</tr>';
    }
    fieldTmp = fieldTmp + '</tbody></table>';

    return fieldTmp;
  }

  applyJQueryValidation (controller, schemaName = 'default', elementId) {
    let rules = {};
    let message = {};
    let schema = controller.getSchemaJson(schemaName);
    for (let key in schema) {
      if (typeof schema[key].formValidation != 'undefined') {
        for (let rulesKey in schema[key].formValidation) {
          if (typeof rules[key] == 'undefined') {
            rules[key] = {};
          }

          rules[key][rulesKey] = schema[key].formValidation[rulesKey].value;

          if (typeof message[key] == 'undefined') {
            message[key] = {};
          }

          message[key][rulesKey] = schema[key].formValidation[rulesKey].message;
        }
      }

    }

    //Jquery Validation - https://jqueryvalidation.org/validate
    $('#' + elementId).validate({
      rules: rules,
      messages: message,
    });

  }

  getFormData (controller, schemaName = 'default', template) {
    let objData = {};
    let schema = controller.getSchemaJson(schemaName);
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {

        let value = '';

        //Necessário para preencher collections que possuem vetor
        let objAux = template.find('[id="' + key + '"]');
        if (objAux != null) {

          value = $(objAux).val();

        }
        else {
          objAux = template.findAll('[name="' + key + '"]');
          for (i = 0; i < objAux.length; i++) {
            objAux[i] = objAux[i].value.trim();
          }
          value = objAux;
        }

        switch (schema[key].type) {
          case String:
            objData[key] = value;
            break;
          case [String]:
            objData[key] = JSON.parse(value).keys(obj).map(function (k) {
              return obj[k]
            });
            break;
          case Number:
            objData[key] = Number(value);
            break;
          case Date:
            var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            objData[key] = new Date(value.replace(pattern, '$3-$2-$1'));
            break;
          case Array:
            objData[key] = value.split(",");
            break;
          case Object:
            objData[key] = Utils.toObject(value);

            break;
          case [Object]:
            objData[key] = Utils.toObject(value);
            break;
          case Boolean:
            objData[key] = Boolean(value);
            break;
          default:
            objData[key] = value;
        }

      }

    }

    return objData;
  }

  getTableViewData (controller, schemaName = 'default', templates) {
    let objData = [];
    let schema = controller.getSchemaJson(schemaName);
    for (let key in schema) {
      if (typeof schema[key].dataTableConfig != 'undefined') {

        //insere o item e pega o wiltimeo
        let objIndex = objData.push({ key: key, label: schema[key].dataTableConfig.label }) - 1;

        if (typeof schema[key].dataTableConfig.template != 'undefined') {
          objData[objIndex].tmpl = templates[schema[key].dataTableConfig.template];
        }

      }
    }

    return objData;
  }

}

export const formGen = new FormGenerator();




