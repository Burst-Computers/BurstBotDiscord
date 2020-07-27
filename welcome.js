module.exports = (client) => {
    const channelId = '727327002721255528' // Canal de bienvenida
    const canalbienvenida = '736829409872576563' // Canal reglas
    const canalgeneral = '726380606593695757' // Canal general
    const canalcafeteria = '736841262321106984' // Canal charla
  
    client.on('guildMemberAdd', (member) => {
      const message = `Bienvenido <@${
        member.id
      }> Soy el Bot administrador del Servidor. Aqui hay unas cuantas cosas importantes: \n \n * Al momento de publicar, recuerda hacerlo en el canal correspondiente al tema que deseas tratar. \n * Para conversar conmigo escribeme un mensaje privado con el comando /iniciar \n * Las ofensas están prohibidas dentro del servidor. Revisa nuestras ${member.guild.channels.cache
        .get(canalbienvenida) 
        .toString()} de conducta \n * El canal ${member.guild.channels.cache
        .get(canalgeneral)
        .toString()} es unicamente para noticias por parte de los administradores. \n\n ¿Alguna duda o inquietud? ve a la ${member.guild.channels.cache
            .get(canalcafeteria)
            .toString()} y exprésate. Saludos!`
      const channel = member.guild.channels.cache.get(channelId)
      channel.send(message)
    })
  }