import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { clienteController } from '../../../api/cliente/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import './cliente.html';

let template;

Template.cliente.onCreated(() => {
  template = Template.instance();
  clienteController.applySubscribe('view', template, '', function () {
      }
  );
  template.canInsert = new ReactiveVar(false);
});

Template.cliente.onRendered(() => {
  template = Template.instance();
  clienteController.checkIfCanUserInsert(template.canInsert);
});

Template.cliente.helpers({
  'canUserInsert': () => {
    template = Template.instance();
    clienteController.checkIfCanUserInsert(template.canInsert);
    return template.canInsert.get();
  },
});

Template.clienteAdd.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate

  formGen.formRender('formContext', true, clienteController, 'insert', '', 'formTag');


});

Template.clienteAdd.events({

  //Eventos do template de inserção
  'submit form'(event, templateInstance) {
    event.preventDefault();
    const clienteData = formGen.getFormData(clienteController, 'insert', templateInstance);

    clienteController.insert(clienteData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/clienteView/' + data);
      }

    });
  },
});

Template.clienteView.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  template.canUpdate = new ReactiveVar(false);
  template.canRemove = new ReactiveVar(false);

  clienteController.applySubscribe('view', template, id, ()=> {
    clienteController.checkIfCanUserUpdate(template.canUpdate, id);
    clienteController.checkIfCanUserRemove(template.canRemove, id);
    template.collectionData = clienteController.get({ _id: id });
    formGen.formViewRender('formContext', clienteController, 'view', id);
  });

});

Template.clienteView.onRendered(() => {

});

Template.clienteView.helpers({
  'canUserUpdate': () => {
    let template = Template.instance();
    clienteController.checkIfCanUserUpdate(template.canUpdate, FlowRouter.getParam('_id'));
    return template.canUpdate.get();
  },

  'canUserRemove': () => {
    let template = Template.instance();
    clienteController.checkIfCanUserRemove(template.canRemove, FlowRouter.getParam('_id'));
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
    return clienteController.get({ _id: id });
  },
});

Template.clienteView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o cliente?', 'Não é possível recuperar um cliente removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            clienteController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('cliente');
                Message.showSuccessNotification('O Cliente foi removido com sucesso!');
              }
            });
          }
        });
  },
});

Template.clienteEdit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  clienteController.applySubscribe('update', template, id, ()=> {
    template.collectionData = clienteController.get({ _id: id });
    formGen.formRender('formContext', true, clienteController, 'update', id, 'formTag');
  });

});

Template.clienteEdit.onRendered(() => {

});

Template.clienteEdit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return clienteController.get({ _id: id });
  },
});

Template.clienteEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const clienteData = formGen.getFormData(clienteController, 'update', template);

    clienteController.update(id, clienteData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/clienteView/' + id);
      }

    });
  },
});

Template.clienteList.onCreated(() => {
  template = Template.instance();
  clienteController.applySubscribe('view', template, '', function () {
  });
});

Template.clienteList.helpers({
  'settings': function () {
    let templates = { tmpl: Template.clienteTmpl };
    return {
      collection: clienteController.getCollection(),
      rowsPerPage: 10,
      showFilter: true,
      showRowCount: true,
      showColumnToggles: true,
      multiColumnSort: true,
      fields: formGen.getTableViewData(clienteController, 'view', templates),
    };
  },
});

