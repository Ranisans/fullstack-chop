import { NextApiRequest, NextApiResponse } from "next";
import { sampleUserData } from "../../../utils/sample-data";

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  if (!Array.isArray(sampleUserData)) {
    res.status(500).json({ statusCode: 500, message: "Cannot find user data" });
  } else {
    res.status(200).json(sampleUserData);
  }
};

export default handler;
