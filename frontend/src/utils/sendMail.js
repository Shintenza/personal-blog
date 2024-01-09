"use server";

const sendEmail = async (firstName, email, title, content) => {
  const destAddress = process.env.FORM_DEST_ADDRESS;

  fetch("https://formsubmit.co/ajax/kam.kuziora@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ message: "okiii" }),
  });

  console.log(response.status);
  // return response.status;
};

export default sendEmail;
