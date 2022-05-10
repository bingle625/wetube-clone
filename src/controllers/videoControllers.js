import Video from "../models/Video";

// export const home = (req, res) => {
//   Video.find({}, (err, videos) => {
//     if (err) {
//       return res.render("server-error");
//     }
//     return res.render("home", { pageTitle: "Home", videos });
//   });
// };

export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", { pageTitle: `Watching: ` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", { pageTitle: `Editing: ` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  video.title = title;
  console.log(req.body);
  return res.redirect(``);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;

  try {
    await Video.create({
      title,
      description,
      createdAt: "Date.now()",
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: {
        Views: 0,
        rating: 0,
      },
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
