const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/suggest", auth, (req, res) => {
  const { goal } = req.body;
  const g = goal.toLowerCase();

  let tasks = [];

  if (g.includes("exam") || g.includes("study")) {
    tasks = [
      "Create a study timetable",
      "Revise important topics",
      "Practice previous year questions",
      "Take mock tests",
      "Analyze weak areas"
    ];
  } else if (g.includes("interview")) {
    tasks = [
      "Revise DSA concepts",
      "Practice coding problems",
      "Prepare HR questions",
      "Mock interview practice",
      "Update resume"
    ];
  } else if (g.includes("fitness") || g.includes("gym")) {
    tasks = [
      "Create workout plan",
      "Daily warm-up exercises",
      "Track calories",
      "Weekly progress check",
      "Rest and recovery"
    ];
  } else {
    tasks = [
      "Break goal into small steps",
      "Set daily targets",
      "Track progress",
      "Review weekly",
      "Improve consistency"
    ];
  }

  res.json(tasks);
});

module.exports = router;
