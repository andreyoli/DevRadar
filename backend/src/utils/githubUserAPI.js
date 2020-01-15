const axios = require("axios");

module.exports = async function githubUserAPI(githubUser) {
  return await axios.get(`https://api.github.com/users/${githubUser}`);
};
