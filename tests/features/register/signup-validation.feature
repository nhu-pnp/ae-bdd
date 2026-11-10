@REG-001
Feature: Signup form validation

  @TC-SQUASH-59 @regression
  Scenario: Verify signup is blocked when name and email are empty
    Given user is on the signup and login page
    When user leaves the name and email fields empty in the signup form
    And user clicks the Signup button
    Then the signup name field shows the message "Please fill out this field."
    And the signup email field is reported as required
    And user stays on the signup and login page
