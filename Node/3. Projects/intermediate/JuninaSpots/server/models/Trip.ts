import { Schema, model, Types} from 'mongoose';

interface ITrip {
  title: string;
  location: string;
  owner: Types.ObjectId;
}

const tripSchema = new Schema<ITrip>({
    title: { type: String, required: true, minlength: 3, maxlength: 25 },
    location: { type: String, required: true, minlength: 3, maxlength: 15 },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
}, {timestamps: true})

const Trip = model<ITrip>('Trip', tripSchema);

export default Trip