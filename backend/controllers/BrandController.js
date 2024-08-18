const Brand = require("../models/Brand");

const BrandController = {
  createBrand: async (req, res) => {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  getBrand: async (req, res) => {
    try {
      const brands = await Brand.find();
      console.log(brands);
      return res.json(brands);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  editBrand: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;

      const brand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
      if (!brand) {
        return res.status(404).json({ msg: "Brand Not Found" });
      }
      return res.json(brand);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  deleterand: async (req, res) => {
    try {
      const id = req.params.id;
      const brand = await Brand.findOneAndDelete(id);
      if (!brand) {
        return res.status(404).json({ msg: "Brand Not Found" });
      }
      return res.json({ msg: "Brand Deleted Successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },
};

module.exports = BrandController;
