package passwords

import (
	"fmt"

	"github.com/lishimeng/x/digest"
)

func salting(plainText, salt string) string {
	return fmt.Sprintf("%s@%s", salt, plainText)
}

func Encode(plainText string, tsNano int64, salt string) string {
	return digest.Generate(plainText, tsNano, func(plaintext string) string {
		return salting(plainText, salt)
	})
}

func Validate(plainText string, tsNano int64, salt string, encoded string) bool {
	return digest.Verify(plainText, encoded, tsNano, func(plaintext string) string {
		return salting(plainText, salt)
	})
}
