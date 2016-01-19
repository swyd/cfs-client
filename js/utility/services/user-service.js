(function(angular) {

    angular.module('csf.services').factory('UserService', function($resource, cbu) {

        return $resource(cbu.baseUrl + '/rest/user/:action', {}, {
            authenticate: {
                method: 'POST',
                params: {
                    'action': 'authenticate'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });
    });


})(angular);
