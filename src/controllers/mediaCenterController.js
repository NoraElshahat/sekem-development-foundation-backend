const MediaCenter = require("../models/media-center");
const { ErrorHandler } = require("../helpers/error");

//add new media
const addMediaCenter = async (req, res, next) => {
  const file = req.file;
  try {
    if (!file) {
      throw new ErrorHandler(400, "File can't be uploaded");
    }
    const newMediaCenter = await new MediaCenter(req.body);
    newMediaCenter.img = file.filename;
    await newMediaCenter.save();
    if (!Object.keys(newMediaCenter).length == 0) {
      return res.status(200).send({
        data: newMediaCenter,
      });
    } else {
      throw new ErrorHandler(400, "No Data Found");
    }
  } catch (error) {
    next(error);
  }
};

// list all media center

const mediaCenters = async (req, res, next) => {
  try {
    const allMediaCenter = await MediaCenter.find({});
    if (allMediaCenter.length !== 0) {
      return res.status(200).send({ data: allMediaCenter });
    } else {
      throw new ErrorHandler(400, "Data Not Found");
    }
  } catch (error) {
    next(error);
  }
};

//find one
const findeOneMefiaCenter = async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundMedia = await MediaCenter.find({ _id: id }).exec();
    if (foundMedia.length !== 0) {
      return res.status(200).send({ data: foundMedia });
    } else {
      throw new ErrorHandler(400, "Data Not Found");
    }
  } catch (error) {
    next(error);
  }
};

//update media center
const updateMediaCenter = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    const findOneMediaCenterr = await MediaCenter.findOneAndUpdate(
      { _id: id },
      body,
      { new: true }
    );
    if (!Object.keys(findOneMediaCenterr) == 0) {
      return res.status(200).send({ data: findOneMediaCenterr });
    } else {
      throw new ErrorHandler(400, "can't updated");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMediaCenter,
  findeOneMefiaCenter,
  mediaCenters,
  updateMediaCenter,
};
