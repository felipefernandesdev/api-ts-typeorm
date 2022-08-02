import { Request, Response } from 'express';
import { BadRequestError } from '../helpers/api-error';
import { SubjectRepository } from '../repositories/SubjectRepository';

export class SubjectController {
  async create(request: Request, response: Response) {
    const { name } = request.body;
    if (!name) throw new BadRequestError('Not Found Room');
    const newSubject = SubjectRepository.create({ name });
    await SubjectRepository.save(newSubject);

    return response
      .status(201)
      .json({ message: 'Subject has been created', data: newSubject });
  }
}
