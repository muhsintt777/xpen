export class DateUtils {
  /**
   * @returns Current time as Unix timestamp (seconds)
   * @example
   * DateUtils.getCurrentUnixTimestamp() // 1693046400
   */
  static getCurrentUnixTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }
}
