import { Request, Response } from 'express';
import { RoomRepository } from '../repositories/RoomRepository';
import { VideoRepository } from '../repositories/VideoRepository';
import { SubjectRepository } from '../repositories/SubjectRepository';
import { BadRequestError, NotFoundError } from '../helpers/api-error';

export class RoomController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;
    if (!name) throw new BadRequestError('Not Found Room');

    const newRoom = RoomRepository.create({ name, description });
    await RoomRepository.save(newRoom);

    response
      .status(201)
      .json({ message: 'Room created successfully', data: newRoom });
  }

  async createVideo(request: Request, response: Response) {
    const { title, url } = request.body;
    const { idRoom } = request.params;

    const room = await RoomRepository.findOneBy({ id: Number(idRoom) });
    if (!room) throw new NotFoundError('Not Found Room');

    const newVideo = VideoRepository.create({
      title,
      url,
      room,
    });
    await VideoRepository.save(newVideo);

    return response.status(201).json(newVideo);
  }

  async roomSubject(request: Request, response: Response) {
    const { subject_id } = request.body;
    const { idRoom } = request.params;

    const room = await RoomRepository.findOneBy({ id: Number(idRoom) });
    if (!room) throw new NotFoundError('Not Found Room');

    const subject = await SubjectRepository.findOneBy({
      id: Number(subject_id),
    });
    if (!subject) throw new NotFoundError('Not Found Subject');

    const roomUpdate = {
      ...room,
      subjects: [subject],
    };
    await RoomRepository.save(roomUpdate);

    return response.status(204).send();
  }

  async list(request: Request, response: Response) {
    const rooms = await RoomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });

    return response.status(200).json(rooms);
  }
}
