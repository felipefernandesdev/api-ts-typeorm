import { Request, Response } from 'express';
import { RoomRepository } from '../repositories/RoomRepository';

export class RoomController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;
    if (!name)
      return response.status(400).json({ message: 'name is required' });
    try {
      const newRoom = RoomRepository.create({ name, description });
      await RoomRepository.save(newRoom);

      response
        .status(201)
        .json({ message: 'Room created successfully', data: newRoom });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ error, message: 'internal server error' });
    }
  }
}
