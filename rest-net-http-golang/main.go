// Copyright (c) 2021 Go Chronicles
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

package main

import (
	"fmt"
	"net/http"
)

func HelloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}
func main() {
	http.HandleFunc("/", HelloServer)
	startServer := func() {
		fmt.Println("Serving on port http://0.0.0.0:3000/")
		http.ListenAndServe(":3000", nil)
	}
	startServer()
}
