const prettier = require("prettier");

function subject(code, options = {}) {
  try {
    return prettier.format(code, {
      parser: "typescript",
      plugins: ["."],
      jsdocSpaces: 1,
      ...options,
    });
  } catch (error) {
    console.error(error);
  }
}

test("JS code should be formatted as usuall", () => {
  const result = subject(`
  /**
 @typedef {
    {
        "userId": string,
        "title": string,
        "profileImageLink": string,
        "identityStatus": "None",
        "isBusinessUser": boolean,
        "isResellerUser": boolean,
        "isSubUser": boolean,
        "shareCode": number,
        "referredBy": string,
        "businessName": string,
        "businessUserId": string,
        "nationalCode": string,
        "state": string,
        "city": string,
        "address": string,
        "phoneNumber": string
      }
     } User
     */
  export let User

  /**
     @typedef {
      {
        "domainId": 0,
        persianName: string,
        "englishName": string, // comment
        "resellerUserId": string,
        "isActive": true,
        "logoFileUniqueId": string,
        "logoFileName": string,
        "logoFileUrl": string,
        "domainPersianName": string,
        "domainEnglishName": string,
        "resellerUserDisplayName": string,
        "about": string
      }
     } SubDomain
     */

    /**
     @typedef {
      () => a.b
     } SubDomain
     */
    `);

  expect(result).toMatchSnapshot();
});

test("hoisted object", () => {
  const result = subject(`
  /**
 @typedef {
    {
        "userId": {
        title: string,
        "profileImageLink": *,
        "identityStatus": "None",
        "isBusinessUser": "isResellerUser"|"isBoolean"|  "isSubUser" |    "isNot",
        "shareCode": number,
        "referredBy": any,
        },
        id:number
      }
     } User
     */
 
    `);

  expect(result).toMatchSnapshot();
});

test("max width challenge", () => {
  const result = subject(
    `
class test {
  /**
   * Replaces text in a string, using a regular expression or search string.
   * @param {string | RegExp} searchValue A string to search for.
   * @param {string | (substring: string, ...args: any[]) => string} replaceValue A string containing the text to replace for every successful match of searchValue in this string.
   * @param {string | (substring: string, ...args: any[]) => string} A_big_string_for_test A string containing the text to replace for every successful match of searchValue in this string.
   * @param {string | (substring: string, ...args: any[]) => string} replaceValue A_big_string_for_test string containing the text to replace for every successful match of searchValue in this string.
   * @param {string | (substring: string, ...args: any[]) => string} A_big_string_for_test A_big_string_for_test string containing the text to replace for every successful match of searchValue in this string.
   * @returns {StarkStringType & NativeString}
   */
  replace(searchValue, replaceValue) {
    class test{
      /**
     * Replaces text in a string, using a regular expression or search string.
     *
     * @param {string | RegExp} searchValue A string to search for.
     * @param {string | (substring: string, ...args: any[]) => string} replaceValue
     *     A string containing the text to replace for every successful match of
     *     searchValue in this string.
     * @param {string | (substring: string, ...args: any[]) => string} A_big_string_for_test
     *     A string containing the text to replace for every successful match of searchValue
     *     in this string.
     * @param {string | (substring: string, ...args: any[]) => string} replaceValue
     *     A_big_string_for_test string containing the text to replace for every
     *     successful match of searchValue in this string.
     * @param {string | (substring: string, ...args: any[]) => string} A_big_string_for_test
     *     A_big_string_for_test string containing the text to replace for every successful
     *     match of searchValue in this string.
     * @returns {StarkStringType & NativeString}
     */
        testFunction(){
  
        }
      }
  
    this._value = this._value.replace(searchValue, replaceValue);
    return this;
  }
}
`,
  );

  expect(result).toMatchSnapshot();
});

test("description in interface", () => {
  const result = subject(
    `
export interface FetchCallbackResponseArray<T, V> {
  resource: Resource<T>;
      /**
       * @deprecated Resolve clear with condition in your fetch api this function will be remove
       */
  refetch: (...arg: V[]) => void;
  /**
   * @deprecated Resolve clear with condition in your fetch api this function will be remove
   */
  clear: () => void;
}
`,
  );

  expect(subject(subject(result))).toMatchSnapshot();
});

test("Default export", () => {
  const result = subject(`
/**
 * @typedef {import("Foo")} Foo
 */
`);

  expect(result).toMatchSnapshot();
});

test("Union types", () => {
  const result = subject(`
/**
 * @typedef {{ foo: string } | { bar: string; manyMoreLongArguments: object } | { baz: string }} Foo
 */
`);

  expect(result).toMatchSnapshot();
});
