const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
        duration: Number,
        weight: {
          type: Number,
          default: 0
        },
        reps: {
          type: Number,
          default: 0
        },
        sets: {
          type: Number,
          default: 0
        },
        distance: {
          type: Number,
          default: 0
        }
      }
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);

    workoutSchema.virtual("totalDuration").get(function () {
      // "reduce" array of exercises down to just the sum of their durations
      return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
      }, 0);
    });
 
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
