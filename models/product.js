const mongose = require ('mongoose');
const ProductSchema = new mongose.Schema ({
  product_name: {
    type: String,
    required: true,
  },
  over_view: {
    type: String,
    required: true,
  },
  vote_average: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image_path: {
    type: String,
    required: false,
  },
  backdrop_path: {
    type: String,
    required: false,
  },
});

const Product = mongose.model ('Product', ProductSchema);

module.exports = Product;
