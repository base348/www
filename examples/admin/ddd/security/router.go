package security

import "github.com/lishimeng/app-starter/server"

func Router(root server.Router) {
	root.Post("/", registerApi)
}
