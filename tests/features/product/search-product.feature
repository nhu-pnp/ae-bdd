@PRD-002
Feature: Search product
  # Squash TM test case 171 - each step below matches step 1-6 in Squash.

  @TC-SQUASH-171 @regression
  Scenario: Verify search returns products matching keyword
    Given user is on the All Products page
    When user enters "jeans" in the Search Product field
    And user clicks the search button
    Then the "Searched Products" heading is displayed
    And at least 1 product is displayed
    And every product name contains "Jeans"
