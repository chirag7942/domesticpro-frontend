import { useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getOpsToken,
  loginOps,
  setOpsToken,
} from "../../services/opsApi";
import "./ops.css";

export default function OpsLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getOpsToken()) navigate("/ops/trials", { replace: true });
  }, [navigate]);

  async function submit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await loginOps(email, password);
      setOpsToken(response.accessToken);
      navigate("/ops/trials", { replace: true });
    } catch (caught) {
      setError(
        caught.name === "AbortError"
          ? "The server took too long to respond. Try again."
          : caught.message,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="ops-login-page">
      <section className="ops-login-intro">
        <div className="ops-brand-lockup">
          <img src="/logoOnly.webp" alt="Domestic Pro" />
          <span>Domestic Pro</span>
        </div>
        <div>
          <p className="ops-kicker">OPERATIONS CONTROL</p>
          <h1>Know who is moving, and who needs help.</h1>
          <p>
            Live journey data is restricted to authorised Domestic Pro staff.
            Clients never receive this dashboard or a tracking link.
          </p>
        </div>
        <div className="ops-privacy-chip">
          <ShieldCheck size={20} />
          <span>Exact locations stay inside the operations workspace</span>
        </div>
      </section>

      <section className="ops-login-panel">
        <form className="ops-login-card" onSubmit={submit}>
          <div className="ops-login-icon"><LockKeyhole size={25} /></div>
          <p className="ops-kicker">STAFF SIGN IN</p>
          <h2>Welcome back</h2>
          <p className="ops-muted">Use your Domestic Pro operations account.</p>

          <label className="ops-field">
            <span>Email address</span>
            <input
              autoComplete="username"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label className="ops-field">
            <span>Password</span>
            <div className="ops-password-field">
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((current) => !current)}
                type="button"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </label>

          {error ? <div className="ops-form-error">{error}</div> : null}
          <button className="ops-primary-button" disabled={submitting} type="submit">
            {submitting ? "Signing in…" : "Open operations"}
          </button>
          <p className="ops-session-note">
            Sessions expire automatically. Five failed attempts temporarily lock
            the account.
          </p>
        </form>
      </section>
    </main>
  );
}
