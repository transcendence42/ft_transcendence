import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';
import { validate } from 'class-validator';

@Injectable()
export class GamesService {
  async create(createGameInput: CreateGameInput) {
    const game = new Game();
    game.winnerScore = createGameInput.winnerScore;
    game.loserScore = createGameInput.loserScore;

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

  async findOne(id: number) {
    const game = await Game.findOne(id);
    return game;
  }

  async update(id: number, updateGameInput: UpdateGameInput) {
    const game = await Game.findOne(id);
    game.isPlaying = updateGameInput.isPlaying;
    game.winnerId = updateGameInput.winnerId;
    game.winnerScore = updateGameInput.winnerScore;
    game.loserId = updateGameInput.loserId;
    game.loserScore = updateGameInput.loserScore;
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

  async remove(id: number) {
    const game = await Game.findOne(id);
    if (!game) {
      const _error = { id: `Game(${id}) does not exist.` };
      throw new HttpException({ message: 'Wrong ID', _error }, HttpStatus.BAD_REQUEST);
    }
    return await Game.remove(game);
  }
}
