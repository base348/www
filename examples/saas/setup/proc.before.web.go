package setup

import (
	"context"
	"github.com/lishimeng/www/def"
	"github.com/lishimeng/www/examples/internal/domains"
	"github.com/lishimeng/www/examples/saas/storage"
	"github.com/lishimeng/x/container"
)

func ComponentBeforeWeb(_ context.Context) error {
	domains.InitManagers()
	def.QueryPageNum = "pageNum"
	def.QueryPageSize = "pageSize"
	def.DefaultQueryPageSize = 10
	st := storage.NewMemoryStorage()
	container.Add(&st)
	return nil
}
