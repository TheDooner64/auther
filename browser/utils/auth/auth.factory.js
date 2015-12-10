app.factory('AuthFactory', function($http) {
  var AuthFactory = {};

  AuthFactory.signup = function(email, password) {
    return $http.post('/api/users/signup', { email: email, password: password })
    .then(function(response) {
      return response.data;
    }).then(null, function(err) {
    });
  };

  AuthFactory.login = function(email, password) {
    return $http.post('/api/users/login', { email: email, password: password })
    .then(function(response) {
      return response.data;
    }).then(null, function(err) {
      console.error(err);
    });
  };

  return AuthFactory;
})