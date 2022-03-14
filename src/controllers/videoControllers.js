export const trending = (req, res) => res.render("home");
export const see = (req, res) => {
  console.log(req.params);
  return res.send(`watch video #${req.params.id}`);
};
export const edit = (req, res) => {
  console.log(req.params);
  return res.send(`edit video #${req.params.id}`);
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("upload Video");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send(`delete video #${req.params.id}`);
};
