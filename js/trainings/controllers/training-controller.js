(function(angular) {

    angular.module('csf').controller('TrainingController', controller);

    function controller($scope, $http, $filter, TrainingService, NgTableParams) {
        var vm = this;
        vm.datePicker = {
            date: {
                startDate: moment().subtract(1, 'days'),
                endDate: moment().add(1, 'days')
            }
        };

        vm.trainings = new NgTableParams({}, {
            dataset: null
        })

        vm.searchTrainings = searchTrainings;
        vm.deleteTrainings = deleteTraining;
        vm.getNumberOfPeoplePerTimeSlot = getNumberOfPeoplePerTimeSlot;
        vm.getNumberOfPeoplePerSlotForDay = getNumberOfPeoplePerSlotForDay;
        // vm.calculateTotalContract = calculateTotalContract;
        // vm.calculateTotalContractsPaid = calculateTotalContractsPaid;
        // vm.calculateTotalContracstUnpaid = calculateTotalContracstUnpaid;
        // vm.getSumPerPacket = getSumPerPacket;
        // vm.getQuantityPerPacket = getQuantityPerPacket;

        render();

        function render() {
            //          vm.datePicker.date.startDate = vm.datePicker.date.startDate
            //                  .format('DD-MM-YYYY');
            //          vm.datePicker.date.endDate = vm.datePicker.date.endDate
            //                  .format('DD-MM-YYYY');
            searchTrainings();
        }

        function searchTrainings() {
            TrainingService.search({
                fromDate: vm.datePicker.date.startDate.format('DD-MM-YYYY'),
                toDate: vm.datePicker.date.endDate.format('DD-MM-YYYY')
            }).then(function(data) {
                data.filter(function(el) {
                    el.usageDate = $filter('date')(el.usageDate, "dd-MM-yyyy");
                    el.name = el.user.name;
                    el.startsAt = el.timeSlot.startsAt;
                    el.surname = el.user.surname;
                });
                vm.trainings = new NgTableParams({}, {
                    dataset: data
                });
            });
        }

        function deleteTraining(slotUsageId) {
            TrainingService.deleteTraining(slotUsageId).then(function() {
                searchTrainings();
            });
        }

        function getNumberOfPeoplePerTimeSlot(data) {
            var map = new Object();
            for (var i = 0; i < data.length; i++) {
                if ((data[i].usageDate in map)) {
                    map[data[i].usageDate] = map[data[i].usageDate] + 1;
                } else {
                    map[data[i].usageDate] = 1;
                }
            }
            return map;
        }

        function getNumberOfPeoplePerSlotForDay(key) {
            var map = new Object();
            var data = vm.trainings.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].usageDate == key) {
                    if ((data[i].startsAt in map)) {
                        map[data[i].startsAt] = map[data[i].startsAt] + 1;
                    } else {
                        map[data[i].startsAt] = 1;
                    }
                }
            }
            return map;
        }

    }

})(angular);
