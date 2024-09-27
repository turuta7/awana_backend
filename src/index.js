const { app, PORT } = require("./server");
const { startDB, mongoose } = require("./db");

const main = async () => {
  try {
    const connectDB = await startDB();
    console.log(connectDB);
    connectDB &&
      app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
      });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
