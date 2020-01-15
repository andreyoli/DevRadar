const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const githubUserAPI = require("../utils/githubUserAPI");

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const api_res = await githubUserAPI(github_username);

      let { name = login, avatar_url, bio } = api_res.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }
    return res.json(dev);
  },

  async index(res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async destroy(req, res) {
    const { github_username } = req.params;
    const dev = await Dev.findOneAndDelete(github_username);

    return res.json(dev);
  },

  async update(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const dev = await Dev.findOne({ github_username });

    const techsArray = parseStringAsArray(techs);

    if (dev) {
      const api_res = await githubUserAPI(github_username);

      const { name = login, avatar_url, bio } = api_res.data;

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const dev = await Dev.updateOne({
        techs: techsArray,
        name,
        avatar_url,
        bio,
        location
      });
    }

    return res.json({ dev });
  }
};
