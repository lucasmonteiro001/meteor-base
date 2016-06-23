/**
 * Created by lucas on 5/5/16.
 */
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { usersController } from '../../../api/users/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import './users.html';
let template;

Template.users.onCreated(() => {

  template = Template.instance();
  usersController.applySubscribe(usersController, 'default', template, '', function () {
      }
  );
  //let currentPage = new ReactiveVar(Session.get('current-page') || 0);

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

    let idUser = this.value;

    BlazeLayout.render('default', { userView: 'userViewDetails' }, { idUser: idUser });

  },


});

Template.userViewDetails.onCreated(() => {

  template = Template.instance();
  usersController.applySubscribe(usersController, 'default', template, '', function () {
      }
  );
  //let currentPage = new ReactiveVar(Session.get('current-page') || 0);

  console.log(this);
  // var id = this.idUser;

  //console.log("ID é: "+id);

});