package main

import (
	"database/sql"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	print("Full Cycle Rocks!!\n")

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		response := "<h1>Full Cycle Rocks!</h1>"

		for _, v := range getNames() {
			response += "<p>" + "\n" + v + "<p>"
		}

		w.Write([]byte(response))
	})

	server := http.Server{
		Addr:    ":3000",
		Handler: mux,
	}

	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func getNames() []string {
	db, err := sql.Open("mysql", "root:safe_pwd@/database")
	if err != nil {
		log.Fatal("failed to open db", err)
	}

	defer db.Close()

	rows, err := db.Query("select name from people")
	if err != nil {
		log.Fatal(err)
	}

	names := []string{}
	for rows.Next() {
		name := ""
		rows.Scan(&name)
		names = append(names, "- "+name)
	}

	return names
}
