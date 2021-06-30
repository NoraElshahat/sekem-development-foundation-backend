const News = require("../models/news");
const { ErrorHandler } = require("../helpers/error");

//add new news
const addNews = async (req, res, next) => {
  const file = req.file;
  try {
    if (!file) {
      throw new ErrorHandler(400, "File can't be uploaded");
    }
    const addedNews = await new News(req.body);
    addedNews.img = file.filename;
    await addedNews.save();
    if (!Object.keys(addedNews).length == 0) {
      return res.status(200).send({
        data: addedNews,
      });
    } else {
      throw new ErrorHandler(400, "No Data Found");
    }
  } catch (error) {
    next(error);
  }
};

//list all news
const getNews = async (req, res, next) => {
  try {
    const allNews = await News.find({}).exec();
    if (allNews.length != 0) {
      return res.status(200).send({ data: allNews });
    } else {
      throw new ErrorHandler(400, "No Data Found");
    }
  } catch (error) {
    next(error);
  }
};

//get one
const getOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findOne = await News.findById({ _id: id });
    if (findOne != null && findOne.length != 0) {
      return res.status(200).send({ data: findOne });
    } else {
      throw new ErrorHandler(400, "No Data Found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNews,
  getNews,
  getOne,
};
