app.controller('ExampleOneCtrl', [ '$scope', 'PromiseService', function($scope, PromiseService) {

	$scope.generatePromise = function(delay) {
		$scope.promise = PromiseService.getPromise(delay * 1000).then(function(value) {
			console.log("ExampleOneCtrl.generatePromise.then con delay=" + delay + " value=" + value);
			$scope.promise.result = value;
			$scope.promise.progress = 100;
		}, function(reason) {
			$scope.promise.result = reason;
		}, function(value) {
			console.log("ExampleOneCtrl mi trovo nella funzione notify con value=" + value);
			$scope.promise.result = value;
		});
	};
} ]);