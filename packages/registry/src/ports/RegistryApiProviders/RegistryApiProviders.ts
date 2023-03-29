import { Attribute } from '../../domain/Attribute';
import { CreateAttribute } from './types';

export interface RegistryApiProvider {
  createAttributesBulk(attributes: CreateAttribute[]): Promise<Attribute[]>;
  createAttribute(attribute: CreateAttribute): Promise<Attribute>;
}
