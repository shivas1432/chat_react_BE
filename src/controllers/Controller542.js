const Model542 = require('../models/Model542');

class Controller542 {
  async getAll(req, res) {
    try {
      const data = await Model542.findAll();
      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await Model542.findById(id);
      
      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Data not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const newData = await Model542.create(req.body);
      res.status(201).json({
        success: true,
        data: newData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new Controller542();
