function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission and page refresh
    // Code for handling form submission goes here
    console.log('Form submitted');
  }

  function calculateFileData(event) {
    const file = event.target.files[0];
    event.preventDefault();

    try {
      if (!file) {
        throw new Error('No file selected.');
      }

      const allowedFormats = ['text/plain', 'application/msword'];
      const fileType = file.type;

      if (!allowedFormats.includes(fileType)) {
        throw new Error('Invalid file format. Please upload a .txt or .doc file.');
      }

      const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
      if (fileSizeInMB > 6) {
        throw new Error('File size exceeds the limit of 6 MB. Please select a smaller file.');
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        const fileContent = e.target.result;

        // Perform calculations on the file content
        const result = performCalculations(fileContent);
        console.log('Calculation result:', result);

        console.log('File size:', fileSizeInMB + ' MB');
      };

      reader.readAsText(file);

      // Clear any previous error messages and enable the submit button
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = '';
      document.getElementById('submit-button').disabled = false;
    } catch (error) {
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = error.message;
      console.error('An error occurred:', error.message);

      // Disable the submit button
      document.getElementById('submit-button').disabled = true;
    }
  }

  function performCalculations(fileContent) {
    // Assuming the file contains comma-separated values
    const values = fileContent.split(',');

    const numbersFound = values.some(value => !isNaN(value));

    if (!numbersFound) {
      throw new Error('Numbers not found in the file.');
    }
  }