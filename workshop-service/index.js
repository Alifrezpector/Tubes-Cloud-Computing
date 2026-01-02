app.post('/workshops', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Akses hanya untuk admin' });
  }

  const { title, quota } = req.body;

  db.query(
    'INSERT INTO workshops (title, quota, owner_id) VALUES (?, ?, ?)',
    [title, quota, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal menambah workshop' });
      }

      res.status(201).json({
        message: 'Workshop berhasil dibuat',
        id: result.insertId
      });
    }
  );
});
