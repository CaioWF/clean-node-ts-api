export default class SignUpController {
  handle(httpRequest: unknown) {
    return {
      httpRequest,
      statusCode: 400,
    };
  }
}
