import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  item: string;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  item: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model<ITask>('assignment_Narsimma', TaskSchema);

export default Task;
