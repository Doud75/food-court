package helper

import (
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"log"
	"os"
	"time"
)

func CreatJwt(id uuid.NullUUID, email string, role string) (string, error) {
	key := []byte(os.Getenv("JWT_KEY"))
	t := jwt.NewWithClaims(jwt.SigningMethodHS512,
		jwt.MapClaims{
			"id":        id,
			"email":     email,
			"role":      role,
			"ExpiresAt": jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		})
	s, err := t.SignedString(key)
	return s, err
}

func CheckJwt(tokenString string) (bool, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		log.Fatal(err)
		return false, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		expiresAt := claims["ExpiresAt"].(float64)
		expiresAtTime := time.Unix(int64(expiresAt), 0)
		if time.Now().After(expiresAtTime) {
			return false, errors.New("token expiré")
		}

	} else {
		fmt.Println(err)
		return false, err
	}

	return true, err
}
