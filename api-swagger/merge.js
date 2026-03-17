const fs = require("fs");

function mergeSwagger() {
  const books = JSON.parse(fs.readFileSync("../api-books/swagger.json"));
  const warehouse = JSON.parse(fs.readFileSync("../api-warehouse/swagger.json"));
  const orders = JSON.parse(fs.readFileSync("../api-orders/swagger.json"));

  const merged = {
    openapi: "3.0.0",
    info: { title: "Combined API", version: "1.0.0" },
    paths: {
      ...books.paths,
      ...warehouse.paths,
      ...orders.paths
    },
    components: {
      schemas: {
        ...books.components?.schemas,
        ...warehouse.components?.schemas,
        ...orders.components?.schemas
      }
    }
  };

  fs.writeFileSync("./combined-swagger.json", JSON.stringify(merged, null, 2));
}

mergeSwagger();