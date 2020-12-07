# AutoStocks

This project is very specific. It helps a food warehouse to automate the reporting of product anomalies.  
With a simple HTTP request, AutoStocks retrieves the product data from the [OpenFoodFacts API](https://fr.openfoodfacts.org/data), processes it and adds the necessary data to a Google Sheets, in order to further process the product anomaly.

# Todo
  - [x] Replace SQL queries by an external REST API
  - [x] Create API routes
  - [x] Replace JSON data by the OpenFoodAct API
  - [x] Update inserted data
    - [x] EAN (`code`)
    - [x] Name (`product_name`)
    - [x] Image URL (`image_url`)
    - [x] Ingredients (`ingredients_text_en`, `ingredients_text`)
    - [x] Quantity (`quantity`)
    - [x] Brands (`brands`)

# License
Licensed under the GNU GPLv3, see the [license](./LICENSE).
