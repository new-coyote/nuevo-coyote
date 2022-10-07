---
column_decoration: none
title: Support
blocks:
- template: block-text
  content: "    <div id=\"smart-button-container\">\n        <div style=\"text-align:
    center\"><label for=\"description\">Description </label><input type=\"text\" name=\"descriptionInput\"
    id=\"description\" maxlength=\"127\" value=\"\"></div>\n          <p id=\"descriptionError\"
    style=\"visibility: hidden; color:red; text-align: center;\">Please enter a description</p>\n
    \       <div style=\"text-align: center\"><label for=\"amount\">Amount </label><input
    name=\"amountInput\" type=\"number\" id=\"amount\" value=\"\" ><span> USD</span></div>\n
    \         <p id=\"priceLabelError\" style=\"visibility: hidden; color:red; text-align:
    center;\">Please enter a price</p>\n        <div id=\"invoiceidDiv\" style=\"text-align:
    center; display: none;\"><label for=\"invoiceid\"> </label><input name=\"invoiceid\"
    maxlength=\"127\" type=\"text\" id=\"invoiceid\" value=\"\" ></div>\n          <p
    id=\"invoiceidError\" style=\"visibility: hidden; color:red; text-align: center;\">Please
    enter an Invoice ID</p>\n        <div style=\"text-align: center; margin-top:
    0.625rem;\" id=\"paypal-button-container\"></div>\n      </div>\n      <script
    src=\"https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD\"
    data-sdk-integration-source=\"button-factory\"></script>\n      <script>\n      function
    initPayPalButton() {\n        var description = document.querySelector('#smart-button-container
    #description');\n        var amount = document.querySelector('#smart-button-container
    #amount');\n        var descriptionError = document.querySelector('#smart-button-container
    #descriptionError');\n        var priceError = document.querySelector('#smart-button-container
    #priceLabelError');\n        var invoiceid = document.querySelector('#smart-button-container
    #invoiceid');\n        var invoiceidError = document.querySelector('#smart-button-container
    #invoiceidError');\n        var invoiceidDiv = document.querySelector('#smart-button-container
    #invoiceidDiv');\n    \n        var elArr = [description, amount];\n    \n        if
    (invoiceidDiv.firstChild.innerHTML.length > 1) {\n          invoiceidDiv.style.display
    = \"block\";\n        }\n    \n        var purchase_units = [];\n        purchase_units[0]
    = {};\n        purchase_units[0].amount = {};\n    \n        function validate(event)
    {\n          return event.value.length > 0;\n        }\n    \n        paypal.Buttons({\n
    \         style: {\n            color: 'gold',\n            shape: 'pill',\n            label:
    'paypal',\n            layout: 'vertical',\n            \n          },\n    \n
    \         onInit: function (data, actions) {\n            actions.disable();\n
    \   \n            if(invoiceidDiv.style.display === \"block\") {\n              elArr.push(invoiceid);\n
    \           }\n    \n            elArr.forEach(function (item) {\n              item.addEventListener('keyup',
    function (event) {\n                var result = elArr.every(validate);\n                if
    (result) {\n                  actions.enable();\n                } else {\n                  actions.disable();\n
    \               }\n              });\n            });\n          },\n    \n          onClick:
    function () {\n            if (description.value.length < 1) {\n              descriptionError.style.visibility
    = \"visible\";\n            } else {\n              descriptionError.style.visibility
    = \"hidden\";\n            }\n    \n            if (amount.value.length < 1) {\n
    \             priceError.style.visibility = \"visible\";\n            } else {\n
    \             priceError.style.visibility = \"hidden\";\n            }\n    \n
    \           if (invoiceid.value.length < 1 && invoiceidDiv.style.display === \"block\")
    {\n              invoiceidError.style.visibility = \"visible\";\n            }
    else {\n              invoiceidError.style.visibility = \"hidden\";\n            }\n
    \   \n            purchase_units[0].description = description.value;\n            purchase_units[0].amount.value
    = amount.value;\n    \n            if(invoiceid.value !== '') {\n              purchase_units[0].invoice_id
    = invoiceid.value;\n            }\n          },\n    \n          createOrder:
    function (data, actions) {\n            return actions.order.create({\n              purchase_units:
    purchase_units,\n            });\n          },\n    \n          onApprove: function
    (data, actions) {\n            return actions.order.capture().then(function (orderData)
    {\n    \n              // Full available details\n              console.log('Capture
    result', orderData, JSON.stringify(orderData, null, 2));\n    \n              //
    Show a success message within this page, e.g.\n              const element = document.getElementById('paypal-button-container');\n
    \             element.innerHTML = '';\n              element.innerHTML = '<h3>Thank
    you for your payment!</h3>';\n    \n              // Or go to another URL:  actions.redirect('thank_you.html');\n
    \             \n            });\n          },\n    \n          onError: function
    (err) {\n            console.log(err);\n          }\n        }).render('#paypal-button-container');\n
    \     }\n      initPayPalButton();\n      </script>"
  heading: Money Please

---
