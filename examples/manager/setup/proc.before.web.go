package setup

import (
	"context"
	"github.com/lishimeng/www/def"
	"github.com/lishimeng/www/examples/internal/domains"
)

func ComponentBeforeWeb(_ context.Context) error {
	domains.InitManagers()
	def.QueryPageNum = "pageNum"
	def.QueryPageSize = "pageSize"
	def.DefaultQueryPageSize = 10
	return nil
}
