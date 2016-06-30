import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';

class TemplateRender {
  constructor () {
    this.templatesRendereds = {};
  }

  render (templateName, idOfDomNode, data = {}) {
    let domNode = document.getElementById(idOfDomNode);

    if (this.templatesRendereds[templateName] && Blaze.getData(this.templatesRendereds[templateName])) {
      Blaze.remove(this.templatesRendereds[templateName]);
    }

    this.templatesRendereds[templateName] = Blaze.renderWithData(Template[templateName], data, domNode);

  }

}

export const TemplRender = new TemplateRender();
