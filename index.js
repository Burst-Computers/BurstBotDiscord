const {Client, MessageEmbed, MessageAttachment} = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciales = require('./credenciales.json');
const fs = require('fs');
const client = new Client();
let producto,precio;
var guardarventa = new Array (producto,precio);

//ID de la hoja de calculo conectada al proyecto
let googleId = "1K37Tb-IGcsD78F0FohlbBA7heqcaCCJa7cWGgyJp2AA";

//Trae registros de google Sheets
async function accederGoogleSheet(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();

    const sheet = documento.sheetsByIndex[2];
    const registros = await sheet.getRows();
    console.log(registros);

    return registros;
    
}

//Envia registros a google sheets
async function guardaregistros(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();
    const sheet = documento.sheetsByIndex[2];
    await sheet.addRow(guardarventa,documento);
}

//Programa el evento ready
client.once('ready', () => {
    console.log(`Logged in as: ${client.user.tag}!`);
    client.user.setStatus("online");
    console.log(client.user.presence.status);
});
//Saluda a los nuevos miembros del Servidor
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'nuevosmiembros');
    if (!channel) return;
    channel.send(`Bienvenido! ${member} Soy el Bot administrador del canal, si necesitas ayuda escribeme un mensaje privado con el comando /iniciar`);
    console.log(channel);

})

//Escucha nuevos mensajes de los ususarios
client.on('message', async message => {

    if(message.content ===  '/iniciar'){
        const embed = new MessageEmbed()
        .setTitle(`Bienvenido al menu principal`)
        .setColor(0xFF9900)
        .setDescription(`${message.author}, Empecemos con la siguiente lista de comandos: \n /direccion \n /garantia \n /ventas \n /catalogows \n /precios`)
        .setThumbnail('https://burstcomputers.files.wordpress.com/2020/07/1593734032249.png')
        message.channel.send(embed);
    }
    if(message.content ===  'Hola'){
        message.channel.send(`Hola, ${message.author.first_name}! Que puedo hacer por ti?`);
    }
    if(message.content ===  '/preciospdf'){
        message.channel.send('Enviando archivo');
        const buffer = fs.readFileSync('./Precios.pdf');
        const attachment = new MessageAttachment(buffer, 'Precios.pdf');
        message.channel.send(`${message.author}, Aqui está tu archivo`, attachment);
    }
    if(message.content ===  '/ventas'){
        const embed = new MessageEmbed()
        .setTitle('Registro de Ventas')
        .setColor(0x0B5394)
        .setDescription('toca para completar el proceso')
        .setURL('https://burstcomputers.typeform.com/to/j2Ue8Hn6')
        .setThumbnail('https://burstcomputers.files.wordpress.com/2020/07/logo-dollar.png')
        message.channel.send(embed);
    }
    if(message.content ===  '/catalogows'){
        const embed = new MessageEmbed()
        .setTitle('Catalogo en Whatsapp')
        .setColor(0x00FF00)
        .setDescription('Toca para ver los productos disponibles')
        .setThumbnail('https://burstcomputers.files.wordpress.com/2020/07/logo-whatsapp.png')
        .setURL('https://www.wa.me/c/584244156765')
        message.channel.send(embed);
    }
    if(message.content ===  '/precios'){
        const embed = new MessageEmbed()
        .setTitle('Lista de Precios en PDF')
        .setColor(0x00FFFF)
        .setDescription('Prefieres tener el archivo contigo? Bájalo a tu dispositivo')
        .setFooter('Precios siempre actualizados')
        .setThumbnail('https://burstcomputers.files.wordpress.com/2020/07/icono-garantia-1.png')
        .setURL('https://drive.google.com/file/d/1P6bSsrob-GyVH549SEPJTGZ3AKHIhnKU/view?usp=sharing')
        message.channel.send(embed);
    }
    else if(message.content === 'Como estás?'){
        message.channel.send('Genial!, mucho mejor ahora que preguntaste.');
    }
    else if( message.content === '/direccion'){
        message.channel.send('Estamos ubicados en el centro Profesional El Paraíso. \n Caracas, distrito Capital.');
    }
    else if(message.content === '/garantia'){
        message.channel.send('Todos nuestros equipos tienen 90 dias de garantía directamente en nuestra tienda');
    }
    else if(message.content === 'Programador'){
        message.channel.send('Andrew Clark \n clark1621@gmail.com')
    }
    /*Sistema de Ventas EN DESARROLLO
    if (message.content === '/nuevaventa'){
        message.channel.send('Genial! empecemos por el comienzo:');
        message.channel.send('Que producto vendiste? \n\n Puedes ingresar estas opciones: \n Latitude \n Optiplex')
    }
    else if (message.content === 'Optiplex'){
        message.channel.send('Bien, ahora dime, en que precio la vendiste?');
        var producto = message.content;
        console.log(producto);
    }
    else if (message.content === 'Latitude'){
        message.channel.send('Bien, ahora dime, en que precio la vendiste?');
        var producto = message.content;
        console.log(producto);
    }
    else if (message.content.includes('$')){
        message.channel.send('Excelente! He guardado el registro.');
        var precio = message.content;
        console.log(precio);

        guardaregistros();
    }*/
}) 
client.login('NzMwODMyMTA4NTk5MjQ2OTE5.XwdQyQ.trdRidejN9wIrO1WYvOLeV30VBo');