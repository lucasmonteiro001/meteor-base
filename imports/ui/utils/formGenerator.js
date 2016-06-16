class formGeneretor {
  constructor () {
    this.templates = {};

    this.templates['input'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" class="form-control XXA" value="{VALUE}"> \
          </div> \
          </div>';
    this.templates['textarea'] = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <textarea class="form-control" rows="7" id="{FIELD_NAME}" name="{FIELD_NAME}">{VALUE}</textarea> \
          </div> \
          </div>';
  }

  formRender (controller, schemaName = 'default', id = '') {
    let result = '';
    let fieldTmp = '';
    let dadosCollection = {};
    let schema = controller.getSchemaJson(schemaName);
    if (id != '') {
      dadosCollection = controller.get({ _id: id });
    }
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

}

export const formGen = new formGeneretor();