(function(angular) {

    angular.module('csf').factory('TSMService', function($http, $q, cbu) {

        return {
            createTimeslot: createTimeslot,
            editTimeslot: editTimeslot,
            deleteTimeslot: deleteTimeslot,
            getTypes: getTypes,
            getCoaches: getCoaches,
            getTimeslots: getTimeslots
        }

        function getTimeslots(packet) {
            var deferred = $q.defer();

            $http.get(cbu.baseUrl + '/rest/timeslot/all')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function getTypes(query) {
            var deferred = $q.defer();

            $http.get(cbu.baseUrl + '/rest/timeslot/types')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function getCoaches(query) {
            var deferred = $q.defer();

            $http.get(cbu.baseUrl + '/rest/user/coaches')
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function createTimeslot(data) {
            var deferred = $q.defer();
            $http.post(cbu.baseUrl + '/rest/timeslot', data)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function editTimeslot(data) {
            var deferred = $q.defer();
            $http.put(cbu.baseUrl + '/rest/timeslot', data)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function deleteTimeslot(timeSlotId) {
            var deferred = $q.defer();

            $http.delete(cbu.baseUrl + '/rest/timeslot/' + timeSlotId + '')
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
