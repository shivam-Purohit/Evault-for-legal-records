const dummyUser = {
  userId1: "client1",
  userId2: "client2",
  userId3: "client3",
  userId4: "admin1",
  userId5: "admin2",
  userId6: "attorney1",
  userId7: "attorney2",
  userId8: "police1",
  userId9: "police2",
  password: "pass",
};

const handleLogin = async (req, res) => {
  console.log(req.body);
  const { userType, userId, caseId, password } = req.body;
  // Remove leading/trailing whitespaces

  let userIdExists = false;
  
  for (const key in dummyUser) {
    console.log(dummyUser[key]); // Logging the values for debugging
    if (dummyUser[key] === userId) {
      userIdExists = true;
      break;
    }
  }
  
  console.log(`User ID: ${userId}`);
  console.log(`User ID exists: ${userIdExists}`);
  
  
  if (userIdExists) {
    console.log("User ID exists");
    console.log(userType);
    if (password === dummyUser.password) {
      if (userType === "admin") {
        console.log("here in admin");

        const user = {
          userId: userId,
          userType: userType,
          caseId: caseId,
        };

        req.user = user;
        res.redirect(`/admin/${userId}?caseId=${caseId}`);
      } else if (userType === "attorney") {
        const user = {
          userId: userId,
          userType: userType,
          caseId: caseId,
        };

        req.user = user;
        res.redirect(`/attorney/${userId}?caseId=${caseId}`);
      } else if (userType === "client") {
        res.redirect(`/client/${userId}?caseId=${caseId}`);
      } else if (userType === "police") {
        const user = {
          userId: userId,
          userType: userType,
          caseId: caseId,
        };

        req.user = user;

        res.redirect(`/police/${userId}?caseId=${caseId}`);
      } else {
        res.send("Invalid user type");
      }
    } else {
      res.send("Password did not match");
    }
  } else {
    res.send("User ID not found");
  }
};

module.exports = { handleLogin };
