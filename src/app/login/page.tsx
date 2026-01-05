"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/types/auth";

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation simulation
    if (!form.email || !form.password) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    console.warn("Login simulado:", form);
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 border p-6 rounded"
      >
        <h1 className="text-xl font-semibold">Iniciar sesión</h1>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full text-center text-sm text-gray-600 hover:text-black underline transition"
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </form>
    </main>
  );
}
