import Appoinment from "../models/appointment.js";

export const saveAppointment = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { name, email, contactNumber, message, date, time } = req.body;
    console.log(req.body);
    let dy = new Date();
    dy.setDate(dy.getDate() - 7);
    const data = await Appoinment.findById(_id);

    if (
      data.AppoinmentList.filter(
        (f) => f.contactNumber === contactNumber && f.bookedOn > dy
      ).length > 0
    )
      return res
        .status(400)
        .json({ msg: "You have already booked Appoinment in last 7 days" });
    //  console.log
    await Appoinment.findByIdAndUpdate(_id, {
      $push: {
        AppoinmentList: {
          name: name,
          email: email,
          contactNumber: contactNumber,
          dateTime: date + "|" + time,
          message: message,
        },
      },
    });
    res.status(200).json({
      msg:
        "You have booked Appoinment in " +
        data.category +
        " " +
        " by " +
        data.serviceName,
    });
  } catch (error) {
    res.status(409).json({ mess: "error" });
  }
};

function compareDDMMYYYY(d1, d2) {
  var parts = d1.split("-");
  var d1 = Number(parts[2] + parts[1] + parts[0]);
  parts = d2.split("-");
  var d2 = Number(parts[2] + parts[1] + parts[0]);
  return d1 > d2;
}
const s = async () => {
  let date = new Date();
  const dt =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  const data = await Appoinment.findOne({ _id: "63d3f56981444ca3aa0aeed1" });
  // console.log(data)
  const timeArr = data.AppoinmentList.filter((f) =>
    compareDDMMYYYY(f.dateTime.split("|")[0], dt)
  ).map((m) => m.dateTime);
  console.log(timeArr);
  let bkTms = {};
  timeArr.forEach((e) => {
    if (!bkTms[e.split("|")[0]]) bkTms[e.split("|")[0]] = [];
    bkTms[e.split("|")[0]].push(e.split("|")[1]);
  });
  console.log(timeArr)
  // res.status(400).json({ data: bkTms });
};

// s();
export const getBookedTime = async (req, res) => {
  try {
    // console.log(req.params);
    const { id: _id } = req.params;
    let date = new Date();
    const dt =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const data = await Appoinment.findOne({ _id: _id });
    // console.log(data)
    const timeArr = data.AppoinmentList.filter((f) =>
      compareDDMMYYYY(f.dateTime.split("|")[0], dt)
    ).map((m) => m.dateTime);
    let bkTms = {};
    timeArr.forEach((e) => {
      if (!bkTms[e.split("|")[0]]) bkTms[e.split("|")[0]] = [];
      bkTms[e.split("|")[0]].push(e.split("|")[1]);
    });
    res.status(200).json(bkTms);
  } catch (error) {
    res.status(409).json({ msg: "Sever Error" });
  }
};
export const getBookedData = async (req, res) => {
  try {
    const { id, id2 } = req.params;
    const data = await Appoinment.findOne(
      { _id: id },
      { AppoinmentList: { $elemMatch: { _id: id2 } } }
    );
    res.status(200).json({ data: data.AppoinmentList[0] });
  } catch (error) {
    res.status(409).json("Sever Error");
  }
};
export const getAllBookedData = async (req, res) => {
  try {
    const data = await Appoinment.findOne({ _id: _id });
    res.status(200).json({ data: data.AppoinmentList });
  } catch (error) {
    res.status(409).json("Sever Error");
  }
};
