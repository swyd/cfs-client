(function(angular) {

    angular.module('csf').factory('TrainingService', function($http, $q, cbu) {

        return {
            search: search,
            deleteTraining: deleteTraining
        }

        function search(data) {
            var deferred = $q.defer();

            $http.get(cbu.baseUrl + '/rest/timeslot/usage/all', {
                    params: data
                })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function deleteTraining(id) {
            var deferred = $q.defer();

            $http.delete(cbu.baseUrl + '/rest/timeslot/usage/' + id + '')
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
