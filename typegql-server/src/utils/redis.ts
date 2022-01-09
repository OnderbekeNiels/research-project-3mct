import { Redis } from "ioredis";
import { logger } from "./logger";
export const checkCache = async (
  redisClient: Redis,
  key: string,
  maxAge: number,
  callback: Function
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (err, data) => {
      if (err) return reject(err);
      if (data != null) {
        try {
          return resolve(JSON.parse(data));
          
        } catch (error) {
          console.error(error)
        }
        // logger.info("read from cache");
      } else {
        // logger.info("read from db");
        const newData = await callback();
        redisClient.setex(key, maxAge, JSON.stringify(newData));
        resolve(newData);
      }
    });
  });
};
