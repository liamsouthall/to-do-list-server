const { MongoClient } = require("mongodb");

// const bulkAdd = () => {
//   let people = [];
//   for (i = 0; i < 777; i++) {
//     people.push({
//       email: faker.internet.email(),
//       created_at: faker.date.past()
//     });
//   }
//   return people;
// };

const getList = async () => {
  const uri =
    "mongodb+srv://lsouthall:<password>@practice-cluster-gr1lb.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    console.log("connected correctly");
    const db = client.db("toDoList");

    const response = await db
      .collection("toDo")
      .find()
      .toArray();
    return response;
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const addToDo = async toDo => {
  const uri =
    "mongodb+srv://lsouthall:<password>@practice-cluster-gr1lb.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    console.log("connected correctly");
    const db = client.db("toDoList");

    await db
      .collection("toDo")
      .insertOne({ toDo: toDo, created_at: new Date() });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
    return "Added";
  }
};

const deleteToDo = async toDo => {
  const uri =
    "mongodb+srv://lsouthall:<password>@practice-cluster-gr1lb.mongodb.net/test?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    console.log("connected correctly");
    const db = await client.db("toDoList");
    await db.collection("toDo").deleteOne({ toDo: toDo });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = {
  getList,
  addToDo,
  deleteToDo
};
