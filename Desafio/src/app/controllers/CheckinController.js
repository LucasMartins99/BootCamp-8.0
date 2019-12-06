import * as Yup from "yup";
import Checkin from "../models/Checkin";
import { isBefore, subDays, format } from "date-fns";

class CheckinController {
  async store(req, res) {
    const now = new Date();
    const dateFinal = subDays(now, 5);

    const count = await Checkin.findAndCountAll({
      where: { 
        start: {
          between: [now, dateFinal]
        }
      }
    });

  

 

    return res.json(count);
  }
}

export default new CheckinController();
