import { Document, Schema, model } from "mongoose";

// Model Interface: 
export interface ITicketModel extends Document {
    departurePort: string;
    arrivalPort: string;
    departureDate: string;
    returnDate: string;
    price: number;
    airline: string;
    isDirect: boolean;
    isCharter: boolean;
}

// Model Schema:
const TicketSchema = new Schema<ITicketModel>({
    departurePort: {
        type: String,
        required: [true, "Missing name"],
    },
    arrivalPort: {
        type: String,
        required: [true, "Missing description"],
    },
    departureDate: {
        type: String,
        required: [true, "Missing price"],
    },
    returnDate: {
        type: String,
        required: [true, "Missing discount"],
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
    },
    airline: {
        type: String,
        required: [true, "Missing discount"],
    },
    isDirect: {
        type: Boolean,
        required: [true, "Missing price"],
    },
    isCharter: {
        type: Boolean,
        required: [true, "Missing discount"],
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});


// Model:
export const TicketModel = model<ITicketModel>("TicketModel", TicketSchema, "tickets");
