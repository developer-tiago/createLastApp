const knex = require("../database/knex");

class ProductsController {
  async create(request, response) {
    const { title, description, tags, categories } = request.body;
    const { user_id } = request.params;

    const [product_id] = await knex("products").insert({
      title,
      description,
      user_id,
    });

    const categoriesInsert = categories.map(category => {
      return {
        product_id,
        url: category
      };
    });

    await knex("categories").insert(categoriesInsert);

    
    const tagsInsert = tags.map(name => {
      return {
        product_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }
}

module.exports = ProductsController;