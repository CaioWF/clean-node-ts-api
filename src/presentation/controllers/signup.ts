export default class SignUpController {
  handle(httpRequest: unknown) {
    return {
      httpRequest,
      statusCode: 400,
      body: new Error('Missing param: name'),
    };
  }
}
