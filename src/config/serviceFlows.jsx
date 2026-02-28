export const serviceFlows = {
  allRounder: {
    label: "All Rounder / Live-in Support",
    steps: [
      {
        id: "gender",
        question: "Preferred Gender",
        type: "single-select",
        required: true,
        options: ["Male", "Female", "Any"],
      },
      {
        id: "experience",
        question: "Experience Required",
        type: "single-select",
        required: true,
        options: ["0-1 Years", "1-3 Years", "3+ Years"],
      },
      {
        id: "accommodation",
        question: "Accommodation Provided?",
        type: "single-select",
        required: true,
        options: ["Yes", "No"],
      },
    ],
  },

  babyCare: {
    label: "Baby Care / Japa",
    steps: [
      {
        id: "babyAge",
        question: "Baby Age",
        type: "single-select",
        required: true,
        options: ["Newborn (0-6 months)", "6-12 months", "1+ Year"],
      },
      {
        id: "shiftType",
        question: "Shift Type",
        type: "single-select",
        required: true,
        options: ["Full Time", "Live-in", "24 Hours"],
      },
      {
        id: "experience",
        question: "Experience Required",
        type: "single-select",
        required: true,
        options: ["1-3 Years", "3+ Years", "5+ Years"],
      },
    ],
  },

  cookingHousehelp: {
    label: "Cooking Househelp",
    steps: [
      {
        id: "cookType",
        question: "Type of Cooking",
        type: "single-select",
        required: true,
        options: ["Veg", "Non-Veg", "Multi-Cuisine"],
      },
      {
        id: "gender",
        question: "Preferred Gender",
        type: "single-select",
        required: true,
        options: ["Male", "Female", "Any"],
      },
      {
        id: "timing",
        question: "Working Hours",
        type: "single-select",
        required: true,
        options: ["Part Time", "Full Time", "Live-in"],
      },
    ],
  },
};
