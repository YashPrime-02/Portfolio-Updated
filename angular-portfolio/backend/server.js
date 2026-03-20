const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

/* ================= AUTH ================= */

app.post("/admin/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({
      success: true,
      token: process.env.ADMIN_TOKEN || "admin-secret-token",
    });
  }

  res.status(401).json({ success: false, message: "Invalid password" });
});

const verifyAdmin = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.status(403).json({ error: "Unauthorized" });

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (token !== (process.env.ADMIN_TOKEN || "admin-secret-token")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
};

/* ================= PROJECTS ================= */

app.get("/projects", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.post("/projects", verifyAdmin, async (req, res) => {
  try {
    const { title, description, imageUrl, projectUrl, workedUnder } = req.body;

    await pool.query(
      `INSERT INTO projects 
      (title, description, imageurl, projecturl, workedunder)
      VALUES ($1,$2,$3,$4,$5)`,
      [title, description, imageUrl, projectUrl, workedUnder]
    );

    res.json({ message: "Project added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add project" });
  }
});

app.put("/projects/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, projectUrl, workedUnder } = req.body;

    await pool.query(
      `UPDATE projects 
       SET title=$1, description=$2, imageurl=$3, projecturl=$4, workedunder=$5
       WHERE id=$6`,
      [title, description, imageUrl, projectUrl, workedUnder, id]
    );

    res.json({ message: "Project updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

app.delete("/projects/:id", verifyAdmin, async (req, res) => {
  try {
    await pool.query("DELETE FROM projects WHERE id=$1", [req.params.id]);
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

/* ================= TESTIMONIALS ================= */

app.get("/testimonials", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM testimonials ORDER BY id DESC"
    );

    // ✅ FIX: normalize keys + filter bad data
    const cleaned = result.rows
      .filter(t => t.name && t.message)
      .map(t => ({
        id: t.id,
        name: t.name,
        message: t.message,
        image: t.image,
        linkedinUrl: t.linkedinurl
      }));

    res.json(cleaned);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

app.post("/testimonials", verifyAdmin, async (req, res) => {
  try {
    const { name, message, image, linkedinUrl } = req.body;

    await pool.query(
      `INSERT INTO testimonials 
      (name, message, image, linkedinurl)
      VALUES ($1,$2,$3,$4)`,
      [name, message, image, linkedinUrl]
    );

    res.json({ message: "Testimonial added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add testimonial" });
  }
});

app.put("/testimonials/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message, image, linkedinUrl } = req.body;

    await pool.query(
      `UPDATE testimonials 
       SET name=$1, message=$2, image=$3, linkedinurl=$4
       WHERE id=$5`,
      [name, message, image, linkedinUrl, id]
    );

    res.json({ message: "Testimonial updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

app.delete("/testimonials/:id", verifyAdmin, async (req, res) => {
  try {
    await pool.query("DELETE FROM testimonials WHERE id=$1", [req.params.id]);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

/* ================= SETTINGS ================= */

app.get("/settings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM settings LIMIT 1"
    );

    const row = result.rows[0];

    // ✅ FIX: normalize response
    res.json({
      resumeUrl: row?.resumeurl || ""
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.post("/settings", verifyAdmin, async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    await pool.query(`
      INSERT INTO settings (id, resumeurl)
      VALUES (1, $1)
      ON CONFLICT (id)
      DO UPDATE SET resumeurl = EXCLUDED.resumeurl
    `, [resumeUrl]);

    res.json({ message: "Settings updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

/* ================= HEALTH CHECK ================= */

app.get("/ping", async (req, res) => {
  try {
    await pool.query("SELECT 1"); // keeps DB awake too

    res.status(200).json({
      status: "ok",
      db: "connected",
      time: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      db: "failed"
    });
  }
});

/* ================= SERVER ================= */

(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to Neon DB");
    client.release();
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});