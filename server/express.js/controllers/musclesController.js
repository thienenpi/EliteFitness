const Muscle = require("../models/Muscles");

module.exports = {
  createMuscle: async (req, res) => {
    const newMuscle = new Muscle(req.body);

    try {
      await newMuscle.save();
      res.status(200).json(newMuscle);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllMuscles: async (req, res) => {
    try {
      const muscles = await Muscle.find().sort({ createdAt: -1 });
      res.status(200).json(muscles);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getMuscle: async (req, res) => {
    try {
      const muscle = await Muscle.findById(req.params.id);
      res.status(200).json(muscle);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  searchMuscle: async (req, res) => {
    try {
      const musclesId = [];
      const result = await Muscle.aggregate([
        {
          $search: {
            index: "elitefitness",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      //   result.forEach((item) => musclesId.push(item._id.toString()))
      //   res.status(200).json(musclesId)
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
