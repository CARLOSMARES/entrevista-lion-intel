import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Reservacion } from "../entities/Reservacion";
// import { Sala } from "../entities/Sala";

class ReservacionController {
  static async getAllSala(req: Request, res: Response) {
    const reservacionesRepository = AppDataSource.getRepository(Reservacion);
    const reservacion = await reservacionesRepository.find();
    res.json(reservacion);
  }
  static async createReservacion(req: Request, res: Response) {
    const { nameUsuario, fecha, hora, numeroSala } = req.body;
    if (!(nameUsuario && fecha && hora && numeroSala)) {
      return res.status(400).json({
        messae: `are required`,
      });
    }
    const reservacionRepository = AppDataSource.getRepository(Reservacion);
    const existinReservacion = await reservacionRepository.findOneBy({});
    if (existinReservacion) {
      return res.status(409).json({
        meesage: `Reservacion de la sala  ${numeroSala} Y  a la hora ${hora} ya existe`,
      });
    }
    const newReservacion = reservacionRepository.create({
      nameUsuario,
      fecha,
      hora,
      numeroSala,
    });
    await reservacionRepository.save(newReservacion);
    // const salaRepository = AppDataSource.getRepository(Sala);
    // await salaRepository.update(
    //   {
    //     numeroSala,
    //   },
    //   {
    //     disponible: "Reservada",
    //   }
    // );
    res.status(200).json(newReservacion);
  }
}

export default ReservacionController;
