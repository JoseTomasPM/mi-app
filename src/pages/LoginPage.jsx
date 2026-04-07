import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles";


export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await login(form.email, form.password);
            navigate("/products");
        } catch {
            setError("Email o contrase�a incorrectos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.center}>
            <div style={styles.card}>
                <h2>Iniciar sesi�n</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Contrase�a"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <button style={styles.btn} type="submit" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <p>�No tienes cuenta? <Link to="/register">Reg�strate</Link></p>
            </div>
        </div>
    );
}