var logger = {
    log: function(message) {
      console.log(message);
    },
    error: function(error) {
      console.error(error);
    }
  };
  
  module.exports = logger;