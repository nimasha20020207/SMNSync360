//model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    Project_ID: {
        type: String,
        required: [true, "Project ID is required"],
        trim: true
    },
    Project_Manager_ID: {
        type: String,
        required: [true, "Project Manager ID is required"],
        trim: true
    },
    PM_Name: {
      type: String,
      required: [true, "PM Name is required"],
      validate: {
          validator: function(v) {
              // Allow letters, spaces, and common name characters
              return /^[a-zA-Z\s\-']+$/.test(v);
          },
          message: props => `${props.value} is not a valid name!`
      }
  },
    Site_Supervisor_ID: {
        type: String,
        required: [true, "Site Supervisor ID is required"],
        trim: true
    },
    SS_Name: {
      type: String,
      required: [true, "SS Name is required"],
      validate: {
          validator: function(v) {
              return /^[a-zA-Z\s\-']+$/.test(v);
          },
          message: props => `${props.value} is not a valid name!`
      }
  },
    Worker_ID: {
        type: String,
        required: [true, "Worker ID is required"],
        trim: true
    },
    Deadline: {
        type: Date,
        required: [true, "Deadline is required"],
        min: [Date.now, "Deadline cannot be in the past"]
    },
    Priority_Level: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    Task_Status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    }
}, { 
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            ret.Task_ID = ret._id;
            delete ret.id;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

// Only create index for Project_ID
TaskSchema.index({ Project_ID: 1 });

module.exports = mongoose.model("Task", TaskSchema);