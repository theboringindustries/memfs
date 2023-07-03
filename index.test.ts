import { write, read, reset, remove } from ".";

import { expect, test, afterEach } from "bun:test";

afterEach(reset);

test("should write file ", () => {
  write("/tmp/lol/kek.txt", "lol");

  expect(read("/tmp/lol/kek.txt")).toBe("lol");
});

test("should write file to existing tree", () => {
  write("/mem/hi/hello.txt", "hello, world");
  write("/tmp/lol/kek.txt", "lol");

  expect(read("/mem/hi/hello.txt")).toBe("hello, world");
  expect(read("/tmp/lol/kek.txt")).toBe("lol");
});

test("should remove file", () => {
  write("/tmp/lol/kek.txt", "lol");

  remove("/tmp/lol/kek.txt");

  expect(() => read("/tmp/lol/kek.txt")).toThrow();
});

test("should remove only specific file", () => {
  write("/mem/hi/hello.txt", "hello, world");
  write("/tmp/lol/kek.txt", "lol");

  remove("/tmp/lol/kek.txt");

  expect(read("/mem/hi/hello.txt")).toBe("hello, world");
  expect(() => read("/tmp/lol/kek.txt")).toThrow();
});
