@CART-001
Feature: Add products to cart
  # Squash TM test case 184 - each step below matches step 1-8 in Squash.

  @TC-SQUASH-184 @regression
  Scenario: Verify products are added to cart with correct price, quantity and total
    Given user is on the All Products page
    When user adds the first product to cart
    Then the "Added!" popup is displayed with View Cart and Continue Shopping
    When user clicks Continue Shopping
    And user adds the second product to cart
    And user clicks View Cart
    Then the cart shows 2 products
    And each cart product shows its price, quantity 1 and total equal to price x quantity
