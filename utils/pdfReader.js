export const extractTextFromPDF = async (file) => {

  try {

    return `
    This is extracted text from the uploaded PDF.
    PDF parsing will later return real content.
    `;

  } catch (error) {

    console.log(error);

    return "Error extracting PDF text";
  }
};