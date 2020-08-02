import { Guild, PromiseOr } from 'quro'

/**
 * MemberList interface.
 */
export interface IMemberList {
  /**
   * Update and store guild member list.
   *
   * @param guild Guild.
   */
  update(guild: Guild): PromiseOr
}
