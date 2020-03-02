package main

import (
	"net/http"

	"github.com/labstack/echo"
)

func main() {
	e := echo.New()
	e.GET("/users/:name", getUserName)
	e.Logger.Fatal(e.Start(":1323"))

}

func getUserName(c echo.Context) error {
	name := c.Param("name")
	return c.String(http.StatusOK, name)
}
