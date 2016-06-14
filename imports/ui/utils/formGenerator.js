class formGeneretor {
  constructor () {
    this.templates = {};

    this.templates['input'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" class="form-control XXA" > \
          </div> \
          </div>';
    this.templates['textarea'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <textarea class="form-control" rows="7" id="{FIELD_NAME}" name="{FIELD_NAME}"></textarea> \
          </div> \
          </div>';
  }

  formRender (schema) {
    let result = '';
    let fieldTmp = '';
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {

        fieldTmp = this.templates[schema[key].formOptions.FIELD_TAG];

        //FIELD_NAME = key
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_NAME}', 'g'), key);

        //FIELD_LABEÇ = schema[key].label
        fieldTmp = fieldTmp.replace(new RegExp('{FIELD_LABEL}', 'g'), schema[key].label);

        for (let fieldOptions in schema[key].formOptions) {
          fieldTmp = fieldTmp.replace(new RegExp('{' + fieldOptions + '}', 'g'), schema[key].formOptions[fieldOptions]);
        }

        //Resultado Final
        result = result + fieldTmp;

      }

    }
    return result;
  }

  getFormData (schema, template) {
    let objData = {};
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {
        objData[key] = template.find('[id="' + key + '"]').value.trim();
      }

    }
    return objData;
  }

}

export const formGen = new formGeneretor();