import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { DateTime } from 'luxon';

@Scalar('DateTime', () => DateTime)
export class DateTimeScalar implements CustomScalar<string, DateTime> {
  description =
    'Date scalar type, represented as an ISO timestamp over the network. Is parsed to a luxon DateTime object.';

  parseValue(value: string): DateTime {
    const dateTime = DateTime.fromISO(value).toUTC();
    return dateTime;
  }

  serialize(value: DateTime | Date): string {
    if (value instanceof Date) {
      return DateTime.fromJSDate(value).toUTC().toISO();
    }
    return value.toUTC().toISO();
  }

  parseLiteral(ast: ValueNode): DateTime | null {
    if (ast.kind === Kind.STRING) {
      return DateTime.fromISO(ast.value).toUTC();
    }
    return null;
  }
}
