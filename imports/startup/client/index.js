//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';
import { colaboradoresController } from '../../api/colaborador/controller';
import { projetosController } from '../../api/colaborador/controller';

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

Template.registerHelper('getController', (controllerName) => {

  switch (controllerName) {
    case 'colaborador':
      return colaboradoresController;
      break;
    case 'projeto':
      return projetosController;
      break;
      //Se não existir return null
    default:
      return null;
  }

});