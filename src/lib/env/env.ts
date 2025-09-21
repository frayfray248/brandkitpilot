import { z } from "zod";


const serverSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
})

const clientSchema = z.object({

})

const _server = serverSchema.safeParse(process.env);

if (!_server.success) {
    console.error("❌ Invalid server env:", z.treeifyError(_server.error));
    throw new Error("Invalid server env");
}

const _client = clientSchema.safeParse({

});

if (!_client.success) {
    console.error("❌ Invalid client env:", z.treeifyError(_client.error));
    throw new Error("Invalid client env");
}

export const env = {
    ..._server.data,
    ..._client.data,
} as const;
Object.freeze(env);