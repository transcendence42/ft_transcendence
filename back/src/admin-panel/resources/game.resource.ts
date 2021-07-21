import { ResourceWithOptions } from 'admin-bro';
import { Game } from 'src/games/entities/game.entity';

const GameResource: ResourceWithOptions = {
  resource: Game,
  options: {},
};

export default GameResource;
