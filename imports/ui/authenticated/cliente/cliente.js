import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { clienteController } from '../../../api/cliente/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import './cliente.html';

let template;

Template.cliente.onCreated(() => {
  template = Template.instance();
  clienteController.applySubscribe(template);
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

  document.getElementById('formContext').innerHTML = formGen.formRender(clienteController, 'default');
  formGen.applyJQueryValidation(clienteController, 'default', 'userForm');
  document.getElementById('formContext')
      .innerHTML = formGen.formRender(clienteController, 'default');

  $('#userForm').validate({
    rules: {
      nome: {
        required: true,
      },
      telefone: {
        required: true,
      },
      Email: {
        required: true,
        email: true,
      },
      endereco: {
        required: true,
      },
    },
    messages: {
      Email: {
        required: 'É obrigado informar um email.',
        email: 'O email informado não é um email válido.',
      },
      nome: {
        required: 'É obrigado informar um nome.',
      },
      telefone: {
        required: 'É obrigado informar um telefone.',
      },
      endereco: {
        required: 'É obrigado informar um endereço.',
      },
    },
  });

});

Template.clienteAdd.events({

  //Eventos do template de inserção
  'submit form'(event, templateInstance) {
    event.preventDefault();
    const clienteData = formGen.getFormData(clienteController, 'default', templateInstance);
    const clienteData = formGen
        .getFormData(clienteController.getSchemaJson('default'), templateInstance);

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
  clienteController.applySubscribe(template, id);

  const handle = clienteController.applySubscribe(template, id);
  Tracker.autorun(() => {
    const isReady = handle.ready();
    if (isReady) {
      clienteController.checkIfCanUserUpdate(template.canUpdate, id);
      clienteController.checkIfCanUserRemove(template.canRemove, id);
      template.collectionData = clienteController.get({ _id: id });
      document.getElementById('formContext').innerHTML = formGen.formViewRender(clienteController, 'default', id);
    }
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

    Message.showConfirmation
    ('Remover o cliente?', 'Não é possível recuperar um cliente removido!', 'Sim, remover!',
        (erro, confirm) => {
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

  const handle = clienteController.applySubscribe(template, id);
  Tracker.autorun(() => {
    const isReady = handle.ready();
    if (isReady) {
      template.collectionData = clienteController.get({ _id: id });
      document.getElementById('formContext').innerHTML = formGen.formRender(clienteController, 'default', id);
    }
Template.clienteEdit.onRendered(() => {

  let id = FlowRouter.getParam('_id');
  let dadosClientes = clienteController.get({ _id: id });
  Template.instance().collectionData = dadosClientes;
  console.log(Template.instance().collectionData);
  document.getElementById('formContext').innerHTML = formGen
      .formRender(clienteController, 'default', id);

  });


});

Template.clienteEdit.onRendered(() => {

  //Aplica a Validação dos Campos
  formGen.applyJQueryValidation(clienteController, 'default', 'userForm');

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
    const clienteData = formGen.getFormData(clienteController, 'default', template);

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
  clienteController.applySubscribe(template);
});

Template.clienteList.helpers({
  'settings': function () {
    let templates = { tmpl: Template.clienteTmpl }
    return {
      collection: clienteController.getCollection(),
      rowsPerPage: 10,
      showFilter: true,
      showRowCount: true,
      showColumnToggles: true,
      multiColumnSort: true,
      fields: formGen.getTableViewData(clienteController, 'default', templates),
    };
  },
});

