const { generateExcuse, getCategories } = require("../lib/excuses");
const request = require("supertest");
const app = require("../app");

describe("generateExcuse", () => {
  test("returns a string for each category", () => {
    const categories = getCategories();
    categories.forEach((cat) => {
      const excuse = generateExcuse(cat);
      expect(typeof excuse).toBe("string");
      expect(excuse.length).toBeGreaterThan(20);
    });
  });

  test("throws on unknown category", () => {
    expect(() => generateExcuse("aliens")).toThrow("Unknown category: aliens");
  });

  test("produces varied results (not always identical)", () => {
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(generateExcuse("late"));
    }
    expect(results.size).toBeGreaterThan(1);
  });
});

describe("getCategories", () => {
  test("returns an array of category names", () => {
    const cats = getCategories();
    expect(Array.isArray(cats)).toBe(true);
    expect(cats).toContain("late");
    expect(cats).toContain("birthday");
  });
});

describe("Express routes", () => {
  test("GET / returns 200 with category buttons", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("The Excuse Generator");
    expect(res.text).toContain("Late to Work");
  });

  test("POST /excuse returns 200 with an excuse", async () => {
    const res = await request(app)
      .post("/excuse")
      .type("form")
      .send({ category: "gym" });
    expect(res.status).toBe(200);
    expect(res.text).toContain("Your Excuse");
  });

  test("GET /api/excuse/:category returns JSON with an excuse", async () => {
    const res = await request(app).get("/api/excuse/late");
    expect(res.status).toBe(200);
    expect(res.body.excuse).toBeDefined();
    expect(typeof res.body.excuse).toBe("string");
  });
});
