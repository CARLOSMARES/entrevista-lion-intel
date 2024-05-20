import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Sala } from "../entities/Sala";

class SalaController {
  static async getAllSala(req: Request, res: Response) {
    const salaRepository = AppDataSource.getRepository(Sala);
    const sala = await salaRepository.find();
    res.json(sala);
  }
  static async createSala(req: Request, res: Response) {
    const {
      // disponible,
      numeroSala,
      pantalla,
      telefono,
      wifi,
      numeroAsientos,
    } = req.body;
    if (
      !(
        // disponible &&
        (numeroSala && pantalla && telefono && wifi && numeroAsientos)
      )
    ) {
      return res.status(400).json({
        message: `disponible, numeroSala, pantalla, telefono, wifi, numeroAsientos are required`,
      });
    }
    const salaRepository = AppDataSource.getRepository(Sala);
    const existingSala = await salaRepository.findOneBy({ numeroSala });
    if (existingSala) {
      return res.status(409).json({
        message: `Sala already exists`,
      });
    }
    const newSala = salaRepository.create({
      // disponible,
      numeroSala,
      pantalla,
      telefono,
      wifi,
      numeroAsientos,
    });
    await salaRepository.save(newSala);
    res.status(201).json(newSala);
  }
}

export default SalaController;
