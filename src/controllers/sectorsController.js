const Sectors = require("../models/sectors");
const { ErrorHandler } = require("../helpers/error");

//add new Sector
const addSector = async (req, res, next) => {
  try {
    const sectorAdded = await new Sectors(req.body);
    sectorAdded.img = req.file.filename;
    await sectorAdded.save();
    if (Object.keys(sectorAdded) != 0) {
      return res.status(200).send({
        message: "addedd successfully",
        data: sectorAdded,
      });
    } else {
      throw new ErrorHandler(400, "Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

// list all Sectors
const allSectors = async (req, res, next) => {
  try {
    const allSectors = await Sectors.find({}).exec();
    if (allSectors.length != 0) {
      return res.status(200).send({ data: allSectors });
    } else {
      throw new ErrorHandler(400, "you have no Data in Sectors");
    }
  } catch (error) {
    next(error);
  }
};

//edit on sector
const updateSector = async (req, res, next) => {
  const id = req.params.id;
  const { body, file } = req;
  try {
    const newData = body;
    if (Object.keys(file).length !== 0) {
      newData.img = file.filename;
    }
    const updatedSector = await Sectors.findByIdAndUpdate(
      { _id: id },
      newData,
      {
        new: true,
      }
    ).populate({
      path: "programs",
      populate: { path: "projects" },
    });
    if (!Object.keys(updatedSector) == 0) {
      return res.status(200).send({ data: updatedSector });
    } else {
      throw new ErrorHandler(400, "can't updated");
    }
  } catch (error) {
    next(error);
  }
};

//find one sector
const oneSector = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findOne = await Sectors.findById({ _id: id }).populate({
      path: "programs",
      populate: { path: "projects" },
    });

    if (!findOne || findOne.length != 0) {
      return res.status(200).send({ data: findOne });
    } else {
      throw new ErrorHandler(400, "Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSector,
  allSectors,
  updateSector,
  oneSector,
};
