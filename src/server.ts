import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    // console.log(process.env.DB_URL);

    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
