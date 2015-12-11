app.controller('SignupCtrl', function ($scope, AuthFactory, $state) {

  $scope.signInName = 'signup'; 

  $scope.signin = function() {
    AuthFactory.signup($scope.email, $scope.password)
    .then(function(user) {
      $state.go('home'); 
    });
  }

});