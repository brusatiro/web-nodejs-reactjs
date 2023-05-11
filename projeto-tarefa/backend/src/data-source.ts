import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tasks } from "./entity/Tasks"
import { takeCoverage } from "v8"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "drona.db.elephantsql.com",
    port: 5432,
    username: "eyvktfrl",
    password: "e0hZDDA3DdwGd9pJcU-o8v0_mr6Hvz8b",
    database: "eyvktfrl",
    synchronize: true,
    logging: false,
    entities: [Tasks],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;