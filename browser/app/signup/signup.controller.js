app.controller('SignupCtrl', function ($scope, AuthFactory) {
  // $scope.users = users;

  $scope.signup = function() {
    AuthFactory.signup($scope.email, $scope.password)
    .then(function(user) {
      console.log(user);
    });
  }

});