const app =require('./app.js');



// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/test');
  await mongoose.connect(
    "mongodb+srv://amysim:wjlRfkcGt0myt9Ri@cluster0.qrx85s2.mongodb.net/?retryWrites=true&w=majority"
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




}
