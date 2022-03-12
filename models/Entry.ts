import mongoose, { Model, Schema} from 'mongoose'
import { Entry } from '../interfaces/entry';

export interface IEntry extends Entry{}

const EntrySchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        }
    },
}, { collection: 'entries' });

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

export default EntryModel;