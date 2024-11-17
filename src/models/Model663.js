const db = require('../config/database');

class Model663 {
  constructor() {
    this.tableName = 'table_663';
  }

  async findAll() {
    const query = 'SELECT * FROM ' + this.tableName + ' ORDER BY created_at DESC';
    return await db.query(query);
  }

  async findById(id) {
    const query = 'SELECT * FROM ' + this.tableName + ' WHERE id = ?';
    const result = await db.query(query, [id]);
    return result[0];
  }

  async create(data) {
    const query = 'INSERT INTO ' + this.tableName + ' (name, value, created_at) VALUES (?, ?, NOW())';
    const result = await db.query(query, [data.name, data.value]);
    return this.findById(result.insertId);
  }

  async update(id, data) {
    const query = 'UPDATE ' + this.tableName + ' SET name = ?, value = ?, updated_at = NOW() WHERE id = ?';
    await db.query(query, [data.name, data.value, id]);
    return this.findById(id);
  }

  async delete(id) {
    const query = 'DELETE FROM ' + this.tableName + ' WHERE id = ?';
    return await db.query(query, [id]);
  }
}

module.exports = new Model663();
