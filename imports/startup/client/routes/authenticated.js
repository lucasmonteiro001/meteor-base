import "../../../ui/authenticated/cliente/cliente";
import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/authenticated/index';
import  '../../../ui/authenticated/users/users';
import {clienteCtrlClient} from '../../../api/cliente/controllerClient'
import {Message} from '../../../ui/utils/message';

const canViewFunction = function (renderFunction) {
    this.set = function (value) {
        if (value === false) {
            Message.showErrorNotification("Você não tem permissão para acessar essa página!");
        } else {
            renderFunction();
        }
    };
}

const blockUnauthorizedAdmin = (context, redirect) => {
    //console.log(context.queryParams);
    if (Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), 'administrador')) {
        Bert.alert('Acesso nao permitido!', 'danger')
        redirect('index');
    }
};

const authenticatedRedirect = (context, redirect) => {
    //console.log(context);
    if (!Meteor.userId()) {

        redirect('login');
    }

};

const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
    triggersEnter: [authenticatedRedirect]
});

authenticatedRoutes.route('/', {
    name: 'index',
    action() {
        BlazeLayout.render('default', {yield: 'index'});
        console.log('rota: index');

    }
});

authenticatedRoutes.route('/users', {
    name: 'users',
    triggersEnter: [blockUnauthorizedAdmin],
    action() {
        BlazeLayout.render('default', {yield: 'users'});
        console.log('rota: users');
    }
});
authenticatedRoutes.route('/cliente', {
    name: 'cliente',
    action() {
        BlazeLayout.render('default', {yield: 'cliente'});
    }
});
authenticatedRoutes.route('/clienteAdd', {
    name: 'clienteAdd',
    action() {
        BlazeLayout.render('default', {yield: 'clienteAdd'});
    }
});

authenticatedRoutes.route('/clienteEdit/:_id', {
    name: 'clienteEdit',
    action() {
        cvFunction = new canViewFunction(function () {
            BlazeLayout.render('default', {yield: 'clienteEdit'});
        })
        const id = FlowRouter.getParam("_id");
        clienteCtrlClient.checkIfCanUserUpdate(cvFunction, id);
    }
})
;

authenticatedRoutes.route('/clienteView/:_id', {
    name: 'clienteView',
    action() {
        cvFunction = new canViewFunction(function () {
            BlazeLayout.render('default', {yield: 'clienteView'});
        })
        const id = FlowRouter.getParam("_id");
        clienteCtrlClient.checkIfCanUserView(cvFunction, id);
    }

});
