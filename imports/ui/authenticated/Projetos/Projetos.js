import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ProjetosController } from '../../../api/Projetos/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import { UtilsView } from '../../utils/ViewUtils';
import './Projetos.html';

let template;

Template.Projetos.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(ProjetosController, 'view', template, '', function () {
      }
  );

});
Template.Projetos.onRendered(() => {
  template = Template.instance();

});
Template.Projetos.helpers({
  'canUserInsert': ()=> {
    return ProjetosController.canUserDo('insert');
  }
});

Template.ProjetosAdd.onRendered(() => {
  formGen.formRender('formContext', true, ProjetosController, 'insert', '', 'formTag');

});
Template.ProjetosAdd.events({
  //Eventos do template de inserção
  'submit form'(event, templateInstance){
    event.preventDefault();
    const ProjetosData = formGen.getFormData(ProjetosController, 'insert', templateInstance);

    ProjetosController.insert(ProjetosData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/ProjetosView/' + data);
      }

    });
  }
});

Template.ProjetosView.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  UtilsView.applySubscribe(ProjetosController, 'view', template, id, ()=> {
    template.collectionData = ProjetosController.get({ _id: id });
    formGen.formViewRender('formContext', ProjetosController, 'view', id);

  });

});
Template.ProjetosView.onRendered(() => {

});
Template.ProjetosView.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return ProjetosController.get({ _id: id });
  },
  'canUserUpdate': () => {
    let id = FlowRouter.getParam('_id');
    return ProjetosController.canUserDo('update', id);
  },
  'canUserRemove': () => {
    let id = FlowRouter.getParam('_id');
    return ProjetosController.canUserDo('remove', id);
  },
  'canUserAccessActions': () => {
    let id = FlowRouter.getParam('_id');
    return ProjetosController.canUserDo('update', id) || ProjetosController.canUserDo('remove', id);
  },
});

Template.ProjetosView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o Projetos?', 'Não é possível recuperar um Projetos removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            ProjetosController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('Projetos');
                Message.showSuccessNotification('O Projetos foi removido com sucesso!');
              }
            });
          }
        });
  },
});

Template.ProjetosEdit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  UtilsView.applySubscribe(ProjetosController, 'update', template, id, ()=> {
    template.collectionData = ProjetosController.get({ _id: id });
    formGen.formRender('formContext', true, ProjetosController, 'update', id, 'formTag');
  });

});
Template.ProjetosEdit.onRendered(() => {

});
Template.ProjetosEdit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return ProjetosController.get({ _id: id });
  },
});
Template.ProjetosEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const ProjetosData = formGen.getFormData(ProjetosController, 'update', template);

    ProjetosController.update(id, ProjetosData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/ProjetosView/' + id);
      }

    });
  },
});

Template.ProjetosList.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(ProjetosController, 'tableview', template, '', function () {
  });
});

let dataTableData = function () {
  
  return ProjetosController.getAll().fetch();

};

let optionsObject = UtilsView.getDataTableConfig(ProjetosController, 'tableview');

Template.ProjetosList.helpers({
  reactiveDataFunction: function () {

    return dataTableData;
  },
  optionsObject: optionsObject,
});
Template.ProjetosList.onRendered(() => {

});
Template.ProjetosList.events({});
