/**
 * Created by luizluz on 01/07/2016.
 */

Template.sidebar.rendered = function () {
  let user = Meteor.user();
  Template.sidebar.emailUser = user && user.emails && user.emails[0].address
  //console.log(user.emails[0].address);

};

Template.sidebar.helpers({
  emailUser: Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].address,
});