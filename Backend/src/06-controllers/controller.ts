import { TicketModel } from './../03-models/ticket-model';

import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/logic";

const router = express.Router();

router.get("/allDeparturePort", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allDeparturePort = await logic.getAlldeparturePort();
        response.json(allDeparturePort);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/allArrivalPort", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allDeparturePort = await logic.getAllArrivalPort();
        response.json(allDeparturePort);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/allPrices/", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const departureP = request.query.departurePort;
        const arrivalP = request.query.arrivalPort;
        let date = request.query.departureDate;
        const allPrices = await logic.getAllPrices(departureP, arrivalP, date);
        response.json(allPrices)


    } catch (err: any) {
        next(err);
    }
})



router.get("/allFlights/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const departureP = request.query.departurePort;
        const arrivalP = request.query.arrivalPort;
        let departurDadate = request.query.departureDate;
        let returnDate = request.query.returnDate;
        const allFlights = await logic.getAllFlights(departureP, arrivalP, departurDadate,returnDate);
        response.json(allFlights)
    } catch (err: any) {
        next(err);
    }
})

router.get("/gifts/audience/:targetAudienceId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const targetAudienceId = request.params.targetAudienceId;
        const gifts = await logic.getGifts(targetAudienceId);
        response.json(gifts);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/gifts", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const gift = new TicketModel(request.body);
        const addedGift = await logic.addGift(gift);
        response.status(201).json(addedGift);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;
