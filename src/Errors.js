export const displayError = (error) => {
    var errorMessageInJson = JSON.parse(
      error.message.slice(58, error.message.length - 2)
    );

    var errorMessageToShow = errorMessageInJson.data.data[Object.keys(errorMessageInJson.data.data)[0]].reason;

    alert(errorMessageToShow);
    return; 
  }