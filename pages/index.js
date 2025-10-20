import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const handlePassword = () => {
    // 🔐 Ganti value di bawah sesuai password yang kamu mau
    const correctPassword = "kayzenstoreoffc"; // <- Bisa diubah bro!
    if (password === correctPassword) {
      setAccessGranted(true);
      setMessage("");
    } else {
      setMessage("Kata sandi salah!");
    }
  };

  const addUser = async () => {
    if (!number) return setMessage("Masukkan nomor dulu bro!");

    const res = await fetch("/api/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">🔐 Kayzen Auth System</h1>
        <input
          type="password"
          placeholder="Masukkan kata sandi..."
          className="p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handlePassword}
          className="mt-4 px-4 py-2 bg-blue-500 rounded"
        >
          Masuk
        </button>
        {message && <p className="mt-4 text-red-400">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🧩 Tambahkan Nomor</h1>
      <input
        type="text"
        placeholder="Masukkan nomor (tanpa +)"
        className="p-2 rounded text-black"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button
        onClick={addUser}
        className="mt-4 px-4 py-2 bg-green-500 rounded"
      >
        Tambahkan
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
