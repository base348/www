package setup

import (
	"context"
	"github.com/lishimeng/www"
	"github.com/lishimeng/www/def"
	"github.com/lishimeng/www/examples/internal/domains"
)

func ComponentBeforeWeb(_ context.Context) error {
	// admin 管理员project，权限最高，不设置账号
	www.SystemScope = def.Admin
	www.SystemMenuGroup = "m_admin"
	domains.InitManagers()
	return nil
}
