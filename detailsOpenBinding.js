angular.module("detailsOpenBinding", []).directive("openBinding", function() {
	return {
		link: function(scope, element) {
			scope.detailsElement = element;
		},
		controller: ["$scope", "$parse", "$attrs", function($scope, $parse, $attrs) {
			var modelGet   = $parse($attrs.openBinding);
			var modelSet   = modelGet.assign;
			// initial value that's guaranteed to be unique wrt === comparison,
			// so that the first digest run primes the open attr correctly
			var modelValue = {};

			$scope.$watch(function() {
				var currValue = modelGet($scope);
				if (currValue !== modelValue) {
					modelValue = currValue;
					$scope.detailsElement.attr("open", !!modelValue);
				}
			});

			$scope.$watch("detailsElement", function(newValue) {
				if (newValue === undefined) return;

				// this watch should fire exactly once per instance,
				// since the only assignment happens in the link function
				$scope.detailsElement.click(function(e) {
					// inside a JQuery event handler, thus need $apply
					$scope.$apply(function() {
						try {
							// the bang makes a nice boolean out of the value
							modelSet($scope, !$scope.detailsElement.attr("open"));
						}
						catch (e) {
							throw {
								message:  "openBinding: this error may be potentially caused by an expression that indexes into an array that is undefined",
								original: e
							};
						}
					});
				});
			});
		}]
	};
});
