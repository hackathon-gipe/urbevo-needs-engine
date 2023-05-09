import { KinesisStreamHandler, KinesisStreamRecordPayload } from 'aws-lambda';
import { ProcessEngineHandler } from '../application/ProcessEngineHandler';
import { ProcessEngineDto } from '../application/ProcessEngineDto';

const processEngineHandler = new ProcessEngineHandler();

export const handler: KinesisStreamHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const payload: KinesisStreamRecordPayload = record.kinesis;
      console.log(`New record from Kinesis: ${Buffer.from(payload.data, 'base64').toString()}`);
      const recordData: object = JSON.parse(Buffer.from(payload.data, 'base64').toString());
      console.log(
        `Kinesis Message:
          partition key: ${payload.partitionKey}
          sequence number: ${payload.sequenceNumber}
          kinesis schema version: ${payload.kinesisSchemaVersion}
        `
      );

      //Create ProcessHandlerDto and validate.
      await processEngineHandler.execute(recordData as ProcessEngineDto);
    }
  } catch (error) {
    console.log(error);
  }
};
