import { TicketModel, ITicketModel } from './../03-models/ticket-model';

import mongoose from 'mongoose';
import ClientError from '../03-Models/client-error';

// get all departure port
async function getAlldeparturePort(): Promise<ITicketModel[]> {
    return TicketModel.aggregate([
        {
            $group: {
                _id: {
                    departurePort: "$departurePort",
                },
            },
        },
    ]);
}


// get all arrival port
async function getAllArrivalPort(): Promise<ITicketModel[]> {
    return TicketModel.aggregate([
        {
            $group: {
                _id: {
                    arrivalPort: "$arrivalPort",
                },
            },
        },
    ]);
}


// get all low price
async function getAllPrices(departureP, arrivalP, date) : Promise<ITicketModel[]> {    
    const check = TicketModel.find({departurePort: departureP , arrivalPort : arrivalP ,departureDate: date}, null , {sort: { price: 1 }, limit:1 }).exec();
    return check
}


// get all flights
async function getAllFlights(departureP, arrivalP, date, rDate) : Promise<ITicketModel[]> {
    const check = TicketModel.find({departurePort: departureP , arrivalPort : arrivalP ,departureDate: date , returnDate: rDate}).exec();
    return check
}
 
async function getGifts(targetAudienceId: string): Promise<ITicketModel[]> {
    return TicketModel.find({ targetAudienceId }).populate("targetAudience").exec();
}



async function addGift(gift: ITicketModel): Promise<ITicketModel> {
    
    const errors = gift.validateSync();
    if(errors) throw new ClientError(400 , errors.message);

    //Add:
    return gift.save();
}

export default {
    getAllArrivalPort,
    getAllFlights,
    getGifts,
    addGift,
    getAlldeparturePort,
    getAllPrices
};
