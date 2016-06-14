import { Template } from 'meteor/templating';
import './index.html';

let template;

Template.index.onCreated(() => {
  template = Template.instance();
});

Template.index.helpers({});
