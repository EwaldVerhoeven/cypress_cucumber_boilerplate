Feature: Demo feature

    Scenario: I enter a search value to google via a parameter in the step_definition
        Given I wait 3 seconds
        Then I perform a google search with the value "testing"
    
    Scenario: I performa a few http calls for demo purposes
        Given I perform a GET request and save a value inside the localstorage
        Then I use my saved value to perform a POST request