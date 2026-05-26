import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/FormFields/InputField/InputField";
import { setToken } from "../../../utils/auth";
import styles from "./Login.module.scss";

interface LoginForm {
  email: string;
  password: string;
}

// Shared classNames object passed to every InputField so they all use the auth theme.
const AUTH_CX = {
  field: styles.field,
  label: styles.label,
  inputWrap: styles.inputWrap,
  input: styles.input,
  errorMsg: styles.error,
};

export default function Login() {
  const navigate = useNavigate();
  const methods = useForm<LoginForm>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  function onSubmit(_data: LoginForm) {
    const payload = {
      email: _data?.email.trim(),
      password: _data?.password.trim(),
    };
    console.log("payload", payload);

    setToken("access_token");
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Welcome back</h1>
      <p className={styles.sub}>Sign in to your admin panel</p>

      <FormProvider {...methods}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <InputField
            config={{
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "admin@example.com",
              validation: {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              },
            }}
            classNames={AUTH_CX}
          />

          <InputField
            config={{
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "••••••••",
              validation: { required: "Password is required" },
            }}
            classNames={AUTH_CX}
          />

          <div className={styles.forgotRow}>
            <Link to="/forgot-password" className={styles.link}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" className={styles.btn} disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
