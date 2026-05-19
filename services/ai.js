export const generateSummary =
  async (notes) => {

  const intros = [

    "• The notes mainly discuss important technical concepts.",

    "• The content explains key ideas in a simple and understandable way.",

    "• The topic focuses on modern technology and real-world applications.",

    "• The notes contain useful learning concepts for students and developers.",

    "• Important information has been identified and summarized below.",
  ];

  const middles = [

    "• The concepts improve understanding of digital systems and automation.",

    "• Real-world examples and applications are included in the topic.",

    "• The notes highlight practical uses and benefits of the technology.",

    "• Key points are explained with clear and concise information.",

    "• The content is useful for learning industry-level technologies.",
  ];

  const endings = [

    "• Overall, the topic is important for modern software development.",

    "• These concepts are widely used in industries and businesses today.",

    "• Understanding these ideas helps build technical knowledge and skills.",

    "• The summary provides a quick revision of the important points.",

    "• AI-powered summaries make learning faster and easier.",
  ];

  const randomIntro =
    intros[
      Math.floor(
        Math.random() *
        intros.length
      )
    ];

  const randomMiddle =
    middles[
      Math.floor(
        Math.random() *
        middles.length
      )
    ];

  const randomEnding =
    endings[
      Math.floor(
        Math.random() *
        endings.length
      )
    ];

  const userLines =
    notes
      .split(".")
      .slice(0, 3)
      .map(
        (item) =>
          `• ${item.trim()}`
      )
      .join("\n\n");

  return `

${randomIntro}

${userLines}

${randomMiddle}

${randomEnding}

`;
};