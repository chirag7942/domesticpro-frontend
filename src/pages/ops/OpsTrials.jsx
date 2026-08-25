import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  Clock3,
  Copy,
  LocateFixed,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  clearOpsToken,
  getOpsToken,
  loadOpsAccount,
  loadOpsTrials,
  logoutOps,
} from "../../services/opsApi";
import "./ops.css";

function ageLabel(seconds) {
  if (seconds === null || seconds === undefined) return "No location yet";
  if (seconds < 10) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

function dateTime(value) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status) {
  if (status === "en_route") return "On the way";
  if (status === "ready") return "Coordinator notified";
  return "Reached";
}

export default function OpsTrials() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [journeys, setJourneys] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const leave = useCallback(() => {
    clearOpsToken();
    navigate("/ops/login", { replace: true });
  }, [navigate]);

  const refresh = useCallback(async ({ quiet = false } = {}) => {
    const token = getOpsToken();
    if (!token) return leave();
    if (!quiet) setRefreshing(true);
    try {
      const response = await loadOpsTrials(token);
      setJourneys(response.journeys);
      setError("");
    } catch (caught) {
      if (caught.status === 401) return leave();
      setError(caught.message || "Live journeys could not be loaded");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [leave]);

  useEffect(() => {
    const token = getOpsToken();
    if (!token) {
      leave();
      return undefined;
    }
    void Promise.all([loadOpsAccount(token), loadOpsTrials(token)])
      .then(([accountResponse, trialResponse]) => {
        setAccount(accountResponse.account);
        setJourneys(trialResponse.journeys);
      })
      .catch((caught) => {
        if (caught.status === 401) leave();
        else setError(caught.message || "Operations could not be loaded");
      })
      .finally(() => setLoading(false));

    const timer = window.setInterval(() => void refresh({ quiet: true }), 15_000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") void refresh({ quiet: true });
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [leave, refresh]);

  const filteredJourneys = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return journeys;
    return journeys.filter((journey) =>
      [
        journey.reference,
        journey.helper.name,
        journey.helper.phone,
        journey.client.name,
        journey.client.city,
      ].some((value) => String(value || "").toLowerCase().includes(needle)),
    );
  }, [journeys, query]);

  const summary = useMemo(() => ({
    active: journeys.filter((item) => item.journeyStatus === "en_route").length,
    stale: journeys.filter((item) => item.tracking.stale).length,
    waiting: journeys.filter((item) => item.journeyStatus === "ready").length,
  }), [journeys]);

  async function copyLocation(journey) {
    if (!journey.location) return;
    await navigator.clipboard.writeText(
      `${journey.location.latitude.toFixed(6)}, ${journey.location.longitude.toFixed(6)}`,
    );
    setCopiedId(journey.id);
    window.setTimeout(() => setCopiedId(""), 1800);
  }

  async function signOut() {
    const token = getOpsToken();
    try {
      if (token) await logoutOps(token);
    } finally {
      leave();
    }
  }

  return (
    <main className="ops-dashboard">
      <header className="ops-topbar">
        <div className="ops-brand-lockup ops-brand-dark">
          <img src="/logoOnly.webp" alt="Domestic Pro" />
          <div><strong>Domestic Pro</strong><span>Journey operations</span></div>
        </div>
        <div className="ops-account-area">
          <div className="ops-account-copy">
            <strong>{account?.fullName || "Operations"}</strong>
            <span>{account?.role || "staff"}</span>
          </div>
          <button className="ops-icon-button" onClick={() => void signOut()} title="Sign out">
            <LogOut size={19} />
          </button>
        </div>
      </header>

      <section className="ops-dashboard-content">
        <div className="ops-heading-row">
          <div>
            <p className="ops-kicker">LIVE CONTROL ROOM</p>
            <h1>Today’s helper journeys</h1>
            <p>Private operational visibility. Updates refresh every 15 seconds.</p>
          </div>
          <div className="ops-private-badge"><ShieldCheck size={18} /> Domestic Pro only</div>
        </div>

        <div className="ops-stat-grid">
          <article><LocateFixed /><div><strong>{summary.active}</strong><span>On the way</span></div></article>
          <article><Clock3 /><div><strong>{summary.waiting}</strong><span>Awaiting confirmation</span></div></article>
          <article className={summary.stale ? "ops-stat-alert" : ""}><TriangleAlert /><div><strong>{summary.stale}</strong><span>Need attention</span></div></article>
        </div>

        <div className="ops-toolbar">
          <label className="ops-search">
            <Search size={18} />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search helper, phone, client or city"
              value={query}
            />
          </label>
          <button className="ops-secondary-button" disabled={refreshing} onClick={() => void refresh()}>
            <RefreshCw className={refreshing ? "ops-spin" : ""} size={17} />
            {refreshing ? "Refreshing" : "Refresh now"}
          </button>
        </div>

        {error ? <div className="ops-page-error"><TriangleAlert size={19} />{error}</div> : null}
        {loading ? <div className="ops-empty-state">Loading private journey data…</div> : null}
        {!loading && !filteredJourneys.length ? (
          <div className="ops-empty-state">
            <Check size={24} />
            <strong>No matching active journeys</strong>
            <span>Ready, on-the-way and recently reached trials appear here.</span>
          </div>
        ) : null}

        <div className="ops-journey-grid">
          {filteredJourneys.map((journey) => (
            <article className={`ops-journey-card ${journey.tracking.stale ? "is-stale" : ""}`} key={journey.id}>
              <div className="ops-card-topline">
                <span className={`ops-status status-${journey.journeyStatus}`}>
                  <i />{statusLabel(journey.journeyStatus)}
                </span>
                <span className="ops-reference">{journey.reference}</span>
              </div>

              <div className="ops-helper-row">
                <div className="ops-avatar"><UserRound size={22} /></div>
                <div><h2>{journey.helper.name || "Unnamed helper"}</h2><p>{journey.helper.phone || "No phone"}</p></div>
              </div>

              <div className="ops-route-block">
                <div><span>Trial</span><strong>{dateTime(journey.scheduledAt)}</strong></div>
                <div><span>Destination</span><strong>{journey.client.name || "Client"}</strong><small>{journey.client.address || journey.client.city || "Address pending"}</small></div>
              </div>

              <div className={`ops-location-block ${journey.tracking.stale ? "is-stale" : ""}`}>
                <div className="ops-location-heading">
                  <span><LocateFixed size={17} /> Exact helper location</span>
                  <strong>{ageLabel(journey.tracking.locationAgeSeconds)}</strong>
                </div>
                {journey.location ? (
                  <>
                    <code>{journey.location.latitude.toFixed(6)}, {journey.location.longitude.toFixed(6)}</code>
                    <div className="ops-location-meta">
                      <span>Accuracy ±{Math.round(journey.location.accuracyMeters || 0)} m</span>
                      <button onClick={() => void copyLocation(journey)}>
                        {copiedId === journey.id ? <Check size={15} /> : <Copy size={15} />}
                        {copiedId === journey.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </>
                ) : (
                  <p>{journey.journeyStatus === "ready" ? "GPS starts after departure confirmation." : "Waiting for the first GPS point."}</p>
                )}
              </div>

              {journey.tracking.stale ? (
                <div className="ops-attention"><TriangleAlert size={17} /> Contact the helper and check mobile data or location permission.</div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
