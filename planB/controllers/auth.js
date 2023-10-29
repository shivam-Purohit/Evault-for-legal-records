const dummyUser = {
  userId: "123456",
  password: "pass",
};

const handleLogin = async (req, res) => {
  console.log(req.body);
  const { userType, userId, caseId, password } = req.body;
  

  if (userId === dummyUser.userId) {
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

        // Now assign the user object to req.user
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
