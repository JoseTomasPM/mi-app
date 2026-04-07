import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import api from "../api/axios";
import styles from "../styles";


export default function ProductsPage() {
    const { logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchProducts(); }, []);

    async function fetchProducts() {
        try {
            const { data } = await api.get("/api/products");
            setProducts(data.items);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(e) {
        e.preventDefault();
        await api.post("/api/products", {
            ...form,
            price: parseFloat(form.price),
            stock: parseInt(form.stock),
        });
        setForm({ name: "", description: "", price: "", stock: "" });
        fetchProducts();
    }

    async function handleDelete(id) {
        if (!confirm("�Eliminar este producto?")) return;
        await api.delete(`/api/products/${id}`);
        fetchProducts();
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h2>Productos</h2>
                <button style={styles.btnSmall} onClick={logout}>Cerrar sesi�n</button>
            </div>

            {/* Formulario nuevo producto */}
            <form onSubmit={handleCreate} style={styles.formRow}>
                <input style={styles.inputSm} placeholder="Nombre" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input style={styles.inputSm} placeholder="Descripci�n" value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} />
                <input style={styles.inputSm} placeholder="Precio" type="number" value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })} required />
                <input style={styles.inputSm} placeholder="Stock" type="number" value={form.stock}
                    onChange={e => setForm({ ...form, stock: e.target.value })} required />
                <button style={styles.btn} type="submit">+ A�adir</button>
            </form>

            {/* Lista de productos */}
            {loading ? <p>Cargando...</p> : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th><th>Descripci�n</th><th>Precio</th><th>Stock</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
                                <td>{p.price} �</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button style={styles.btnDanger} onClick={() => handleDelete(p.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}