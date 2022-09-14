import { Request, Response } from 'express';
import { IModel } from '../interfaces/IModel';
// import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class FrameController {
  constructor(private _service: IModel<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }
}
