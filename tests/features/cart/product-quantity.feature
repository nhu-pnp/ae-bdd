@CART-002
Feature: Product quantity in cart
  # Squash TM test case 188 - each step below matches step 1-6 in Squash.

  @TC-SQUASH-188 @regression
  Scenario: Verify product quantity in cart
    Given user is on the product detail page of "Blue Top"
    When user enters 4 in the Quantity field
    And user clicks the Add to cart button
    And user clicks View Cart
    Then the cart shows "Blue Top" with quantity 4
    And the cart total of "Blue Top" equals 4 times its price
