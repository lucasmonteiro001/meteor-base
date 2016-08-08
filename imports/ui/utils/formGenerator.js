import { Utils } from '.././../api/reuse/utils';
import './formGeneratorTemplates.html';
import { FormComponents } from './components';
import './formGeneratorTemplates';
import { Blaze } from 'meteor/blaze';

export class FormGenerator {
  constructor () {

  }

  getTemplate (templateKey) {
    let template = '';
    if (typeof this.templates[templateKey] != 'undefined') {
      template = this.templates[templateKey];
    } else {
      console.log('O template ' + templateKey + ' NÃO existe!');
    }

    return template;
  }

  getDefaultComponent (fieldType) {

    if (typeof fieldType == 'object') {

      if (fieldType[0].name == 'Object') {
        return 'multipleH';

      } else if (fieldType[0].name == 'String') {
        return 'inputTaggingH';
      }
    }
    else switch (fieldType) {
      case String:
        return 'inputH';
        break;
      case Number:
        return 'inputH';
        break;
      case Date:
        return 'inputDateH';
        break;
      default:
        return 'inputH';
        break;
    }

  }

  formRender (idOfElement, applyValidation = true, controller, schemaName = 'default',
              searchFor = '', idOfForm = '') {

    let form = '';
    let listOfFieldsAndComponents = {};
    let dadosCollection = {};
    let schema = controller.getSchemaJson(schemaName);

    if (searchFor != '' && typeof searchFor == 'string') {
      dadosCollection = controller.get({ _id: searchFor });
    } else if (searchFor != '' && typeof searchFor == 'object') {
      dadosCollection = controller.get(searchFor);
    }

    //######################################################################
    //################## DEFINIÇÃO DOS TEMPLATES ###########################
    //######################################################################

    //Itera sobre todos os campos que estarão disponíveis no formulário para
    // inserir os componentes no formulario com as tags apropriadas
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined' && schema[key].formOptions.VISIBLE) {

        //Define qual componente será utilizado
        if (typeof schema[key].formOptions.FIELD_COMPONENT == 'undefined')
          listOfFieldsAndComponents[key] = FormComponents.getComponente(this.getDefaultComponent(schema[key].type));
        else
          listOfFieldsAndComponents[key] = FormComponents.getComponente(schema[key].formOptions.FIELD_COMPONENT);

        let template = listOfFieldsAndComponents[key].template;

        //FIELD_NAME = key
        template = template.replace(new RegExp('{FIELD_NAME}', 'g'), key);

        //FIELD_LABEL = schema[key].label
        template = template.replace(new RegExp('{FIELD_LABEL}', 'g'), schema[key].label);

        for (let fieldOptions in schema[key].formOptions) {
          template = template.replace(
              new RegExp('{' + fieldOptions + '}', 'g'), schema[key].formOptions[fieldOptions]);
        }

        listOfFieldsAndComponents[key].template = template;

      }
    }

    //######################################################################
    //############# DEFINIÇÃO DOS VALORES DE CADA CAMPO ####################
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e definie o valor
    //inicial para cada um deles com base nos dados do documento (collection)
    if (typeof dadosCollection != 'undefined') {

      for (let field in listOfFieldsAndComponents) {
        let val = dadosCollection[field];

        let calculateValue = listOfFieldsAndComponents[field].getValue(val, field);

        if (calculateValue != '') {
          let template = listOfFieldsAndComponents[field].template;
          template = template.replace(new RegExp('{VALUE}', 'g'), calculateValue || '');
          listOfFieldsAndComponents[field].template = template;
        } else {
          let template = listOfFieldsAndComponents[field].template;
          template = template.replace(new RegExp('{VALUE}', 'g'), val || '');
          listOfFieldsAndComponents[field].template = template;
        }

      }

    }

    //######################################################################
    //####### REALIZA MODIFICAÇÕES NOS TEMPLATES DOS COMPONENTES ###########
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e executa
    //a função de inicialização de cada um deles
    for (let field in listOfFieldsAndComponents) {

      listOfFieldsAndComponents[field].templateFunction(field, listOfFieldsAndComponents[field]
          , schema[field]);

    }

    //######################################################################
    //############ INSERÇÃO DOS CAMPONENTES NO FORMULARIO ##################
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e insere na
    //variavel form e, em seguida, insere na Div que o forma será renderizado
    for (let field in listOfFieldsAndComponents) {
      form = form + listOfFieldsAndComponents[field].template;
    }

    document.getElementById(idOfElement).innerHTML = form;

    //######################################################################
    //############ INICIALIZAÇÃO DOS COMPONENTES ###########################
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e executa
    //a função de inicialização de cada um deles
    for (let field in listOfFieldsAndComponents) {

      listOfFieldsAndComponents[field].init(field, listOfFieldsAndComponents[field]
          , schema[field]);

    }

    //######################################################################
    //############ APLICAÇÃO DO JQUERY VALIDATION ##########################
    //######################################################################

    //Esta opção de aplicar a validação tem que ser a ultima ação do método
    if (applyValidation) {
      if (idOfForm != '') {
        idOfElement = idOfForm;
      }

      this.applyJQueryValidation(controller, schemaName, idOfElement);
    }

  }

  formViewRender (idOfElement, controller, schemaName = 'default', searchFor = '') {
    let result = '';
    let form = '';
    let listOfFieldsAndComponents = {};
    let dadosCollection = {};
    let schema = controller.getSchemaJson(schemaName);

    if (searchFor != '' && typeof searchFor == 'string') {
      dadosCollection = controller.get({ _id: searchFor });
    } else if (searchFor != '' && typeof searchFor == 'object') {
      dadosCollection = controller.get(searchFor);
    }

    //Itera sobre todos os campos que estarão disponíveis no formulário para
    // inserir os componentes no formulario com as tags apropriadas
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined' && schema[key].formOptions.VISIBLE) {
        //Define qual componente será utilizado
        if (typeof schema[key].formOptions.FIELD_COMPONENT == 'undefined')
          listOfFieldsAndComponents[key] = FormComponents.getComponente(this.getDefaultComponent(schema[key].type));
        else
          listOfFieldsAndComponents[key] = FormComponents.getComponente(schema[key].formOptions.FIELD_COMPONENT);

        let val = '';
        if (typeof dadosCollection != 'undefined') {
          val = dadosCollection[key] || '';
        }

        let template = listOfFieldsAndComponents[key].view(val, schema[key]);

        //FIELD_NAME = key
        template = template.replace(new RegExp('{FIELD_NAME}', 'g'), key);

        //FIELD_LABEL = schema[key].label
        template = template.replace(new RegExp('{FIELD_LABEL}', 'g'), schema[key].label);

        for (let fieldOptions in schema[key].formOptions) {
          template = template.replace(
              new RegExp('{' + fieldOptions + '}', 'g'), schema[key].formOptions[fieldOptions]);
        }

        listOfFieldsAndComponents[key].template = template;

      }
    }
    //######################################################################
    //############ INSERÇÃO DOS CAMPONENTES NO FORMULARIO ##################
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e insere na
    //variavel form e, em seguida, insere na Div que o forma será renderizado
    for (let field in listOfFieldsAndComponents) {
      form = form + listOfFieldsAndComponents[field].template;
    }

    document.getElementById(idOfElement).innerHTML = form;

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
    let schema = controller.getSchemaJson(schemaName);
    return this.getSimpleFormData(schema, template);
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

  simpleFormRender (idOfElement, schema) {

    let form = '';
    let listOfFieldsAndComponents = {};
    //######################################################################
    //################## DEFINIÇAÕ DOS TEMPLATES############################
    //######################################################################

    //Itera sobre todos os campos que estarão disponíveis no formulário para
    // inserir os componentes no formulario com as tags apropriadas
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined' && schema[key].formOptions.VISIBLE) {

        //Define qual componente será utilizado
        if (typeof schema[key].formOptions.FIELD_COMPONENT == 'undefined')
          listOfFieldsAndComponents[key] = FormComponents.getComponente(this.getDefaultComponent(schema[key].type));
        else
          listOfFieldsAndComponents[key] = FormComponents.getComponente(schema[key].formOptions.FIELD_COMPONENT);

        let template = listOfFieldsAndComponents[key].template;

        //FIELD_NAME = key
        template = template.replace(new RegExp('{FIELD_NAME}', 'g'), key);

        //FIELD_LABEL = schema[key].label
        template = template.replace(new RegExp('{FIELD_LABEL}', 'g'), schema[key].label);

        for (let fieldOptions in schema[key].formOptions) {
          template = template.replace(
              new RegExp('{' + fieldOptions + '}', 'g'), schema[key].formOptions[fieldOptions]);
        }

        listOfFieldsAndComponents[key].template = template;

      }
    }

    //######################################################################
    //#############DEFINIÇAÕ DOS VALORES DE CADA CAMPO######################
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e definie o valor
    //inicial para cada um deles com base nos dados do documento (collection)

    for (let field in listOfFieldsAndComponents) {
      let val = '';

      let template = listOfFieldsAndComponents[field].template;
      template = template.replace(new RegExp('{VALUE}', 'g'), val || '');
      listOfFieldsAndComponents[field].template = template;
    }

    //######################################################################
    //########REALIZA MODIFICAÇÕES NOS TEPLATES DOS COMPONENTES#############
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e executa
    //a função de inicialização de cada um deles
    for (let field in listOfFieldsAndComponents) {

      listOfFieldsAndComponents[field].templateFunction(field, listOfFieldsAndComponents[field]
          , schema[field]);

    }

    //######################################################################
    //#############INSERÇÃO DOS CAMPONENTES NO FORMULARIO###################
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e insere na
    //variavel form e, em seguida, insere na Div que o forma será renderizado
    for (let field in listOfFieldsAndComponents) {
      form = form + listOfFieldsAndComponents[field].template;
    }

    document.getElementById(idOfElement + 'Context').innerHTML = form;

    //######################################################################
    //#############INICIALIZAÇÃO DOS COMPONENTES############################
    //######################################################################

    //Itera sobre todos a lista de campos que serão renderizados e executa
    //a função de inicialização de cada um deles
    for (let field in listOfFieldsAndComponents) {

      listOfFieldsAndComponents[field].init(field, listOfFieldsAndComponents[field]
          , schema[field]);

    }

    //######################################################################
    //#############APLICAÇÃO DO JQUERY VALIDATION###########################
    //######################################################################

    let rules = [];
    let message = [];
    //Esta opção de aplicar a validação tem que ser a ultima ação do método
    for (let key in listOfFieldsAndComponents) {

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

    $('#' + idOfElement).validate({
      rules: rules,
      messages: message,
    });

  }

  getSimpleFormData (schema, template) {
    let objData = {};
    for (let key in schema) {
      if (typeof schema[key].formOptions != 'undefined') {

        let value = '';

        //Necessário para preencher collections que possuem vetor
        let objAux = template.find('[id="' + key + '"]');

        if (objAux != null) {

          value = $(objAux).val();

        } else {
          objAux = template.findAll('[name="' + key + '"]');
          for (i = 0; i < objAux.length; i++) {
            objAux[i] = objAux[i].value.trim();
          }

          value = objAux;
        }

        if (typeof schema[key].type == 'object') {

          if (schema[key].type[0].name == 'Object') {
            objData[key] = Utils.toObjectArray(value)

          } else if (schema[key].type[0].name == 'String') {
            if (typeof value != 'array') {
              value = value.split(",");
            }
            objData[key] = value;
          }
        }
        else switch (schema[key].type) {
          case String:
            objData[key] = value;
            break;
          case Number:
            objData[key] = Number(value);
            break;
          case Date:
            var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            objData[key] = new Date(value.replace(pattern, '$3-$2-$1'));
            break;
          case Array:
            objData[key] = value.split(',');
            break;
          case Object:
            objData[key] = Utils.toObject(value);
            break;
          case Boolean:
            objData[key] = Boolean(value);
            break;
          default:
            try {
              objData[key] = Utils.toObjectArray(value);
            }
            catch (err) {
              objData[key] = value;
            }
        }
      }
    }

    return objData;
  }

}

export const formGen = new FormGenerator();