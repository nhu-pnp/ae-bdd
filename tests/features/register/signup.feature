@REG-001
Feature: Register account
  # Squash TM test case 58 - each step below matches step 1-12 in Squash.

  @TC-SQUASH-58 @regression @smoke
  Scenario: Verify User signup successfully
    Given user is on the signup and login page
    When user enters a valid name and a new email in the signup form
    And user clicks the Signup button
    Then the account information form is displayed
    And the email is prefilled from signup and disabled
    And the name is prefilled from signup and editable
    When user fills in all valid account and address information
    And user clicks the Create Account button
    Then the Account Created page is displayed
    When user clicks Continue
    Then the home page is displayed
    And the header shows the user's name
