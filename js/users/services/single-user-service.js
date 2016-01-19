(function(angular) {

    angular.module('csf.services').factory('SingleUserService', function($http, $q, cbu) {

        return {
            getUser: getUser,
            saveUser: saveUser,
            changePassword: changePassword
        }


        function getUser() {
            var deferred = $q.defer();

            $http.get(cbu.baseUrl + '/rest/user')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function saveUser(user) {
            var deferred = $q.defer();

            $http.put(cbu.baseUrl + '/rest/user', user)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function changePassword(query) {
            var deferred = $q.defer();

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

            $http.post(cbu.baseUrl + '/rest/user/changePassword', query, config)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

    });

})(angular);
