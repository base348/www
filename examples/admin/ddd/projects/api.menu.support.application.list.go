package projects

import (
	"net/http"

	"github.com/lishimeng/app-starter"
	"github.com/lishimeng/app-starter/server"
	"github.com/lishimeng/www/dto"
)

func apiGetSupportProjects(ctx server.Context) {
	var resp app.ResponseWrapper

	var list []any
	list = append(list, dto.Project{Name: "Admin", MenuCategory: "m_admin"})
	list = append(list, dto.Project{Name: "Manager", MenuCategory: "m_manager"})
	list = append(list, dto.Project{Name: "MES", MenuCategory: "m_saas"})
	list = append(list, dto.Project{Name: "ERP", MenuCategory: "m_erp"})

	resp.Code = http.StatusOK
	resp.Message = "success"
	resp.Data = list
	ctx.Json(resp)
}
