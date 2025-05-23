import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import { JWT_SECRET } from "../index.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return next(createError(400, "Please provide all required fields"));
    }

    // Check if the email is in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
    });

    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201).json({
      success: true,
      user: savedUser,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Please provide email and password"));
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check password
    if (password !== user.password) {
      return next(createError(401, "Invalid credentials"));
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    //calculte total calories burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Calculate total no of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    //Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetch category of workouts
    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    //Format category data for pie chart

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    // Split workoutString into lines and remove empty lines
    const lines = workoutString.split('\n').map(line => line.trim()).filter(line => line);

    if (lines.length < 5) {
      return next(createError(400, "Invalid workout format. Please provide category, name, sets/reps, weight, and duration"));
    }

    // Parse workout details
    const category = lines[0].startsWith('#') ? lines[0].substring(1).trim() : lines[0].trim();
    const workoutName = lines[1].startsWith('-') ? lines[1].substring(1).trim() : lines[1].trim();
    
    // Parse sets and reps
    const setsRepsLine = lines[2].startsWith('-') ? lines[2].substring(1).trim() : lines[2].trim();
    const setsRepsMatch = setsRepsLine.match(/(\d+)\s*sets?X\s*(\d+)\s*reps?/i);
    if (!setsRepsMatch) {
      return next(createError(400, "Invalid sets/reps format. Example: 3 setsX12 reps"));
    }
    const sets = parseInt(setsRepsMatch[1]);
    const reps = parseInt(setsRepsMatch[2]);

    // Parse weight
    const weightLine = lines[3].startsWith('-') ? lines[3].substring(1).trim() : lines[3].trim();
    const weightMatch = weightLine.match(/(\d+(?:\.\d+)?)\s*kg/i);
    if (!weightMatch) {
      return next(createError(400, "Invalid weight format. Example: 30 kg"));
    }
    const weight = parseFloat(weightMatch[1]);

    // Parse duration
    const durationLine = lines[4].startsWith('-') ? lines[4].substring(1).trim() : lines[4].trim();
    const durationMatch = durationLine.match(/(\d+(?:\.\d+)?)\s*min/i);
    if (!durationMatch) {
      return next(createError(400, "Invalid duration format. Example: 10 min"));
    }
    const duration = parseFloat(durationMatch[1]);

    // Calculate calories burned (simple formula)
    const caloriesBurned = duration * 5 * weight;

    // Create workout
    const workout = await Workout.create({
      user: userId,
      category,
      workoutName,
      sets,
      reps,
      weight,
      duration,
      caloriesBurned,
      date: new Date()
    });

    return res.status(201).json({
      success: true,
      message: "Workout added successfully",
      workout
    });

  } catch (err) {
    console.error("Error adding workout:", err);
    next(createError(500, "Error adding workout. Please try again."));
  }
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseInt(workoutDetails.duration);
  const weightInKg = parseInt(workoutDetails.weight);
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};
