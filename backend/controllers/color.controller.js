const colorModel = require('../models/color.model');

const colorController = {
  async getColor(req, res) {
    const { id } = req.params;
    let getColor = null;
    try {
      if (id) {
        getColor = await colorModel.findById(id);
      } else {
        getColor = await colorModel.find();
      }
      return res.status(201).json({ msg: "Color get successful...", success: true, getColor });
    } catch (error) {
      return res.status(501).json({ msg: "Internal Server error", success: false });
    }
  },
  async createColor(req, res) {
    const { name, slug, hexacode, status } = req.body;
    if (!name || !slug || !hexacode) {
      return res.status(301).json({ msg: "All Flieds Are Required...", success: false });
    }
    try {
      const existing = await colorModel.findOne({ name });
      if (existing) {
        res.status(301).json({ msg: "color allready define...", success: false });
      }
      const createColor = await colorModel.create({
        name,
        slug,
        hexacode,
        status
      });
      createColor.save()
      return res.status(201).json({ msg: "Color Create successful...", success: true });
    } catch (error) {
      return res.status(501).json({ msg: "Internal server error", success: false });
    }
  },
  async updateColor(req, res) {
    const { id } = req.params;
    try {
      const color = await colorModel.findById(id);
      if (!color) {
        return res.status(301).json({ msg: "color is not found...", success: false });
      }
      await colorModel.findByIdAndUpdate(id, {
        $set: { status: !color.status }
      });
      res.status(201).json({ msg: "status update successful...", success: true })
    } catch (error) {
      return res.status(501).json({ msg: "Internal Server Error...", success: false });
    }
  },
  async deleteColor(req, res) {
    const { id } = req.params;
    try {
      const existingColor = await colorModel.findById(id);
      if (!existingColor) {
        res.status(301).json({ msg: "Color not found...", success: false });
      }
      await colorModel.findByIdAndDelete(id);
      res.status(201).json({ msg: "Color Delete Successful...", success: true });
    } catch (error) {
      res.status(501).json({ msg: "Internal Server Error...", success: false });
    }
  },
  async editColor(req, res) {
    const { id } = req.params;
    const { name, slug, hexacode, status } = req.body;
    if (!name || !slug || !hexacode) {
      res.status(302).json({ msg: 'please all filed are required...', success: false });
    }
    try {
      const existing = await colorModel.findById(id);
      if (!existing) {
        res.status(301).json({ msg: "data not found...", success: false });
      }
      const update = {};
      if (name) update.name = name;
      if (slug) update.slug = slug;
      if (hexacode) update.hexacode = hexacode;
      if (status) update.status = status;
      await colorModel.updateOne(
        { _id: id },
        { $set: update }
      )
      res.status(201).json({ msg: "color is edit successful...", success: true });
    } catch (error) {
      res.status(501).json({ msg: "Internal Server Error ...", success: false });
    }
  }
}

module.exports = colorController;