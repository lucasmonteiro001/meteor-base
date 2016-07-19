import { Blaze } from 'meteor/blaze';
import { Utils } from '.././../api/reuse/utils';
import './formGeneratorTemplates.html';
import { UtilsView } from './ViewUtils';

let template;

Template.select2Collection.onCreated(() => {
  template = Template.instance();
  template.controller = Blaze._globalHelpers.getController(template.data.COLLECTION);
  let collectionData = template.data;

  UtilsView.applySubscribe(collectionData.COLLECTION, collectionData.COLLECTION_SCHEMA, template,
      '', function () {
        $(document).ready(function () {
          $('.select2_demo_2').select2();
        });
      }
  );

});

Template.select2Collection.onRendered(() => {

});

Template.select2Collection.helpers({
  'collectionData': () => {
    template = Template.instance();
    if (template.controller) {
      return template.controller.getAll();
    } else {
      return {};
    }
  },
});

Template.select2Collection.events({});

