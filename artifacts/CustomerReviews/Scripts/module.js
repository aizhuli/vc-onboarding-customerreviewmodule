//Call this to register our module to main application
var moduleTemplateName = "CustomerReviews";

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleTemplateName);
}

angular.module(moduleTemplateName, [])
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('workspace.customerReviews', {
                url: '/customerReviews',
                templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                controller: [
                    '$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
                        var newBlade = {
                            id: 'reviewsList',
                            controller: 'CustomerReviews.reviewsListController',
                            template: 'Modules/$(CustomerReviews)/Scripts/blades/reviews-list.tpl.html',
                            isClosingDisabled: false
                        };
                        bladeNavigationService.showBlade(newBlade);
                    }
                ]
            });
    }
])
    .run(['platformWebApp.mainMenuService', 'platformWebApp.widgetService', '$state', 'platformWebApp.settings',
    function (mainMenuService, widgetService, $state, settings) {
            //Register module in main menu

        settings.getValues({ id: 'CustomerReviews.CustomerReviewsEnabled' }, function (setting) {
            if (setting[0] === true) {
                var menuItem = {
                    path: 'browse/customerReviews',
                    icon: 'fa fa-comments',
                    title: 'Customer Reviews',
                    priority: 100,
                    action: function () { $state.go('workspace.customerReviews') },
                    permission: 'customerReview:read'
                };
                mainMenuService.addMenuItem(menuItem);
            }
        });
        

        //Register reviews widget inside product blade

        var itemReviewsWidget = {
            controller: 'CustomerReviews.customerReviewWidgetController',
            template: 'Modules/$(CustomerReviews)/Scripts/widgets/customerReviewWidget.tpl.html'
        };
        widgetService.registerWidget(itemReviewsWidget, 'itemDetail');

        //Register positive reviews widget inside product blade
        var itemReviewsPositiveWidget = {
            controller: 'CustomerReviews.customerReviewPositiveWidgetController',
            template: 'Modules/$(CustomerReviews)/Scripts/widgets/customerReviewPositiveWidget.tpl.html'
        };
        widgetService.registerWidget(itemReviewsPositiveWidget, 'itemDetail');
            }
]);
