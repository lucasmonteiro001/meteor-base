import { CltUsers } from './collection';
import { ControllerBase } from '../reuse/controllerBase';

class ControllerUsers extends ControllerBase {
  /**
   * define uma regra para o usuário
   * @param usersId - Id do usuário
   * @param roles - regras que está sendo aplicada
   * @param callback - Função de callack para tratar o retorno da função
   */
  setRoleOnUser (usersId, roles, callback) {
    Meteor.call(
        this.getCollectionName() + '.setRoleOnUser', {
          user: usersId,
          role: roles,
        }, (error) => {
          if (error) {
            callback(error, null);
          } else {
            callback(null, 'ok');
          }
        });
  }
}

export const usersController = new ControllerUsers(CltUsers);

// É possível definir neste local as regras de dispobinilizaçao/publicação do conteúdo da collection
// Por exemplo, só exibe os clientes que torcem para o glorioso Atlético-MG:
// CtrlCliente.setFilter({time: 'Atlético-MG'})

