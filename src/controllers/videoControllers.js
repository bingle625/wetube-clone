const fakeUser = {
  username: "HanSeongJae",
  loggedIn: true,
};

export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", fakeUser: fakeUser });
export const see = (req, res) =>
  res.render("watch", { pageTitle: "watch-video" });
export const edit = (req, res) =>
  res.render("edit", { pageTitle: "edit-video" });
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("upload Video");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send(`delete video #${req.params.id}`);
};
