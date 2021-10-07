import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';
import { validate } from 'class-validator';
import { Brackets } from 'typeorm';

@Injectable()
export class GamesService {
  async create(createGameInput: CreateGameInput) {
    const game = new Game();
    game.playerOneID = createGameInput.playerOneID;
    game.playerTwoID = createGameInput.playerTwoID;

    const validate_error = await validate(game);
    if (validate_error.length > 0) {
      const _error = { game: 'Game Input is not valid' };
      throw new HttpException({ message: 'Game Input validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await Game.save(game);
    }
  }

  async findAll() {
    const games = await Game.find();
    return games;
  }

  /* 진행 중인 게임 찾기 */
  async findByUserID(userID: string) {
    const games = await Game.getRepository()
      .createQueryBuilder('game')
      .where('game.finishedAt IS NULL')
      .andWhere(
        new Brackets((subQb) => {
          subQb.where('game.playerOneID = :userID', { userID: userID });
          subQb.orWhere('game.playerTwoID = :userID', { userID: userID });
        }),
      )
      .getMany();
    // console.log('game-services-findByUserID: ', games);
    return games;
  }

  /* 종료한 게임 찾기 */
  async findEndGameByUserID(userID: string) {
    const games = await Game.getRepository()
      .createQueryBuilder('game')
      .where('game.finishedAt IS NOT NULL')
      .andWhere(
        new Brackets((subQb) => {
          subQb.where('game.playerOneID = :userID', { userID: userID });
          subQb.orWhere('game.playerTwoID = :userID', { userID: userID });
        }),
      )
      .getMany();
    return games;
  }

  async findOne(index: number) {
    const game = await Game.findOne(index);
    return game;
  }

  async findOneByUuid(uuid: string) {
    const game = await Game.getRepository()
      .createQueryBuilder('game')
      .where('game.uuid = :uuid', { uuid: uuid })
      .getOne();
    return game;
  }

  async update(uuid: string, updateGameInput: UpdateGameInput) {
    const game = await this.findOneByUuid(uuid);
    game.isPlaying = updateGameInput.isPlaying;
    game.playerOneID = updateGameInput.playerOneID;
    game.playerOneScore = updateGameInput.playerOneScore;
    game.playerTwoID = updateGameInput.playerTwoID;
    game.playerTwoScore = updateGameInput.playerTwoScore;
    game.finishedAt = updateGameInput.finishedAt;
    game.modifiedAt = updateGameInput.modifiedAt;
    const validate_error = await validate(game);
    if (validate_error.length > 0) {
      const _error = { game: 'Game Input is not valid' };
      throw new HttpException({ message: 'Game Input validation failed', _error }, HttpStatus.BAD_REQUEST);
    } else {
      return await Game.save(game);
    }
  }

  async remove(index: number) {
    const game = await Game.findOne(index);
    if (!game) {
      const _error = { index: `Game(${index}) does not exist.` };
      throw new HttpException({ message: 'Wrong ID', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Game.remove(game);
  }
}
