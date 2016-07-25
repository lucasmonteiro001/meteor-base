import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import { Message } from '../../../ui/utils/message';

//#############################################################
//########  FUNCIONALIDADE DE GERAÇAÕ DE ROTAS#################
//#############################################################
//#############################################################

class RouterUtils {
  constructor () {

  }

  applyRoutersForCRUD (routerGroup, collectionName, FlowRouter, BlazeLayout) {

    let controller = Blaze._globalHelpers.getController(collectionName);

    if (typeof controller != 'undefined' && controller != null) {

      //Tela de pesquisa
      routerGroup.route('/' + controller.getCollectionName(), {
        name: controller.getCollectionName(),
        action() {
          BlazeLayout.render('default', { yield: controller.getCollectionName() });
        },
      });

      //Tela de cadastro
      routerGroup.route('/' + controller.getCollectionName() + 'Add', {
        name: controller.getCollectionName() + 'Add',
        action() {
          BlazeLayout.render('default', { yield: controller.getCollectionName() + 'Add' });
        },
      });

      //Tela de Edição
      routerGroup.route('/' + controller.getCollectionName() + 'Edit/:_id', {
        name: controller.getCollectionName() + 'Edit',
        //triggersEnter: (context, redirect) => {this.verifyRouterPermissions(context, redirect,controller, 'update', FlowRouter.current().params['_id'])},
        action() {
          BlazeLayout.render('default', { yield: controller.getCollectionName() + 'Edit' });
        },
      });

      //Tela de Visualização
      routerGroup.route('/' + controller.getCollectionName() + 'View/:_id', {
        name: controller.getCollectionName() + 'View',
        //triggersEnter: (context, redirect) => {this.verifyRouterPermissions(context, redirect,controller, 'read', FlowRouter.current().params['_id'])},
        action() {
          BlazeLayout.render('default', { yield: controller.getCollectionName() + 'View' });
        },
      });
    }

  }

  verifyRouterPermissions (context, redirect, controller, action, id) {

    if (controller.canUserDo(action, id) == false) {
      Message.showErrorNotification('Você não tem permissão para realizar este acesso.')
      redirect(controller.getCollectionName());
    }
  }
  ;

}

export const UtilsRouter = new RouterUtils();