/**
 * Created by hxsd on 2016/9/1.
 */
angular.module("myapp")
    .controller("detailHomeCtrl", function ($scope, $stateParams,productDetail) {
        // 解析url中的参数(通过url传递的参数，解析出来都是字符串)
        var title = $stateParams["title"];
        // 查询出来要显示在view中的商品数据
        var promise = productDetail.query();
        promise.then(function(datadel){
            $scope.datadel=datadel;
            //console.log(datadel)
        angular.forEach(datadel, function (item) {
                if (item["title"] == title) {
                    $scope.datadel = item;
                    //$scope.data_detail.de_total_img = $scope.data_detail.de_total_img.replace("50x50", "400x400");
                    return false;   // 中断forEach循环 <=> break
                }
            });
        },function(){
            console.log(11111)
        })

    });