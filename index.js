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
client.on('ready', () => {
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
client.on('message', async message  => {

    /*if (message.author.bot) return;
    let prefix = '!'; // customized. you can change it whatever you want.
    if (!message.content.startsWith(prefix)) return; // use this. so your bot will be only executed with prefix.
    
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let msg = message.content.toLowerCase();
    let cmd = args.shift().toLowerCase();*/

    if(message.content ===  '/iniciar'){
        const embed = new MessageEmbed()
        .setTitle(`Bienvenido al menu principal`)
        .setColor(0xFF9900)
        .setDescription(`${message.author}, Empecemos con la siguiente lista de comandos: \n /direccion \n /garantia \n /ventas \n /catalogows \n /precios \n /preciospdf`)
        .setThumbnail('https://burstcomputers.files.wordpress.com/2020/07/1593734032249.png')
        message.channel.send(embed);
    }
    if(message.content ===  'Hola'){
        message.channel.send(`Hola, ${message.author}! Que puedo hacer por ti?`);
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
    if(message.content ===  '/direccion'){
        const embed = new MessageEmbed()
        .setTitle('Direccion de nuestra tienda')
        .setColor('GREEN')
        .setDescription('Estamos ubicados en el centro Profesional El Paraíso. \n Caracas, distrito Capital.')
        .setFooter('Toca el enlace para ver la direccion en Google Maps')
        .setThumbnail('https://burstcomputers.files.wordpress.com/2020/07/logo-nuevo-maps.png')
        .setURL('https://goo.gl/maps/mcrmtYcz5tNH8qSF6')
        message.channel.send(embed);
    }

    /*if (msg.startsWith(prefix + "prune") || msg.startsWith(prefix + "purge")) { // You can make an aliases. Just like that.
        //if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have a permissions to do this.")
        if (isNaN(args[0])) return message.channel.send("Please input a valid number.") // isNaN = is Not a Number. (case sensitive, write it right)
        if (args[0] > 100) return message.channel.send("Insert the number less than 100.") // Discord limited purge number into 100.
        if (args[0] < 2) return message.channel.send("Insert the number more than 1.")
        
        message.delete()
        message.channel.bulkDelete(args[0])
        .then(messages => message.channel.send(`Deleted ${messages.size}/${args[0]} messages.`)).then(d => d.delete({timeout: 10000})) // How long this message will be deleted (in ms)
        .catch(() => message.channel.send("Something went wrong, while deleting messages.")) // This error will be displayed when the bot doesn't have an access to do it.
      }*/

    else if(message.content === 'Como estás?'){
        message.channel.send('Genial!, mucho mejor ahora que preguntaste.');
    }
    else if(message.content === '/garantia'){
        message.channel.send('Todos nuestros equipos tienen 90 dias de garantía directamente en nuestra tienda');
    }
    else if(message.content === 'Programador'){
        message.channel.send('Andrew Clark \n clark1621@gmail.com')
    }
    else if(message.content === 'pajuo'){
        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        message.channel.send(`He borrado un mensaje de ${message.author.username} porque infringía las políticas de conducta`)
        .catch(console.error);
    }
    else if(message.content === 'clear'){
        channel.bulkDelete(5)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
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