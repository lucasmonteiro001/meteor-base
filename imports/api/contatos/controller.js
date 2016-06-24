import { CollectionContatos } from './collection';
import { ControllerBase } from '../reuse/controllerBase';

class ControllerContatos extends ControllerBase {

}

export const CtrlContatos = new ControllerContatos(CollectionContatos);

//É possível definir neste local as regras de
// dispobinilizaçao/publicação do conteúdo da collection
//Por exemplo, só exibe os clientes que torcem para o
// glorioso Atlético-MG: CtrlCliente.setFilter({time: 'Atlético-MG'}).
