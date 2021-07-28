const Programs = require("../models/programs");
const { ErrorHandler } = require("../helpers/error");

//add new Program
const addProgram = async (req, res, next) => {
  try {
    const programAdded = await new Programs(req.body);
    await programAdded.save();
    if (Object.keys(programAdded) != 0) {
      return res.status(200).send({
        message: "addedd successfully",
        data: programAdded,
      });
    } else {
      throw new ErrorHandler(400, "Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

// list all paragrams
const allPrograms = async (req, res, next) => {
  try {
    const allPrograms = await Programs.find(
      {},
      { title: 1, link: 1, _id: 0 }
    ).exec();
    if (allPrograms.length != 0) {
      return res.status(200).send({ data: allPrograms });
    } else {
      throw new ErrorHandler(400, "you have no Data in Programs");
    }
  } catch (error) {
    next(error);
  }
};

const updateProgram = async (req, res, next) => {
  const id = req.params.id;
  const { body, file } = req;
  try {
    const newData = body;
    if (Object.keys(file).length !== 0) {
      newData.img = file.filename;
    }
    const updatedProgram = await Programs.findByIdAndUpdate(
      { _id: id },
      newData,
      {
        new: true,
      }
    );
    if (!Object.keys(updatedProgram) == 0) {
      return res.status(200).send({ data: updatedProgram });
    } else {
      throw new ErrorHandler(400, "can't updated");
    }
  } catch (error) {
    next(error);
  }
};

//list program with it's projects
const programProjects = async (req, res, next) => {
  const id = req.params.id;
  try {
    const projectsProgram = await Programs.find({ _id: id }).populate(
      "projects"
    );
    if (projectsProgram.length != 0) {
      return res.status(200).send({ data: projectsProgram });
    } else {
      throw new ErrorHandler(400, "something went wrong");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addProgram,
  allPrograms,
  updateProgram,
  programProjects,
};
