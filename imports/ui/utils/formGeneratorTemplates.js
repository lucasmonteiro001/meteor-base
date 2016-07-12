import { Blaze } from 'meteor/blaze';
import { Utils } from '.././../api/reuse/utils';
import './formGeneratorTemplates.html';
import { UtilsView } from './ViewUtils';

let template;


Template.select2Collection.onCreated(() => {
  template = Template.instance();
  template.controller = Blaze._globalHelpers.getController(template.data.COLLECTION);
  let collectionData = template.data;
  //  console.log( collectionData.COLLECTION);
  //  console.log( collectionData.COLLECTION_SCHEMA);

  UtilsView.applySubscribe(collectionData.COLLECTION, collectionData.COLLECTION_SCHEMA, template, '', function () {

      }
  );

});

Template.select2Collection.onRendered(() => {
  template = Template.instance();
  let fieldValues = template.data.FIELD_VALUES[template.data.FIELD_NAME];
  console.log(fieldValues);

  let selectedItems = $('#' + template.data.FIELD_NAME).val();
  console.log("Campo");
  console.log('#' + template.data.FIELD_NAME);
  console.log($('#' + template.data.FIELD_NAME));
  console.log("Itens Selecionados");
  console.log(selectedItems);
  $('.select2_demo_2').select2();
  //$('.select2_demo_2').select2('val',selectedItems );

  for (let index in fieldValues) {
    //console.log(fieldValues[index]);
    //console.log(fieldValues[index].nome);
  }





});
Template.select2Collection.helpers({
  'collectionData': () => {
    template = Template.instance();
    if (template.controller) {
      return template.controller.getAll();
    } else {
      return {};
    }
  }
});

Template.select2Collection.events({});

