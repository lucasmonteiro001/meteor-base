import '../../../ui/authenticated/colaborador/colaborador';
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../../../ui/authenticated/index';
import '../../../ui/authenticated/users/users';
import { colaboradoresController } from '../../../api/colaborador/controller';
import { Message } from '../../../ui/utils/message';

const CanViewFunction = function (renderFunction) {
  this.set = function (value) {
    if (value === false) {
      Message.showErrorNotification('Você não tem permissão para acessar essa página!');
    } else {
      renderFunction();
    }
  };
};

const blockUnauthorizedAdmin = (context, redirect) => {
  if (Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), 'administrador')) {
    Bert.alert('Acesso nao permitido!', 'danger');
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
  triggersEnter: [authenticatedRedirect],
});

authenticatedRoutes.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render('default', { yield: 'index' });
    console.log('rota: index');
  },
});

authenticatedRoutes.route('/users', {
  name: 'users',
  triggersEnter: [blockUnauthorizedAdmin],
  action() {
    BlazeLayout.render('default', { yield: 'users' });
    console.log('rota: users');
  },
});

authenticatedRoutes.route('/colaborador', {
  name: 'colaborador',
  action() {
    BlazeLayout.render('default', { yield: 'colaborador' });
  },
});
authenticatedRoutes.route('/colaboradorAdd', {
  name: 'colaboradorAdd',
  action() {
    BlazeLayout.render('default', { yield: 'colaboradorAdd' });
  },
});
authenticatedRoutes.route('/colaboradorEdit/:_id', {
  name: 'colaboradorEdit',
  action() {
    cvFunction = new CanViewFunction(function () {
      BlazeLayout.render('default', { yield: 'colaboradorEdit' });
    });

    const id = FlowRouter.getParam('_id');
    colaboradoresController.checkIfCanUserUpdate(cvFunction, id);
  },
});
authenticatedRoutes.route('/colaboradorView/:_id', {
  name: 'colaboradorView',
  action() {
    cvFunction = new CanViewFunction(function () {
      BlazeLayout.render('default', { yield: 'colaboradorView' });
    });

    const id = FlowRouter.getParam('_id');
    colaboradoresController.checkIfCanUserView(cvFunction, id);
  },
});

