import { auth } from "@/auth/auth";

const main = async () => {

    await auth.api.createUser({
        body: {
            name: process.env.TEST_USER_NAME!,
            email: process.env.TEST_USER_EMAIL!,
            password: "TemporaryPassword123!"
        }
    })

};

; (async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();