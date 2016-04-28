(function () {
'use strict';
var app = angular.module('saloon.admin.member', ['ngResource']).config([
    '$httpProvider', '$resourceProvider',
    function($httpProvider, $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
]).controller('MemberCtrl', [
'$scope', '$resource','$http', '$window',
function($scope, $resource, $http){
  var Member = $resource('/member/:memberId', {memberId:'@id'});

  $scope.options = {url: ""};
  $scope.member = {};
  $scope.showUpdateForm = false;
  $scope.showForm = false;

  $scope.memberSchema =
  [
  {
      title: '会员名',
      schemaKey: 'name',
      type: 'text',
      inTable: true
  },{
      title: '电话',
      schemaKey: 'phone',
      type: 'text',
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
    Member.query({}, function(members) {
      $scope.members = members;
    });
  };
  $scope.update = function(memberId){
    $scope.member.$save(function(data, headers){
      alert("更新成功");
      $scope.edit(memberId);
    });
  };
  $scope.edit = function(memberId){
    //alert("66");
    $scope.showForm = false;
    Member.get({memberId: memberId}, function(memberOne){
      $scope.member = memberOne;
      $scope.showUpdateForm = true;
      window.location.href= "#";
    })
  };
  $scope.add = function(){
    var memberPO = new Member({
        name: $scope.member.name,
        phone: $scope.member.phone,
        remarks: $scope.member.remarks,

    });
    memberPO.$save(function(data, headers) {
        $scope.member = data;
        $scope.showUpdateForm = true;
        $scope.showForm = false;
        alert("创建成功");
        $scope.members.push($scope.member);
    }, function(data, headers) {
        $scope.userError = data.data;
    });
  };
  $scope.refresh = function(){
    window.location.href="/member-mod";
  }
}])
}());
