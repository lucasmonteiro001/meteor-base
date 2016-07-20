import '../../../ui/authenticated/colaborador/colaborador';
import '../../../ui/authenticated/projeto/projeto';
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../../../ui/authenticated/index';
import '../../../ui/authenticated/users/users';
import { colaboradoresController } from '../../../api/colaborador/controller';
import { projetosController } from '../../../api/projeto/controller';
import { Message } from '../../../ui/utils/message';


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
  triggersEnter: (context, redirect) => {
    let id = FlowRouter.current().params['_id'];
    if (colaboradoresController.canUserDo('update', id) == false) {
      Message.showErrorNotification('Você não tem permissão para acessar a página.')
      redirect('colaborador');
    }
  },
  action() {
      BlazeLayout.render('default', { yield: 'colaboradorEdit' });
  },
});
authenticatedRoutes.route('/colaboradorView/:_id', {
  name: 'colaboradorView',
  triggersEnter: (context, redirect) => {
    let id = FlowRouter.current().params['_id'];
    if (colaboradoresController.canUserDo('read', id) == false) {
      Message.showErrorNotification('Você não tem permissão para acessar a página.')
      redirect('colaborador');
    }
  },
  action() {
      BlazeLayout.render('default', { yield: 'colaboradorView' });
  },
});

authenticatedRoutes.route('/projeto', {
  name: 'projeto',
  action() {
    BlazeLayout.render('default', { yield: 'projeto' });
  },
});
authenticatedRoutes.route('/projetoAdd', {
  name: 'projetoAdd',
  action() {
    BlazeLayout.render('default', { yield: 'projetoAdd' });
  },
});
authenticatedRoutes.route('/projetoEdit/:_id', {
  name: 'projetoEdit',
  triggersEnter: (context, redirect) => {
    let id = FlowRouter.current().params['_id'];
    if (projetosController.canUserDo('update', id) == false) {
      Message.showErrorNotification('Você não tem permissão para acessar a página.')
      redirect('projeto');
    }
  },
  action() {
      BlazeLayout.render('default', { yield: 'projetoEdit' });
  },
});
authenticatedRoutes.route('/projetoView/:_id', {
  name: 'projetoView',
  triggersEnter: (context, redirect) => {
    let id = FlowRouter.current().params['_id'];
    if (projetosController.canUserDo('read', id) == false) {
      Message.showErrorNotification('Você não tem permissão para acessar a página.')
      redirect('projeto');
    }
  },
  action() {
    BlazeLayout.render('default', {yield: 'projetoView'});

  },
});