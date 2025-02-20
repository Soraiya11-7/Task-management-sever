require("dotenv").config();
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow any origin, adjust as needed
    methods: ["GET", "POST"]
  }
});

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uoi62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //all collections............................
    const userCollection = client.db("taskManagement").collection("users");
    const taskCollection = client.db("taskManagement").collection("tasks");


//task related.......................................................

    // app.get('/tasks', async (req, res) => {
    //   const result = await taskCollection.find().toArray();
    //   res.send(result);
    // });

    app.delete('/tasks/:id',async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) }
      // console.log(query);
      const result = await taskCollection.deleteOne(query);
      res.send(result);
       // Emit an event when task is deleted
       io.emit('taskDeleted', { taskId: id });
    })

    app.put('/tasks/:id',async (req, res) => {
      const allTasks = req.body
      const  id  = req.params.id; 
      const query = { _id: new ObjectId(id) }; 
      const update = {
        $set: {
          title: allTasks.title,
          category: allTasks.category,
          description: allTasks.description,
        }
      }
      const result = await taskCollection.updateOne(query, update);
      res.send(result);

      io.emit('taskUpdated', { taskId: id, updatedTask: allTasks });
    });

    app.get('/tasks/:email', async (req, res) => {
      const { email } = req.params;
      const query = {userEmail: email };
      console.log(query)
      const result = await taskCollection.find(query).toArray();
      console.log(result)
      res.send(result);
    })

//create task......
    app.post('/tasks', async (req, res) => {
      const item = req.body;
      const result = await taskCollection.insertOne(item);
      res.send(result);

        // Emit an event when a new task is created
        io.emit('taskCreated', { task: item });
    });


    //users related api....................................................
    // app.get('/users', async (req, res) => {
    //   const result = await userCollection.find().toArray();
    //   res.send(result);
    // });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'user already exists', insertedId: null })
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });



    // //     app.get('/users/:email',  async (req, res) => {
    // //       const email = req.params.email;
    // //       const query = { email: email };
    // //       const user = await userCollection.findOne(query);
    // //       res.send(user);
    // //     })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


//Socket.IO event listener for new connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for events from the client
  socket.on('taskAdded', (task) => {
    console.log('New task added:', task);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



app.get('/', (req, res) => {
  res.send("server is running...");
})

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
})