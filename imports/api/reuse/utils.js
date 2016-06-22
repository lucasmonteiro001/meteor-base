/**
 * Created by luizluz on 22/06/2016.
 */

class Util {

  constructor () {

  }

  /**
   * Clona um objeto.
   * @param obj - Objeto que será clonado
   * @returns {*} - Objeto clonado.
   */
  cloneObj (obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

    if (obj instanceof Date)
      var temp = new obj.constructor(); //or new Date(obj);
    else
      var temp = obj.constructor();

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = this.cloneObj(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }

}

export const Utils = new Util();