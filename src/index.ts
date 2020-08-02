import { QuroBot, CommandFileLoader, Guild } from 'quro'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { version } from '../package.json'
import { SpreadsheetMemberList } from './classes/MemberList'

dotenv.config()

class Bot extends QuroBot {
  prefixes = ['::']

  version = version

  /**
   * Setup.
   */
  async setup() {
    await this.registerDirectoryCommands('./commands')

    this.onGuildMemberAdd((member) => this.updateMembers(member.guild))
    this.onGuildMemberRemove((member) => this.updateMembers(member.guild))

    this.onReady(() => console.log('Ready'))
  }

  /**
   * Register directory commands.
   *
   * @param directoryPath
   */
  private async registerDirectoryCommands(directoryPath: string) {
    const commandLoader = new CommandFileLoader()
    this.registerCommands(
      await commandLoader.load(path.resolve(__dirname, directoryPath))
    )
  }

  /**
   * Update member list.
   *
   * @param guild Guild object.
   */
  private async updateMembers(guild: Guild) {
    const memberList = new SpreadsheetMemberList(
      process.env.SHEET_API_KEY,
      process.env.SHEET_ID,
      process.env.SHEET_RANGE
    )
    memberList.update(guild)
  }
}

const bot = new Bot()
bot.start(process.env.DISCORD_BOT_TOKEN)
