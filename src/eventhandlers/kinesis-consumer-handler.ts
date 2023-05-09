import { KinesisStreamHandler, KinesisStreamRecordPayload } from 'aws-lambda';
import { ProcessEngineHandler } from '../application/ProcessEngineHandler';
import { ProcessEngineDto } from '../application/ProcessEngineDto';

const processEngineHandler = new ProcessEngineHandler();

const handler: KinesisStreamHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const payload: KinesisStreamRecordPayload = record.kinesis;
      console.log(`New record from Kinesis: ${Buffer.from(payload.data).toString()}`);
      const message: string = JSON.parse(Buffer.from(payload.data).toString());
      console.log(
        `Kinesis Message:
          partition key: ${payload.partitionKey}
          sequence number: ${payload.sequenceNumber}
          kinesis schema version: ${payload.kinesisSchemaVersion}
          data: ${message}
        `
      );

      //Create ProcessHandlerDto and validate.
      await processEngineHandler.execute(record as ProcessEngineDto);
    }
  } catch (error) {
    console.log(error);
  }
};
