import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/FormFields/InputField/InputField";
import CountrySelect from "../../../components/CountrySelect/CountrySelect";
import { setToken } from "../../../utils/auth";
import AuthService from "../../../services/api/auth";
import { useDefaultCountryCode } from "../../../hooks/useDefaultCountryCode";
import styles from "./Login.module.scss";

interface LoginForm {
  phone_number: string;
  password: string;
}

const AUTH_CX = {
  field: styles.field,
  label: styles.label,
  inputWrap: styles.inputWrap,
  input: styles.input,
  errorMsg: styles.error,
};

export default function Login() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useDefaultCountryCode("IN");

  const methods = useForm<LoginForm>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  async function onSubmit(data: LoginForm) {
    const res = await AuthService.login({
      whatsapp_number: `${Number(selectedCountry.data.code)}${data.phone_number.trim()}`,
      password: data.password.trim(),
      role: "admin",
    });

    if (res?.success) {
      setToken(res.access_token);
      navigate("/dashboard", { replace: true });
    }
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
          {/* ── WhatsApp Number ── */}
          <div className={styles.phoneField}>
            <label className={styles.label}>WhatsApp Number</label>
            <div className={styles.phoneGroup}>
              <CountrySelect
                value={selectedCountry}
                onChange={setSelectedCountry}
                theme="dark"
              />

              <div className={styles.phoneDivider} />

              <input
                {...register("phone_number", {
                  required: "WhatsApp number is required",
                  pattern: {
                    value: /^\d{6,15}$/,
                    message: "Enter digits only (6–15 numbers)",
                  },
                })}
                type="tel"
                inputMode="numeric"
                className={styles.phoneInput}
                placeholder="mobile number"
              />
            </div>
            {errors.phone_number && (
              <span className={styles.error}>
                {errors.phone_number.message}
              </span>
            )}
          </div>

          {/* ── Password ── */}
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
