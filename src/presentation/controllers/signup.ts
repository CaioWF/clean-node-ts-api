export default class SignUpController {
  handle(httpRequest: any) {
    if (!httpRequest.body.name)
      return {
        httpRequest,
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    if (!httpRequest.body.email)
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    return {};
  }
}
