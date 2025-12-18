package setup

import (
	"context"
	"github.com/lishimeng/www/examples/internal/domains"
)

func ComponentBeforeWeb(_ context.Context) error {
	domains.InitManagers()
	return nil
}
