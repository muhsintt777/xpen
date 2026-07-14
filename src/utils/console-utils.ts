export class ConsoleUtils {
  private static readonly COLORS = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
  } as const;

  static logInfo(message: string): void {
    console.log(`${this.COLORS.cyan}>> ${message}${this.COLORS.reset}`);
  }

  static logSuccess(message: string): void {
    console.log(`${this.COLORS.green}>> ${message}${this.COLORS.reset}`);
  }

  static logWarning(message: string): void {
    console.log(`${this.COLORS.yellow}>> ${message}${this.COLORS.reset}`);
  }

  static logError(message: string): void {
    console.error(`${this.COLORS.red}>> ${message}${this.COLORS.reset}`);
  }
}
