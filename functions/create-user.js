module.exports = (request, response) => {
  // Verify user provided a phone
  if (!response.body.phone) {
    return res.status.send({ error: 'Bad Input' });
  }

  // Format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  // Create a new user account using that phone number
  // Respond to the user's request, saying the account was made.
}
