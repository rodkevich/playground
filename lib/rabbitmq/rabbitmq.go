package rabbitmq

import (
	"fmt"
	"log"

	"github.com/kelseyhightower/envconfig"
	"github.com/streadway/amqp"
)

// Settings for rabbitmq
type Settings struct {
	Host           string `json:"host" default:"localhost"`
	Port           string `json:"port" default:"5672"`
	User           string `json:"user" default:"guest"`
	Password       string `json:"password" default:"guest"`
	Exchange       string `json:"exchange" default:"default_exchange"`
	Queue          string `json:"queue" default:"default_queue"`
	RoutingKey     string `json:"routing_key" default:"default_routing_key"`
	ConsumerTag    string `json:"consumer_tag" default:"default_consumer_tag"`
	WorkerPoolSize int    `json:"worker_pool_size" default:"24"`
}

const ConnStringTemplate = "amqp://%s:%s@%s:%s/"

// NewConnection initialized with provided settings
func NewConnection(set *Settings) (*amqp.Connection, error) {
	conn, err := amqp.Dial(fmt.Sprintf(ConnStringTemplate, set.User, set.Password, set.Host, set.Port))
	if err != nil {
		return nil, fmt.Errorf("rabbitmq.NewConnection: %w", err)
	}
	return conn, nil
}

func SettingsFromENV() *Settings {
	var s Settings
	err := envconfig.Process("rabbitmq", &s)
	if err != nil {
		log.Fatal(err.Error())
	}

	return &s
}
