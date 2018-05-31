// Error codes for backend to front end communication, this will all be in the form of json because juice smells like oranges and nectarines...

// sign up page
{
  success: true /*true means it successfuly signed up a user, redirect to /login */ ||
             false /*something went wrong */,
  error: {
    errCode: 1 /*error was on the user input, therefore .formsErr exists in this object */ ||
             2 /*error was on the servers end and a try again later message is displayed */,
    formsErr: {
      firstName: 1 /*invalid field, like if some fool try to put loljkfktump:)%100leanvegitardian */,
      lastName: 1 /*invalid field, like if some dood try to put lordtrumpet$$onthestreets&my*fromheavenyo */,
      password: 1 /*invalid field, like if some granny try to put password69loljk */,
      dateOfBirth: 1 /*invalid field, like if some ghost try to put YYYY/MM/DD */,

      email: 1 /*invalid field, like if some internt wizard try to put iknowcomputars#twitter@1080kensintonAve.94102.internet */ ||
             2 /*taken email, this email was alredy signed up, add a link in the message box for forget password*/,
      username: 1 /*invalid field, like if some fool try to put lordtrumpet$$onthestreets&my*fromheavenyo */ ||
                2 /*taken username, someone was quicker, and usernames have to be unique*/,
      gender: null /*there will always be a gender assigned no matter what, is on male as default so this is always null */
    }
  }
}
// // login
// {

// }
