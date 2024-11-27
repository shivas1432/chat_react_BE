const Model450 = require('../models/Model450');

class Controller450 {
  async getAll(req, res) {
    try {
      const data = await Model450.findAll();
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
      const data = await Model450.findById(id);
      
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
      const newData = await Model450.create(req.body);
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

module.exports = new Controller450();
