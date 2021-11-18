module.exports = async (msg) => msg.channel.send(`
  \`\`\`
  !help
  !image <image name>
  !weather <city> || !погода <город>
  !gif <gif name>
  !ping
  !money <currency> || !курс <currency>
  !ball
  !draw <text>
  !serverinfo
  !setpresence <activity type, status, activity name>\`\`\`
  `);
