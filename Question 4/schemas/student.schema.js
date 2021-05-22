const {Schema, model} = require("mongoose")

const addressSchema = new Schema({
    city: {type: String, required: true},
    state: {type: String, required: true},
    street: {type: String, required: true},
    zipCode: {type: Number, required: true}
})

const studentSchema = new Schema({
    name: {type: String, required: true},
    gpa: {type: Number, min: 0, max: 4, required: true},
    address: [addressSchema],
    createdDate: {type: Date, default: Date.now()}
})

model("Student", studentSchema, "students")