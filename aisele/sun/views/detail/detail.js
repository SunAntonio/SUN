/**
 * Created by hxsd on 2016/9/1.
 */
angular.module("myapp")
    .controller("detailCtrl", function ($scope, $stateParams,productFactory) {
        // 解析url中的参数(通过url传递的参数，解析出来都是字符串)
        var title = $stateParams["de_name"];
        // 查询出来要显示在view中的商品数据
        var promise = productFactory.query();
        promise.then(function(data){
        angular.forEach(data, function (item) {
                if (item["de_name"] == title) {
                    $scope.data_detail = item;
                    //$scope.data_detail.de_total_img = $scope.data_detail.de_total_img.replace("50x50", "400x400");
                    return false;   // 中断forEach循环 <=> break
                }
            });
        })

    });