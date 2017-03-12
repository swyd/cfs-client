(function(angular) {

    angular.module('csf').controller('TimeSlotsController', controller);

    function controller($scope, $http, $q, TimeSlotsService, $filter,
        NgTableParams) {
        var vm = this;
        vm.date = moment().format('DD-MM-YYYY');
        vm.timeSlots = [];
        vm.trainingDates = {
            trainingDates: []
        };
        vm.timeSlotsWithRemaining = {};
        vm.appointment = {};
        vm.appointments = new NgTableParams({}, {
            dataset: null
        })

        vm.createAppointment = createAppointment;
        vm.findAllTimeSlotUsageForDate = findAllTimeSlotUsageForDate;
        vm.findAllWithRemainingForDate = findAllWithRemainingForDate;
        vm.cancelAppointment = cancelAppointment;
        vm.render = render;
        vm.setDate = setDate;
        vm.getAvailableDates = getAvailableDates;
        vm.renderAdmin = renderAdmin;

        activate();

        function setDate(date) {
            vm.date = moment(date, "DD-MM-YYYY").format("DD-MM-YYYY");
        }

        function getAvailableDates() {
            vm.trainingDates.trainingDates = [];
            var now = new Date();

            vm.trainingDates.trainingDates.push({
                "startsAt": moment().format("DD-MM-YYYY")
            });
            vm.trainingDates.trainingDates.push({
                "startsAt": moment().add(1, 'days').format("DD-MM-YYYY")
            });
        }


        function getAvailableDatesForAdmin() {
            var now = moment();
            var end = moment().add(6, 'days');

            vm.trainingDates.trainingDates = [];

            while (now.dayOfYear() <= end.dayOfYear()) {
                if (now.day() != 0) {
                    vm.trainingDates.trainingDates.push({
                        "startsAt": now.format("DD-MM-YYYY")
                    });
                }
                now.add(1, 'days');
            }
            return vm.trainingDates;
        }

        function activate() {
            if ($scope.user && $scope.user.isAdmin) {
                renderAdmin();
            } else {
                render(vm.date);
            }
        }

        function renderAdmin() {
            getAvailableDatesForAdmin();
            findAllTimeSlotUsageForDate(vm.date);
            findAllWithRemainingForDate(vm.date);
        }

        function render(date) {
            getAvailableDates();
            findAllTimeSlotUsageForDate(date);
            findAllWithRemainingForDate(date);
        }

        function cancelAppointment(appointmentId) {
            TimeSlotsService.cancelAppointment(appointmentId).then(function() {
                activate()
            });
        }

        function createAppointment(timeSlotId) {
            TimeSlotsService.createAppointment(timeSlotId, vm.date).then(
                function() {
                    activate();
                });
        }

        function findAllWithRemainingForDate(date) {
            TimeSlotsService.findAllWithRemaining({
                forDate: date
            }).then(function(data) {
                vm.timeSlotsWithRemaining = data;
            });
        }

        function findAllTimeSlotUsageForDate(date) {
            TimeSlotsService.findAllTimeSlotUsage({
                forDate: date
            }).then(function(data) {
                data.filter(function(el) {
                    el.usageDate = $filter('date')(el.usageDate, "dd/MM/yyyy");
                    el.name = el.user.name;
                    el.startsAt = el.timeSlot.startsAt;
                    el.surname = el.user.surname;
                });
                vm.timeSlots = [];
                for (var i = 0; i < data.length; i++) {
                    vm.timeSlots.push(data[i].startsAt);
                }
                vm.appointments = new NgTableParams({
                    // filter: { name: firstName}
                }, {
                    dataset: data
                });
            });
        }

    }

})(angular);
