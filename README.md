# youtube clone

## 목차

1. [4장:ROUTERS](#40-what-is-routers)

---

# 4.0 What is Routers?

router는 컨트롤러와 url의 관리를 쉽게 해줌.

즉, mini application을 만들기 쉽게 해줌.

프로젝트에서 가장 먼저 생각해야하는 건 데이터

위튜브의 경우

1. 비디오: 업로드, 시청, 수정, 자막을 달 수도 있고, 삭제도 할 수 있음.
2. 유저: 계정을 만들고, 로그인하고 올리고 다 할 수 있음.

이 두 개가 프로젝트의 도메인이라고 할 수 있음.

일단 우리가 사용할 url 을 생각해보면

```
/ -> home
/join -> Join
/login -> Login
/search -> Search

/edit-user -> Edit Profile
/delete-user -> Delete Profile
/watch-video -> Watch Video
/edit-video -> Edit Video
/delete-video -> Delete Video
```

이렇게 되어 있는데,

이것보다 더 좋은 방법은 라우터를 도메인 별로 나누는 방법이다.

```
/ -> home
/join -> Join
/login -> Login
/search -> Search

/users/edit -> Edit user
/users/delete -> Delte Profile

/videos/watch -> Watch Video
/videos/delete -> Delete Video
/videos/comment -> Comment on a video
/videos/comments/delete -> Delete A Comment of a Video
```

이게 바로 라우터가 하는 일이다.

url을 작업중인 주제를 기준으로 그룹화 해주는 것이다.

# 4.1 Making Our Routers

```
/ -> home
/join -> Join
/login -> Login
/search -> Search
```

먼저 이 글로벌 라우터에 대해 따져보자면,

행동을 하는 주체가 user이거나 목적이 video이기 때문에, 주체에 따라 url을 그룹화 해주자는 위의 논리에 조금 어긋날 수 있다.

이는, 일부 예외를 만든 것인데, 약간의 마케팅적 목적 혹은, url의 간결함이 중요한 url에 대해 목적을 어겨주는 것이다.

```jsx
//Router 생성
const userRouter = express.Router();

//Router 사용 준비
app.use("/users", userRouter);
```

```jsx
const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

app.use("/users", userRouter);
```

즉, 위 코드 처럼

1. router를 만들고
2. 핸들러를 만들고
3. router에서 어떤 url을 get하면 핸들러로 연결해주고
4. app자체에서 어떤 url을 get하면 router로 연결해준다.

# 4.2 Cleaning the Code

각 라우터를 파일로 분리해주고, server.js파일에서 해당 라우터 파일을 import 해오는 방식으로 코드를 정리했다.

nodejs에서 각 js 파일은 모듈이며, 거품과 같고 각 js파일이 독립된 채로 private한 상태이다.

따라서 각 모듈에서 다른 모듈을 사용하기 위해서는 export와 import가 필요하다.

라우터 js파일에는

라우터와 핸들러, 라우터의 get함수가 들어가 있다.

```jsx
import express from "express";

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handleWatchVideo);

export default videoRouter;
```

# 4.3 Exports

router로부터 controller도 분리해주고, controller에서 여러개의 함수를 import해오기 위해 default export가 아닌, 함수 앞에 직접 export를 붙여주고, import 해올 때에도 객체로 여러개를 한꺼번에 받아오는 방식으로 import를 했다.

다만 이 방식의 경우 default의 경우와 다르게 import 시 import한 함수의 이름을 마음대로 바꿀 수 없다.

```jsx
export const join = (req, res) => res.send("Join");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");

export default join;
```

```jsx
import express from "express";
import { edit, remove } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

export default userRouter;
```
