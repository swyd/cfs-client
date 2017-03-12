(function(angular) {

    angular.module('csf').controller('TSMController', controller);

    function controller($scope, $http, TSMService, $filter, NgTableParams) {
        var vm = this;
        vm.timeslot = {};
        vm.timeslots = new NgTableParams({}, {
            dataset: null
        });

        vm.coaches = [];
        vm.types = [];

        vm.editingInProgress = false;

        vm.reset = reset;
        vm.createTimeslot = createTimeslot;
        vm.editTimeslot = editTimeslot;
        vm.saveEditedTimeslot = saveEditedTimeslot;
        vm.deleteTimeslot = deleteTimeslot;

        activate();

        function activate() {
            if (vm.types.length == 0 || vm.coaches.length == 0) {
                TSMService.getTypes().then(
                    function(data) {
                        vm.types = data;
                    });

                TSMService.getCoaches().then(
                    function(data) {
                        vm.coaches = data;
                    });
            }
            TSMService.getTimeslots().then(
                function(data) {
                    data.filter(function(el) {
                        el.coach = vm.coaches[el.coachId];
                        el.tip = vm.types[el.type];
                        el.startsAt = el.startsAt;
                    });

                    vm.timeslots = new NgTableParams({}, {
                        dataset: data
                    });
                });
        }

        function reset() {
            if (vm.editingInProgress) {
                vm.editingInProgress = false;
            }
            vm.timeslot.id = null;
            vm.timeslot.limit = null;
            vm.timeslot.startsAt = null;
            vm.timeslot.isAdvanced = null;
            vm.timeslot.isActive = null;
            vm.timeslot.priority = null;
            vm.timeslot.type = null;
            vm.timeslot.coachId = null;
        }

        function createTimeslot() {
            TSMService.createTimeslot(vm.timeslot).then(function(data) {
                vm.timeslot.id = null;
                vm.timeslot.limit = null;
                vm.timeslot.startsAt = null;
                vm.timeslot.isAdvanced = null;
                vm.timeslot.isActive = null;
                vm.timeslot.priority = null;
                vm.timeslot.type = null;
                vm.timeslot.coachId = null;

                activate();
            });
        }

        function deleteTimeslot(id) {
            TSMService.deleteTimeslot(id).then(function() {
                vm.timeslot.id = null;
                vm.timeslot.limit = null;
                vm.timeslot.startsAt = null;
                vm.timeslot.isAdvanced = null;
                vm.timeslot.isActive = null;
                vm.timeslot.priority = null;
                vm.timeslot.type = null;
                vm.timeslot.coachId = null;

                activate();
            })
        }

        function editTimeslot(timeslot) {
            vm.editingInProgress = true;
            vm.timeslot.id = timeslot.id;
            vm.timeslot.limit = timeslot.limit;
            vm.timeslot.startsAt = timeslot.startsAt;
            vm.timeslot.isAdvanced = timeslot.isAdvanced;
            vm.timeslot.isActive = timeslot.isActive;
            vm.timeslot.priority = timeslot.priority;
            vm.timeslot.type = String(timeslot.type);
            vm.timeslot.coachId = String(timeslot.coachId);

        }

        function saveEditedTimeslot() {
            TSMService.editTimeslot(vm.timeslot).then(function(data) {
                vm.editingInProgress = false;
                vm.timeslot.id = null;
                vm.timeslot.limit = null;
                vm.timeslot.startsAt = null;
                vm.timeslot.isAdvanced = null;
                vm.timeslot.isActive = null;
                vm.timeslot.priority = null;
                vm.timeslot.type = null;
                vm.timeslot.coachId = null;

                activate();
            });
        }

    }

})(angular);
