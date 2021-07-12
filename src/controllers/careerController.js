const { ErrorHandler } = require("../helpers/error");
const Careers = require("../models/careers");

// add new career
const addCareer = async (req, res, next) => {
  const { body } = req;
  try {
    const newcareer = await new Careers(body);
    if (Object.keys(newcareer).length !== 0) {
      await newcareer.save();
    } else {
      throw new ErrorHandler(400, "No Data Entered");
    }
    return res.status(200).send({ data: newcareer });
  } catch (error) {
    next(error);
  }
};

const getTypeOfCareers = async (req, res, next) => {
  try {
    const types = await Careers.find({}, { _id: 0, type: 1 });
    if (types.length == 0) {
      throw new ErrorHandler(400, "No Types Founded");
    } else {
      return res.status(200).send(types);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { addCareer, getTypeOfCareers };
