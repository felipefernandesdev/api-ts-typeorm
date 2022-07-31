import { Request, Response } from 'express';
import { RoomRepository } from '../repositories/RoomRepository';
import { VideoRepository } from '../repositories/VideoRepository';
import { SubjectRepository } from '../repositories/SubjectRepository';

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

  async createVideo(request: Request, response: Response) {
    const { title, url } = request.body;
    const { idRoom } = request.params;

    try {
      const room = await RoomRepository.findOneBy({ id: Number(idRoom) });
      if (!room)
        return response.status(404).json({ message: 'Room not found' });

      const newVideo = VideoRepository.create({
        title,
        url,
        room,
      });
      await VideoRepository.save(newVideo);

      return response.status(201).json(newVideo);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ error, message: 'internal server error' });
    }
  }

  async roomSubject(request: Request, response: Response) {
    const { subject_id } = request.body;
    const { idRoom } = request.params;

    try {
      const room = await RoomRepository.findOneBy({ id: Number(idRoom) });
      if (!room)
        return response.status(404).json({ message: 'Room not found' });

      const subject = await SubjectRepository.findOneBy({
        id: Number(subject_id),
      });
      if (!subject)
        return response.status(404).json({ message: 'Subject not found' });
      const roomUpdate = {
        ...room,
        subjects: [subject],
      };
      await RoomRepository.save(roomUpdate);

      return response.status(204).send();
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ error, message: 'internal server error' });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const rooms = await RoomRepository.find({
        relations: {
          subjects: true,
          videos: true,
        },
      });

      return response.status(200).json(rooms);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: 'internal server error' });
    }
  }
}
