import './formGeneratorTemplates.html';
import { UtilsView } from './ViewUtils';

class Components {
  constructor () {
    this.ComponentTemplates = {};
    this.ComponentTemplatesFunction = {};
    this.ComponentInitializationFunction = {};
    this.ComponentSetValuesFunction = {};
    this.ComponentViewFunction = {};
    this.templates = {};
  }

  addTemplate (name, template) {
    this.templates[name] = template;
  }

  addComponent (name, template, templateFunction, initializationFunction, setValuesFunction, viewFunction) {
    this.ComponentTemplates[name] = template;
    this.ComponentTemplatesFunction[name] = templateFunction;
    this.ComponentInitializationFunction[name] = initializationFunction;
    this.ComponentSetValuesFunction[name] = setValuesFunction;
    this.ComponentViewFunction[name] = viewFunction;
  }

  getComponente (name) {
    if (typeof this.ComponentTemplates[name] != 'undefined') {
      return {
        name: name,
        template: this.ComponentTemplates[name],
        templateFunction: this.ComponentTemplatesFunction[name],
        init: this.ComponentInitializationFunction[name],
        getValue: this.ComponentSetValuesFunction[name],
        view: this.ComponentViewFunction[name],
      }

    } else {
      return {
        name: name,
        template: '',
        templateFunction: ()=> {
          return '';
        },
        init: ()=> {
          return '';
        },
        getValue: ()=> {
          return '';
        },
        view: ()=> {
          return '';
        }
      }

    }

  }

  getComponentTemplate (name) {
    return this.ComponentTemplates[name]
  }

  getComponentInitializationFunction (name) {
    return this.ComponentInitializationFunction[name]
  }

  getComponentSetValuesFunction (name) {
    return this.ComponentSetValuesFunction[name]
  }

}

export const FormComponents = new Components();

//#################################################################
//#################################################################
//######### DEFINIÇÃO DOS TEMPLATES ###############################
//#################################################################
//#################################################################

FormComponents.addTemplate('spanH', '<div class="form-group"> \
 <label class="col-md-3 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-9"  style="overflow-x:auto;"> \
 <span id="{FIELD_NAME}">{VALUE}</span> \
 </div>\
 </div>');

FormComponents.addTemplate('spanV', '<div class="form-group"  style="overflow-x:auto;"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <span id="{FIELD_NAME}">{VALUE}</span> \
 </div>');

FormComponents.addTemplate('showImageH', '<div class="form-group"> \
 <label class="col-md-3 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-9" id="{FIELD_NAME}"> \
 <img style="max-width: 80%;" src="{VALUE}" >\
 </div> </div>');

FormComponents.addTemplate('showImageV', '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div id="{FIELD_NAME}"> \
 <img style="max-width: 80%;" src="{VALUE}" >\
 </div> </div>');

FormComponents.addTemplate('inputDisabledH', '<div class="form-group"> \
 <label class="col-md-3 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-9"> \
 <input type="text" disabled="" name="{FIELD_NAME}" class="form-control" value="{VALUE}">\
 </div> \
 </div>');

FormComponents.addTemplate('inputDisabledv', '<div class="form-group"> \
<label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
<input type="text" disabled="" name="{FIELD_NAME}" class="form-control" value="{VALUE}">\
</div>');

//#################################################################
//#################################################################
//######### DEFINIÇÃO DOS COMPONENTES #############################
//#################################################################
//#################################################################
let name;
let template;
let templateFunction;
let initializationFunction;
let getValueFunction;
let viewFunction;

//Função de visualização comum a vários componentes
let defaultViewComponent = (value) => {
  return (FormComponents.templates['spanH'].replace(new RegExp('{VALUE}', 'g'), value || ''))
};

let viewInList = (value) => {
  return (FormComponents.templates['spanH'].replace(new RegExp('{VALUE}', 'g'), UtilsView.getListViewFromListOfObjects(value) || ''))
};

//##############################################################################################
//#############  Componente inputH ########################################################
name = 'inputH';
template = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
               <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}"> \
          </div> \
        </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputV ########################################################
name = 'inputV';
template = '<div class="form-group"> \
<label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
<input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}"> \
</div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputMaskH ########################################################
name = 'inputMaskH';
template = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
               <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control" value="{VALUE}" data-mask="{DATA_MASK}"> \
          </div> \
        </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputMaskV ########################################################
name = 'inputMaskV';
template = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
               <input type="{FIELD_TYPE}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}" class="form-control" value="{VALUE}" placeholder="{PLACEHOLDER}" \
          data-mask="{DATA_MASK}"> \
        </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputTaggingH ########################################################
name = 'inputTaggingH';
template = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <input type="hidden" id="{FIELD_NAME}" name="{FIELD_NAME}[]"/> \
          <div class="col-md-10"> \
          <div id="{FIELD_NAME}-tagging"> \
          </div> \
          </div> \
        </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  let t = $("#" + fieldName + '-tagging').tagging();
  let tag_box = t[0];
  let arrayValField = [];
  //Configurar para remover o "spacebar" como ação para adicionar uma tag.
  tag_box.tagging("removeSpecialKeys", ["add", 32]);
  tag_box.tagging("reset");

  for (let key in this['value' + fieldName]) {
    let val = String(this['value' + fieldName][key]);
    if (val.trim() != '')
      tag_box.tagging("add", val.trim());
    arrayValField.push(val.trim());
  }
  $("#" + fieldName).val(tag_box.tagging("getTags"));

  // Execute callback when a tag is added
  tag_box.on("add:after", function (el, text, tagging) {
    arrayValField.push(text.trim())
    $("#" + fieldName).val(arrayValField);

  });

  // Execute callback when a tag is removed
  tag_box.on("remove:after", function (el, text, tagging) {

    arrayValField = $.grep(arrayValField, function (val, index) {
      return val == text.trim();
    });

  });

  return '';
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = viewInList;

FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputTaggingV ########################################################
name = 'inputTaggingV';
template = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <input type="hidden" id="{FIELD_NAME}" name="{FIELD_NAME}">{VALUE}</input> \
          <div id="{FIELD_NAME}-tagging"> \
          </div> \
        </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  let t = $("#" + fieldName + '-tagging').tagging();
  let tag_box = t[0];
  let arrayValField = [];
  //Configurar para remover o "spacebar" como ação para adicionar uma tag.
  tag_box.tagging("removeSpecialKeys", ["add", 32]);
  tag_box.tagging("reset");

  for (let key in this['value' + fieldName]) {
    let val = String(this['value' + fieldName][key]);
    if (val.trim() != '')
      tag_box.tagging("add", val.trim());
    arrayValField.push(val.trim());
  }
  $("#" + fieldName).val(tag_box.tagging("getTags"));

  // Execute callback when a tag is added
  tag_box.on("add:after", function (el, text, tagging) {
    arrayValField.push(text.trim())
    $("#" + fieldName).val(arrayValField);

  });

  // Execute callback when a tag is removed
  tag_box.on("remove:after", function (el, text, tagging) {

    arrayValField = $.grep(arrayValField, function (val, index) {
      return val == text.trim();
    });

  });

  return '';
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente multipleHCollection #################################################
name = 'multipleHCollection';
template = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="template-{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10" id="template-{FIELD_NAME}"> \
         </div>\
        </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, schema)=> {
  if (typeof schema.formOptions.OPTIONSCOLLECTION != 'undefined') {
    let data = schema.formOptions.OPTIONSCOLLECTION;
    data['FIELD_NAME'] = fieldName;
    data['FIELD_VALUES'] = this['value' + fieldName];
    UtilsView.templateRender('select2Collection', 'template-' + fieldName, data);
  } else {
    console.log('Error: Schema não definido');
  }
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value, schema)=> {
  let controllerTmp = Blaze._globalHelpers.getController(
      schema.formOptions.OPTIONSCOLLECTION.COLLECTION);
  let collectionSchema = schema.formOptions.OPTIONSCOLLECTION.COLLECTION_SCHEMA;
  let result = UtilsView.getTableViewFromSchemaAndListOfObjects(
      controllerTmp.getSubSchemaJson(collectionSchema), value);
  return (defaultViewComponent(result));
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente multipleVCollection #################################################
name = 'multipleVCollection';
template = '<div class="form-group"> \
        <label class="control-label" for="template-{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="template-{FIELD_NAME}"> \
         </div></div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, schema)=> {
  if (typeof schema.formOptions.OPTIONSCOLLECTION != 'undefined') {
    let data = schema.formOptions.OPTIONSCOLLECTION;
    data['FIELD_NAME'] = fieldName;
    data['FIELD_VALUES'] = this['value' + fieldName];
    UtilsView.templateRender('select2Collection', 'template-' + fieldName, data);
  } else {
    console.log('Error: Schema não definido');
  }
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value, schema)=> {
  let controllerTmp = Blaze._globalHelpers.getController(
      schema.formOptions.OPTIONSCOLLECTION.COLLECTION);
  let collectionSchema = schema.formOptions.OPTIONSCOLLECTION.COLLECTION_SCHEMA;
  let result = UtilsView.getTableViewFromSchemaAndListOfObjects(
      controllerTmp.getSubSchemaJson(collectionSchema), value);
  return (defaultViewComponent(result));
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputDateH ########################################################
name = 'inputDateH';
template = '<div class="form-group" id="data_1"> \
         <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
         <div class="col-md-10"> \
            <div class="input-group date"  id="{FIELD_NAME}-Date"> \
              <span class="input-group-addon"><i class="fa fa-calendar"></i></span>\
              <input type="text" class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}" \
              value="{VALUE}"> \
            </div>\
          </div> \
         </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName)=> {
  $('#' + fieldName).datepicker({
    startView: 1,
    todayBtn: 'linked',
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    format: 'dd/mm/yyyy',
  });
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  let pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  if (value instanceof Date) {
    value = String(value);
    value = new Date(value.replace(pattern, '$3-$2-$1'));
    pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    return value.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
  } else
    return '';
};
viewFunction = (value)=> {
  let pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  let result = '';
  if (value instanceof Date) {
    try {
      value = String(value);
      result = new Date(value.replace(pattern, '$3-$2-$1'));
      pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
      result = result.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
    } catch (e) {
      console.error(e.message);
    }

  } else {
    result = '';
  }

  return defaultViewComponent(result);

};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputDateV ########################################################
name = 'inputDateV';
template = '<div class="form-group" id="data_1"> \
         <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label>\
            <div class="input-group date">\
              <span class="input-group-addon"><i class="fa fa-calendar"></i></span>\
              <input type="text" class="form-control" id="{FIELD_NAME}" name="{FIELD_NAME}" \
              value="{VALUE}"> \
          </div> \
         </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName)=> {
  $('#' + fieldName + '-Date').datepicker({
    startView: 1,
    todayBtn: 'linked',
    keyboardNavigation: false,
    forceParse: false,
    autoclose: true,
    format: 'dd/mm/yyyy',
  });
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  let pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  if (value instanceof Date) {
    value = String(value);

    value = new Date(value.replace(pattern, '$3-$2-$1'));

    pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    return value.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
  } else
    return '';
};
viewFunction = (value)=> {
  let pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  let result = '';
  if (value instanceof Date) {
    try {
      value = String(value);
      result = new Date(value.replace(pattern, '$3-$2-$1'));
      pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
      result = result.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');
    } catch (e) {
      console.error(e.message);
    }

  } else {
    result = '';
  }

  return defaultViewComponent(result);

};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputHourH ########################################################
name = 'inputHourH';
template = '<div class="form-group" id="hour_1"> \
         <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label>\
         <div class="col-md-10"> \
            <div class="input-group clockpicker" data-autoclose="true">\
              <input type="text" class="form-control" value="00:00" id="{FIELD_NAME}" \
              name="{FIELD_NAME}"/> \
              <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>\
            </div>\
          </div> \
         </div>';
templateFunction = (fieldName)=> {
  return '';
};
initializationFunction = (fieldName)=> {
  $('#' + fieldName).clockpicker({
    autoclose: true
  });
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

//##############################################################################################
//#############  Componente inputHourV ########################################################
name = 'inputHourV';
template = '<div class="form-group" id="hour_1"> \
         <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label>\
            <div class="input-group clockpicker" data-autoclose="true">\
              <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>\
              <input type="text" class="form-control" value="00:00" id="{FIELD_NAME}" \
              name="{FIELD_NAME}"> \
          </div> \
         </div>';
templateFunction = ()=> {
  $('.clockpicker').clockpicker();
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

//##############################################################################################
//#############  Componente multipleH ########################################################
name = 'multipleH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10"> \
 <select class="select2_demo_2 form-control" style="width: 100%" multiple="multiple" \
 id="{FIELD_NAME}" name="{FIELD_NAME}">\
 {FIELD_OPTIONS} \
 </select>\
 </div>\
 </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let optionsTmp = '';
  if (typeof schema.formOptions.OPTIONS != 'undefined') {
    let options = schema.formOptions.OPTIONS;

    for (let oKey in options) {
      let selected = false;

      //Verifica se opções foram previamente selecionadas
      for (let dado in this['value' + fieldName]) {
        if (_.isEqual(options[oKey].VALUE, this['value' + fieldName][dado])) {
          selected = true;
        }
      }

      optionsTmp = optionsTmp + "<option value='";

      if (typeof options[oKey].VALUE == 'object') {
        optionsTmp = optionsTmp + JSON.stringify(options[oKey].VALUE);
      } else {
        optionsTmp = optionsTmp + options[oKey].VALUE;
      }

      //Permite exibir as opções previamente selecionadas
      if (selected) {
        optionsTmp = optionsTmp + "' selected>";
      } else {
        optionsTmp = optionsTmp + "'>";
      }

      optionsTmp = optionsTmp + options[oKey].LABEL + '</option>';
    }

    fieldOptions.template = fieldOptions.template.replace(
        new RegExp('{FIELD_OPTIONS}', 'g'), optionsTmp);
  }
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  $('#' + fieldName).select2();
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value, schema)=> {
  let result = UtilsView.getTableViewFromSchemaAndListOfObjects(
      schema.formOptions.FIELD_SCHEMA, value);
  return (defaultViewComponent(result));
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente multipleV ########################################################
name = 'multipleV';
template = '<div class="form-group"> \
<label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
<select class="select2_demo_2 form-control" multiple="multiple" id="{FIELD_NAME}" \
name="{FIELD_NAME}">\
{FIELD_OPTIONS} \
</select>\
</div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let optionsTmp = '';
  if (typeof schema.formOptions.OPTIONS != 'undefined') {
    let options = schema.formOptions.OPTIONS;

    for (let oKey in options) {
      let selected = false;

      //Verifica se opções foram previamente selecionadas
      for (let dado in this['value' + fieldName]) {
        if (_.isEqual(options[oKey].VALUE, this['value' + fieldName][dado])) {
          selected = true;
        }
      }

      optionsTmp = optionsTmp + "<option value='";

      if (typeof options[oKey].VALUE == 'object') {
        optionsTmp = optionsTmp + JSON.stringify(options[oKey].VALUE);
      } else {
        optionsTmp = optionsTmp + options[oKey].VALUE;
      }

      //Permite exibir as opções previamente selecionadas
      if (selected) {
        optionsTmp = optionsTmp + "' selected>";
      } else {
        optionsTmp = optionsTmp + "'>";
      }

      optionsTmp = optionsTmp + options[oKey].LABEL + '</option>';
    }

    fieldOptions.template = fieldOptions.template.replace(
        new RegExp('{FIELD_OPTIONS}', 'g'), optionsTmp);
  }
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  $('#' + fieldName).select2();
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value, schema)=> {
  let result = UtilsView.getTableViewFromSchemaAndListOfObjects(
      schema.formOptions.FIELD_SCHEMA, value);
  return (defaultViewComponent(result));
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente selectH ########################################################
name = 'selectH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10"> \
 <select class="form-control js-example-placeholder-single" style="width: 100%" \
 tabindex="-1" aria-hidden="true" id="{FIELD_NAME}" name="{FIELD_NAME}">\
 {FIELD_OPTIONS} \
 </select><span class="select2 select2-container select2-container--default \
 select2-container--below" dir="ltr">\
 </div>\
 </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let optionsTmp = '';
  if (typeof schema.formOptions.SELECTS != 'undefined') {
    let options = schema.formOptions.SELECTS;

    for (let oKey in options) {
      let selected = false;

      //Verifica se opções foram previamente selecionadas
      for (let dado in this['value' + fieldName]) {
        if (_.isEqual(options[oKey].VALUE, this['value' + fieldName][dado])) {
          selected = true;
        }
      }

      optionsTmp = optionsTmp + "<option value='";

      if (typeof options[oKey].VALUE == 'object') {
        optionsTmp = optionsTmp + JSON.stringify(options[oKey].VALUE);
      } else {
        optionsTmp = optionsTmp + options[oKey].VALUE;
      }

      //Permite exibir as opções previamente selecionadas
      if (selected) {
        optionsTmp = optionsTmp + "' selected>";
      } else {
        optionsTmp = optionsTmp + "'>";
      }

      optionsTmp = optionsTmp + options[oKey].LABEL + '</option>';
    }

    fieldOptions.template = fieldOptions.template.replace(
        new RegExp('{FIELD_OPTIONS}', 'g'), optionsTmp);
  }
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  $('.js-example-placeholder-single').select2({
    placeholder: 'Selecione uma opção',
  });
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente selectV ########################################################
name = 'selectV';
template = '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <select class="form-control js-example-placeholder-single" id="{FIELD_NAME}" \
 name="{FIELD_NAME}">\
 {FIELD_OPTIONS} \
 </select>\
 </div>';
templateFunction = ()=> {
  let optionsTmp = '';
  let options = schema[key].formOptions.OPTION;
  for (let oKey in options) {

    if (typeof options[oKey].VALUE == 'object') {

      optionsTmp = optionsTmp + '<option value=' + options[oKey].VALUE + '>'
          + options[oKey].LABEL + '</option>';
    } else {
      optionsTmp = optionsTmp + '<option value="' + options[oKey].VALUE + '">'
          + options[oKey].LABEL + '</option>';
    }
  }

  fieldTmp = fieldTmp.replace(
      new RegExp('{FIELD_OPTIONS}', 'g'), optionsTmp);
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  $('#' + fieldName).select2({
    placeholder: 'Selecione uma opção',
  });
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente textareaH ########################################################
name = 'textareaH';
template = '<div class="form-group"> \
          <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10"> \
          <textarea class="form-control" rows="{ROWS}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}">{VALUE}</textarea> \
          </div> \
          </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente textareaV ########################################################
name = 'textareaV';
template = '<div class="form-group"> \
          <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
          <textarea class="form-control" rows="{ROWS}" id="{FIELD_NAME}" \
          name="{FIELD_NAME}">{VALUE}</textarea> \
          </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputHelpH ########################################################
name = 'inputHelpH';
template = '<div class="form-group">  \
    <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
            <div class="col-md-10">\
                <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" \
                class="form-control">\
                <span class="help-block m-b-none">{HELP_TEXT}</span>\
            </div>\
            </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente inputHelpV ########################################################
name = 'inputHelpV';
template = '<div class="form-group">  \
    <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
                <input type="{FIELD_TYPE}" id="{FIELD_NAME}" name="{FIELD_NAME}" \
                class="form-control">\
                <span class="help-block m-b-none">{HELP_TEXT}</span>\
            </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente checkboxV ########################################################
name = 'checkboxV';
template = '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <input type="checkbox" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente checkboxH ########################################################
name = 'checkboxH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10"> \
 <input type="checkbox" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
 </div>\
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente radioH ########################################################
name = 'radioH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10"> \
 <input type="radio" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
 </div>\
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente radioV ########################################################
name = 'radioV';
template = '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <input type="radio" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente rangeH ########################################################
name = 'rangeH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10"> \
 <input type="range" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
 </div>\
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente rangeV ########################################################
name = 'rangeV';
template = '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <input type="range" id="{FIELD_NAME}" name="{FIELD_NAME}" />\
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente checkboxNH ########################################################
name = 'checkboxNH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10" id="{FIELD_NAME}">\
 {LABEL_OPTIONS} \
 </div> </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let labelsTmp = '';
  let labels = schema.formOptions.LABELS;

  for (let oKey in labels) {
    labelsTmp = labelsTmp + '<input type="checkbox" name="' + labels[oKey].NAME + '  " value="' + labels[oKey].VALUE + '"> \
        <label class="control-label" for="' + labels[oKey].FOR + '">' + labels[oKey].LABEL + ' </label><br>';
  }

  fieldOptions.template = fieldOptions.template.replace(
      new RegExp('{LABEL_OPTIONS}', 'g'), labelsTmp);

};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente checkboxNV ########################################################
name = 'checkboxNV';
template = '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div id="{FIELD_NAME}">\
 {LABEL_OPTIONS} \
 </div> </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let labelsTmp = '';
  let labels = schema.formOptions.LABELS;

  for (let oKey in labels) {
    labelsTmp = labelsTmp + '<input type="checkbox" name="' + labels[oKey].NAME + '  " value="' + labels[oKey].VALUE + '"> \
        <label class="control-label" for="' + labels[oKey].FOR + '">' + labels[oKey].LABEL + ' </label><br>';
  }

  fieldOptions.template = fieldOptions.template.replace(
      new RegExp('{LABEL_OPTIONS}', 'g'), labelsTmp);

};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente radioNH ########################################################
name = 'radioNH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10" id="{FIELD_NAME}">\
 {LABEL_OPTIONS} \
 </div> </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let labelsTmp = '';
  let labels = schema.formOptions.LABELS;

  for (let oKey in labels) {
    labelsTmp = labelsTmp + '<input type="radio" name="' + labels[oKey].NAME + '  " value="' + labels[oKey].VALUE + '"> \
        <label class="control-label" for="' + labels[oKey].FOR + '">' + labels[oKey].LABEL + ' </label><br>';
  }

  fieldOptions.template = fieldOptions.template.replace(
      new RegExp('{LABEL_OPTIONS}', 'g'), labelsTmp);

};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente radioNV ########################################################
name = 'radioNV';
template = '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div id="{FIELD_NAME}">\
 {LABEL_OPTIONS} \
 </div> </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let labelsTmp = '';
  let labels = schema.formOptions.LABELS;

  for (let oKey in labels) {
    labelsTmp = labelsTmp + '<input type="radio" name="' + labels[oKey].NAME + '  " value="' + labels[oKey].VALUE + '"> \
        <label class="control-label" for="' + labels[oKey].FOR + '">' + labels[oKey].LABEL + ' </label><br>';
  }

  fieldOptions.template = fieldOptions.template.replace(
      new RegExp('{LABEL_OPTIONS}', 'g'), labelsTmp);

};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente imageH ########################################################
name = 'imageH';
template = '<div class="form-group"> \
 <label class="col-md-2 control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div class="col-md-10"> \
 <div id="templateImage-{FIELD_NAME}"></div>\
 </div> \
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  UtilsView.templateRender('selectImageTemplate', 'templateImage-' + fieldName, {
    image: this['value' + fieldName],
    FIELD_NAME: fieldName
  });
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value) => {
  return (FormComponents.templates['showImageH'].replace(new RegExp('{VALUE}', 'g'), value || ''))
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente imageV ########################################################
name = 'imageV';
template = '<div class="form-group"> \
 <label class="control-label" for="{FIELD_NAME}">{FIELD_LABEL}</label> \
 <div> \
 <div id="templateImage"></div>\
 </div> \
 </div>';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  UtilsView.templateRender('selectImageTemplate', 'templateImage', { image: this['value' + fieldName] });
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value) => {
  return (FormComponents.templates['showImageV'].replace(new RegExp('{VALUE}', 'g'), value || ''))
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente fieldObjectManagementH ##############################################
name = 'fieldObjectManagementH';
template = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="template-{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10" id="template-{FIELD_NAME}"> \
         </div>\
        </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, schema)=> {
  if (typeof schema.formOptions.FIELD_SCHEMA != 'undefined') {
    let data = {};
    data.fieldName = fieldName;
    data.schema = schema;
    data.listOfObjects = this['value' + fieldName];
    data.FIELD_SCHEMA = schema.formOptions.FIELD_SCHEMA;

    UtilsView.templateRender('fieldObjectManagement', 'template-' + fieldName, data);
  } else {
    console.log('Error: Schema não definido');
  }
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value, schema)=> {
  let result = UtilsView.getTableViewFromSchemaAndListOfObjects(
      schema.formOptions.FIELD_SCHEMA, value);
  return (defaultViewComponent(result));
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

//##############################################################################################
//#############  Componente fieldObjectManagementV ##############################################
name = 'fieldObjectManagementV';
template = '<div class="form-group"> \
        <label class="control-label" for="template-{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div id="template-{FIELD_NAME}"> \
         </div>\
        </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, schema)=> {
  if (typeof schema.formOptions.FIELD_SCHEMA != 'undefined') {
    let data = {};
    data.fieldName = fieldName;
    data.listOfObjects = this['value' + fieldName];
    data.schema = schema.formOptions.FIELD_SCHEMA;

    UtilsView.templateRender('fieldObjectManagement', 'template-' + fieldName, data);
  } else {
    console.log('Error: Schema não definido');
  }
};
getValueFunction = (value, fieldName = '')=> {
  this['value' + fieldName] = value;
  return '';
};
viewFunction = (value, schema)=> {
  return '';
};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction)

//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################

//##############################################################################################
//#############  Componente fieldSample ########################################################
name = 'fieldSAMPLE';
template = '';
templateFunction = ()=> {
  return '';
};
initializationFunction = (fieldName, fieldOptions, Schema)=> {
  return '';
};
getValueFunction = (value, fieldName = '')=> {
  return '';
};
viewFunction = defaultViewComponent;
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction, viewFunction);

