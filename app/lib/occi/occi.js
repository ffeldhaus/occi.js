/**
 * @license OCCI v1.2.7
 * (c) 2014 Florian Feldhaus https://github.com/ffeldhaus
 * License: MIT
 */

angular.module('occi', []).
    factory('$occi', ['$http', function ($http) {
        var urlBase = 'http://rocci.herokuapp.com/-/';
        var occiFactory = {};

        occiFactory.getCategories = function () {
            collection = $http.get(urlBase);
            return collection;
        };

        return occiFactory;

    }]);

function Attributes(attributes) {
    for (var attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
            if (attributes[attribute] != null && typeof attributes[attribute] === 'object') {
                this[attribute] = new Attributes(attributes[attribute]);
            } else {
                this[attribute] = attributes[attribute];
            }
        }
    }
}

function Category(category) {
    if (!(this instanceof Category))
        return new Category(category)
    this.scheme = category.scheme;
    this.term = category.term;
    this.title = category.title;
    this.attributes = new Attributes(category.attributes);
}

function Kind(kind) {
    if (!(this instanceof Kind))
        return new Kind(kind)
    Category.call(this, kind);
    this.parent = kind.parent;
    this.actions = kind.actions;
    this.location = kind.location;
}

Kind.prototype = Object.create(Category.prototype);
Kind.prototype.constructor = Kind;

function Mixin(mixin) {
    if (!(this instanceof Mixin))
        return new Mixin(mixin)
    Category.call(this, mixin);
    this.parent = mixin.parent;
    this.actions = mixin.actions;
    this.location = mixin.location;
}

Mixin.prototype = Object.create(Category.prototype);
Mixin.prototype.constructor = Mixin;

function Action(action) {
    if (!(this instanceof Action))
        return new Action(action)
    Category.call(this, action);
}

Mixin.prototype = Object.create(Category.prototype);
Mixin.prototype.constructor = Mixin;

function Entity(entity) {
    this.kind = entity.kind;
    this.mixins = entity.mixins;
    this.attributes = new Attributes(entity.attributes);
    this.actions = entity.actions;
    this.location = entity.location;
}

function Resource(resource) {
    Entity.call(this, resource);
    this.links = resource.links;
}

Resource.prototype = Object.create(Entity.prototype);
Resource.prototype.constructor = Resource;

function Link(link) {
    Entity.call(this, link);
    this.rel = link.rel;
    this.target = link.target;
    this.source = link.source;
}

Link.prototype = Object.create(Entity.prototype);
Link.prototype.constructor = Link;

function Collection(collection) {
    for (entry in collection) {
        if (collection.hasOwnProperty(entry)) {
            switch (entry) {
                case "kinds":
                    this.kinds = collection.kinds.map(Kind);
                    break;
                case "mixins":
                    this.mixins = collection.mixins.map(Mixin);
                    break;
                case "actions":
                    this.actions = collection.actions.map(Action);
                    break;
                case "resources":
                    this.resources = collection.resources.map(Resource);
                    break;
                case "links":
                    this.links = collection.links.map(Link);
                    break;
            }
        }
    }
}

json = '{"kinds":[{}],"mixins":[{}],"actions":[{}]}';