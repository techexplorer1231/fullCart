/*
'use strict';

describe('Directive: cartProductQuickView', function () {

  // load the directive's module and view
  beforeEach(module('fullCartApp'));
  beforeEach(module('components/cartProductQuickView/cartProductQuickView.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cart-product-quick-view></cart-product-quick-view>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cartProductQuickView directive');
  }));
});*/
