import { createField } from '../../src/queries/field';

describe('field', () => {
  describe('createField', () => {
    it('returns a field with given value', () => {
      expect(createField('field_name', 42)).toEqual({ field_name: 42 });
    });

    it('returns a field with another field inside when keys are given separated by dots', () => {
      expect(createField('field_name.sub_field', 42)).toEqual({
        field_name: { sub_field: 42 },
      });
    });
  });
});
