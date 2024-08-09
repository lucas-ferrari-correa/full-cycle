package main

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "mdulo16-apachekafka_kafka_1:9092",
		"client.id":         "gokafka-consumer",
		"group.id":          "gokafka-group",
	}

	c, err := kafka.NewConsumer(configMap)
	if err != nil {
		fmt.Println("error consumer", err.Error())

		topics := []string{"tests"}
		c.SubscribeTopics(topics, nil)
	}
}
