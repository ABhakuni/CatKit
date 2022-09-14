import 'dotenv/config';

import { PORT } from "./config.js";
import app from "./app.js";
import { connectToDB } from "./utils/mongoUtil.js";

export default function main() {
  connectToDB();
  app.listen(PORT);
  console.log("Server started on port", PORT);
}

main();
