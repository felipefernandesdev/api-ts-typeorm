import { Request, Response } from 'express';
import { SubjectRepository } from '../repositories/SubjectRepository';

export class SubjectController {
  async create(request: Request, response: Response) {
    const { name } = request.body;
    if (!name)
      return response.status(400).json({ message: 'Name is required' });
    try {
      const newSubject = SubjectRepository.create({ name });
      await SubjectRepository.save(newSubject);

      return response
        .status(201)
        .json({ message: 'Subject has been created', data: newSubject });
    } catch (error) {
      return response
        .status(500)
        .json({ error, message: 'Internal Server Error' });
    }
  }
}
