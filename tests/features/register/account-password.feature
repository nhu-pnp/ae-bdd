@REG-001
Feature: Password field on account information form
  # Squash TM test case 62 - each step below matches step 1-3 in Squash.

  @TC-SQUASH-62 @regression
  Scenario: Verify password field on account and address information page
    Given user has opened the account information form with a new name and email
    When user enters a password
    Then the password is masked
