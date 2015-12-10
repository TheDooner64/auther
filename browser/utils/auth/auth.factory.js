app.factory('AuthFactory', function($http) {
  var AuthFactory = {};
  var currentUser = {email: null, isAdmin: null}; 

  AuthFactory.signup = function(email, password) {
    return $http.post('/api/users/signup', { email: email, password: password })
    .then(function(response) {
      return response.data;
    })
    .then(function(user) {
      AuthFactory.setCurrentUser(user.email, user.isAdmin); 
    }).then(null, function(err) {
    });
  };

  AuthFactory.login = function(email, password) {
    return $http.post('/api/users/login', { email: email, password: password })
    .then(function(response) {
      return response.data;
    })
    .then(function(user) {
      AuthFactory.setCurrentUser(user.email, user.isAdmin); 
    }).then(null, function(err) {
      console.error(err);
    });
  };

  AuthFactory.logout = function() {
    $http.get('/api/users/logout')
      .then(res => res.data)
      .then(function(confirm) {
        return AuthFactory.setCurrentUser(null, null);       
      }) 
      .then(null, console.error.bind(console)); 
  }


  AuthFactory.setCurrentUser = function(email, isAdmin) {
    //will be called from login controller
    currentUser.email = email; 
    currentUser.isAdmin = isAdmin; 
  }

  AuthFactory.getCurrentUser = function() {
    return currentUser; 
  }

  return AuthFactory;
})