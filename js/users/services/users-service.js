(function(angular) {

    angular.module('csf.services').factory('UsersService', function($http, $q, cbu) {

        return {
            getUsers: getUsers,
            createUser: createUser,
            changeRole: changeRole,
            editUser: editUser,
            deleteUser: deleteUser
        }


        function deleteUser(id) {
            var deferred = $q.defer();

            $http.delete(cbu.baseUrl + '/rest/user/' + id)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function getUsers() {
            var deferred = $q.defer();

            $http.get(cbu.baseUrl + '/rest/user/all')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function createUser(data) {
            var deferred = $q.defer();

            $http.post(cbu.baseUrl + '/rest/user/', data)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function changeRole(id) {
            var deferred = $q.defer();

            $http.post(cbu.baseUrl + '/rest/user/' + id + '')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function editUser(user) {
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

    });

})(angular);
