import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import { Utils } from '../../api/reuse/utils';

class ViewUtils {
  constructor () {
    this.templatesRendereds = {};
  }

  /**
   * Aplica um subsbcribe para o modelo
   * @param schemaName - Nome do schema do modelo
   * @param template - template para o subscribe
   * @param searchFor - Filtro por id
   * @param callback - Função de callack para tratar o retorno da função
   */
  applySubscribe (controller, schemaName, template, searchFor = '', callback) {
    let newFilter;

    if (searchFor != '' && typeof searchFor == 'string') {
      newFilter = Utils.mergeObj(controller.getFilter(), { '_id': searchFor });
    } else if (searchFor != '' && typeof searchFor == 'object') {
      newFilter = Utils.mergeObj(controller.getFilter(), searchFor);
    } else {
      newFilter = controller.getFilter();
    }

    let handle = template
        .subscribe(controller.getCollectionName(),
            newFilter, controller.getProjection(schemaName));

    template.autorun(() => {
      const isReady = handle.ready();
      if (isReady) {
        callback();
      }
    });

  }

  /**
   * Renderiza templates na página
   * @param templateName Nome do template.
   * @param idOfDomNode Id do Elemento aonde o template será renderizado
   * @param data Dados que serão passados para o template
   */
  templateRender (templateName, idOfDomNode, data = {}) {
    let domNode = document.getElementById(idOfDomNode);

    if (this.templatesRendereds[templateName] && Blaze.getData(this.templatesRendereds[templateName])) {
      Blaze.remove(this.templatesRendereds[templateName]);
    }

    this.templatesRendereds[templateName] = Blaze.renderWithData(Template[templateName], data, domNode);

  }

}

export const UtilsView = new ViewUtils();
