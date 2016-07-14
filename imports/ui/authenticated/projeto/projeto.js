import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { projetosController } from '../../../api/projeto/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import { UtilsView } from '../../utils/ViewUtils';
import './projeto.html';

let template;

Template.projeto.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(projetosController, 'view', template, '', function () {
      }
  );
  template.canInsert = new ReactiveVar(false);
});
Template.projeto.onRendered(() => {
  template = Template.instance();
  projetosController.checkIfCanUserInsert(template.canInsert);

});
Template.projeto.helpers({
  'canUserInsert': () => {
    template = Template.instance();
    projetosController.checkIfCanUserInsert(template.canInsert);
    return template.canInsert.get();
  },
});

Template.projetoAdd.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate
  template = Template.instance();
  formGen.formRender('formContext', true, projetosController, 'insert', '', 'formTag');
  
});
Template.projetoAdd.events({

  //Eventos do template de inserção
  'submit form'(event, templateInstance) {
    event.preventDefault();
    const projetoData = formGen.getFormData(projetosController, 'insert', templateInstance);

    projetosController.insert(projetoData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/projetoView/' + data);
      }

    });
  },
});

Template.projetoView.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  template.canUpdate = new ReactiveVar(false);
  template.canRemove = new ReactiveVar(false);

  UtilsView.applySubscribe(projetosController, 'view', template, id, ()=> {
    projetosController.checkIfCanUserUpdate(template.canUpdate, id);
    projetosController.checkIfCanUserRemove(template.canRemove, id);
    template.collectionData = projetosController.get({ _id: id });
    formGen.formViewRender('formContext', projetosController, 'view', id);
  });

});
Template.projetoView.onRendered(() => {

});
Template.projetoView.helpers({
  'canUserUpdate': () => {
    let template = Template.instance();
    projetosController.checkIfCanUserUpdate(template.canUpdate, FlowRouter.getParam('_id'));
    return template.canUpdate.get();
  },

  'canUserRemove': () => {
    let template = Template.instance();
    projetosController.checkIfCanUserRemove(template.canRemove, FlowRouter.getParam('_id'));
    return template.canRemove.get();
  },

  'canUserAccessActions': () => {
    let template = Template.instance();
    if (typeof template.canRemove != 'undefined' && template.canUpdate != 'undefined') {
      return template.canRemove.get() || template.canUpdate.get();
    }
  },

  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return projetosController.get({ _id: id });
  },
});
Template.projetoView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o projeto?', 'Não é possível recuperar um projeto removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            projetosController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('projeto');
                Message.showSuccessNotification('O projeto foi removido com sucesso!');
              }
            });
          }
        });
  },
});

Template.projetoEdit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  UtilsView.applySubscribe(projetosController, 'update', template, id, ()=> {
    template.collectionData = projetosController.get({ _id: id });
    formGen.formRender('formContext', true, projetosController, 'update', id, 'formTag');
  });

});
Template.projetoEdit.onRendered(() => {

});
Template.projetoEdit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return projetosController.get({ _id: id });
  },
});
Template.projetoEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const projetoData = formGen.getFormData(projetosController, 'update', template);

    projetosController.update(id, projetoData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/projetoView/' + id);
      }

    });
  },
});

Template.projetoList.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(projetosController, 'view', template, '', function () {
  });
});

let dataTableData = function () {

  return projetosController.getAll().fetch();

};

let optionsObject = UtilsView.getDataTableConfig(projetosController, 'view');

Template.projetoList.helpers({
  reactiveDataFunction: function () {

    return dataTableData;
  },
  optionsObject: optionsObject,
});

Template.projetoList.onRendered(() => {

});

Template.projetoList.events({

});
