<?php
  $jsonFile = 'users.json';
  $userData = json_decode(file_get_contents('php://input'), true);

  // Validate data (you should perform more thorough validation)
  if (isset($userData['email']) && isset($userData['password']) && isset($userData['name'])) {
    // Read existing data
    $existingData = json_decode(file_get_contents($jsonFile), true);

    // Add the new user
    $existingData['users'][] = [
      'email' => $userData['email'],
      'password' => $userData['password'],
      'name' => $userData['name']
    ];

    // Write the updated data back to the file
    file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT));

    // Send a success response
    echo json_encode(['success' => true]);
  } else {
    // Send an error response
    echo json_encode(['success' => false, 'error' => 'Invalid data']);
  }
?>
