var app = angular.module("salCalc", []);

app.directive('froInteger', function() {

	function isUp(ev) {
		return ev.which === 61 || ev.which === 107;
	}

	function isDown(ev) {
		return ev.which === 109 || ev.which === 173;
	}

	function link(scope, element, attr, ngModelCtrl) {
		ngModelCtrl.$parsers.push(function (text) {
			var transformedInput = text.replace(/[^0-9]/g, '');
			if(transformedInput !== text) {
				ngModelCtrl.$setViewValue(transformedInput);
				ngModelCtrl.$render();
			}
			return transformedInput;  // or return Number(transformedInput)
		});
	}

	return {
		require: 'ngModel',
		link: link
	};
});

app.controller('SalaryCalculatorController', function ($scope) {

	function round(v) {
		return Math.round(v * 100)/100;
	}

	function roundHourlyRate() {
		$scope.sal.hourly = round($scope.sal.hourly);
	}

	function calcBiMonthly() {
		var sal = $scope.sal;
		sal.bimonthly = round(sal.annual / 24);
	}

	function calcBiWeekly() {
		var sal = $scope.sal;
		sal.biweekly = round(sal.annual / 26);
	}

	function calcMonthly() {
		var sal = $scope.sal;
		sal.monthly = round(sal.annual / 12);
	}

	$scope.calculateByHour = function () {
		var sal = $scope.sal;
		sal.weekly = sal.hourly * sal.hoursPerDay * sal.daysPerWeek;
		sal.annual = sal.weekly * 52;
		calcBiMonthly();
		calcBiWeekly();
		calcMonthly();
	};

	$scope.calculateByYear = function () {
		var sal = $scope.sal;
		sal.weekly = sal.annual / sal.hoursPerDay / sal.daysPerWeek
		sal.hourly = sal.weekly / 52;
		roundHourlyRate();
		calcBiMonthly();
		calcBiWeekly();
		calcMonthly();
	};

	$scope.sal = {
		hourly: 10,
		hoursPerDay: 8,
		daysPerWeek: 5
	};

	$scope.calculateByHour();

});