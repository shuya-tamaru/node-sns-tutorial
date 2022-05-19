const router = require("express").Router();
const User = require("../models/User");

//CRUD
//userInfoUpdate
router.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("UserInfo Updated");
    }catch{
      return res.status(500),json(err);
    }
  } else {
    return res.status(403).json("You can update only your userInfo !!!!!");
  }
});

//userInfoDelete
router.delete("/:id", async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("UserInfo Deleted");
    }catch{
      return res.status(500),json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account !!!!!");
  }
});

// //userInfoGet
// router.get("/:id", async (req, res) => {
//     try{
//       const user = await User.findById(req.params.id);
//       const { password, updatedAt, ...other } = user._doc;
//       return res.status(200).json(other);
//     }catch{
//       return res.status(500),json(err);
//     }
// });

//get userInfo by query 
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try{
    const user = userId 
      ? await User.findById(userId) 
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  }catch{
    return res.status(500),json(err);
  }
});

// following user
router.put("/:id/follow", async (req, res) => {
  if(req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // follower don't include my account
      if(!user.followers.includes(req.body.userId)){
        await user.updateOne({
          $push: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("You followed this user");
      } else {
        return res.status(403).json("You cannot follow this user, because already followed");
      }
    } catch(err) {
      return res.status(500).json(err);
    }
  }else{
    return res.status(500).json("You cannot follow yourself !!!");
  }
});

// unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if(req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      // You can unfollow, if follower is followed currentuser.
      if(user.followers.includes(req.body.userId)){
        await user.updateOne({
          $pull: {
            followers: req.body.userId,
          },
        });
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("Unfollowed this user");
      } else {
        return res.status(403).json("You cannot unfollow this user, because you don't follow");
      }
    } catch(err) {
      return res.status(500).json(err);
    }
  }else{
    return res.status(500).json("You cannot unfollow yourself !!!");
  }
});


// router.get("/", (req, res) => {
//   res.send("user router");
// });

module.exports = router;
