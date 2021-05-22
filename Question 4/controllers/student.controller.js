const {model} = require("mongoose");
const Student = model("Student");

module.exports.getStudentList = (req, res) => {
    const callBackHandler = (err, studentList) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal server error")
        }
        res.status(200).json(studentList);
    }
    if (req.query && req.query.offset && req.query.count) {
        const {offset, count} = [parseInt(req.query.offset), parseInt(req.query.count)];
        Student
            .find()
            .skip(offset)
            .limit(count)
            .exec((err, resp) => callBackHandler(err, resp))
    } else
        Student
            .find()
            .exec((err, resp) => callBackHandler(err, resp))
}


module.exports.getStudentById = (req, res) => {
    if (req.params && !req.params._id)
        return res.status(400).send("Student Id is required");
    else
        Student.findById(req.params._id).exec((err, student) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal server error");
            }
            res.status(200).json(student);
        })
}

module.exports.getStudentAddressList = (req, res) => {
    if (req.params && !req.params.studentId)
        return res.send(400).send("Student Id is required");
    else
        Student.findById(req.params.studentId).select("address").exec((err, student) => {
            if (err) {
                console.log(err)
                res.status(500).send("Internal server error");
            }
            res.status(200).json(student.address);
        })
}


module.exports.getStudentAddressById = (req, res) => {
    if (req.params && !req.params.studentId && !req.params.addressId)
        return res.status(400).send("Student Id and Address Id is required");
    else
        Student.findById(req.params.studentId).select("address").exec((err, student) => {
            if (err) {
                console.log(err)
                res.status(500).send("Internal server error");
            }
            const address = student.address.find(a => a._id.toString() === req.params.addressId.toString());
            res.status(200).json(address);
        })
}

module.exports.createStudent = (req, res) => {
    if (req.body) {
        const student = new Student({...req.body});
        Student.create(student, (err, student) => {
            if (err) {
                console.log(err)
            }
            res.status(200).json(student)
        })
    }
}

module.exports.deleteStudentAddressById = (req, res) => {
    if (req.params.studentId && req.params.addressId) {
        Student.findById(req.params.studentId, (err, student) => {
            if (err)
                res.status(500).json({message: err});
            else if (!student)
                res.status(404).json({message: "Student not found"});
            else {
                let addressIndex = student.address.findIndex(a => a._id.toString() === req.params.addressId);
                if (addressIndex !== -1) {
                    student.address.splice(addressIndex, 1)
                    student.save((err) => {
                        if (err)
                            res.status(500).json({message: err});
                        else
                            res.status(204).send();
                    })
                } else
                    res.status(404).send({message: "Address not found"});
            }
        })
    } else
        res.status(400).send({message: "Invalid url parameters"})
}


module.exports.updateStudentAddress = (req, res) => {
    if (req.params.studentId && req.params.addressId) {
        if (req.body.city && req.body.street && req.body.street && req.body.zipCode) {
            Student.findById(req.params.studentId, (err, student) => {
                if (err)
                    res.status(500).json({message: err});
                else if (!student)
                    res.status(404).json({message: "Student not found"});
                else {
                    let addressIndex = student.address.findIndex(a => a._id.toString() === req.params.addressId);
                    if (addressIndex !== -1) {
                        student.address[addressIndex] = {...req.body}
                        student.save((err) => {
                            if (err)
                                res.status(500).json({message: err});
                            else
                                res.status(204).send();
                        })
                    } else
                        res.status(404).send({message: "Address not found"});
                }
            })
        } else
            res.status(400).json({message: "Address attributes required"})
    } else
        res.status(400).json({message: "Invalid url parameter"})
}


module.exports.updateStudent = (req, res) => {
    if (req.params._id && req.body.name && req.body.gpa) {
        Student.findByIdAndUpdate(req.params._id, req.body, {useFindAndModify: true}, (err, student) => {
            if (err)
                res.status(500).send({message: "Internal server error"})
            else
                res.status(200).send(student);
        })
    } else {
        res.status(400).json({message: "Please pass all required fields"})
    }
}

module.exports.deleteStudentById = (req, res) => {
    if (req.params._id) {
        Student.findByIdAndDelete(req.params._id, (err, student) => {
            if (err)
                res.status(500).json({message: "Internal server error"})
            else
                res.status(response.status).send();
        });
    } else {
        res.status(400).json({message: "Student ID is required"})
    }
}