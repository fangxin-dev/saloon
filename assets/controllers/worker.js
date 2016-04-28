(function () {
'use strict';
var app = angular.module('saloon.admin.worker', ['ngResource']).config([
    '$httpProvider', '$resourceProvider',
    function($httpProvider, $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
]).controller('WorkerCtrl', [
'$scope', '$resource','$http', '$window',
function($scope, $resource, $http){
  var Worker = $resource('/worker/:workerId', {workerId:'@id'});

  $scope.options = {url: ""};
  $scope.worker = {};
  $scope.showUpdateForm = false;
  $scope.showForm = false;

  $scope.workerSchema =
  [
  {
      title: '员工名',
      schemaKey: 'name',
      type: 'text',
      inTable: true
  },
  {
      title: '员工号',
      schemaKey: 'number',
      type: 'text',
      inTable: true
  },
  {
      title: '显示名',
      schemaKey: 'shownName',
      type: 'text',
      inTable: true
  },
  {
      title: '服务描述',
      schemaKey: 'description',
      type: 'textarea',
      inTable: true
  },{
      title: '备注',
      schemaKey: 'remark',
      type: 'textarea',
      inTable: true
  }
  ];

  $scope.test = 'Hello world!';
  $scope.init = function()
  {
    Worker.query({}, function(workers) {
      $scope.workers = workers;
    });
  };
  $scope.update = function(workerId){
    $scope.worker.$save(function(data, headers){
      alert("更新成功");
      $scope.edit(workerId);
    });
  };
  $scope.edit = function(workerId){
    $scope.showForm = false;
    Worker.get({workerId: workerId}, function(workerOne){
      $scope.worker = workerOne;
      $scope.showUpdateForm = true;
      window.location.href= "#";
    })
  };
  $scope.add = function(){
    var workerPO = new Worker({
        name: $scope.worker.name,
        number: $scope.worker.number,
        shownName: $scope.worker.shownName,
        description: $scope.worker.description,
        remarks: $scope.worker.remarks,
    });
    workerPO.$save(function(data, headers) {
        $scope.worker = data;
        $scope.showUpdateForm = true;
        $scope.showForm = false;
        alert("创建成功");
        $scope.workers.push($scope.worker);
    }, function(data, headers) {
        $scope.userError = data.data;
    });
  };
  $scope.deleteImage = function(workerId, imageId){

    $http.delete("/worker/"+workerId+"/image/"+imageId).success(function (data, status, headers) {
        $scope.ServerResponse = data;
        $scope.edit(workerId);
        //alert("deleted");
    });
  };
  $scope.setAsFrontImage = function(workerId, imageId){
    $http.worker("/worker/"+workerId+"/image/"+imageId+"/setFront").success(function (data, status, headers) {
        $scope.ServerResponse = data;
        alert("set");
    });
  };
  $scope.refresh = function(){
    window.location.href="/worker-mod";
  }
}])
}());
