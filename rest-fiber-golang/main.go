package main

import "github.com/gofiber/fiber/v2"

func main() {
	app := fiber.New(fiber.Config{
		Prefork:      false, // doesn't run on docker even after following steps from https://docs.gofiber.io/api/fiber
		ServerHeader: "Fiber",
		AppName:      "Benchmark App",
	})
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Listen(":3000")
}
