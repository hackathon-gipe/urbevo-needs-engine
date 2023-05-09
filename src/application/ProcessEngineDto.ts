export type ProcessEngineDto = {
  needId: string;
  extractionDate: Date;
  localityName: string;
  rawText: string;
  source: {
    id: string;
    name: string;
    link: string;
    creationDate: string;
  };
  relevanceData: object;
  fullAddress?: string;
  extraDetails?: string;
};

//TODO: class-validate every field
