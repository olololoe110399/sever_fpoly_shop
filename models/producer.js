const mongose = require ('mongoose');
const ProducerSchema = new mongose.Schema ({
  producer_id: {
    type: String,
    required: true,
  },
  producer_name: {
    type: String,
    required: true,
  },
  image_path: {
    type: String,
    required: false,
  },
});

const Producer = mongose.model ('Producer', ProducerSchema);

module.exports = Producer;
