@LOG-002
Feature: Login with invalid credentials
  # Squash TM test case 158 - each step below matches step 1-5 in Squash (step 5 is split into 2 checks).

  @TC-SQUASH-158 @regression
  Scenario: Verify login fails with an unregistered email
    Given user is on the signup and login page
    When user enters an unregistered email and any password in the login form
    And user clicks the Login button
    Then the login error "Your email or password is incorrect!" is displayed
    And user stays on the signup and login page
    And user is not logged in
