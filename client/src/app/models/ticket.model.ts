
export class TicketModel {
    _id?: string;
    departurePort?: string;
    arrivalPort?: string;
    departureDate?: string;
    returnDate?: string;
    price?: number;
    airline?: string;
    isDirect?: boolean;
    isCharter?: boolean;
}
