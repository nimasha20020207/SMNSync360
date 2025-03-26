const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
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
    location: {
        type: String,
        require:true,
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