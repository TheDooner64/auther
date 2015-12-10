app.controller('SignupCtrl', function ($scope, AuthFactory, $state) {
  // $scope.users = users;

  $scope.signInName = 'signup'; 

  $scope.signin = function() {
    AuthFactory.signup($scope.email, $scope.password)
    .then(function(user) {
	 $state.go('home'); 
    });
  }

});