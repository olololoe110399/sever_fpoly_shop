const mongose = require ('mongoose');
const GenreSchema = new mongose.Schema ({
  genre_id: {
    type: String,
    required: true,
  },
  genre_name: {
    type: String,
    required: true,
  }
});

const Genre = mongose.model ('Genre', GenreSchema);

module.exports = Genre;
