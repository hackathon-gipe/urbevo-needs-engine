import { Need } from '../../domain/Need';
import { DynamoDBManager } from './DynamoDBManager';
import { DynamoDBCleanNeed } from './DynamoDBCleanNeed.model';
import { marshall } from '@aws-sdk/util-dynamodb';
import { GetItemCommand, GetItemCommandOutput, PutItemCommand, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

export class DynamoDBCleanNeedsRepository {
  private _dynamoManager: DynamoDBManager;
  private tableName = process.env.DYNAMODB_CLEANNEEDS_TABLE;
  constructor() {
    this._dynamoManager = new DynamoDBManager();
  }

  public addCleanNeed(need: Need): Promise<PutItemCommandOutput> {
    return this._dynamoManager.executePutItemCommand(
      new PutItemCommand({
        TableName: this.tableName,
        Item: marshall(this.mapNeedToDynamoItem(need))
      })
    );
  }

  public getCleanNeed(needId: string): Promise<GetItemCommandOutput> {
    return this._dynamoManager.executeGetItemCommand(
      new GetItemCommand({
        TableName: this.tableName,
        Key: {
          need_id: {
            S: needId
          }
        }
      })
    );
  }

  private mapNeedToDynamoItem(need: Need): DynamoDBCleanNeed {
    return {
      need_id: need.needId,
      extraction_date: need.extractionDate.toISOString(),
      category: need.category,
      description: need.description,
      extra_details: need.extra_details ?? '',
      full_address: need.address.fullAddress ?? '',
      locality_name: need.address.localityName,
      province: need.address.province,
      relevance_score: need.relevance_score,
      source: need.source.name,
      source_link: need.source.link,
      source_id: need.source.id,
      source_creation_date: need.source.creationDate.toISOString(),
      title: need.title,
      zip_code: need.address.zipCode
    } as DynamoDBCleanNeed;
  }
}
