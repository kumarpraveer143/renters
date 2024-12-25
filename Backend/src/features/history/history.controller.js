import HistoryRepository from "./history.repository.js";

class HistoryController {
  constructor() {
    this.historyRepository = new HistoryRepository();
  }

  async createHistory(req, res) {
    const { relationId } = req.params;
    const historyObj = req.body;
    historyObj.relationId = relationId;
    try {
      const history = await this.historyRepository.createHistory(historyObj);
      return res.status(200).json({ success: true, history });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getRenterHistory(req, res) {
    const { relationId } = req.params;
    try {
      const history = await this.historyRepository.getRenterHistory(relationId);
      return res.status(200).json({ success: true, history: history });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async updateHistory(req, res) {
    let { historyId } = req.params;
  }
}

export default HistoryController;
