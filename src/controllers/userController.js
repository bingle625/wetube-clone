import User from "../models/User";
import * as bcrypt from "bcrypt";

/*
api Number: 1.1 회원가입 페이지 이동
api Method: GET
 */
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

/*
api Number: 1.2 회원가입 요청
api Method: POST
 */
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const pageTitle = "Join";
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is alreaydy taken.",
    });
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "join",
      errorMessage: error._message,
    });
  }
};

/*
api Number: 1.3 로그인 페이지 이동
api Method: GET
 */
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

/*
api Number: 1.4 로그인 요청
api Method: POST
*/
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "password does not match.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("See User");
