import { ChatCompletionService } from '../infrastructure/chatgpt/ChatCompletionService';
import { ProcessEngineDto } from './ProcessEngineDto';
import { DynamoDBCleanNeedsRepository } from '../infrastructure/dynamodb/DynamoDBCleanNeedsRepository';
import { EngineResponse } from '../domain/EngineResponse';
import { Need } from '../domain/Need';
import { CATEGORY } from '../domain/Category';
import { TwitterRelevanceData, getTwitterRelevance } from '../domain/SourceData';

export class ProcessEngineHandler {
  //chatgpt service and dynamodbrepository
  private _chatCompletionService: ChatCompletionService;
  private _cleanNeedRepository: DynamoDBCleanNeedsRepository;
  constructor() {
    this._chatCompletionService = new ChatCompletionService();
    this._cleanNeedRepository = new DynamoDBCleanNeedsRepository();
  }

  public async execute(processDto: ProcessEngineDto): Promise<string> {
    console.log(`Sending need ${processDto.needId} to engine`);
    const engineResponse: EngineResponse = await this._chatCompletionService.getNeedsCompletion(
      processDto.rawText,
      processDto.localityName
    );
    const cleanNeed = new Need(
      processDto.needId,
      new Date(processDto.extractionDate),
      engineResponse.category as CATEGORY,
      engineResponse.description,
      this.calculateScore(processDto),
      {
        name: processDto.source.name,
        link: processDto.source.link,
        id: processDto.source.id,
        creationDate: new Date(processDto.source.creationDate)
      },
      {
        localityName: processDto.localityName,
        province: engineResponse.province,
        zipCode: engineResponse.zip_code,
        fullAddress: processDto.fullAddress
      },
      engineResponse.title,
      processDto.extraDetails
    );

    console.log(`Saving need ${cleanNeed.needId} to repository`);
    await this._cleanNeedRepository.addCleanNeed(cleanNeed);
    return cleanNeed.needId;
  }

  private calculateScore(processDto: ProcessEngineDto): number {
    switch(processDto.source.name) {
        case 'twitter': return getTwitterRelevance(processDto.relevanceData as TwitterRelevanceData);
        default: return 0;
    }
  }
}
