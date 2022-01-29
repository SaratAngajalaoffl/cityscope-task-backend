import cors from "cors";

const config = {
  origin: process.env.CLIENT_URL || "*",
};

export const webcors = cors(config);
