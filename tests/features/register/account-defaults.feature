@REG-001
Feature: Default values on account information form
  # Squash TM test case 61 - step 2 in Squash is split into 6 checks below.

  @TC-SQUASH-61 @regression
  Scenario: Verify default value on account and address information page
    Given user has opened the account information form with a new name and email
    Then neither Mr. nor Mrs. is selected
    And the name is prefilled from signup and editable
    And the email is prefilled from signup and disabled
    And password and all address text fields are empty
    And newsletter and partner offers are unchecked
    And the selected country is "Vietnam"
