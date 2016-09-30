app.service('PromiseService', [ '$q', '$timeout', function($q, $timeout) {
	var service = this;

	this.getPromise = function(delay) {
		console.log("PromiseService.getPromise con delay=" + delay);

		var deferred = $q.defer();

		$timeout(function() {
			console.log("PromiseService.getPromise timeout 0 [deferred.notify(delay=" + delay + ")]");
			deferred.notify(delay);
		}, 0);

		$timeout(function() {
			console.log("PromiseService.getPromise timeout " + delay + " [deferred.notify(delay=" + delay + ") + deferred.resolve(\"Promise finished with success\")]");
			deferred.notify(delay);
			deferred.resolve("Promise finished with success");
		}, delay || 0);

		return deferred.promise;
	};

	this.getRecursivePromise = function(number) {
		console.log("PromiseService.getRecursivePromise con number=" + number);
		var deferred = $q.defer();

		$timeout(function() {
			console.log("PromiseService.getRecursivePromise timeout 0 [deferred.notify(number=" + number + ")]");
			deferred.notify(number);
		}, 0);

		var delay = Math.floor((Math.random() * 10) + 1) * 200;

		$timeout(function() {
			console.log("PromiseService.getRecursivePromise timeout " + delay + " [deferred.resolve] con number=" + number + " delay=" + delay);
			if (number > 1) {
				deferred.resolve(service.getRecursivePromise(--number));
			} else if (number == 1) {
				deferred.resolve("All promises finished with success");
			} else {
				deferred.reject("An error occured !");
			}
		}, delay);

		return deferred.promise;
	};

	this.getCombinedPromises = function(promises) {
		console.log("PromiseService.getCombinedPromises con promises=" + promises);
		var deferred = $q.defer();

		angular.forEach(promises, function(value, key) {
			value.then(null, null, function(value) {
				$timeout(function() {
					console.log("PromiseService.getCombinedPromises timeout 0 [deferred.notify(value=" + value + ")]");
					deferred.notify(value);
				}, 0);
			});
		});

		$q.all(promises).then(function(value) {
			console.log("PromiseService.getCombinedPromises.then $q.all(promises) [deferred.resolve(value=" + value + ")]");
			deferred.resolve(value)
		}, function(reason) {
			deferred.reject(reason);
		});

		return deferred.promise;
	};

	return service;
} ]);