package main

import (
	"net/http"
	"os"
	"path/filepath"
	"context"
	"fmt"
	"log"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"encoding/json"
	"github.com/Valgard/godotenv"
);

var dbpool *pgxpool.Pool;

func FailureHandler(writer http.ResponseWriter, req *http.Request, err *error) {
	writer.WriteHeader(http.StatusInternalServerError);
	fmt.Println("ERROR: Handling ", req.URL.Path);
	panic(err);
}

func DefaultHandler(writer http.ResponseWriter, req *http.Request) {
	var urlPath string;
	if (req.URL.Path == "/") {
		urlPath = "/index.html";
	} else {
		urlPath = req.URL.Path;
	}
	buf, err := os.ReadFile(filepath.Join("web", urlPath));
	if (err != nil) {
		writer.WriteHeader(http.StatusNotFound);
		writer.Write([]byte("ERROR 404: Resource Not Found"));
		fmt.Println("Resource at URL ", req.URL.Path, " not found");
		return;
	}
	writer.Write(buf);
}

func RepeatHandler(writer http.ResponseWriter, req *http.Request) {
	writer.Header().Add("Content-Type", "application/json");
	res, _ := json.Marshal(map[string]interface{}{"msg": chi.URLParam(req, "msg")});
	writer.Write(res);
}

func QueryHandler(writer http.ResponseWriter, req *http.Request) {
	conn, err := dbpool.Acquire(context.TODO());
	if (err != nil) {
		FailureHandler(writer, req, &err);
	}

	rows, err := conn.Query(context.TODO(), "select * from things;");
	if (err != nil) {
		FailureHandler(writer, req, &err);
	}
	writer.Header().Set("Content-Type", "application/json");
	var respList []map[string]interface{};
	var id, num1 int;
	var name string;
	for ;rows.Next(); {
		rows.Scan(&id, &num1, &name);
		respList = append(respList, map[string]interface{} {"id": id, "num1": num1, "name": name});
	}
	res, _ := json.Marshal(respList);
	writer.Write(res);
}


func main() {

	dotenv := godotenv.New();
	err := dotenv.Load(".env")
	if (err != nil) {
		panic(err)
	}

	router := chi.NewRouter();
	router.Get("/*", DefaultHandler);

	apiRouter := chi.NewRouter();
	apiRouter.Get("/query", QueryHandler);
	apiRouter.Get("/repeat/{msg}", RepeatHandler);

	router.Mount("/api", apiRouter);

	dbpool, err = pgxpool.New(context.Background(), "postgresql://test:test_passwd@localhost:5432/backend_test");
	if (err != nil) {
		panic(err)
	}
	defer dbpool.Close();

	fmt.Println("Starting HTTP server...");

	log.Fatal(http.ListenAndServe(":8080", router));
}

