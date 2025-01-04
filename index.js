// index.js
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// 1. Crear el cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth() // Guarda la sesión en .wwebjs_auth
});

// 2. Escuchar el evento 'qr' para mostrarlo en consola y que puedas escanearlo
client.on('qr', (qr) => {
    console.log('Escanea el siguiente QR con tu WhatsApp (en la sección "Dispositivos vinculados"):');
    qrcode.generate(qr, { small: true });
});

// 3. Cuando el bot está listo, lo informamos en la consola
client.on('ready', () => {
    console.log('¡Bot de WhatsApp listo!');
});

// 4. Escuchamos cualquier mensaje entrante
client.on('message', async (msg) => {
    // Para depuración: imprime quién envió el mensaje y qué texto tenía
    console.log('Mensaje recibido de:', msg.from, 'con texto:', msg.body);

    // Ejemplo de respuesta simple si alguien escribe "hola"
    if (msg.body.toLowerCase() === 'hola') {
        await msg.reply('¡Hola! Soy tu bot de Mecatrónica. ¿En qué puedo ayudarte?');
    }
});

// 5. Iniciar la sesión (se genera el QR si no hay sesión previa)
client.initialize();
