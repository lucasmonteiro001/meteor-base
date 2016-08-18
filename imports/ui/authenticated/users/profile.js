/**
 * Created by lucas on 5/5/16.
 */
import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { usersController } from '../../../api/users/controller.js';
//region Teste para exibir contagem de elementos cadastrado por este usuário
import { ProjetosController } from '../../../api/Projetos/controller.js';
import { ColaboradoresController } from '../../../api/Colaboradores/controller.js';
//endregion
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import { UtilsView } from '../../utils/ViewUtils';
import './profile.html';

Template.profile.onCreated(() => {
  let template = Template.instance();
  let id = Meteor.userId();

  UtilsView.applySubscribe(usersController, '', template, id, ()=> {

  });

  //region Teste para exibir contagem de elementos cadastrado por este usuário
  UtilsView.applySubscribe(ProjetosController, '', template, '', ()=> {

  });
  UtilsView.applySubscribe(ColaboradoresController, '', template, '', ()=> {

  });
  //endregion
});

Template.profile.onRendered(() => {

});

Template.profile.helpers({
  'collectionData': () => {
    let id = Meteor.userId();
    return usersController.get({ _id: id }).profile;
  },
  //region Teste para exibir contagem de elementos cadastrados por este usuário
  'projetos': () => {
    let id = Meteor.userId();
    return ProjetosController.getAll({ userId: id }).fetch().length;
  },
  'colaboradores': () => {
    let id = Meteor.userId();
    return ColaboradoresController.getAll({ userId: id }).fetch().length;
  },
  //endregion
});

Template.profile.events({});

Template.profileEdit.onCreated(() => {
  let template = Template.instance();
  let id = Meteor.userId();

  UtilsView.applySubscribe(usersController, 'update', template, id, ()=> {
    template.collectionData = usersController.get({ _id: id }).profile;
    formGen.formRender('formContext', true, usersController, 'update', id, 'formTag');
  });
});

Template.profileEdit.onRendered(() => {

});

Template.profileEdit.helpers({
  'collectionData': () => {
    let id = Meteor.userId();
    return usersController.get({ _id: id }).profile;
  },
});

Template.profileEdit.events({
  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = Meteor.userId();
    const UsersData = formGen.getFormData(usersController, 'update', template);
    usersController.update(id, UsersData, (error, data) => {
      if (error) {
        Message.showErro(error.message);

      } else {
        Message.showSuccessNotification('O Usuário foi atualizado com sucesso!');
        FlowRouter.go('/profile');
      }

    });
  },
});