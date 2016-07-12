import { FlowRouter } from 'meteor/kadira:flow-router';
import '../../../ui/public/login';
import '../../../ui/public/recover-password';
import '../../../ui/public/reset-password';
import '../../../ui/public/signup';
import '../../../ui/layouts/default';
import '../../../ui/public/tests';

const publicRedirect = (context, redirect) => {
  if (Meteor.userId()) {
    redirect('index');
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [publicRedirect],
});

const tests = FlowRouter.group({
  name: 'xunit',
  triggersEnter: [publicRedirect],
});

publicRoutes.route('/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render('default', { yield: 'signup' });
  },
});

publicRoutes.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('default', { yield: 'login' });
  },
});

publicRoutes.route('/recover-password', {
  name: 'recover-password',
  action() {
    BlazeLayout.render('default', { yield: 'recoverPassword' });
  },
});

publicRoutes.route('/reset-password/:token', {
  name: 'reset-password',
  action() {
    BlazeLayout.render('default', { yield: 'resetPassword' });
  },
});

tests.route('/xunit', {
  name: 'xunit',
  triggersEnter: [publicRedirect],
});

