import express from "express";
import os from "os";
import cluster from "cluster";
import Hello from "./route";

const clusterWorkerSize = os.cpus().length
const PORT = 3000;


if (clusterWorkerSize > 1) {
	if (cluster.isMaster) {
	  for (let i=0; i < clusterWorkerSize; i++) {
		cluster.fork()
	  }
  
	  cluster.on("exit", async (worker) => {
		await console.log("Worker", worker.id, " has exitted.")
	  })
	} else {
	  const app = express()
	  
	  app.use("/", Hello);
	  app.listen(PORT, async () => {
		await console.log(`Express server listening on port ${PORT} and worker ${process.pid}`)
	  })
	}
  } else {
	const app = express()
	app.use("/", Hello);
	app.listen(PORT, async () => {
		await console.log(`Express server listening on port ${PORT} with the single worker ${process.pid}`)
	})
  }
