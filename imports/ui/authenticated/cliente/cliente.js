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
  template.canInsertCliente = new ReactiveVar(false);
});

Template.cliente.onRendered(() => {
  template = Template.instance();
  clienteController.checkIfCanUserInsert(template.canInsertCliente);
});

Template.cliente.helpers({
  'canUserInsert': () => {
    template = Template.instance();
    clienteController.checkIfCanUserInsert(template.canInsertCliente);
    return template.canInsertCliente.get();
  },
});

Template.clienteAdd.onRendered(() => {
  //Jquery Validation - https://jqueryvalidation.org/validate

  document.getElementById('formContext').innerHTML = formGen.formRender(clienteController, 'default');

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
  'submit form'(event, template) {
    template = Template.instance();

    event.preventDefault();
    const clienteData = formGen.getFormData(clienteController.getSchemaJson('default'), templateInstance);

    clienteController.insert(clienteData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('Cliente inserido com sucesso!');
        FlowRouter.go('/clienteView/' + data);
      }

    });
  },
});

Template.clienteView.onCreated(() => {
  let id = FlowRouter.getParam('_id');
  template = Template.instance();
  clienteController.applySubscribe(template, id);
  template.canUpdateCliente = new ReactiveVar(false);
  template.canRemoveCliente = new ReactiveVar(false);
});

Template.clienteView.onRendered(() => {
  let id = FlowRouter.getParam('_id');
  template = Template.instance();

  clienteController.checkIfCanUserUpdate(template.canUpdateCliente, id);
  clienteController.checkIfCanUserRemove(template.canRemoveCliente, id);

  template.collectionData = clienteController.get({ _id: id });

});

Template.clienteView.helpers({
  'canUserUpdate': () => {
    clienteController.checkIfCanUserUpdate(template.canUpdateCliente, FlowRouter.getParam('_id'));
    return template.canUpdateCliente.get();
  },

  'canUserRemove': () => {
    clienteController.checkIfCanUserRemove(template.canRemoveCliente, FlowRouter.getParam('_id'));
    return template.canRemoveCliente.get();
  },

  'canUserAccessActions': () => {
    return template.canRemoveCliente.get() || template.canUpdateCliente.get();
  },

  'dadosDoCliente': () => {
    let idCliente = FlowRouter.getParam('_id');
    return clienteController.get({ _id: idCliente });
  },
});

Template.clienteView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o cliente?', 'Não é possível recuperar um cliente removido!', 'Sim, remover!', (erro, confirm) => {
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
  let id = FlowRouter.getParam('_id');
  template = Template.instance();
  clienteController.applySubscribe(template, id);
});

Template.clienteEdit.onRendered(() => {

  let id = FlowRouter.getParam('_id');
  let dadosClientes = clienteController.get({ _id: id });
  Template.instance().collectionData = dadosClientes;
  console.log(Template.instance().collectionData);
  document.getElementById('formContext').innerHTML = formGen.formRender(clienteController, 'default', id);

  //Jquery Validation - https://jqueryvalidation.org/validate
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

Template.clienteEdit.helpers({
  'dadosDoCliente': () => {
    let idCliente = FlowRouter.getParam('_id');
    return clienteController.get({ _id: idCliente });
  },
});

Template.clienteEdit.events({

  //Eventos do template de inserção
  'submit form' (event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const clienteData = formGen.getFormData(clienteController.getSchemaJson('default'), template);

    clienteController.update(id, clienteData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/clienteView/' + id);
      }

    });
  }
});

Template.clienteList.onCreated(() => {
  template = Template.instance();
  clienteController.applySubscribe(template);
});

Template.clienteList.helpers({
  'settings': function () {
    return {
      collection: clienteController.getCollection(),
      rowsPerPage: 10,
      showFilter: true,
      showRowCount: true,
      showColumnToggles: true,
      multiColumnSort: true,
      fields: [
        { key: 'nome', label: 'Informe um nome', tmpl: Template.clienteTmpl },
        { key: 'endereco', label: 'Informe o Endereço' },
        { key: 'telefone', label: 'Telefone/Cel:' },
        { key: 'Email', label: 'Meu Email' },
      ],
    };
  },
});

