import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";

// ─── INITIAL STATE ─────────────────────────────────────
const INIT = {
    Name: "",
    Phone: "",
    Address: "",
};

// ─── STYLES (MATCHING YOUR MAIN FORM UI) ───────────────
const s = {
    page: {
        minHeight: "100vh",
        background: "#F5F5F5",
        padding: "24px 16px 48px",
        fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    card: {
        maxWidth: "40rem",
        margin: "0 auto",
        background: "#fff",
        borderRadius: 4,
        border: "1px solid #ddd",
        overflow: "hidden",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
        borderBottom: "2px solid #EC5F36",
        background: "#fff",
    },
    logoBox: {
        width: "6.5rem",
        height: 64,
        background: "#ffffff",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    headerTitle: { fontSize: 20, fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 },
    headerSub: { fontSize: 12, color: "#777", marginTop: 3 },

    title: {
        fontSize: 20,
        fontWeight: 700,
        color: "#111",
        margin: 0,
    },
    sub: {
        fontSize: 12,
        color: "#777",
        marginTop: 4,
    },
    body: {
        padding: "24px",
    },
    field: {
        marginBottom: 16,
    },
    label: {
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 5,
        color: "#333",
    },
    req: {
        color: "#EC5F36",
        marginLeft: 2,
    },
    input: {
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: 3,
        padding: "8px 10px",
        fontSize: 14,
        outline: "none",
    },
    textarea: {
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: 3,
        padding: "8px 10px",
        fontSize: 14,
        minHeight: 80,
        resize: "vertical",
        outline: "none",
    },
    phoneWrap: {
        display: "flex",
    },
    phonePrefix: {
        background: "#f4f4f4",
        border: "1px solid #ccc",
        borderRight: "none",
        borderRadius: "3px 0 0 3px",
        padding: "8px 10px",
        fontSize: 14,
        color: "#555",
        display: "flex",
        alignItems: "center",
    },
    phoneInput: {
        flex: 1,
        border: "1px solid #ccc",
        borderRadius: "0 3px 3px 0",
        padding: "8px 10px",
        fontSize: 14,
        outline: "none",
    },
    errText: {
        fontSize: 11,
        color: "#c00",
        marginTop: 4,
    },
    btn: {
        width: "100%",
        padding: "11px",
        background: "#EC5F36",
        color: "#fff",
        border: "none",
        borderRadius: 3,
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        marginTop: 10,
    },
    btnDisabled: {
        width: "100%",
        padding: "11px",
        background: "#ddd",
        color: "#999",
        border: "none",
        borderRadius: 3,
        fontSize: 15,
        fontWeight: 700,
        cursor: "not-allowed",
        marginTop: 10,
    },
    success: {
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: 3,
        padding: "12px",
        marginTop: 12,
        color: "#166534",
        fontWeight: 600,
        fontSize: 13,
    },
    error: {
        background: "#fff5f5",
        border: "1px solid #fecaca",
        borderRadius: 3,
        padding: "12px",
        marginTop: 12,
        color: "#991b1b",
        fontWeight: 600,
        fontSize: 13,
    },
};

// ─── COMPONENT ─────────────────────────────────────────
export default function AgentForm() {
    const [form, setForm] = useState(INIT);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState("");
    const navigate = useNavigate();

    const setF = (k, v) => {
        setForm((prev) => ({ ...prev, [k]: v }));
        if (errors[k]) {
            const copy = { ...errors };
            delete copy[k];
            setErrors(copy);
        }
    };

    function buildZohoFields(f) {
        return {
            Full_Name: f.Name,
            Mobile_Number: f.Phone,
            Address: f.Address,
            Status: f.Status
        };
    }

    // ─── VALIDATION ─────────────────────────────────────
    const validate = () => {
        const e = {};

        if (!form.Name.trim()) e.Name = "Name is required";

        if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone)) {
            e.Phone = "Enter valid 10-digit Indian mobile number";
        }

        if (!form.Address.trim()) e.Address = "Address is required";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // ─── SUBMIT ─────────────────────────────────────────
    const handleSubmit = async () => {
        if (!validate()) return;

        setSubmitting(true);
        setStatus(null);

        try {
            const zohoFields = buildZohoFields({
                ...form,
                Status: "Active"
            });
            await axios.post(`${API_BASE}/agent-submit`, { zohoFields });
            setForm(INIT);
            navigate("/thank-you", { state: { fromForm: "agent" } });
        } catch (err) {
            setStatus("error");
            setStatusMsg(
                err?.response?.data?.error ||
                "Something went wrong. Please try again."
            );
        }

        setSubmitting(false);
    };

    return (
        <>
            <SEO title="Agent Form" description="" noIndex={true} />
            <div style={s.page}>
                <div style={s.card}>

                    {/* Header */}
                    <div style={s.header}>
                        <div style={s.logoBox}>
                            <img src="./logoOnly.webp" alt="Domestic Pro logo" />
                        </div>
                        <div>
                            <p style={s.headerTitle}>Agent Registration Form</p>
                            <p style={s.headerSub}>Submit your details to supply helpers with DomesticPro.</p>
                        </div>
                    </div>

                    {/* Body */}
                    <div style={s.body}>

                        {/* Name */}
                        <div style={s.field}>
                            <label style={s.label}>
                                Full Name <span style={s.req}>*</span>
                            </label>
                            <input
                                type="text"
                                value={form.Name}
                                onChange={(e) => setF("Name", e.target.value)}
                                placeholder="Enter your name"
                                style={s.input}
                            />
                            {errors.Name && <div style={s.errText}>{errors.Name}</div>}
                        </div>

                        {/* Phone */}
                        <div style={s.field}>
                            <label style={s.label}>
                                Phone Number <span style={s.req}>*</span>
                            </label>
                            <div style={s.phoneWrap}>
                                <span style={s.phonePrefix}>+91</span>
                                <input
                                    type="tel"
                                    value={form.Phone}
                                    onChange={(e) =>
                                        setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                                    }
                                    placeholder="9876543210"
                                    style={s.phoneInput}
                                />
                            </div>
                            {errors.Phone && <div style={s.errText}>{errors.Phone}</div>}
                        </div>

                        {/* Address */}
                        <div style={s.field}>
                            <label style={s.label}>
                                Address <span style={s.req}>*</span>
                            </label>
                            <textarea
                                value={form.Address}
                                onChange={(e) => setF("Address", e.target.value)}
                                placeholder="Enter your address"
                                style={s.textarea}
                            />
                            {errors.Address && <div style={s.errText}>{errors.Address}</div>}
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={submitting ? s.btnDisabled : s.btn}
                        >
                            {submitting ? "Submitting..." : "Submit Details →"}
                        </button>

                        {/* Status */}
                        {status === "success" && (
                            <div style={s.success}>{statusMsg}</div>
                        )}
                        {status === "error" && (
                            <div style={s.error}>{statusMsg}</div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}