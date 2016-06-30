export class FormGeneretor {
  constructor () {
    this.templates = {};

    this.templates['input'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control XXA" value="{VALUE}"> \
          </div> \
          </div>';
    this.templates['textarea'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <textarea class="form-control" rows="7" id="{FIELD_NAME}" \
          name="{FIELD_NAME}">{VALUE}</textarea> \
          </div> \
          </div>';

    this.templates['span'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
              <span id="{FIELD_NAME}">{VALUE}</span> \
          </div> \
          </div>';
  }

  formRender (controller, schemaName = 'default', searchFor = '') {
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
          fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), dadosCollection[key] || '');
        }

        //Resultado Final
        result = result + fieldTmp;

      }

    }

    return result;
  }

  formViewRender (controller, schemaName = 'default', searchFor = '') {
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

        fieldTmp = this.templates['span'];

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
          fieldTmp = fieldTmp.replace(new RegExp('{VALUE}', 'g'), dadosCollection[key] || '');
        }

        //Resultado Final
        result = result + fieldTmp;
      }
    }

    return result;
  }

  applyJQueryValidation (controller, schemaName = 'default', formId) {
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
    $('#' + formId).validate({
      rules: rules,
      messages: message,
    });

  }

  getFormData (controller, schemaName = 'default', template) {
    let objData = {};
    let schema = controller.getSchemaJson(schemaName);
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {
        objData[key] = template.find('[id="' + key + '"]').value.trim();
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

export const formGen = new FormGeneretor();
