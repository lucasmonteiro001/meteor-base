//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';
import { colaboradoresController } from '../../api/colaborador/controller';
import { projetosController } from '../../api/projeto/controller';
import { Blaze } from 'meteor/blaze';

import './routes/';

//Bert.defaults.style = 'growl-top-right';

i18n.map('pt-br', {
  reactiveTable: {
    columns: 'Colunas',
    filter: 'Filtro',
    show: 'Mostrar',
    rowsPerPage: 'linhas por página',
    page: 'Página',
    of: 'de',
  },
});

i18n.setDefaultLanguage('pt-br');

//######################################################################
//#################### GLOBAL TEMPLATE HELPERS #########################
//######################################################################

Template.registerHelper('getController', (controllerName) => {

  switch (controllerName) {
    case 'colaboradores':
      return colaboradoresController;
      break;
    case 'projetos':
      return projetosController;
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

//######################################################################################
//###################CARREGA TODOS OS DADOS PARA A MEMÓRIA #############################
//#######################PARA SEREM PESQUISADOS OFFLINE#################################
if (Meteor.isCordova) {
  Meteor.subscribe(colaboradoresController.getCollectionName(),
      colaboradoresController.getFilter(), colaboradoresController.getProjection('view'))
  Meteor.subscribe(projetosController.getCollectionName(),
      projetosController.getFilter(), projetosController.getProjection('view'))
//Fim Meteor.isCordova
}
