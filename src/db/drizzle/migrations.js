// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo
import m0000 from "./0000_whole_iron_fist.sql";
import m0001 from "./0001_robust_dakota_north.sql";
import journal from "./meta/_journal.json";

export default {
  journal,
  migrations: {
    m0000,
    m0001,
  },
};
