const { ErrorHandler } = require("../helpers/error");
const Publication = require("../models/publication");
const path = require("path");

//add new publication
const addPublication = async (req, res, next) => {
  const file = req.files;
  try {
    if (file.length == 0) {
      throw new ErrorHandler(400, "File can't be uploaded");
    }
    const newPublication = await new Publication(req.body);
    newPublication.img = file[0].filename;
    // newPublication.doc = file[1].filename;
    console.log(newPublication);
    await newPublication.save();
    if (!Object.keys(newPublication).length == 0) {
      return res.status(200).send({
        data: newPublication,
      });
    } else {
      throw new ErrorHandler(400, "No Data Found");
    }
  } catch (error) {
    next(error);
  }
};

// list all publications

const publications = async (req, res, next) => {
  try {
    const allPublications = await Publication.find({});
    if (allPublications.length !== 0) {
      return res.status(200).send({ data: allPublications });
    } else {
      throw new ErrorHandler(400, "Data Not Found");
    }
  } catch (error) {
    next(error);
  }
};

// download file
const downloadFile = async (req, res, next) => {
  const id = req.params.id;
  const docOfPublication = await Publication.find({ _id: id });
  const docFile = path.join(
    __dirname,
    `../../public/${docOfPublication[0].doc}`
  );
  res.download(docFile, function (err) {
    next(err);
  });
};

module.exports = {
  addPublication,
  publications,
  downloadFile,
};
