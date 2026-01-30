const router = require("express").Router();
const Habit = require("../models/Habit");
const auth = require("../middleware/auth");

// Create a new habit
router.post("/", auth, async (req, res) => {
  try {
    const habit = await Habit.create({
      userId: req.userId,
      name: req.body.name,
      streak: 0,
      lastCompleted: null
    });
    res.json(habit);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all habits of logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Mark habit as completed (increase streak)
router.put("/complete/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    const today = new Date().toISOString().split("T")[0];

    if (habit.lastCompleted !== today) {
      habit.streak += 1;
      habit.lastCompleted = today;
      await habit.save();
    }

    res.json(habit);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete habit
router.delete("/:id", auth, async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json("Habit Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
