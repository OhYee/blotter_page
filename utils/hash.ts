import randomString from '@/utils/random';

function hash(value: any): string {
  switch (typeof value) {
    case 'string':
      return value;
    case 'object':
      return JSON.stringify(value);
    case 'number':
      return `${value}`;
  }
  return randomString();
}

export default hash;
