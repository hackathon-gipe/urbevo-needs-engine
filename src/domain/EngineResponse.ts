import { CATEGORY } from './Category';

export type EngineResponse = {
  category: CATEGORY;
  title: string;
  description: string;
  province: string;
  zip_code: string;
  estimated_population: number;
};
