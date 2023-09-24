
import { questions } from "./data/questions";

export default function handler(req, res) {
  res.status(200).json(questions)
}



