import { Utils } from '../../api/reuse/utils';
import './formGeneratorTemplates.html';
import { UtilsView } from './ViewUtils';

class Components {
  constructor () {
    this.ComponentTemplates = {};
    this.ComponentTemplatesFunction = {};
    this.ComponentInitializationFunction = {};
    this.ComponentSetValuesFunction = {};
  }

  addComponent (name, template, templateFunction, initializationFunction, setValuesFunction) {
    this.ComponentTemplates[name] = template;
    this.ComponentTemplatesFunction[name] = templateFunction;
    this.ComponentInitializationFunction[name] = initializationFunction;
    this.ComponentSetValuesFunction[name] = setValuesFunction;
  }

  getComponente (name) {
    if (typeof this.ComponentTemplates[name] != 'undefined') {
      return {
        name: name,
        template: this.ComponentTemplates[name],
        templateFunction: this.ComponentTemplatesFunction[name],
        init: this.ComponentInitializationFunction[name],
        getValue: this.ComponentSetValuesFunction[name]
      }

    } else {
      return {
        name: name, template: '', templateFunction: ()=> {
          return '';
        },
        init: ()=> {
          return '';
        }, getValue: ()=> {
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
//#########DEFINIÇAÕ DOS COMPONENTES###############################
//#################################################################
//#################################################################
let name;
let template;
let templateFunction;
let initializationFunction;
let getValueFunction;

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
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

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
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

//##############################################################################################
//#############  Componente multipleH ########################################################
name = 'multipleHCollection';
template = '<div class="form-group"> \
        <label class="col-md-2 control-label" for="template-{FIELD_NAME}">{FIELD_LABEL}</label> \
          <div class="col-md-10" id="template-{FIELD_NAME}"> \
         </div>\
        </div>';
templateFunction = (fieldName, fieldOptions, schema)=> {
  let optionsTmp = '';
  if (typeof schema.formOptions.OPTIONS != 'undefined') {
    let options = schema.formOptions.OPTIONS;

    for (let oKey in options) {
      let selected = false;

      //Verifica se opções foram previamente selecionadas
      for (let dado in this.value) {
        if (_.isEqual(options[oKey].VALUE, this.value[dado])) {
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

FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

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
;
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
  var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  if (typeof value == 'string')
    value = new Date(value.replace(pattern, '$3-$2-$1'));

  pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
  return value.toISOString().slice(0, 10).replace(pattern, '$3/$2/$1');

};
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

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
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

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
FormComponents.addComponent(name, template, templateFunction, initializationFunction, getValueFunction);

//#################################################################
//#################################################################
//#################################################################
//#################################################################
//#################################################################

