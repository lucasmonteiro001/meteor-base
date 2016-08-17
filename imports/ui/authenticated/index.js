import { Template } from 'meteor/templating';
import './index.html';

let template;

Template.index.onCreated(() => {
  template = Template.instance();
});

Template.index.helpers({
  emailUser: ()=> {
    let user = Meteor.user();


    if (user.emails = "admin@admin")
      return "Administrador";
    else
      return 'Comum';
  },
});
