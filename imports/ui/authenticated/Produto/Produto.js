import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ProdutoController} from '../../../api/Produto/controller.js';
import {Message} from '../../utils/message';
import {formGen} from '../../utils/formGenerator';
import {UtilsView} from '../../utils/ViewUtils';
import './Produto.html';

let template;

Template.Produto.onCreated(() => {
    template = Template.instance();
    UtilsView.applySubscribe(ProdutoController, 'view', template, '', function () {
        }
    );
    template.canInsert = new ReactiveVar(false);
});
Template.Produto.onRendered(() => {
    template = Template.instance();
    ProdutoController.checkIfCanUserInsert(template.canInsert);
});
Template.Produto.helpers({
    'canUserInsert': () => {
        template = Template.instance();
        ProdutoController.checkIfCanUserInsert(template.canInsert);
        return template.canInsert.get();
    },
});

Template.ProdutoAdd.onRendered(() => {
    //Jquery Validation - https://jqueryvalidation.org/validate

    formGen.formRender('formContext', true, ProdutoController, 'insert', '', 'formTag');

});
Template.ProdutoAdd.events({

    //Eventos do template de inserção
    'submit form'(event, templateInstance) {
        event.preventDefault();
        const ProdutoData = formGen.getFormData(ProdutoController, 'insert', templateInstance);

        ProdutoController.insert(ProdutoData, (error, data) => {
            if (error) {
                Message.showErro(error);

            } else {
                Message.showSuccessNotification(' inserido com sucesso!');
                FlowRouter.go('/ProdutoView/' + data);
            }

        });
    },
});

Template.ProdutoView.onCreated(() => {
    let template = Template.instance();
    let id = FlowRouter.getParam('_id');
    template.canUpdate = new ReactiveVar(false);
    template.canRemove = new ReactiveVar(false);

    UtilsView.applySubscribe(ProdutoController, 'view', template, id, ()=> {
        ProdutoController.checkIfCanUserUpdate(template.canUpdate, id);
        ProdutoController.checkIfCanUserRemove(template.canRemove, id);
        template.collectionData = ProdutoController.get({_id: id});
        formGen.formViewRender('formContext', ProdutoController, 'view', id);
    });

});
Template.ProdutoView.onRendered(() => {

});
Template.ProdutoView.helpers({
    'canUserUpdate': () => {
        let template = Template.instance();
        ProdutoController.checkIfCanUserUpdate(template.canUpdate, FlowRouter.getParam('_id'));
        return template.canUpdate.get();
    },

    'canUserRemove': () => {
        let template = Template.instance();
        ProdutoController.checkIfCanUserRemove(template.canRemove, FlowRouter.getParam('_id'));
        return template.canRemove.get();
    },

    'canUserAccessActions': () => {
        let template = Template.instance();
        if (typeof template.canRemove != 'undefined' && template.canUpdate != 'undefined') {
            return template.canRemove.get() || template.canUpdate.get();
        }
    },

    'collectionData': () => {
        let id = FlowRouter.getParam('_id');
        return ProdutoController.get({_id: id});
    },
});
Template.ProdutoView.events({

    //Eventos do template de inserção
    'click #linkExcluir'(event, template) {
        let sel = event.target;
        let id = sel.getAttribute('value');

        Message.showConfirmation('Remover o Produto?', 'Não é possível recuperar um Produto removido!',
            'Sim, remover!', (erro, confirm) => {
                if (confirm) {
                    ProdutoController.remove(id, (error, data) => {
                        if (error) {
                            Message.showErro(error);

                        } else {
                            FlowRouter.go('Produto');
                            Message.showSuccessNotification('O Produto foi removido com sucesso!');
                        }
                    });
                }
            });
    },
});

Template.ProdutoEdit.onCreated(() => {
    let template = Template.instance();
    let id = FlowRouter.getParam('_id');

    UtilsView.applySubscribe(ProdutoController, 'update', template, id, ()=> {
        template.collectionData = ProdutoController.get({_id: id});
        formGen.formRender('formContext', true, ProdutoController, 'update', id, 'formTag');
    });

});
Template.ProdutoEdit.onRendered(() => {

});
Template.ProdutoEdit.helpers({
    'collectionData': () => {
        let id = FlowRouter.getParam('_id');
        return ProdutoController.get({_id: id});
    },
});
Template.ProdutoEdit.events({

    //Eventos do template de inserção
    'submit form'(event, template) {
        event.preventDefault();
        const id = FlowRouter.getParam('_id');
        const ProdutoData = formGen.getFormData(ProdutoController, 'update', template);

        ProdutoController.update(id, ProdutoData, (error, data) => {
            if (error) {
                Message.showErro(error);

            } else {
                Message.showSuccessNotification('O Cliente foi atualizado com sucesso!');
                FlowRouter.go('/ProdutoView/' + id);
            }

        });
    },
});

Template.ProdutoList.onCreated(() => {
    template = Template.instance();
    UtilsView.applySubscribe(ProdutoController, 'view', template, '', function () {
    });
});
Template.ProdutoList.helpers({
    'settings': function () {
        let templates = {tmpl: Template.ProdutoTmpl};
        return {
            collection: ProdutoController.getCollection(),
            rowsPerPage: false,
            showFilter: false,
            showRowCount: false,
            showColumnToggles: false,
            multiColumnSort: false,
            showNavigationRowsPerPage: false,
            showNavigation: true,
            currentPage: false,
            sortable: false,
            fields: formGen.getTableViewData(ProdutoController, 'view', templates),
        };
    },
});

