import mqtt from "mqtt";
import {
  getTasksFromRedis,
  saveTasksToRedis,
  clearRedis,
} from "./redisService";
import { moveTasksToMongo } from "./mongoService";

const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  console.log("Connected to MQTT Broker");
  client.subscribe("/add");
});

client.on("message", async (topic, message) => {
  if (topic === "/add") {
    const task = message.toString();
    const tasks = await getTasksFromRedis();
    tasks.push(task);

    if (tasks.length > 50) {
      await moveTasksToMongo(tasks);
      await clearRedis();
      console.log("Moved 50+ tasks to MongoDB");
    } else {
      await saveTasksToRedis(tasks);
    }
  }
});
