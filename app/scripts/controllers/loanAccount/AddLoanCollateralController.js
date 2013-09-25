(function(module) {
  mifosX.controllers = _.extend(module, {
    AddLoanCollateralController: function(scope, resourceFactory, routeParams, location) {

        scope.collateralTypes = [];
        scope.formData = {};
        scope.loanId =routeParams.id;
        resourceFactory.loanCollateralTemplateResource.get({loanId:scope.loanId}, function(data) {
          scope.collateralTypes = data.allowedCollateralTypes;
        });

        scope.submit = function() {
          this.formData.locale = 'en';
          resourceFactory.loanResource.save({resourceType:'collaterals', loanId:scope.loanId}, this.formData, function(data){
            location.path('/loan/' + data.loanId +'/viewcollateral/'+data.resourceId);
          });
        };

    }
  });
  mifosX.ng.application.controller('AddLoanCollateralController', ['$scope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.AddLoanCollateralController]).run(function($log) {
    $log.info("AddLoanCollateralController initialized");
  });
}(mifosX.controllers || {}));
