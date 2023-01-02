import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "../components/loading";

function Login() {
  // bageUsername
  const [stateBadgeUsername, setStateBadgeUsername] = useState(true);
  let showBadgeUsername = stateBadgeUsername ? "d-none" : "";
  const [statePlaceholderUsername, setStatePlaceholderUsername] =
    useState(true);
  let showPlaceholderUsername = statePlaceholderUsername ? "Username" : "";

  function badgeUsername() {
    setStateBadgeUsername((stateBadgeUsername) => false);
    setStatePlaceholderUsername((statePlaceholderUsername) => false);
  }
  // bagePassword
  const [stateBadgePassword, setStateBadgePassword] = useState(true);
  let showBadgePassword = stateBadgePassword ? "d-none" : "";
  const [statePlaceholderPassword, setStatePlaceholderPassword] =
    useState(true);
  let showPlaceholderPassword = statePlaceholderPassword ? "Password" : "";
  function badgePassword() {
    setStateBadgePassword((stateBadgePassword) => false);
    setStatePlaceholderPassword((statePlaceholderPassword) => false);
  }

  // ref clickout
  const ref = useRef<HTMLHeadingElement>(null);
  function handleClickOutside(e: any) {
    if (!ref.current?.contains(e.target)) {
      setStateBadgeUsername((stateBadgeUsername) => true);
      setStateBadgePassword((stateBadgePassword) => true);
      setStatePlaceholderUsername((statePlaceholderUsername) => true);
      setStatePlaceholderPassword((statePlaceholderPassword) => true);
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

  // loginSubmit
  const router = useRouter();
  async function loginSubmit(e: any) {
    e.preventDefault();
    const res: any = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    });
    if (res.ok && !res.error) {
      // login success
      router.push("/home");
    } else {
      setStateLoginWarning(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        {/* <meta charSet="UTF-8" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </Head>
      <div className="login position-absolute">
        <h1 className="head">RIDESHARE</h1>
        <form>
          <div className=" align-middle border p-5 ">
            <div className="mb-3">
              <div className={`${showBadgeUsername}`}>
                <span className="position-absolute translate-middle badge rounded-pill input-login bg-light text-primary">
                  Username
                </span>
              </div>

              <input
                type="text"
                className="form-control "
                placeholder={`${showPlaceholderUsername}`}
                onClick={badgeUsername}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </div>
            <div className="mb-3 pt-1">
              <div className={showBadgePassword}>
                <span className="position-absolute translate-middle badge rounded-pill input-login bg-light text-primary">
                  Password
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder={showPlaceholderPassword}
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
