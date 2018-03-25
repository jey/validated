/**
 * @flow
 */

import * as o from '../../src/object';
import * as s from '../../src/schema';

function test_extract_type() {
  // define type
  const PersonFields = s.partialObject({name: s.string, age: s.number, email: s.string});
  const ThingFields = s.partialObject({ owner: PersonFields });

  // this is how to extract type from a validator
  type Person = s.ExtractType<typeof PersonFields>;
//type Thing = s.ExtractType<typeof ThingFields>;

  // assert that types are unified
  const user: Person = o.validate(PersonFields, '');
  const name: string = user.name;
  // $ExpectError
  const invalid: number = user.name;
}
