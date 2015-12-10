'use strict';

app.directive('navbar', function ($state, $location, AuthFactory, $http) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope) {
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};
			
			scope.userEmail = function() {
				return AuthFactory.getCurrentUser().email;
			}

			scope.logout = function() {
				AuthFactory.logout()
					.then(function(confirm) {
						$state.go('home'); 				
					}) 
			}

			if(!AuthFactory.getCurrentUser().email) {
        $http.get('/api/users/auth/me')
            .then(res => res.data)
            .then(function(user) {
                AuthFactory.setCurrentUser(user.email, user.isAdmin);
            }).then(null, console.error.bind(console)); 
    	};
		}
	}
});