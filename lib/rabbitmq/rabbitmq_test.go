package rabbitmq

import (
	"encoding/json"
	"reflect"
	"testing"

	"github.com/stretchr/testify/assert"
)

type Queue struct {
	Id  int64  `json:"id" custom:"0"`
	Key string `json:"key" custom:"1"`
}

type TrackerTask struct {
	Summary string `json:"summary"`
	Queue   Queue  `json:"queue"`
}

func TestSomething(t *testing.T) {
	to := reflect.TypeOf(*new(Queue))
	f := to.Field(1)

	value, ok := f.Tag.Lookup("custom")
	if !ok {
		t.Errorf("incorrect struc tag")
	}
	t.Logf("custom field value: %v", value)

	data := TrackerTask{
		Summary: "SENT",
		Queue: Queue{
			Id:  4,
			Key: "open",
		},
	}

	got, _ := json.Marshal(data)
	want := []byte(`{"summary":"SENT","queue":{"id":4,"key":"open"}}`)
	assert.Equal(t, got, want)
}
