import '../../../ui/authenticated/Colaboradores/Colaboradores';
import '../../../ui/authenticated/Projetos/Projetos';
import '../../../ui/authenticated/index';
import '../../../ui/authenticated/users/users';
import '../../../ui/authenticated/users/profile';
import { Message } from '../../../ui/utils/message';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { UtilsView } from '../../../ui/utils/ViewUtils';
import { UtilsRouter } from './routerUtils';



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
  },
});

authenticatedRoutes.route('/profile', {
  name: 'profile',
  triggersEnter: [blockUnauthorizedAdmin],
  action() {
    BlazeLayout.render('default', { yield: 'profile' });
  },
});

authenticatedRoutes.route('/profileEdit', {
  name: 'profileEdit',
  //triggersEnter: [blockUnauthorizedAdmin],
  action() {
    BlazeLayout.render('default', { yield: 'profileEdit' });
  },
});

UtilsRouter.applyRoutersForCRUD(authenticatedRoutes, 'Colaboradores', FlowRouter, BlazeLayout);

UtilsRouter.applyRoutersForCRUD(authenticatedRoutes, 'Projetos', FlowRouter, BlazeLayout);