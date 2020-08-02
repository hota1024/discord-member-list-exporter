import { Command, CommandRequest } from 'quro'

export class PingCommand extends Command {
  name = 'ping'

  aliases = []

  description = ''

  argDefs = {}

  /**
   * Call on handle.
   *
   * @param request
   */
  onHandle(request: CommandRequest) {
    request.message.reply('Pong!')
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<PingCommand>(request)
  }
}

export const ping = new PingCommand()
