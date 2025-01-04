const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// 1. Crear el cliente
const client = new Client({
    authStrategy: new LocalAuth() // Guarda tu sesión en una carpeta local (evitar reescanear QR)
});

// 2. Mostrar el QR en consola
client.on('qr', (qr) => {
    console.log('Escanea el siguiente QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// 3. Confirmar que está listo
client.on('ready', () => {
    console.log('¡Bot de WhatsApp listo!');
});

// 4. Evento de mensaje
client.on('message', async msg => {
    // msg.body -> texto del mensaje
    const chat = await msg.getChat();

    // Respuesta básica
    if(msg.body.toLowerCase() === 'hola'){
        await msg.reply('¡Hola! Soy tu bot de ingeniería Mecatrónica. ¿En qué puedo ayudarte?');
    }
});

// 5. Iniciar el cliente
client.initialize();
