const styles = {
    center: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" },
    card: { background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 16px #0001", minWidth: "320px" },
    form: { display: "flex", flexDirection: "column", gap: "12px", marginTop: "1rem" },
    formRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.5rem" },
    input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "15px" },
    inputSm: { padding: "8px 10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", flex: 1 },
    btn: { padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px" },
    btnSmall: { padding: "6px 14px", background: "#64748b", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" },
    btnDanger: { padding: "4px 10px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
    error: { color: "#ef4444", fontSize: "14px" },
    page: { maxWidth: "900px", margin: "0 auto", padding: "2rem" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: "14px" },
};

export default styles;