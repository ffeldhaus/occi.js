'use strict';

/* Controllers */

angular.module('test.controllers', []).
    controller('TestCtrl', function ($scope, $occi) {
        $scope.getCategories = $occi.getCategories()
            .success(function (categories) {
                $scope.categories = new Collection(categories);
            })
            .error(function (error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
    });