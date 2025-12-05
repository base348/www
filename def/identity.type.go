package def

import (
	"regexp"
	"strings"
)

type IdentityType int

const (
	LoginCode          = 1
	LoginPhone         = 2
	LoginEmail         = 3
	LoginWechatUnionId = 4
	LoginWechatOpenId  = 5
)

// DetectIdentityType 根据 identityCode 的格式自动判断身份类型
func DetectIdentityType(identityCode string) IdentityType {
	// 判断是否为邮箱（包含 @ 符号）
	if strings.Contains(identityCode, "@") {
		return LoginEmail
	}

	// 判断是否为手机号（11位数字，以1开头）
	phoneRegex := regexp.MustCompile(`^1[3-9]\d{9}$`)
	if phoneRegex.MatchString(identityCode) {
		return LoginPhone
	}

	// 判断是否为微信相关（包含特定前缀或格式）
	if strings.HasPrefix(identityCode, "wx_") || strings.HasPrefix(identityCode, "unionid_") {
		return LoginWechatUnionId
	}
	if strings.HasPrefix(identityCode, "openid_") {
		return LoginWechatOpenId
	}

	// 默认使用登录码
	return LoginCode
}
