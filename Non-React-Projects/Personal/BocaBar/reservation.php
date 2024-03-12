<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $date = $_POST["date"];
    $person = $_POST["person"];
    $hour = $_POST["hour"];
    $minute = $_POST["minute"];
    $special = $_POST["special"];

    // You can perform further processing, validation, and storage of this data here

    // For demonstration purposes, let's print the submitted data
    echo "Name: " . $name . "<br>";
    echo "Date: " . $date . "<br>";
    echo "Number of Persons: " . $person . "<br>";
    echo "Time: " . $hour . ":" . $minute . "<br>";
    echo "Special Requests: " . $special . "<br>";
} else {
    // Handle the case when the form is not submitted
    echo "Form not submitted.";
}
?>
