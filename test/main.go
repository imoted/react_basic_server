package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {

	//upload size
	err := r.ParseMultipartForm(200000) // grab the multipart form
	if err != nil {
		fmt.Fprintln(w, err)
	}

	//reading original file
	file, handler, err := r.FormFile("originalFile")
	if err != nil {
		fmt.Println("Error Retrieving the File")

		fmt.Println(err)
		return
	}
	defer file.Close()

	resFile, err := os.Create("./data/" + handler.Filename)
	if err != nil {
		fmt.Fprintln(w, err)
	}
	defer resFile.Close()
	if err == nil {
		io.Copy(resFile, file)
		defer resFile.Close()
		fmt.Fprintf(w, "Successfully Uploaded Original File\n")
	}
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	id := vars["id"]

	reply := Reply{
		Message: "id(" + id + ")を取得しました",
	}
}

// func UserHandler()

func main() {
	// r := mux.NewRouter()
	// r.HandleFunc("/api/users/{id:[0-9]+}", UserHandler).Methods("GET")
	// r.Host("localhost")

	http.HandleFunc("/uploadFile/:name", uploadFile)
	http.HandleFunc("/api/users/{id:[0-9]+}", UserHandler)
	http.ListenAndServe(":8083", nil)

}
