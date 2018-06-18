import { SQLiteDatabaseConfig } from '@ionic-native/sqlite';
import { newPromiseHelper } from '../lib/sql-promise-helper.js';

export class SQLiteObject {
  _objectInstance: any;

  constructor(_objectInstance: any) {
    this._objectInstance = _objectInstance;
  };

  executeSql(statement: string, params: any): Promise<any> {

    return newPromiseHelper(this._objectInstance).executeStatement(statement, params);
  };

  sqlBatch(statements: string[], params: any): Promise<any> {
    return newPromiseHelper(this._objectInstance).executeStatementBatch(statements, params);
  };
}

export class SQLiteMock {
  private win: any = window;

  public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    const db = this.win.openDatabase(config.name, '1.0', 'Main', 5 * 1024 * 1024);
    
    return new Promise((resolve, reject) => {
      resolve(new SQLiteObject(db));
    });
  }
}
