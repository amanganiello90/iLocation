(function(){
    'use strict';

    angular.module('iLocation')
        .controller('RuoloController', RuoloController);

        RuoloController.$inject=['RuoloService','$localStorage','$sessionStorage','$rootScope','$location','$routeParams','toaster','PagerService'];

        function RuoloController(RuoloService,$localStorage,$sessionStorage,$rootScope,$location,$routeParams,toaster,PagerService){
            var vm = this;    
            
            vm.pager = {};

            vm.setPage = function(page){
                if (page < 1 || page > vm.pager.totalPages) {return;}
                vm.pager = PagerService.GetPager(vm.Ruoli.length, page);
                vm.RuoliPaginati = vm.Ruoli.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
            }

            vm.reverse =false;
                
            vm.ListaRuoli = function(){
                return RuoloService.lista().then(function(data){
                    
                    if(data.success===true)
                    {
                        vm.Ruoli=data.result;
                        vm.setPage(1);
                        return vm.Ruoli;
                    }
                    
                    return null;

                }).catch(function(err){
                    toaster.pop({
                        type: 'error',
                        title: 'Ruolo',
                        body: 'Impossibile Caricare La lista Dei Ruoli'
                    });
                    return err;
                });
            }    
            
            vm.OrdinaRuolo = function(colonna){
                vm.reverse = (vm.colonna === colonna) ? !vm.reverse : true;
                vm.colonna = colonna;
            }

            vm.GestioneRuolo =function(){
            
                return null;
            }

            vm.LoadRuolo= function(){

                let objSend={
                    'id':$routeParams.id
                };
                
                    return RuoloService.ruolo(objSend).then(function(data){
                                                            
                    if(data.success===true)
                    {
                        vm.ruolo=data.result[0];
                        return vm.ruolo;
                    }
                        
                    }).catch(function(err){
                        
                        toaster.pop({
                            type: 'error',
                            title: 'Errore',
                            body: err
                        });
    
                    });
                }

                vm.UpdateRuolo= function(){

                    if(vm.ruolo.nome!=""){

                            let objSend={
                                'ruolo':{
                                    'id':$routeParams.id,
                                    'nome':vm.ruolo.nome,
                                    'descrizione':vm.ruolo.descrizione
                                }
                            };

                            return RuoloService.updateRuolo(objSend).then(function(data){
                                
                                if(data.success===true)
                                {
                                    toaster.pop({
                                        type: 'success',
                                        title: 'Ruolo',
                                        body: 'Ruolo Aggiornato'
                                    });
                                }

                                return $location.path('/ruolo/list');                                
                                
                            }).catch(function(err){
                                toaster.pop({
                                    type: 'error',
                                    title: 'Ruolo',
                                    body: err
                                });
            
                                return err;
                            });
                    }
                    
                    toaster.pop({
                        type: 'error',
                        title: 'Errore',
                        body: 'Completa i campi obbligatori'
                    });

                    return null;
        
                }


                vm.addRuolo= function(){
                    
                    if(vm.ruolo.nome!=""){

                            let objSend={
                                'ruolo':{
                                    'nome':vm.ruolo.nome,
                                    'descrizione':vm.ruolo.descrizione,
                                }
                            };

                        return RuoloService.addRuolo(objSend).then(function(data){
                            
                            if(data.success===true)
                            {
                                toaster.pop({
                                    type: 'success',
                                    title: 'Ruolo',
                                    body: 'Ruolo Inserito'
                                });
                            }

                            return $location.path('/ruolo/list');                                
                            
                        }).catch(function(err){
                            toaster.pop({
                                type: 'error',
                                title: 'Ruolo',
                                body: err
                            });
        
                            return err;
                        });
                    }
                        toaster.pop({
                            type: 'error',
                            title: 'Errore',
                            body: 'Completa i campi obbligatori'
                        });

                        return null;
                }
        }
})();