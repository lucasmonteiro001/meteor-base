//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';
import { ColaboradoresController } from '../../api/Colaboradores/controller';
import { ProjetosController } from '../../api/Projetos/controller';
import { Blaze } from 'meteor/blaze';
import './globaltemplates';
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



//######################################################################################
//###################CARREGA TODOS OS DADOS PARA A MEMÓRIA #############################
//#######################PARA SEREM PESQUISADOS OFFLINE#################################
if (Meteor.isCordova) {
  Meteor.subscribe(ColaboradoresController.getCollectionName(),
      ColaboradoresController.getFilter(), ColaboradoresController.getProjection('view'))
  Meteor.subscribe(ProjetossController.getCollectionName(),
      ProjetossController.getFilter(), ProjetossController.getProjection('view'))
//Fim Meteor.isCordova
}
