app.controller('MainCtrl', [ '$scope', function($scope) {

	$scope.getProgressClass = function(progress, result) {
		if (progress == 100) {
			return "progress-bar-success";
		} else if (progress < 100 && result != null) {
			return "progress-bar-info"
		} else {
			return "progress-bar-danger"
		}
	}
} ]);