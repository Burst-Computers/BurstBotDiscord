module.exports = (client) => {
    const channelId = '736850841314787359' //Id del canal al que se está conectando (miembros, voice channel)
  
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get(channelId)
      channel.setName(`Miembros:  ${guild.memberCount.toLocaleString()}`)
    }
  
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))
  
    const guild = client.guilds.cache.get('726380606593695754')
    updateMembers(guild)
  }