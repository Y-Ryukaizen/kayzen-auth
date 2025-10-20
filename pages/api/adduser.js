import fs from "fs-extra";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { number } = req.body;
  if (!number)
    return res.status(400).json({ message: "Nomor tidak boleh kosong!" });

  const filePath = path.join(process.cwd(), "data", "users.json");
  let users = [];

  try {
    users = await fs.readJSON(filePath);
  } catch (err) {
    users = [];
  }

  // Cek apakah nomor sudah ada
  if (users.find((u) => u.number === number)) {
    return res.status(400).json({ message: "Nomor sudah terdaftar!" });
  }

  // Tambah ke list user
  users.push({ number, date: new Date().toISOString() });

  await fs.writeJSON(filePath, users, { spaces: 2 });

  res.status(200).json({ message: "Nomor berhasil ditambahkan!", users });
}
