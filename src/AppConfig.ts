/**
 * Singleton. Used to set global configuration.
 */
export class AppConfig {
  private constructor() {}
  private static _instance: AppConfig = new AppConfig();

  /**
   * Gets the current instance of the object. If none exists, it creates a new instance.
   *
   * @returns instance of AppConfig
   *
   */
  static getInstance(): AppConfig {
    if (this._instance === undefined) {
      this._instance = new AppConfig();
    }

    return this._instance;
  }

  /**
   * This represents the maximum dice role result to be considered a botch.
   *
   * @returns number
   *
   */
  Botch: number = 1;
  /**
   * This represents the number above the difficulty to be considered an extraordinary success.
   *
   * @returns number
   *
   */
  ExtraordinarySuccess: number = 7;
}
