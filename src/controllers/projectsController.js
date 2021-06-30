const Projects = require("../models/projects");
const { ErrorHandler } = require("../helpers/error");

//add new project
const addProject = async (req, res, next) => {
  try {
    const projectAdded = await new Projects(req.body);
    projectAdded.img = req.file.filename;

    if (Object.keys(projectAdded) != 0) {
      await projectAdded.save();
      return res.status(200).send({
        message: "addedd successfully",
        data: projectAdded,
      });
    } else {
      throw new ErrorHandler(400, "Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

// list all projects
const allProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({}).exec();
    if (allProjects.length != 0) {
      return res.status(200).send({ data: allProjects });
    } else {
      throw new ErrorHandler(400, "something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

//find One Project
const oneProject = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findOne = await Projects.findById({ _id: id }).exec();
    if (findOne == null) {
      throw new ErrorHandler(400, "Data Not Found");
    } else {
      return res.status(200).send({ data: findOne });
    }
  } catch (error) {
    next(error);
  }
};

//update project
const updateProject = async (req, res, next) => {
  const id = req.params.id;
  const { body, files } = req;
  const arrayOfPics = [];
  if (files["pictures"].length !== 0) {
    files["pictures"].map((item) => {
      return arrayOfPics.push(item.filename);
    });
  }
  try {
    const newData = body;
    if (Object.keys(files).length !== 0) {
      newData.img = files["img"][0].filename;
      newData.pictures = arrayOfPics;
    }
    const updatedProject = await Projects.findByIdAndUpdate(
      { _id: id },
      newData,
      {
        new: true,
      }
    );
    if (!Object.keys(updatedProject) == 0) {
      return res.status(200).send({ data: updatedProject });
    } else {
      throw new ErrorHandler(400, "can't updated");
    }
  } catch (error) {
    next(error);
  }
};

//find all picture of one project
// const findProjectsPictures = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const picsProject = await Projects.find(
//       { _id: id },
//       { pictures: 1, _id: 0 }
//     );
//     if (Object.keys(picsProject) != 0) {
//       return res.status(200).send({ data: picsProject });
//     } else {
//       throw new ErrorHandler(400, "No Data Found");
//     }
//   } catch (error) {
//     next(error);
//   }
// };
module.exports = {
  addProject,
  allProjects,
  oneProject,
  updateProject,
};
