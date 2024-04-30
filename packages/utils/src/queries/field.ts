/**
 * Deep recursive field with `V` final value.
 */
type Field<V> = { [key: string]: Field<V> | V };

/**
 * Creates a deep recursive object with dot separated keys and a final value.
 * For example, `createField<number>('a.b.c', 42)` will return `{ a: { b: { c: 42 } } }`.
 */
export function createField<V>(keys: string, value: V): Field<V> {
  return keys.split('.').reduceRight(
    (prev: Field<V> | V, key: string): Field<V> => ({
      [key]: prev,
    }),
    value,
  ) as Field<V>; // casted becuse keys is assumed to not be empty
}
