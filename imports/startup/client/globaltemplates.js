import { ColaboradoresController } from '../../api/Colaboradores/controller';
import { ProjetosController } from '../../api/Projetos/controller';
//######################################################################
//#################### GLOBAL TEMPLATE HELPERS #########################
//######################################################################

Template.registerHelper('getController', (controllerName) => {

  switch (controllerName) {
    case 'Colaboradores':
      return ColaboradoresController;
      break;
    case 'Projetos':
      return ProjetosController;
      break;
      //Se não existir return null
    default:
      console.log('Controller ' + controllerName + ' NÃO encontrado!')
      return null;
  }

});

Template.registerHelper('json', function (a) {
  try {
    return JSON.stringify(a);

  } catch (e) {
    return a;
  }

});

Template.registerHelper('containsValueInList', function (field, key, item, list) {
  let result = false;
  try {
    let fieldValues = list[field];
    for (let index in fieldValues) {
      if (fieldValues[index][key] == item)
        result = true;
    }

  } catch (e) {
    return false;
  }
  return result;

});
