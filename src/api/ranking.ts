//#region Imports

import { Express } from 'express';
import { Connection } from 'typeorm';
import { RankingEntity } from './entities/ranking.entity';

//#endregion

const Joi = require('@hapi/joi');

// validate de incoming data before post on db
const schema = Joi.object({
  name: Joi.string().trim().required(),
  points: Joi.number().required(),
});

const schemaOptional = Joi.object({
  name: Joi.string().trim(),
  points: Joi.number(),
});

/**
 * Método para inicializar as rotas do ranking
 */
export function setupRankingRoutes(app: Express, connection: Connection): void {
  const repository = connection.getRepository(RankingEntity);

  app.get('/ranking', async (req, res, next) => {
    const rankings = await repository.find();
    res.json(rankings);
  });

  app.get('/ranking/:id', async (req, res, next) => {
    const { id } = req.params;
    const ranking = await repository.findOne({
      where: {
        id: id,
      },
    });

    if (!ranking)
      return res.status(400).json({
        message: 'Ranking não encontrado.',
      });

    return res.json(ranking);
  });

  app.post('/ranking', async (req, res, next) => {
    try {
      const ranking = await schema.validateAsync(req.body);
      const rankingSaved = await repository.save(ranking);

      return res.json(rankingSaved);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  app.put('/ranking/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      let updateRanking = await repository.findOne({ where: { id: id } });

      if (!updateRanking)
        return res.status(400).json({ message: 'Ranking não encontrado.' });

      const rankingToUpdate = await schemaOptional.validateAsync(req.body);
      Object.assign(updateRanking, rankingToUpdate);
      const rankingSaved = await repository.save(updateRanking);

      return res.json(rankingSaved);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  app.delete('/ranking/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      let ranking = await repository.findOne({ where: { id: id } });

      if (!ranking)
        return res.status(400).json({ message: 'Ranking não encontrado.' });

      const deletedRanking = await repository.delete(ranking);

      return res.json(deletedRanking);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
}
