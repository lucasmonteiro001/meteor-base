import { FlowRouter } from 'meteor/kadira:flow-router';
import '../../../ui/globals/not-found';

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('default', { yield: 'notFound' });
  },
};

FlowRouter.route('/xunit', {
  name: 'xunit',
  action () {
    console.log("XUnit reporter");
  },
});
