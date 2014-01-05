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
            return $http.get(urlBase);
        };

        return occiFactory;

    }]);