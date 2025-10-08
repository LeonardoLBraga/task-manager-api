const AuthService = require("../src/services/authService");
const UserModel = require("../src/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../src/models/userModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  afterEach(() => jest.clearAllMocks());

  test("should register a new user", async () => {
    UserModel.getUserByEmail.mockReturnValue(null);
    UserModel.registerUser.mockResolvedValue({ id: 1, email: "test@test.com" });

    const result = await AuthService.register("test@test.com", "123456");

    expect(result).toEqual({ id: 1, email: "test@test.com" });
    expect(UserModel.registerUser).toHaveBeenCalledWith("test@test.com", "123456");
  });

  test("should throw an error if user already exists", async () => {
    UserModel.getUserByEmail.mockReturnValue({ id: 1 });

    await expect(AuthService.register("test@test.com", "123456"))
      .rejects.toThrow("User already exists");
  });

  test("should login successfully and return a token", async () => {
    const secret = "test-secret";

    UserModel.getUserByEmail.mockReturnValue({ id: 1, password: "hash" });
    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockImplementation(() => "fake-token");

    const result = await AuthService.login("test@test.com", "123456", secret);

    expect(result).toEqual({ token: "fake-token" });
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 1 },
      secret,
      expect.objectContaining({ expiresIn: "1h" })
    );
  });

  test("should throw an error if password is invalid", async () => {
    UserModel.getUserByEmail.mockReturnValue({ id: 1, password: "hash" });
    bcrypt.compare.mockResolvedValue(false);

    await expect(AuthService.login("test@test.com", "wrongpass"))
      .rejects.toThrow("Invalid email or password");
  });

  test("should throw an error if user is not found", async () => {
    UserModel.getUserByEmail.mockReturnValue(null);

    await expect(AuthService.login("notfound@test.com", "123456"))
      .rejects.toThrow("Invalid email or password");
  });
});
