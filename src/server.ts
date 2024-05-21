import mongoose from 'mongoose';
import app from './app';

async function main() {
  await mongoose.connect(
    'mongodb+srv://ecommerce:Sx4nUNpOJtbz1GEz@atlascluster.j32tjfb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
  );

  const port = 5000;

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

main();
