import { Template } from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';

import './default.html';
import '../globals/header.html';
import '../globals/public-navigation.html';
import '../globals/loading.html';
import '../globals/authenticated-navigation';
import '../globals/footer.html';

const handleRedirect = ( routes, redirect ) => {
	let currentRoute = FlowRouter.getRouteName();

    if ( routes.indexOf( currentRoute ) > -1 ) {
		FlowRouter.go( redirect );
	}
    else
        return false;
};

Template.default.helpers({
	loggingIn() {
		return Meteor.loggingIn();
	},
	authenticated() {
		return !Meteor.loggingIn() && Meteor.user();
	},
	redirectAuthenticated() {
	 	return handleRedirect([
			'login',
			'signup',
			'recover-password',
			'reset-password'
		], '/' );
	},
	redirectPublic() {
		return handleRedirect([
			'index',
			'dashboard',
            'users'
		], '/login' );
	}
});
