app.controller('ExampleThreeCtrl', [ '$scope', 'PromiseService', function($scope, PromiseService) {

	$scope.generateRecursivePromise = function(number) {
		console.log("ExampleThreeCtrl.generateRecursivePromise con number=" + number);
		$scope.promise = PromiseService.getRecursivePromise(number || 0).then(function(value) {
			console.log("ExampleThreeCtrl.generateRecursivePromise.then con number=" + number + " value=" + value);
			$scope.promise.result = value;
			$scope.promise.progress = 100;
		}, function(reason) {
			$scope.promise.result = reason;
		}, function(value) {
		    newProgress = ((number - value) * (100 / number)) || 0; 
			console.log("ExampleThreeCtrl mi trovo nella funzione notify. Aggiorno promise.result e promise.progress[" + newProgress +"] con value=" + value + " number=" + number);
			$scope.promise.result = value + " promises left...";
			$scope.promise.progress = newProgress;
		});
	};
} ]);