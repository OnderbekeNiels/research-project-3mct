import { Redis } from "ioredis";
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
        console.log("from cache");
        return resolve(JSON.parse(data));
      } else {
        console.log("from db");
        const newData = await callback();
        redisClient.setex(key, maxAge, JSON.stringify(newData));
        resolve(newData);
      }
    });
  });
};
