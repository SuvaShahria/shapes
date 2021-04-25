const userModel = require("../models/user");
const session = require("express-session");
const bcrypt = require("bcrypt");
const defModel = require("../models/def");
const shapeModel = require("../models/shape");
let fs = require("fs");

exports.Init = async (req, res) => {
  const tmpdef = await defModel.find({ number: req.query.number });
  if (tmpdef == null) {
    const def = new defModel({
      number: req.query.number,
      name: req.query.name,
    });
    def.save();
    console.log(def);
    res.send("Created");
  }
  res.send("Already Exists");
};

exports.getAll = async (req, res) => {
  const allShapes = await defModel.find({});
  //allShapes.forEach(element => console.log(element));
  res.status(200).json({
    shapes: allShapes,
  });
};

exports.Create = async (req, res) => {
  console.log(req.session.user);
  const user = req.session.user;
  var _id = 0;
  var cont = fs.readFileSync("./controller/util.txt", "utf8");
  _id = Number(cont);
  _id2 = _id + 1;
  console.log(_id);
  fs.writeFileSync("./controller/util.txt", _id2.toString());

  const shape = await shapeModel.create({
    id: _id,
    shape: req.query.shape,
    createdBy: user,
    modifiedBy: user,
  });
  if (shape != null) {
    console.log(shape);
    res.status(200).json({
      CreatedShape: shape,
    });
  } else {
    res.send("error not created");
  }
};

exports.ViewId = async (req, res) => {
  console.log(req.params.id);
  const shape = await shapeModel.findOne({ id: req.params.id });
  console.log(shape);

  if (shape == null) {
    res.send("shape not found");
  }
  res.status(200).json({
    shape: shape,
  });
};

exports.User = async (req, res) => {
  var user;
  if (req.query.user != null) {
    user = req.query.user;
  } else {
    user = req.session.user;
  }

  const shapes = await shapeModel.find({ createdBy: user });
  console.log(shapes);

  if (shapes == null) {
    res.send("shape not found");
  }
  res.status(200).json({
    user: user,
    shapes: shapes,
  });
};

exports.Delete = async (req, res) => {
  const shape = await shapeModel.findOne({ id: Number(req.params.id) });
  if (
    shape.createdBy == req.session.user ||
    shape.modifiedBy == req.session.user
  ) {
    await shapeModel.deleteOne({ id: req.params.id });
    res.status(200).json({
      message: "Shape has been deleted",
    });
  }
  res.send("Error. User not allowed or Already deleted");
};

exports.Update = async (req, res) => {
  user = req.session.user;
  id = req.params.id;
  nShape = req.query.shape;
  const shape = await shapeModel.updateOne(
    { id: Number(req.params.id) },
    { shape: nShape, modifiedBy: user }
  );
  res.status(200).json({
    message: "Shape has been updated",
  });
};
