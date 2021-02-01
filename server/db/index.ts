import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { Role } from "./entity/Role";
import { User } from "./entity/User";

const wrapper = () => {
  let connection: Connection;

  return async () => {
    if (!connection) {
      const options = await getConnectionOptions();
      connection = await createConnection({
        ...options,
        entities: [User, Role],
        migrations: [],
      });
    }
    return connection;
  };
};

export default wrapper();

export { Role, User };
