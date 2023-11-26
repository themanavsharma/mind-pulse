function paymentMade(orderID, payerID, paymentID, paymentToken) {
  var ajax = new XMLHttpRequest();
  ajax.open("POST", "paypal.php", true);

  ajax.onreadystatechange = function () {
      if (this.readyState == 4) {
          if (this.status == 200) {
              var response = JSON.parse(this.responseText);
              console.log(response);
          }

          if (this.status == 500) {
              console.log(this.responseText);
          }
      }
  };

  var formData = new FormData();
  formData.append("orderID", orderID);
  formData.append("payerID", payerID);
  formData.append("paymentID", paymentID);
  formData.append("paymentToken", paymentToken);
  ajax.send(formData);

}
