// Create validator

// createa a postfunction which gets info from query, and then uses SQL to get data
// redirect back to "/" but with new data

const listPost = async (req, res) => {
  const selectedGenres = req.body.genres;
  console.log(selectedGenres);
};

export default listPost;
