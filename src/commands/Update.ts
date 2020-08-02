import { Command, CommandRequest } from 'quro'
import { SpreadsheetMemberList } from '../classes/MemberList'

export class UpdateCommand extends Command {
  name = 'update'

  aliases = []

  description = ''

  argDefs = {}

  /**
   * Member list.
   */
  readonly memberList = new SpreadsheetMemberList(
    process.env.SHEET_API_KEY,
    process.env.SHEET_ID,
    process.env.SHEET_RANGE
  )

  /**
   * Call on handle.
   *
   * @param request
   */
  async onHandle(request: CommandRequest) {
    request.message.reply('Processing...')
    await this.memberList.update(request.message.guild)
    return this.reply('Done')
  }

  /**
   * Returns parsed arguments.
   *
   * @param request
   */
  getArgs(request: CommandRequest) {
    return this.parseArgs<UpdateCommand>(request)
  }
}

export const update = new UpdateCommand()
