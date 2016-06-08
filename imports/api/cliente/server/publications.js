import {Cliente} from "../cliente.js"

Meteor.publish(Cliente._name, function (filter, projection) {
    var data = null;
    projection || (projection = {});
    check(projection, Object);
    // se existe um filtro
    if (typeof filter === "object") {
        check(filter, Object);
        return Cliente.find(filter, {fields: projection})
    }
    else {
        return this.ready();
    }


});

