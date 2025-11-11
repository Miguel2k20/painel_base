import { AppDataSource } from '../data-source'
import { TextContent } from '../entities/TextContent'

export const TextContentRepository = AppDataSource.getRepository(TextContent)
