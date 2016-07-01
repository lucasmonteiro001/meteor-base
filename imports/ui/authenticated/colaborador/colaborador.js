import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { colaboradoresController } from '../../../api/colaborador/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import './colaborador.html';

let template;

Template.colaborador.onCreated(() => {
  template = Template.instance();
  colaboradoresController.applySubscribe('view', template, '', function () {
      }
  );
  template.canInsert = new ReactiveVar(false);
});
Template.colaborador.onRendered(() => {
  template = Template.instance();
  colaboradoresController.checkIfCanUserInsert(template.canInsert);
});
Template.colaborador.helpers({
  'canUserInsert': () => {
    template = Template.instance();
    colaboradoresController.checkIfCanUserInsert(template.canInsert);
    return template.canInsert.get();
  },
});

Template.colaboradorAdd.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate

  formGen.formRender('formContext', true, colaboradoresController, 'insert', '', 'formTag');

});
Template.colaboradorAdd.events({

  //Eventos do template de inserção
  'submit form'(event, templateInstance) {
    event.preventDefault();
    const colaboradorData = formGen.getFormData(colaboradoresController, 'insert', templateInstance);

    colaboradoresController.insert(colaboradorData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/colaboradorView/' + data);
      }

    });
  },
});

Template.colaboradorView.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  template.canUpdate = new ReactiveVar(false);
  template.canRemove = new ReactiveVar(false);

  colaboradoresController.applySubscribe('view', template, id, ()=> {
    colaboradoresController.checkIfCanUserUpdate(template.canUpdate, id);
    colaboradoresController.checkIfCanUserRemove(template.canRemove, id);
    template.collectionData = colaboradoresController.get({ _id: id });
    formGen.formViewRender('formContext', colaboradoresController, 'view', id);
  });

});
Template.colaboradorView.onRendered(() => {

});
Template.colaboradorView.helpers({
  'canUserUpdate': () => {
    let template = Template.instance();
    colaboradoresController.checkIfCanUserUpdate(template.canUpdate, FlowRouter.getParam('_id'));
    return template.canUpdate.get();
  },

  'canUserRemove': () => {
    let template = Template.instance();
    colaboradoresController.checkIfCanUserRemove(template.canRemove, FlowRouter.getParam('_id'));
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
    return colaboradoresController.get({ _id: id });
  },
});
Template.colaboradorView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o colaborador?', 'Não é possível recuperar um colaborador removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            colaboradoresController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('colaborador');
                Message.showSuccessNotification('O Cliente foi removido com sucesso!');
              }
            });
          }
        });
  },
});

Template.colaboradorEdit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  colaboradoresController.applySubscribe('update', template, id, ()=> {
    template.collectionData = colaboradoresController.get({ _id: id });
    formGen.formRender('formContext', true, colaboradoresController, 'update', id, 'formTag');
  });

});
Template.colaboradorEdit.onRendered(() => {

});
Template.colaboradorEdit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return colaboradoresController.get({ _id: id });
  },
});
Template.colaboradorEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const colaboradorData = formGen.getFormData(colaboradoresController, 'update', template);

    colaboradoresController.update(id, colaboradorData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/colaboradorView/' + id);
      }

    });
  },
});

Template.colaboradorList.onCreated(() => {
  template = Template.instance();
  colaboradoresController.applySubscribe('view', template, '', function () {
  });
});
Template.colaboradorList.helpers({
  'settings': function () {
    let templates = { tmpl: Template.colaboradorTmpl };
    return {
      collection: colaboradoresController.getCollection(),
      rowsPerPage: 10,
      showFilter: true,
      showRowCount: true,
      showColumnToggles: true,
      multiColumnSort: true,
      fields: formGen.getTableViewData(colaboradoresController, 'view', templates),
    };
  },
});

