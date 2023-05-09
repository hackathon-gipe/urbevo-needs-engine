export type DynamoDBCleanNeed = {
  need_id: string;
  extraction_date: string;
  category: string;
  description: string;
  extra_details: string;
  full_address: string;
  locality_name: string;
  province: string;
  relevance_score: number;
  source: string;
  source_link: string;
  source_id: string;
  source_creation_date: string;
  title: string;
  zip_code: string;
};
