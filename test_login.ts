import { verify } from "@node-rs/argon2";
import { lucia } from "./src/auth";

async function main() {
    console.log("Lucia and Argon2 imported successfully!");
}
main().catch(console.error);
