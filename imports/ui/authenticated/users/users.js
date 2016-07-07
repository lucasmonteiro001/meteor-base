/**
 * Created by lucas on 5/5/16.
 */
import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { usersController } from '../../../api/users/controller.js';
import { Message } from '../../utils/message';
import { UtilsView } from '../../utils/ViewUtils';
import { formGen } from '../../utils/formGenerator';
import './users.html';
let template;
let viewUsersDetails;
Template.users.onCreated(() => {

  template = Template.instance();
  template.selectedUserEmail = new ReactiveVar("");
  UtilsView.applySubscribe(usersController, 'default', template, '', function () {

  });
});

Template.users.helpers({
  'settings': () => {
    let templates = {
      emailUsersTmp: Template.emailUsersTmp,
      profileUsersTmp: Template.profileUsersTmp,
      selectRoles: Template.selectRoles,
    };
    return {
      collection: usersController.getCollection(),
      rowsPerPage: 10,
      showFilter: true,
      showRowCount: true,
      showColumnToggles: true,
      multiColumnSort: true,
      fields: formGen.getTableViewData(usersController, 'default', templates),
    };
  },
  userview: function () {
    return 'userViewDetails';
  },
  selectUserEmail: function () {
    return template.selectedUserEmail.get();
  },
});

Template.users.events({

  'change [id="role"]': function (event) {

    let role = $(event.target).find('option:selected').val();

    usersController.setRoleOnUser(this._id, role, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('A regra foi definida com sucesso!');
      }

    });

  },
  'click [id="actionUserView"]': function (event) {
    let emailUser = event.currentTarget.name;
    //UtilsView.templateRender('userViewDetails', 'userDetailsPanel', { 'emailuser': emailUser });
    UtilsView.showModalWithTemplate('userViewDetails', { 'emailuser': emailUser }, 'Dados do Usuário');

  },

});

Template.userViewDetails.onCreated(() => {

  template = Template.instance();
  UtilsView.applySubscribe(usersController, 'default', template, { 'emails.0.address': template.data.emailuser }, function () {
    formGen.formViewRender('viewUserDetailsForm', usersController, 'default', { 'emails.0.address': template.data.emailuser });
  });
});

Template.userViewDetails.onRendered(() => {

});
