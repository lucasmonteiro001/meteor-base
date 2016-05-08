import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/authenticated/index';
import  '../../../ui/authenticated/users';


const blockUnauthorizedAdmin = ( context, redirect ) => {
    if ( Meteor.userId() && !Roles.userIsInRole( Meteor.userId(), 'administrador' ) ) {
        Bert.alert('Acesso nao permitido!', 'danger')
        redirect('index');
    }
};

const authenticatedRedirect = ( context, redirect ) => {
    if ( !Meteor.userId() ) {
        redirect('login');
    }
};

const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
    triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/', {
    name: 'index',
    action() {
        BlazeLayout.render( 'default', { yield: 'index' } );
        console.log('rota: index');

    }
});

authenticatedRoutes.route( '/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render( 'default', { yield: 'dashboard' } );
        console.log('rota: dashboard');
    }
});

authenticatedRoutes.route( '/users', {
    name: 'users',
    triggersEnter: [ blockUnauthorizedAdmin ],
    action() {
        BlazeLayout.render( 'default', { yield: 'users' } );
        console.log('rota: users');
    }
});