export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// const appErrNotfound = new AppError(404, "Not Found");

// console.log("Name:", appErrNotfound.name);
// console.log("Status Code:", appErrNotfound.statusCode);
// console.log("Message:", appErrNotfound.message);
// console.log("Stack:", appErrNotfound.stack);
// console.log("Cause:", appErrNotfound.cause);
