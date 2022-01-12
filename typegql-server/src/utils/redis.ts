import { Redis } from "ioredis";
import { logger } from "./logger";

export const globalTTL: number = 20;

export const checkCache = async (
  redisClient: Redis,
  key: string,
  callback: Function,
  maxAge: number = globalTTL
): Promise<Object | Array<any> | number> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data != null) {
        return resolve(JSON.parse(data));
        // logger.info("read from cache");
      } else {
        // logger.info("read from db");
        let newData = await callback();
        if (!newData) newData = null;
        redisClient.setex(key, maxAge, JSON.stringify(newData));
        resolve(newData);
      }
    });
  });
};
