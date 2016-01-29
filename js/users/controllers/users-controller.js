(function(angular) {

    angular.module('csf').controller('UsersController', controller);

    function controller($scope, $http, UsersService, $filter, NgTableParams) {
        var vm = this;
        vm.user = {};
        vm.users = new NgTableParams({}, {
            dataset: null
        });
        vm.coaches = [];
        vm.editingInProgress = false;
        vm.datePicker = {
            date: {
                startDate: null,
                endDate: null
            }
        };
        vm.createUser = createUser;
        vm.changeRole = changeRole;
        vm.editUser = editUser;
        vm.saveEditedUser = saveEditedUser;
        vm.deleteUser = deleteUser;

        activate();

        function activate() {
            if(vm.coaches.length == 0){
                UsersService.getCoaches().then(function(data)
                {
                    vm.coaches = data;
                });
            }

            UsersService.getUsers().then(
                function(data) {
                    data.filter(function(el) {
                        el.coach = vm.coaches[el.coachId];
                        el.datePaid = $filter('date')(el.datePaid,
                            "yyyy-MM-dd");
                        el.dateExpiring = $filter('date')(el.dateExpiring,
                            "yyyy-MM-dd");
                    });
                    vm.users = new NgTableParams({}, {
                        dataset: data
                    });
                });
        }

        function createUser() {
            vm.user.datePaid = vm.datePicker.date.startDate;
            vm.user.dateExpiring = vm.datePicker.date.endDate;
            UsersService.createUser(vm.user).then(function(data) {
                vm.user.username = null;
                vm.user.password = null;
                vm.user.name = null;
                vm.user.surname = null;
                vm.user.email = null;
                vm.user.sessionsLeft = null;
                vm.user.isAdmin = null;
                vm.user.isActive = null;
                vm.user.datePaid = null;
                vm.user.coachId = null;
                vm.user.dateExpiring = null;
                vm.user.isAdvanced = null;
                vm.datePicker.date.startDate = null;
                vm.datePicker.date.endDate = null;

                vm.user.id = null;
                activate();
            });
        }

        function deleteUser(id) {
            UsersService.deleteUser(id).then(function() {
                vm.user.username = null;
                vm.user.password = null;
                vm.user.name = null;
                vm.user.surname = null;
                vm.user.email = null;
                vm.user.sessionsLeft = null;
                vm.user.isAdmin = null;
                vm.user.isActive = null;
                vm.user.isAdvanced = null;
                vm.user.coachId = null;
                vm.user.datePaid = null;
                vm.user.dateExpiring = null;
                vm.user.id = null;
                activate();
            })
        }

        function changeRole(id) {
            UsersService.changeRole(id).then(function(data) {
                activate();
            });
        }

        function editUser(user) {
            vm.editingInProgress = true;

            vm.user.username = user.username;
            vm.user.password = user.password;
            vm.user.name = user.name;
            vm.user.surname = user.surname;
            vm.user.email = user.email;
            vm.user.sessionsLeft = user.sessionsLeft;
            vm.user.isAdmin = user.isAdmin;
            vm.user.isActive = user.isActive;
            vm.user.isAdvanced = user.isAdvanced;
            vm.user.coachId = String(user.coachId);
            vm.datePicker.date.startDate = moment(Date.parse(user.datePaid));
            vm.datePicker.date.endDate = moment(Date.parse(user.dateExpiring));
            vm.user.id = user.id;

        }

        function saveEditedUser() {
            vm.user.dateExpiring = vm.datePicker.date.endDate;
            vm.user.datePaid = vm.datePicker.date.startDate;
            UsersService.editUser(vm.user).then(function(data) {
                vm.editingInProgress = false;

                vm.user.username = null;
                vm.user.password = null;
                vm.user.name = null;
                vm.user.surname = null;
                vm.user.email = null;
                vm.user.sessionsLeft = null;
                vm.user.isAdmin = null;
                vm.user.isActive = null;
                vm.user.isAdvanced = null;
                vm.user.datePaid = null;
                vm.user.dateExpiring = null;
                vm.user.coachId = null;
                vm.user.id = null;
                vm.datePicker.date.startDate = null;
                vm.datePicker.date.endDate = null;
                activate();
            });
        }

    }

})(angular);
