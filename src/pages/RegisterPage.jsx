import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles";


export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await register(form.name, form.email, form.password);
            navigate("/login");
        } catch (err) {
            console.log(err);

            const msg =
                err.response?.data?.error ||
                "Error real desconocido";

            setError(msg);
        }
    }

    return (
        <div style={styles.center}>
            <div style={styles.card}>
                <h2>Crear cuenta</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input style={styles.input} placeholder="Nombre" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <input style={styles.input} type="email" placeholder="Email" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} required />
                    <input style={styles.input} type="password" placeholder="Contrase�a" value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })} required />
                    <button style={styles.btn} type="submit">Registrarse</button>
                </form>
                <p>�Ya tienes cuenta? <Link to="/login">Entra aqu�</Link></p>
            </div>
        </div>
    );
}