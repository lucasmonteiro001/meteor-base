import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { contatoController } from '../../../api/contatos/controller';
import { Message } from '../../utils/message';
import './contatos.html';

let template;

Template.contato.onCreated(() => {
  template = Template.instance();
  contatoController.applySubscribe(template);
  template.canInsertContato = new ReactiveVar(false);
});
Template.contato.onRendered(() => {
  template = Template.instance();
  contatoController.checkIfCanUserInsert(template.canInsertContato);
});
Template.contato.helpers({
  'canUserInsert': () => {
    template = Template.instance();
    contatoController.checkIfCanUserInsert(template.canInsertContato);
    return template.canInsertContato.get();
  },
});

Template.contatoAdd.onRendered(() => {

  // $("#telefone").mask("(99) 99999-9999");

  //Jquery Validation - https://jqueryvalidation.org/validate
  $('#userForm').validate({
    rules: {
      nome: {
        required: true,
      },
      telefone: {
        required: true,
      },
    },
    messages: {
      nome: {
        required: 'É obrigado informar um nome.',
      },
      telefone: {
        required: 'É obrigado informar um telefone.',
      },
    },
  });

});
Template.contatoAdd.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    template = Template.instance();

    event.preventDefault();
    const contatoData = {
      userId: '',
      nome: template.find('[id="nome"]').value.trim(),
      telefone: template.find('[id="telefone"]').value.trim(),
    };

    contatoController.insert(contatoData, (error, data) => {
      if (error) {
        Message.showErro(error);
      } else {
        Message.showSuccessNotification('Contato inserido com sucesso!');
        FlowRouter.go('/contatoView/' + data);
      }

    });
  },
});

Template.contatoView.onCreated(() => {
  let id = FlowRouter.getParam('_id');
  template = Template.instance();
  contatoController.applySubscribe(template, id);
  template.canUpdateContato = new ReactiveVar(false);
  template.canRemoveContato = new ReactiveVar(false);
});
Template.contatoView.onRendered(() => {
  let id = FlowRouter.getParam('_id');
  template = Template.instance();

  contatoController.checkIfCanUserUpdate(template.canUpdateContato, id);
  contatoController.checkIfCanUserRemove(template.canRemoveContato, id);

  let dadosContato = contatoController.get({ _id: id });
  template.dadosDoContato = dadosContato;

});
Template.contatoView.helpers({
  'canUserUpdate': () => {
    contatoController.checkIfCanUserUpdate(template.canUpdateContato, FlowRouter.getParam('_id'));
    return template.canUpdateContato.get();
  },

  'canUserRemove': () => {
    contatoController.checkIfCanUserRemove(template.canRemoveContato, FlowRouter.getParam('_id'));
    return template.canRemoveContato.get();
  },

  'canUserAccessActions': () => {
    return template.canRemoveContato.get() || template.canUpdateContato.get();
  },

  'dadosDoContato': () => {
    let idContato = FlowRouter.getParam('_id');
    return contatoController.get({ _id: idContato });
  },
});
Template.contatoView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation
    ('Remover o contato?', 'Não é possível recuperar um cliente removido!', 'Sim, remover!',
        (erro, confirm) => {
          if (confirm) {
            contatoController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('contato');
                Message.showSuccessNotification('O contato foi removido com sucesso!');
              }
            });
          }
        });
  },
});

Template.contatoEdit.onCreated(() => {
  let id = FlowRouter.getParam('_id');
  template = Template.instance();
  contatoController.applySubscribe(template, id);
});
Template.contatoEdit.onRendered(() => {

  let id = FlowRouter.getParam('_id');
  let dadosContato = contatoController.get({ _id: id });
  Template.instance().dadosDoContato = dadosContato;

  //Jquery Validation - https://jqueryvalidation.org/validate
  $('#userForm').validate({
    rules: {
      nome: {
        required: true,
      },
      telefone: {
        required: true,
      },
    },
    messages: {
      nome: {
        required: 'É obrigado informar um nome.',
      },
      telefone: {
        required: 'É obrigado informar um telefone.',
      },
    },
  });

});
Template.contatoEdit.helpers({
  'dadosDoContato': () => {
    let idContato = FlowRouter.getParam('_id');
    return contatoController.get({ _id: idContato });
  },
});
Template.contatoEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const contatoData = {
      nome: template.find('[id="nome"]').value.trim(),
      telefone: template.find('[id="telefone"]').value.trim(),
    };

    contatoController.update(id, contatoData, (error, data) => {
      if (error) {
        Message.showErro(error);
      } else {
        Message.showSuccessNotification('O contato foi atualizado com sucesso!');
        FlowRouter.go('/contatoView/' + id);
      }
    });
  },
});

Template.contatoList.onCreated(() => {
  template = Template.instance();
  contatoController.applySubscribe(template);
});
Template.contatoList.helpers({
  'settings': function () {
    return {
      collection: contatoController.getCollection(),
      rowsPerPage: 10,
      showFilter: true,
      showRowCount: true,
      showColumnToggles: true,
      multiColumnSort: true,
      fields: [
        { key: 'nome', label: 'Informe um nome', tmpl: Template.contatoTmpl },
        { key: 'telefone', label: 'Telefone/Cel:' },
      ],
    };
  },
});
