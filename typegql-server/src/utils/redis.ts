import { resolveGraphqlOptions } from "apollo-server-core";
import { Redis } from "ioredis";
import { logger } from "./logger";

export const globalTTL: number = 90;

export const checkCache = async (
  redisClient: Redis,
  key: string,
  callback: Function,
  maxAge: number = globalTTL
): Promise<Object | Array<any> | number> => {
  return new Promise(async (resolve, reject) => {
    // ! without cache
    // resolve(await callback())
    // ! with redis cache
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

export const deleteCache = async (redisClient: Redis, keysPattern: string) => {
  return new Promise(async (resolve, reject) => {
    console.log({ keysPattern });
    var stream = redisClient.scanStream({ match: keysPattern });
    var pipeline = redisClient.pipeline();

    stream.on("data", function (resultKeys) {
      console.log({ resultKeys });
      for (var i = 0; i < resultKeys.length; i++) {
        pipeline.del(resultKeys[i]);
      }
    });

    stream.on("end", function () {
      pipeline.exec(() => {
        console.log("final batch delete complete");
      });

      resolve(true);
    });

    stream.on("error", function (err) {
      console.error("error", err);
      reject(err);
    });
  });
};
