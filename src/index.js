export default {
    async scheduled(event, env, ctx) {
        const credencials = {
            username: "TsureUser",
            password: "TsurePassword1234",
            protocol: "wss"
        }
        const brokerUrl = "wss://e9a64e74b3a347a09afa1eb3907e1dcd.s1.eu.hivemq.cloud:8884/mqtt";
        const topic = "led";
        const mensaje = "ON";
        // @ts-ignore
        const mqtt = await import("https://esm.sh/mqtt@4.3.7");
        const client = mqtt.connect(brokerUrl, credencials);
        return new Promise((resolve) => {
            client.on("connect", () => {
                client.publish(topic, mensaje, () => {
                    client.end();
                    resolve(new Response("Mensaje enviado a MQTT", { status: 200 }));
                });
            });
        });
    },
};
