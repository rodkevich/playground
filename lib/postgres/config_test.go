package postgres_test

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"

	"github.com/rodkevich/playground/lib/postgres"
)

func ExampleNewPGPoolConn() {
	cs := postgres.ConnectionStringFromEnv()
	ps := postgres.PoolSettingsFromENV()

	conn, err := postgres.NewPGPoolConn(cs, ps)
	if err != nil {
		panic(err.Error())
	}

	sqlDrop := `drop table if exists "tbl1";`
	sqlCreate := `create table "tbl1" (fld1 integer);`
	sqlInsert := `insert into "tbl1" ("fld1") values (1), (2), (3);`
	sqlSelect := `select fld1 from "tbl1";`

	sqlQueries := []string{sqlCreate, sqlInsert, sqlSelect, sqlDrop}

	options := pgx.TxOptions{
		IsoLevel:       pgx.ReadCommitted,
		AccessMode:     pgx.ReadWrite,
		DeferrableMode: pgx.NotDeferrable,
	}

	ctx := context.Background()
	tx, err := conn.BeginTx(ctx, options)

	for _, sql := range sqlQueries {
		result, err := tx.Exec(ctx, sql)
		if err != nil {
			err := tx.Rollback(ctx)
			if err != nil {
				panic(err.Error())
			}
			return
		}
		fmt.Println(result.RowsAffected())
	}
	err = tx.Commit(ctx)
	if err != nil {
		panic(err.Error())
	}
	// Output:
	// 0
	// 3
	// 3
	// 0
}
