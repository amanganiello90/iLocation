(function(){
    
        'use strict';
    
        angular.module('iLocation.Ruolo').config(config);
    
        function config($routeProvider){
            $routeProvider
            .when('/ruolo/list', {
                templateUrl:'/view/ruolo/template/ruolo.html',
                controller:'RuoloController',
                controllerAs:'vm',
                resolve: {
                    ruleAuth:function($rootScope,$location) {
                        if(!$rootScope.showRole())
                        {
                            return $location.path('/home');
                        }
                    }
                }
            })
            .when('/ruolo/edit/:id', {
                templateUrl:'/view/ruolo/template/gestisci.html',
                controller:'RuoloController',
                controllerAs:'vm',
                resolve: {
                    ruleAuth:function($rootScope,$location) {
                        if(!$rootScope.showRole())
                        {
                            return $location.path('/home');
                        }
                    }
                }
            })
            .when('/ruolo/add', {
                templateUrl:'/view/ruolo/template/inserisci.html',
                controller:'RuoloController',
                controllerAs:'vm',
                resolve: {
                    ruleAuth:function($rootScope,$location) {
                        if(!$rootScope.showRole())
                        {
                            return $location.path('/home');
                        }
                    }
                }
            })
        }    
    })();