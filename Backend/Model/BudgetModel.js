const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    P_ID: {
        type: String,
        required: true,
        trim: true,
        unique:true 
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model(
    "BudgetModel",
    BudgetSchema
)