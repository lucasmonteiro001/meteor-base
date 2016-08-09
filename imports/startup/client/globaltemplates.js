import { ColaboradoresController } from '../../api/Colaboradores/controller';
import { ProjetosController } from '../../api/Projetos/controller';
import { usersController } from '../../api/users/controller';
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
    case 'Users':
      return usersController;
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

    for (let i in list) {

      if (list[i][key] == item)
        result = true;

    }

  } catch (e) {
    return false;
  }
  return result;

});
