package postgres

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/kelseyhightower/envconfig"
)

type PoolSettings struct {
	ConnQuantityMin   int32 `default:"10"`
	ConnQuantityMax   int32 `default:"50"`
	ConnTimeIdleMax   int32 `default:"1"` // minutes
	ConnTimeLifetime  int32 `default:"3"` // minutes
	HealthCheckPeriod int32 `default:"3"` // minutes
}

// ConnectionSettings for postgres
type ConnectionSettings struct {
	Host     string `default:"0.0.0.0"`
	Port     string `default:"5432"`
	User     string `default:"postgres"`
	Password string `default:"postgres"`
	DBName   string `default:"postgres"`
	SSLMode  string `default:"disable"` // mode should be either require or disable
}

func NewPGPoolConn(connString string, s *PoolSettings) (*pgxpool.Pool, error) {
	ctx := context.Background()
	poolCfg, err := pgxpool.ParseConfig(connString)
	if err != nil {
		return nil, fmt.Errorf("pgxpool.ParseConfig: %w", err)
	}

	poolCfg.MaxConns = s.ConnQuantityMax
	poolCfg.MinConns = s.ConnQuantityMin
	poolCfg.HealthCheckPeriod = time.Duration(s.HealthCheckPeriod)
	poolCfg.MaxConnIdleTime = time.Duration(s.ConnTimeIdleMax)
	poolCfg.MaxConnLifetime = time.Duration(s.ConnTimeLifetime)

	connPool, err := pgxpool.NewWithConfig(ctx, poolCfg)
	if err != nil {
		return nil, fmt.Errorf("pgxpool.NewWithConfig: %w", err)
	}
	return connPool, nil
}

func ConnectionString(host, port, user, dbname, sslmode, password string) string {
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=%s password=%s",
		host, port, user, dbname, sslmode, password,
	)
}

func ConnectionStringFromEnv() string {
	s := ConnectionSettingsFromENV()
	return ConnectionString(
		s.Host, s.Port, s.User, s.DBName, s.SSLMode, s.Password,
	)
}

func ConnectionSettingsFromENV() *ConnectionSettings {
	var s ConnectionSettings
	err := envconfig.Process("connection", &s)
	if err != nil {
		log.Fatal(err.Error())
	}
	return &s
}

func PoolSettingsFromENV() *PoolSettings {
	var s PoolSettings
	err := envconfig.Process("pool", &s)
	if err != nil {
		log.Fatal(err.Error())
	}
	return &s
}
