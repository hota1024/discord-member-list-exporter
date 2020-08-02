import { QuroBot, CommandFileLoader } from 'quro'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { version } from '../package.json'

dotenv.config()

class Bot extends QuroBot {
  prefixes = ['::']

  version = version

  /**
   * Setup.
   */
  async setup() {
    await this.registerDirectoryCommands('./commands')
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
}

const bot = new Bot()
bot.start(process.env.DISCORD_BOT_TOKEN)
