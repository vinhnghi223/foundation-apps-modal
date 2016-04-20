'use strict';

angular.module('myModal', ['foundation'])
    .provider('modal', function () {
        var configs = {};
        return {
            register: function (modalId, config) {
                if (typeof modalId === 'string') {
                    configs[modalId] = config;
                }else{
                    throw new Error('modalProvider: modalId should be defined');
                }
            },
            $get: function (zfaModalFactory, FoundationApi) {
                return {
                    open: function (modalId, modalConfig) {
                        var newConfig = configs[modalId];
                        newConfig.locals = angular.extend({}, newConfig.locals, modalConfig); //Overwrite old config
                        return zfaModalFactory.createModal(newConfig);
                    },
                    close: function (id) {
                        FoundationApi.publish(id, 'close');
                    }
                }
            }
        }
    });
