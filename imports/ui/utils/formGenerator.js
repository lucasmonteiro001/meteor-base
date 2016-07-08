import {Utils} from '.././../api/reuse/utils'
import './formGeneratorTemplates.html';

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

    let inputStringH = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="div{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="div{FIELD_NAME}" class="col-md-10"> \ ';
    for (i = 0; i < 3; i++) {
      inputStringH = inputStringH + '<input type="{FIELD_TYPE}" id="{FIELD_NAME}[' + i + ']" name="{FIELD_NAME}" class="form-control m-b" value="{VALUE}"> \ '
    }
    inputStringH = inputStringH + '</div> </div>';
    this.templates['input3H'] = inputStringH;

    let inputStringV = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="div{FIELD_NAME}">{FIELD_LABEL}</label> ';
    for (i = 0; i < 3; i++) {
      inputStringV = inputStringV + '<input type="{FIELD_TYPE}" id="{FIELD_NAME}[' + i + ']" name="{FIELD_NAME}" class="form-control m-b" value="{VALUE}"> \ '
    }
    inputStringV = inputStringV + '</div> </div>';
    this.templates['input3V'] = inputStringV;

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
          <div class="col-md-9"> \
              <span id="{FIELD_NAME}">{VALUE}</span> \
          </div>\
          </div>';

    this.templates['spanV'] = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
              <span id="{FIELD_NAME}">{VALUE}</span> \
          </div>';

    let spanString = '<div class="form-group"> \
          <label class="col-md-3 control-label" for="div{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="div{FIELD_NAME}" class="col-md-9"> \ ';
    for (i = 0; i<3; i++) {
      spanString = spanString + '<span id="{FIELD_NAME}[' + i + ']" \
          name="{FIELD_NAME}">{VALUE' + i + '}</span> \ ';
    }

    spanString = spanString + '</div> </div>';

    this.templates['span3H'] = spanString;

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
      <select class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}">\
           {FIELD_OPTIONS} \
      </select>\
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
    let existsDataType = false;
    let existsSelectType = false;
    let existsMultipleType = false;
    let existsHourType = false;
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
          let options = schema[key].formOptions.OPTIONS;
          for (let oKey in options) {
            console.log(typeof options[oKey].VALUE);
            if (typeof options[oKey].VALUE == 'object') {
              console.log('Entrou');
              optionsTmp = optionsTmp + "<option value='" + JSON.stringify(options[oKey].VALUE) + "'>" + options[oKey].LABEL + '</option>';
            } else {
              optionsTmp = optionsTmp + '<option value="' + options[oKey].VALUE + '">' + options[oKey].LABEL + '</option>';
            }

          }

          fieldTmp = fieldTmp.replace(
              new RegExp('{FIELD_OPTIONS}', 'g'), optionsTmp);
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


        //FIELD_NAME = key
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_NAME}', 'g'), key);

        //FIELD_LABEL = schema[key].label
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_LABEL}', 'g'), schema[key].label);

        for (let fieldOptions in schema[key].formOptions) {
          fieldTmp = fieldTmp.replace(
              new RegExp('{' + fieldOptions + '}', 'g'), schema[key].formOptions[fieldOptions]);
        }

        //Valor dos campos
        if (typeof dadosCollection != 'undefined') {
          if (Array.isArray(dadosCollection[key])) {
            for (let i = 0; i < dadosCollection[key].length; i++) {
              let valor = dadosCollection[key][i];
              if (schema[key].type == Date && valor) {
                let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
                valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
              }
              fieldTmp = fieldTmp.replace(new RegExp('{VALUE' + i + '}', 'g'), valor || '');
            }
          }
          else {
            let valor = dadosCollection[key];
            if (schema[key].type == Date && valor) {
              let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
              valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
            }
            if (schema[key].formOptions.FIELD_TAG != 'input3H') {
              fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), valor || '');
            } else {
              for (let i = 0; i < 3; i++) {
                fieldTmp = fieldTmp.replace(new RegExp('{VALUE' + i + '}', 'g'), valor || '');
              }
            }
          }
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
            } else if (schema[key].type == Object && typeof schema[key].formOptions["FIELD_SCHEMA"] != 'undefined' && valor) {
              console.log('TODo - Campo = Objeto');
              valor = this.getFormViewFromSchema(getFieldSchemaJson(key), valor)
            }
            fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), valor || '');
          }

          //Resultado Final
          result = result + fieldTmp;

      }

    }
    document.getElementById(idOfElement).innerHTML = result;
  }

  getFormViewFromSchema(schema, listOfObjects) {
    let fieldTmp = '';
    let result = '';

    for (let object in listOfObjects) {

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
          if (typeof object != 'undefined') {
            let valor = object[key];

            if (schema[key].type == Date && valor) {
              let pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
              valor = valor.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
            } else if (schema[key].type == Object && typeof schema[key].formOptions["FIELD_SCHEMA"] != 'undefined' && valor) {
              console.log('TODo - Campo = Objeto');

            }
            fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), valor || '');
          }

          //Resultado Final
          result = result + fieldTmp;

        }

      }
    }

    return result;
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
            console.log("Valor que será convertido em Objeto:");
            console.log(value);
            console.log('Campo:' + key);
            objData[key] = Utils.toObject(value = value);

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
      if (typeof schema[key].tableView != 'undefined') {

        //insere o item e pega o wiltimeo
        let objIndex = objData.push({ key: key, label: schema[key].tableView.label }) - 1;

        if (typeof schema[key].tableView.template != 'undefined') {
          objData[objIndex].tmpl = templates[schema[key].tableView.template];
        }

      }
    }

    return objData;
  }

}

export const formGen = new FormGenerator();
