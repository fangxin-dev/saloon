(function () {
'use strict';
var app = angular.module('saloon.admin.product', ['ngResource']).config([
    '$httpProvider', '$resourceProvider',
    function($httpProvider, $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
]).controller('ProductCtrl', [
'$scope', '$resource','$http', '$window',
function($scope, $resource, $http){
  var Product = $resource('/product/:productId', {productId:'@id'});

  $scope.options = {url: ""};
  $scope.product = {};
  $scope.showUpdateForm = false;
  $scope.showForm = false;

  $scope.productSchema =
  [
  {
      title: '产品名',
      schemaKey: 'name',
      type: 'text',
      inTable: true
  },{
      title: '产品显示名',
      schemaKey: 'shownName',
      type: 'text',
      inTable: true
  },{
      title: '产品详细',
      schemaKey: 'description',
      type: 'textarea',
      inTable: true
  },
  {
      title: '价钱',
      schemaKey: 'price',
      type: 'text',
      inTable: true
  },
  {
      title: '类型',
      schemaKey: 'type',
      type: 'select',
      inTable: true,
      options: ['员工输出', '物品']
  },
  {
      title: '备注',
      schemaKey: 'remark',
      type: 'textarea',
      inTable: true
  }
  ];

  $scope.test = 'Hello world!';
  $scope.init = function()
  {
    Product.query({}, function(products) {
      $scope.products = products;
    });
  };
  $scope.update = function(productId){
    $scope.product.$save(function(data, headers){
      $scope.edit(productId);
    });
  };
  $scope.edit = function(productId){
    //alert("66");
    $scope.showForm = false;
    Product.get({productId: productId}, function(productOne){
      $scope.product = productOne;
      $scope.showUpdateForm = true;
      window.location.href= "#top";
    })
  };
  $scope.add = function(){
    var productPO = new Product({
        name: $scope.product.name,
        shownName: $scope.product.shownName,
        description: $scope.product.description,
        price: $scope.product.price,
        type: $scope.product.type,
        remarks: $scope.product.remarks

    });
    productPO.$save(function(data, headers) {
        $scope.product = data;
        $scope.showUpdateForm = true;
        $scope.showForm = false;
        alert("创建成功");
        $scope.products.push($scope.product);
    }, function(data, headers) {
        $scope.userError = data.data;
    });
  };
  $scope.refresh = function(){
    window.location.href="/product-mod";
  }
}])
}());
