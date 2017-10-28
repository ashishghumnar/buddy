var app = angular.module('buddyDoctor', []);
app.controller('medicationController', function ($scope) {
    var data = localStorage.getItem('suggesstion');
    data = JSON.parse(data);
    $scope.medication = data.medication;
    $scope.foundDisease = data.foundDisease;
    $scope.predicatedDiseasePercentage = data.predicatedDiseasePercentage;
    $scope.icdData = localStorage.getItem('ICDData');

});
