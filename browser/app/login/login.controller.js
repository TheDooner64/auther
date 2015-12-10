app.controller('LoginCtrl', function ($scope, AuthFactory) {
  // $scope.users = users;
  $scope.login = function() {
    AuthFactory.login($scope.email, $scope.password)
    .then(function(user) {
      // console.log(user);
    });
  }
});