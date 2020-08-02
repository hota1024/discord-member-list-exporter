import { Guild } from 'quro'
import { google, sheets_v4 } from 'googleapis'
import { IMemberList } from '../interfaces/MemberList'
import { resolve } from 'path'

/**
 * SpreadsheetMemberList class.
 */
export class SpreadsheetMemberList implements IMemberList {
  /**
   * Sheets object.
   */
  readonly sheets: sheets_v4.Sheets

  /**
   * Sheet id.
   */
  readonly id: string

  /**
   * Sheet range.
   */
  readonly range: string

  /**
   * SpreadsheetMemberList constructor.
   *
   * @param key API Key.
   * @param id Sheet ID.
   * @param range Sheet range.
   */
  constructor(key: string, id: string, range: string) {
    this.sheets = google.sheets({
      version: 'v4',
      auth: new google.auth.GoogleAuth({
        keyFile: resolve(__dirname, '../../google.json'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      }),
    })
    this.id = id
    this.range = range
  }

  async update(guild: Guild) {
    const members = guild.members.cache
    const param: any = {
      spreadsheetId: this.id,
      range: this.range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: members.map((member) => [
          member.id,
          member.user.username,
          member.nickname,
        ]),
      },
    }

    await this.sheets.spreadsheets.values.update(param)
  }
}
