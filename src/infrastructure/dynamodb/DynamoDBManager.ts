import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
  PutItemCommand,
  PutItemCommandOutput,
  QueryCommand,
  QueryCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandOutput,
  DeleteItemCommand,
  ScanCommand,
  DeleteItemCommandOutput,
  ScanCommandOutput
} from '@aws-sdk/client-dynamodb';

export class DynamoDBManager {
  private _client: DynamoDBClient;

  constructor() {
    this._client = new DynamoDBClient({
      region: 'eu-south-2'
    });
  }

  public getClient(): DynamoDBClient {
    return this._client;
  }

  public async executeGetItemCommand(command: GetItemCommand): Promise<GetItemCommandOutput> {
    console.log(`Get item from DynamoDB table ${command.input.TableName} with Key ${command.input.Key}`);
    return this._client.send(command);
  }

  public async executeQueryCommand(command: QueryCommand): Promise<QueryCommandOutput> {
    console.log(`Query item from DynamoDB table ${command.input.TableName} with Key ${command.input.KeyConditions}`);
    return this._client.send(command);
  }

  public async executePutItemCommand(command: PutItemCommand): Promise<PutItemCommandOutput> {
    console.log(`Put item into DynamoDB table ${command.input.TableName}`);
    return this._client.send(command);
  }

  public async executeUpdateItemCommand(command: UpdateItemCommand): Promise<UpdateItemCommandOutput> {
    console.log(`Update item into DynamoDB table ${command.input.TableName} with Key ${command.input.Key}`);
    return this._client.send(command);
  }

  public async executeDeleteItemCommand(command: DeleteItemCommand): Promise<DeleteItemCommandOutput> {
    console.log(`Delete item from DynamoDB table ${command.input.TableName} with Key ${command.input.Key}`);
    return this._client.send(command);
  }

  public async executeScanCommand(command: ScanCommand): Promise<ScanCommandOutput> {
    console.log(`Scan DynamoDB table ${command.input.TableName}`);
    return this._client.send(command);
  }
}
