import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ColaboradoresController } from '../../../api/Colaboradores/controller.js';
import { Message } from '../../utils/message';
import { formGen } from '../../utils/formGenerator';
import { UtilsView } from '../../utils/ViewUtils';
import './Colaboradores.html';

let template;

Template.Colaboradores.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(ColaboradoresController, 'view', template, '', function () {
      }
  );

});
Template.Colaboradores.onRendered(() => {
  template = Template.instance();

});
Template.Colaboradores.helpers({
  'canUserInsert': ()=> {
    return ColaboradoresController.canUserDo('insert');
  }
});

Template.ColaboradoresAdd.onRendered(() => {
  formGen.formRender('formContext', true, ColaboradoresController, 'insert', '', 'formTag');

});
Template.ColaboradoresAdd.events({
  //Eventos do template de inserção
  'submit form'(event, templateInstance){
    event.preventDefault();
    const ColaboradoresData = formGen.getFormData(ColaboradoresController, 'insert', templateInstance);

    ColaboradoresController.insert(ColaboradoresData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification(' inserido com sucesso!');
        FlowRouter.go('/ColaboradoresView/' + data);
      }

    });
  }
});

Template.ColaboradoresView.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');
  UtilsView.applySubscribe(ColaboradoresController, 'view', template, id, ()=> {
    template.collectionData = ColaboradoresController.get({ _id: id });
    formGen.formViewRender('formContext', ColaboradoresController, 'view', id);
  });

});
Template.ColaboradoresView.onRendered(() => {

});
Template.ColaboradoresView.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return ColaboradoresController.get({ _id: id });
  },
  'canUserUpdate': () => {
    let id = FlowRouter.getParam('_id');
    return ColaboradoresController.canUserDo('update', id)
  },
  'canUserRemove': () => {
    let id = FlowRouter.getParam('_id');
    return ColaboradoresController.canUserDo('remove', id)
  },
  'canUserAccessActions': () => {
    //let id = FlowRouter.getParam('_id');
    //let result = ColaboradoresController.canUserDo('update', id)||ColaboradoresController.canUserDo('remove', id);
    return true;
  },
});

Template.ColaboradoresView.events({

  //Eventos do template de inserção
  'click #linkExcluir'(event, template) {
    let sel = event.target;
    let id = sel.getAttribute('value');

    Message.showConfirmation('Remover o Colaboradores?', 'Não é possível recuperar um Colaboradores removido!',
        'Sim, remover!', (erro, confirm) => {
          if (confirm) {
            ColaboradoresController.remove(id, (error, data) => {
              if (error) {
                Message.showErro(error);

              } else {
                FlowRouter.go('Colaboradores');
                Message.showSuccessNotification('O Colaboradores foi removido com sucesso!');
              }
            });
          }
        });
  },
});

Template.ColaboradoresEdit.onCreated(() => {
  let template = Template.instance();
  let id = FlowRouter.getParam('_id');

  UtilsView.applySubscribe(ColaboradoresController, 'update', template, id, ()=> {
    template.collectionData = ColaboradoresController.get({ _id: id });
    formGen.formRender('formContext', true, ColaboradoresController, 'update', id, 'formTag');
  });

});
Template.ColaboradoresEdit.onRendered(() => {

});
Template.ColaboradoresEdit.helpers({
  'collectionData': () => {
    let id = FlowRouter.getParam('_id');
    return ColaboradoresController.get({ _id: id });
  },
});
Template.ColaboradoresEdit.events({

  //Eventos do template de inserção
  'submit form'(event, template) {
    event.preventDefault();
    const id = FlowRouter.getParam('_id');
    const ColaboradoresData = formGen.getFormData(ColaboradoresController, 'update', template);

    ColaboradoresController.update(id, ColaboradoresData, (error, data) => {
      if (error) {
        Message.showErro(error);

      } else {
        Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
        FlowRouter.go('/ColaboradoresView/' + id);
      }

    });
  },
});

Template.ColaboradoresList.onCreated(() => {
  template = Template.instance();
  UtilsView.applySubscribe(ColaboradoresController, 'tableview', template, '', function () {
  });
});

let dataTableData = function () {

  return ColaboradoresController.getAll().fetch();

};

let optionsObject = UtilsView.getDataTableConfig(ColaboradoresController, 'tableview');

Template.ColaboradoresList.helpers({
  reactiveDataFunction: function () {

    return dataTableData;
  },
  optionsObject: optionsObject,
});
Template.ColaboradoresList.onRendered(() => {

});
Template.ColaboradoresList.events({});
