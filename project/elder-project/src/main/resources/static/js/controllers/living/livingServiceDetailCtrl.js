angular.module('controllers',[]).controller('livingServiceDetailCtrl',
    ['$scope','$interval','$rootScope','$stateParams','$state','Global',
        'ElderUtil','GetUserInfo','GetlivingServiceList',
        function ($scope,$interval,$rootScope,$stateParams,$state,Global,
                  ElderUtil,GetUserInfo,GetlivingServiceList) {


            if($rootScope.rootElderId!=undefined)
            {
                $scope.elderId = $rootScope.rootElderId;
                $scope.elderName = $rootScope.rootElderName;
            }
            else
            {
                //将用户信息放入$rootScope中
                $rootScope.rootElderId = window.localStorage.getItem("elderId");
                $rootScope.rootElderName = window.localStorage.getItem("elderName");
                $rootScope.rootElderImg = window.localStorage.getItem("elderImg");
                if($rootScope.rootElderId!=undefined)
                {
                    $scope.elderId = $rootScope.rootElderId;
                    $scope.elderName = $rootScope.rootElderName;
                }
                else
                {
                    $scope.elderId = "0000";
                }
            }

            GetUserInfo.save(function(data){
                ElderUtil.checkResponseData(data,'livingServiceDetail/'+$stateParams.livingServiceId);
            });


            GetlivingServiceList.save({
                id:$stateParams.livingServiceId,
                type:'',
                lastNo:'0',
                nextNo:'10'
            },function(data){
                if(data.result == Global.SUCCESS){
                    $scope.response = data.responseData[0];
                    $scope.specialList = data.responseData[0].special.split(';');
                }
                else
                {
                    console.log(data.errorInfo);
                }

            })


            $scope.subscribeService = function()
            {
                $state.go('subscribeService',{livingServiceId:$stateParams.livingServiceId,information:$scope.response.information});
            }


        }])