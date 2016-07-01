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

    let inputString = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="div{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="div{FIELD_NAME}" class="col-md-10"> \ ';
    for (i = 0; i<3; i++) {
      inputString = inputString + '<input type="{FIELD_TYPE}" id="{FIELD_NAME}[' + i + ']" name="{FIELD_NAME}" class="form-control m-b" value="{VALUE}"> \ '
    }
    inputString = inputString + '</div> </div>';
    this.templates['input3H'] = inputString;

    this.templates['inputdate'] = '<div class="form-group" id="data_1"> <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label><div class="col-md-10"> <div class="input-group date"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input type="text" class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}" value="{VALUE}"> </div></div> </div>';

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

    this.templates['selectH'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
        <select class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}">\
           <option value="{OPTION1}">{OPTION1}</option>\
           <option value="{OPTION2}">{OPTION2}</option>\
           <option value="{OPTION3}">{OPTION3}</option>\
           <option value="{OPTION4}">{OPTION4}</option>\
        </select>\
         </div>\
    </div>';

    this.templates['selectV'] = '<div class="form-group"> \
        <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
      <select class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}">\
       <option value="{OPTION1}">{OPTION1}</option>\
       <option value="{OPTION2}">{OPTION2}</option>\
       <option value="{OPTION3}">{OPTION3}</option>\
       <option value="{OPTION4}">{OPTION4}</option>\
       <option value="{OPTION5}">{OPTION5}</option>\
      </select>\
    </div>';
  }

  formRender (idOfElement, applyValidation = true, controller, schemaName = 'default', searchFor = '', idOfForm = '') {
    let existsDataType = false;
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

        fieldTmp = this.templates[schema[key].formOptions.FIELD_TAG];

        if (schema[key].formOptions.FIELD_TAG == 'inputdate') {
          existsDataType = true;
        }

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
          }
          fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), valor || '');
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

  }

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

        fieldTmp = this.templates['spanH'];

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
          }
          fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), valor || '');
        }

        //Resultado Final
        result = result + fieldTmp;
      }
    }

    document.getElementById(idOfElement).innerHTML = result;
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
        let value = template.find('[id="' + key + '"]').value.trim();

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
            objData[key] = JSON.parse(value);
            break;
          case [Object]:
            objData[key] = JSON.parse(value).keys(obj).map(function (k) {
              return obj[k]
            });
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
