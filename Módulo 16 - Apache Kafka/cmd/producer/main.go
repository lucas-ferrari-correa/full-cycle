package main

import (
	"fmt"

	"log"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	deliveryChan := make(chan kafka.Event)
	producer := NewKafkaProducer()
	Publish("transferiu", "test", producer, []byte("transferencia2"), deliveryChan)
	go DeliveryReport(deliveryChan) //async

	producer.Flush(1000)

	// e := <-deliveryChan
	// msg := e.(*kafka.Message)
	// if msg.TopicPartition.Error != nil {
	// 	fmt.Println("Erro ao enviar")
	// } else {
	// 	fmt.Println("Mensagem enviada: ", msg.TopicPartition)
	// }

}

func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers":  "mdulo16-apachekafka-kafka-1:9092",
		"acks":               "all",
		"enable.idempotence": "true",
	}
	p, err := kafka.NewProducer(configMap)
	if err != nil {
		log.Println(err.Error())
	}
	return p
}

func Publish(msg string, topic string, producer *kafka.Producer, key []byte, deliveryChan chan kafka.Event) error {
	message := &kafka.Message{
		Value:          []byte(msg),
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Key:            key,
	}
	err := producer.Produce(message, deliveryChan)
	if err != nil {
		return err
	}
	return nil
}

func DeliveryReport(deliveryChan chan kafka.Event) {
	for e := range deliveryChan {
		switch ev := e.(type) {
		case *kafka.Message:
			if ev.TopicPartition.Error != nil {
				fmt.Println("Erro ao enviar")
			} else {
				fmt.Println("Mensagem enviada: ", ev.TopicPartition)
			}
		}
	}
}
