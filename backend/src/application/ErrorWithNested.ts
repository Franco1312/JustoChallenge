export class ErrorWithNested extends Error {
  private constructor(
    message: string,
    public readonly nested: Error,
    public readonly meta?: Record<string, unknown>,
  ) {
    super(message);
  }

  static new(
    message: string,
    nested: Error,
    opts?: { stack?: string; meta?: Record<string, unknown> },
  ): ErrorWithNested {
    const thiz = new ErrorWithNested(message, nested, opts?.meta);
    thiz.stack = `${opts?.stack ?? thiz.stack}\nCaused by: ${nested.stack}`;
    return thiz;
  }
}
