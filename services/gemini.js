export async function generateSummary(notes) {

  return `
• Artificial Intelligence automates tasks.

• Machine Learning helps systems learn from data.

• Deep Learning uses neural networks.

• AI improves decision-making.

• AI is used in healthcare, education, and finance.
`;
}

export async function generateQuiz(notes) {

  return [

    {
      question:
        "What does AI help with?",

      options: [
        "Sleeping",
        "Automating tasks",
        "Cooking",
        "Painting",
      ],

      answer:
        "Automating tasks",
    },

    {
      question:
        "Machine Learning allows systems to?",

      options: [
        "Dance",
        "Learn from data",
        "Drive cars only",
        "Sleep",
      ],

      answer:
        "Learn from data",
    },

    {
      question:
        "Deep Learning uses?",

      options: [
        "Books",
        "Neural networks",
        "Maps",
        "Pens",
      ],

      answer:
        "Neural networks",
    },

    {
      question:
        "AI improves?",

      options: [
        "Decision-making",
        "Sleeping",
        "Walking",
        "Drawing",
      ],

      answer:
        "Decision-making",
    },

    {
      question:
        "AI is widely used in?",

      options: [
        "Healthcare",
        "Finance",
        "Education",
        "All of these",
      ],

      answer:
        "All of these",
    },

  ];
}