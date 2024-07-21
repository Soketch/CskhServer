import { pubClient } from '@/config/redis/pub';
import { REDIS_PREFIX } from '@/constant';

import { REDIS_CONFIG } from '@/secret/secret';

import { log } from 'console';

export const handleRedisKeyExpired = () => {
  pubClient.subscribe(
    `__keyevent@${REDIS_CONFIG.database}__:expired`,
    (redisKey:any, subscribeName:any) => {
      console.log('过期key监听', redisKey, subscribeName);
      try {
        log('过期key监听', redisKey, subscribeName);
      } catch (error) {
        console.log(error);
      }
    }
  );
};
