app.controller('ExampleFiveCtrl', [ '$scope', 'PromiseService', function($scope, PromiseService) {

	$scope.promises = [];

	$scope.add = function() {
		$scope.promises.push({});
	}

	$scope.reset = function() {
		$scope.promise = null;
		$scope.promises = [];
	};

	$scope.generateCombinedPromises = function(futurePromises) {
		$scope.promise = {
			number : 0
		};

		angular.forEach(futurePromises, function(value, key) {
			$scope.promises[key] = PromiseService.getRecursivePromise(value.number || 0);
			$scope.promises[key].number = value.number;
			$scope.promise.number += value.number;

			$scope.promises[key].then(function(value) {
				$scope.promises[key].result = value;
				$scope.promises[key].progress = 100;
			}, function(reason) {
				$scope.promises[key].result = reason;
			}, function(value) {
				$scope.promises[key].result = value + " promises left...";
				$scope.promises[key].progress = (($scope.promises[key].number - value) * (100 / $scope.promises[key].number)) || 0;
			});
		});

		$scope.promise.result = [];
		PromiseService.getCombinedPromises($scope.promises).then(function(value) {
			$scope.promise.result = value;
			$scope.promise.progress = 100;
		}, function(reason) {
			$scope.promise.result = reason;
		}, function(value) {
			var progress = 0;
			angular.forEach($scope.promises, function(value, key) {
				progress += (value.progress || 0);
			});
			$scope.promise.progress = progress / $scope.promises.length;
			$scope.promise.result.push(value);
		});
	};
} ]);