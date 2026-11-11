@LOG-001
Feature: Login with valid credentials
  # Squash TM test case 154 - each step below matches step 1-6 in Squash.

  @TC-SQUASH-154 @regression @smoke
  Scenario: Verify user login successfully with valid credentials
    Given a registered account exists
    And user is on the signup and login page
    When user enters the registered email and correct password in the login form
    And user clicks the Login button
    Then the home page is displayed
    And the header shows the user's name
