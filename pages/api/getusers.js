import fs from "fs-extra";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "users.json");

  try {
    const users = await fs.readJSON(filePath);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Gagal membaca database!" });
  }
}
