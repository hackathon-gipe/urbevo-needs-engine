import { CATEGORY } from './Category';

export class Need {
  constructor(
    public readonly needId: string,
    public readonly extractionDate: Date,
    public readonly category: CATEGORY,
    public readonly description: string,
    public readonly relevance_score: number,
    public readonly source: {
      name: string;
      link?: string;
      id?: string;
      creationDate?: Date;
    },
    public readonly address: {
      localityName: string;
      province: string;
      zipCode: string;
      fullAddress?: string;
    },
    public readonly title: string,
    public readonly extra_details?: string
  ) {}
}
