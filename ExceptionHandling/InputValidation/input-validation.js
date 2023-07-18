function loggerFunction(message) {
    console.log(message);
  }
  
  function errorLoggerFunction(error) {
    console.error(error);
  }
  
  var logger = {
    log: loggerFunction,
    error: errorLoggerFunction
  };
  
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission
  
    var usernameInput = document.getElementById('username-input');
    var errorMessage = document.getElementById('error-message');
  
    try {
      // Validate input
      var username = usernameInput.value;
      if (!/^\d+$/.test(username)) { // Check if input contains only digits
        throw new Error("Please enter a non-numeric value.");
      }
  
      // Clear error message and submit the form
      errorMessage.textContent = "";
      event.target.submit();
  
      // Log form submission
      logger.log("Form submitted");
    } catch (error) {
      // Log the error using the logger
      logger.error(error);
  
      // Display error message to the user
      errorMessage.textContent = error.message;
    } finally {
      // Perform any cleanup or additional tasks here
      usernameInput.value = ""; // Clear the input field, for example
      
      }
  }
  
  // Attach event listener to the form submit event
  var form = document.getElementById('my-form');
  form.addEventListener('submit', handleFormSubmit);
  