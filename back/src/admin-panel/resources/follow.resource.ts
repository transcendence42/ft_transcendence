import { ResourceWithOptions } from 'admin-bro';
import { Follow } from 'src/follows/entities/follow.entity';

const FollowResource: ResourceWithOptions = {
  resource: Follow,
  options: {},
};

export default FollowResource;
