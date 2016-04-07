angular
.module("muskoka", [
    "ui.router",
    "lbServices"
])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider) {
$stateProvider
  .state("app", {
    url: "/",
    views: {
        root: {
            templateUrl: "views/index.html"
        }
    },
    authenticate: true
  });
//$urlRouterProvider.otherwise('all-reviews');
}])
.run(["$rootScope", "$state", function($rootScope, $state) {
$rootScope.$on("$stateChangeStart", function(event, next) {

})
}]);
