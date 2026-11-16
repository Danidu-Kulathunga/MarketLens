import { apiClient } from './apiClient';
import { INITIAL_DATA_SOURCES, INITIAL_IMPORT_BATCHES } from '@/data/mock/dataManagerData';
import { DataSourceItem, ImportBatch } from '@/types';

export const pipelineService = {
  async getDataSources(): Promise<DataSourceItem[]> {
    return apiClient.get<DataSourceItem[]>('/pipeline/sources', INITIAL_DATA_SOURCES);
  },

  async getImportBatches(): Promise<ImportBatch[]> {
    return apiClient.get<ImportBatch[]>('/pipeline/batches', INITIAL_IMPORT_BATCHES);
  },
};
