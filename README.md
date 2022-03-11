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
