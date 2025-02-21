// require("dotenv").config();
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const port = process.env.PORT || 5000;



// //middleware
// app.use(cors());
// app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uoi62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     //all collections............................
//     const userCollection = client.db("taskManagement").collection("users");
//     const taskCollection = client.db("taskManagement").collection("tasks");


// //task related.......................................................

//     // app.get('/tasks', async (req, res) => {
//     //   const result = await taskCollection.find().toArray();
//     //   res.send(result);
//     // });

//     app.delete('/tasks/:id',async (req, res) => {
//       const id = req.params.id;
//       // console.log(id);
//       const query = { _id: new ObjectId(id) }
//       // console.log(query);
//       const result = await taskCollection.deleteOne(query);
//       res.send(result);

//     })

    

//     app.put('/tasks/:id',async (req, res) => {
//       const allTasks = req.body
//       const  id  = req.params.id; 
//       const query = { _id: new ObjectId(id) }; 
//       const update = {
//         $set: {
//           title: allTasks.title,
//           category: allTasks.category,
//           description: allTasks.description,
//         }
//       }
//       const result = await taskCollection.updateOne(query, update);
//       res.send(result);

//     });

//     app.get('/tasks/:email', async (req, res) => {
//       const { email } = req.params;
//       const query = {userEmail: email };
//       console.log(query)
//       const result = await taskCollection.find(query).toArray();
//       console.log(result)
//       res.send(result);
//     })

// //create task......
//     app.post('/tasks', async (req, res) => {
//       const item = req.body;
//       const result = await taskCollection.insertOne(item);
//       res.send(result);

//     });


//     //users related api....................................................
//     // app.get('/users', async (req, res) => {
//     //   const result = await userCollection.find().toArray();
//     //   res.send(result);
//     // });

//     app.post('/users', async (req, res) => {
//       const user = req.body;
//       const query = { email: user.email }
//       const existingUser = await userCollection.findOne(query);

//       if (existingUser) {
//         return res.send({ message: 'user already exists', insertedId: null })
//       }
//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });



//     // //     app.get('/users/:email',  async (req, res) => {
//     // //       const email = req.params.email;
//     // //       const query = { email: email };
//     // //       const user = await userCollection.findOne(query);
//     // //       res.send(user);
//     // //     })

//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);






// app.get('/', (req, res) => {
//   res.send("server is running...");
// })

// app.listen(port, () => {
//   console.log(`server is running on port : ${port}`);
// })





//.........................................
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uoi62.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // All collections
    const userCollection = client.db("taskManagement").collection("users");
    const taskCollection = client.db("taskManagement").collection("tasks");

    // Task-related APIs
    // Get tasks for a specific user, sorted by category and order
    app.get("/tasks/:email", async (req, res) => {
      const { email } = req.params;
      const query = { userEmail: email };
      const tasks = await taskCollection.find(query).toArray();

      // Sort tasks by category and order
      const sortedTasks = tasks.sort((a, b) => a.order - b.order);
      res.send(sortedTasks);
    });

    // Create a new task
    app.post("/tasks", async (req, res) => {
      const task = req.body;

      // Set initial order (last in the category)
      const lastTaskInCategory = await taskCollection
        .find({ category: task.category })
        .sort({ order: -1 })
        .limit(1)
        .toArray();

      task.order = lastTaskInCategory.length > 0 ? lastTaskInCategory[0].order + 1 : 0;

      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    // Update a task (e.g., title, description, category, or order)
    app.put("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTask = req.body;
      console.log(updatedTask);
      const query = { _id: new ObjectId(id) };
      console.log(query);

      const update = {
        $set: {
          title: updatedTask.title,
          description: updatedTask.description,
          category: updatedTask.category,
          order: updatedTask.order,
        },
      };

      const result = await taskCollection.updateOne(query, update);
      console.log(result);
      res.send(result);
    });

    // Delete a task
    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    // Reorder tasks within a category or across categories
    // app.post("/tasks/reorder", async (req, res) => {
    //   const { sourceCategory, destinationCategory, sourceIndex, destinationIndex, taskId } = req.body;

    //   // Find the task being moved
    //   const task = await taskCollection.findOne({ _id: new ObjectId(taskId) });

    //   if (!task) {
    //     return res.status(404).send({ message: "Task not found" });
    //   }

    //   // Update the task's category and order
    //   task.category = destinationCategory;
    //   task.order = destinationIndex;

    //   // Update the task in the database
    //   await taskCollection.updateOne(
    //     { _id: new ObjectId(taskId) },
    //     { $set: { category: destinationCategory, order: destinationIndex } }
    //   );

    //   // Adjust the order of other tasks in the source and destination categories
    //   if (sourceCategory === destinationCategory) {
    //     // Reorder within the same category
    //     await taskCollection.updateMany(
    //       {
    //         category: sourceCategory,
    //         order: { $gte: Math.min(sourceIndex, destinationIndex), $lte: Math.max(sourceIndex, destinationIndex) },
    //         _id: { $ne: new ObjectId(taskId) },
    //       },
    //       { $inc: { order: sourceIndex < destinationIndex ? -1 : 1 } }
    //     );
    //   } else {
    //     // Reorder across categories
    //     await taskCollection.updateMany(
    //       { category: sourceCategory, order: { $gt: sourceIndex } },
    //       { $inc: { order: -1 } }
    //     );

    //     await taskCollection.updateMany(
    //       { category: destinationCategory, order: { $gte: destinationIndex } },
    //       { $inc: { order: 1 } }
    //     );
    //   }

    //   res.send({ message: "Task reordered successfully" });
    // });
    app.post("/tasks/reorder", async (req, res) => {
      const { sourceCategory, destinationCategory, sourceIndex, destinationIndex, taskId } = req.body;
    
      try {
        // Find the task being moved
        const task = await taskCollection.findOne({ _id: new ObjectId(taskId) });
    
        if (!task) {
          return res.status(404).send({ message: "Task not found" });
        }
    
        // If the task is moved within the same category
        if (sourceCategory === destinationCategory) {
          // Get all tasks in the category, sorted by order
          const tasksInCategory = await taskCollection
            .find({ category: sourceCategory })
            .sort({ order: 1 })
            .toArray();
    
          // Remove the task from its current position
          tasksInCategory.splice(sourceIndex, 1);
    
          // Insert the task at the new position
          tasksInCategory.splice(destinationIndex, 0, task);
    
          // Update the order of all tasks in the category
          for (let i = 0; i < tasksInCategory.length; i++) {
            await taskCollection.updateOne(
              { _id: tasksInCategory[i]._id },
              { $set: { order: i } }
            );
          }
        } else {
          // If the task is moved to a different category
    
          // Step 1: Remove the task from the source category
          await taskCollection.updateMany(
            { category: sourceCategory, order: { $gt: sourceIndex } },
            { $inc: { order: -1 } }
          );
    
          // Step 2: Make space in the destination category
          await taskCollection.updateMany(
            { category: destinationCategory, order: { $gte: destinationIndex } },
            { $inc: { order: 1 } }
          );
    
          // Step 3: Update the task's category and order
          await taskCollection.updateOne(
            { _id: new ObjectId(taskId) },
            { $set: { category: destinationCategory, order: destinationIndex } }
          );
        }
    
        res.send({ message: "Task reordered successfully" });
      } catch (error) {
        console.error("Error reordering tasks:", error);
        res.status(500).send({ message: "Failed to reorder tasks" });
      }
    });

    // User-related APIs
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});