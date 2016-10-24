/**
 * Created by hxsd on 2016/9/28.
 */
var myapp = angular.module("myapp", ["ionic"]);
myapp.controller("myCtrl",function($scope,$http, $ionicPopup, $timeout) {

    $http.get("data/data.json")
        .success(function (okDate) {
            $scope.data = okDate;
        });
    $http.get("data/detail-scenery.json")
        .success(function (okDate) {
            $scope.detail_scenery = okDate;
        });
    $http.get("data/detail-build.json")
        .success(function (okDate) {
            $scope.detail_build = okDate;
        });
    $http.get("data/data-trasion.json")
        .success(function (okDate) {
            $scope.data_trasion = okDate;
        });
    $http.get("data/share.json")
        .success(function (okDate) {
            $scope.share = okDate;
        });

    //点赞
    $scope.add = function(shared){
        if(shared.support){
            shared.praise++;
            shared.support=false;
            shared.drop=false;
        }
    };
//踩
    $scope.drop = function(shared){
        if(shared.drop){
            shared.tread++;
            shared.support=false;
            shared.drop=false;
        }
    };
    //评论
    $scope.showPopup = function (shared) {
        //$scope.a=shared;
        $scope.data = {};
        // 一个精心制作的自定义弹出窗口
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.wifi">',
            title: '请输入评论',
            subTitle: '文明评论',
            scope: $scope,
            buttons: [
                {text: '取消'},
                {
                    text: '<b>保存</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.wifi) {
                            // 不允许用户关闭，除非输入评论内容
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                }
            ]

        });
        myPopup.then(function (res) {
            // 参数res是用户输入的评论内容
            console.log('Tapped!', res);
        });

        $timeout(function () {
            myPopup.close(); // 5秒后关闭输入框
        }, 5000);
        shared.talkAbout++;
    };

    // 警告框
    $scope.showAlert = function () {
        $ionicPopup.alert({
            title: '骚年',
            template: '想获得更多资讯，请先登录<br/><b>祝您生活愉快!</b>',
            buttons: [{text:"确定"}]
        }).then(function (res) {
            //console.log('请慎重考虑，反正我告诉过你了。');
        });
    };
    //注册验证
    $scope.enroll = function(){
        $ionicPopup.alert({
            title: '恭喜你',
            template: '你已经是我们的一员了!',
            buttons: [{text:"耍起"}]
        }).then(function (res) {
            //console.log('请慎重考虑，反正我告诉过你了。');
        });
    };
    //登录验证
    $scope.return = function(){
        $ionicPopup.alert({
            title: '您已经登录成功',
            template: '让我们开始美好的一天!',
            buttons: [{text:"遨游"}]
        }).then(function (res) {
            //console.log('请慎重考虑，反正我告诉过你了。');
        });
    }
});
// 配置路由
myapp.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $stateProvider.state("tour",{
        url:"/tour",
        templateUrl:"views/tour/tour.html",
        controller:"tourCtrl"
    }).state("tabs", {
        url: "/tabs",
        abstract: true,  // 抽象的-意思是不具体化，不真的显示它culture-total
        templateUrl: "views/tabs/tabs.html"
    }).state("tabs.menu", {
        url: "/menu",
        abstract: true,
        views: {
            "tab-home": {
                templateUrl: "views/menu/menu.html"
            }
        }
    }).state("tabs.menu.home", {
        url: "/home",
        views: {
            "side-menu": {
                templateUrl: "views/home/home.html",
                controller: "detailHomeCtrl"
            }
        }
    }).state("tabs.menu.register-enter", {//登录
        url: "/register-enter",
        views: {
            "side-menu": {
                templateUrl: "views/register-enter/register-enter.html"
            }
        }
    }).state("tabs.culture-total", {//文化
        url: "/culture-total",
        views: {
            "tab-home": {
                templateUrl: "views/detail-total/culture-total.html"
            }
        }
    }).state("tabs.scenery-total", {//风景
        url: "/scenery-total",
        views: {
            "tab-home": {
                templateUrl: "views/detail-total/scenery-total.html"
            }
        }
    }).state("tabs.medicine-total", {//医药
        url: "/medicine-total",
        views: {
            "tab-home": {
                templateUrl: "views/detail-total/medicine-total.html"
            }
        }
    }).state("tabs.craft-total", {//工艺
        url: "/craft-total",
        views: {
            "tab-home": {
                templateUrl: "views/detail-total/craft-total.html"
            }
        }
    }).state("tabs.cate-total", {//美食
        url: "/cate-total",
        views: {
            "tab-home": {
                templateUrl: "views/detail-total/cate-total.html",
                controller: "detailHomeCtrl"
            }
        }
    }).state("tabs.build-total", {//建筑
        url: "/build-total",
        views: {
            "tab-home": {
                templateUrl: "views/detail-total/build-total.html"
            }
        }
    }).state("tabs.register", {//注册
        url: "/register",
        views: {
            "tab-home": {
                templateUrl:"views/register/register.html"
            }
        }
    }).state("tabs.share", {//分享
        url: "/share",
        views: {
            "tab-share": {
                templateUrl: "views/share/share.html"
            }
        }
    }).state("tabs.myself", {//我的
        url: "/myself",
        views: {
            "tab-myself": {
                templateUrl: "views/myself/myself.html"
            }
        }
    }).state("tabs.nation", {//民族
        url: "/nation",
        views: {
            "tab-nation": {
                templateUrl: "views/nation/nation.html"
            }
        }
    }).state("tabs.nation-search", {//民族搜索
        url: "/nation-search",
        views: {
            "tab-nation": {
                templateUrl: "views/nation-search/nation-search.html"
            }
        }
    }).state("tabs.detail", {
        url: "/detail?:de_name", // 路由传参
        views: {
            "tab-nation": {
                templateUrl: "views/detail/detail.html",
                controller: "detailCtrl"
            }
        }
    }).state("tabs.detail-home", {
        url: "/detail-home?:title", // 路由传参
        views: {
            "tab-home": {
                templateUrl: "views/detail/detail-home.html",
                controller: "detailHomeCtrl"
            }
        }
    });
    // 默认路由
    $urlRouterProvider.otherwise("/tour");
});
// $q 是内置服务，所以可以直接使用
// 创建一个Service，它负责从服务器请求商品数据，并全局共享
myapp.factory("productFactory", function ($http, $q) {
    return {
        query: function () {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http.get("data/data-detail.json")
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);   // 声明执行失败，即服务器返回错误
                });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        } // end query
    };
});
//home中推荐详情
myapp.factory("productDetail", function ($http, $q) {
    return {
        query: function () {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http.get("data/home-details.json")

                .success(function (datadel, status, headers, config) {
                    deferred.resolve(datadel);// 声明执行成功，即http请求数据成功，可以返回数据了
                })
                .error(function (datadel, status, headers, config) {
                    deferred.reject(datadel);   // 声明执行失败，即服务器返回错误
                });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        } // end query
    };
});

// 使用工厂方法，创建的一个单例对象
// 这个单例对象会被缓存
//myapp.factory("dataFactory", function ($http) {
//    //var data = {productList: []};   // 一定要保存到对象中，不要直接保存到一个数组变量中
//    var data = {};
//    $http.get("data/data1.json").success(function (_data, status, headers, config) {
//        data.productList = _data;
//       // Array.prototype.push.apply(data.productList,_data);
//    });
//    return {
//        query: function () {
//            return data;   // 返回数据
//        } // end query
//    };
//
//});
