const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// const MongoClient = require('mongodb').MongoClient;
// const uri =
//   'mongodb+srv://bleumont:<password>@cluster0.3xzkv.mongodb.net/<dbname>?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

//Set up default mongoose connection
var mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.3xzkv.mongodb.net/locallibrary?retryWrites=true&w=majority`;
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Definir el esquema
const Schema = mongoose.Schema;

let LlModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

// Compilar el modelo de esquema
let SomeModel = mongoose.model('SomeModel', LlModelSchema);

// Tipos de campos del esquema
// var schema = new Schema({
//   name: String,
//   binary: Buffer,
//   living: Boolean,
//   updated: { type: Date, default: Date.now },
//   age: { type: Number, min: 18, max: 65, required: true },
//   mixed: Schema.Types.Mixed,
//   _someId: Schema.Types.ObjectId,
//   array: [],
//   ofString: [String], // You can also have an array of each of the other types too.
//   nested: { stuff: { type: String, lowercase: true, trim: true } },
// });
