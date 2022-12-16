import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";

function Login() {
  // bageUsername
  const [stateBadgeUsername, setStateBadgeUsername] = useState(true);
  let showBadgeUsername = stateBadgeUsername ? "d-none" : "";
  function badgeUsername() {
    setStateBadgeUsername((stateBadgeUsername) => false);
  }
  // bagePassword
  const [stateBadgePassword, setStateBadgePassword] = useState(true);
  let showBadgePassword = stateBadgePassword ? "d-none" : "";
  function badgePassword() {
    setStateBadgePassword((stateBadgePassword) => false);
  }
  // ref clickout
  const ref = useRef<HTMLHeadingElement>(null);
  function handleClickOutside(e: any) {
    if (!ref.current?.contains(e.target)) {
      setStateBadgeUsername((stateBadgeUsername) => true);
      setStateBadgePassword((stateBadgePassword) => true);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  });

  //   username password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // login fail
  const [stateloginWarning, setStateLoginWarning] = useState(true);
  let showloginWarning = stateloginWarning ? "d-none" : "";

  const { data: session } = useSession();

  // loginSubmit
  const router = useRouter();
  async function loginSubmit(e: any) {
    e.preventDefault();
    const data: any = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    });
    if (data.ok && data.status === 200) {
      // login success
      router.push("/home");
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="login position-absolute">
        <h1 className="head">Carpool</h1>
        <form>
          <div className=" align-middle border p-5 ">
            <div className="mb-3">
              <div className={`${showBadgeUsername} mb-1 `}>
                <span className="position-absolute translate-middle badge rounded-pill input-login bg-light text-primary">
                  Username
                </span>
              </div>

              <input
                type="text"
                className="form-control "
                placeholder="Username"
                onClick={badgeUsername}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </div>
            <div className="mb-3 pt-1">
              <div className={` ${showBadgePassword}`}>
                <span className="position-absolute translate-middle badge rounded-pill input-login bg-light text-primary">
                  Password
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                onClick={badgePassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div className={`text-center pb-2 ${showloginWarning}`}>
              <h6 className="text-danger ">Login fail</h6>
            </div>
            <button
              type="submit"
              className="btn btn-primary position-absolute start-50 translate-middle-x "
              onClick={loginSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
