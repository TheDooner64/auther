app.controller('LoginCtrl', function ($scope, AuthFactory, $state) {

  $scope.signInName = 'login'; 

  $scope.signin = function() {
    AuthFactory.login($scope.email, $scope.password)
    .then(function(user) {
      $state.go('home'); 
    });
  }

});