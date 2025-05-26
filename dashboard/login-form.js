import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Spinner from "@/icons/spinner";
import classes from './login-form.module.css';
import Link from 'next/link';

const LoginForm = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [waitMsg, setWaitMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function toggleShowPassword() {
    setShow(!show);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Reset errors and show loading UI
    setEmailErr('');
    setPassErr('');
    setWaitMsg('Hold on for a few seconds...');
    setLoading(true);

    if (enteredEmail.length < 7) {
      setEmailErr('Email length must be greater than 7');
      setLoading(false);
      return;
    }

    const validPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    if (!validPassword.test(enteredPassword)) {
      setPassErr('Password must contain letters and numbers');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: enteredEmail,
        password: enteredPassword,
      });

      if (!result.ok) {
        throw new Error("Invalid Username or Password");
      }

      router.push("/newProduct");
    } catch (error) {
      setEmailErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={classes.section}>
      <h2>Admin Login</h2>
      <div className={classes.card}>
        <div className={classes.figure}>
          <img
            src="https://media.istockphoto.com/id/1257998329/vector/young-afro-american-man-sitting-on-the-chair-at-home-interior-and-working-with-laptop-vector.jpg?s=612x612&w=0&k=20&c=HHHYOCX39w0GCoyqRTfOorDBkLxPT2DhLzN8_B1bAv4="
            alt="cartoon on laptop"
          />
        </div>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.control}>
            {loading && <Spinner />}
            <h3>{waitMsg}</h3>
            <label htmlFor="email">Email</label>
            <input
              type='email'
              required
              id="email"
              name="username"
              ref={emailInputRef}
            />
            {emailErr && <div className={classes.error}>{emailErr}</div>}
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type={show ? "text" : "password"}
              required
              id="password"
              name="password"
              ref={passwordInputRef}
            />
            <div className={classes.span}>
              <span onClick={toggleShowPassword} className={classes.actions}>
                {show ? "Hide" : "Show"}
              </span>
            </div>
            {passErr && <div className={classes.error}>{passErr}</div>}
          </div>

          <div className={classes.actions}>
            <button type="submit">Login</button>
          </div>

          <p>Forgot Password?</p><br /><br />
          <p>You do not have an Account? <Link href='/admin-registration' target='_blank'>Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
