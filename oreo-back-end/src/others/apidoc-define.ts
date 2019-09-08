/**
 * @apiDefine LCCAmountDTO
 * @apiSuccess {Number} likeAmount 点赞总数
 * @apiSuccess {Number} collectAmount 收藏总数
 * @apiSuccess {Number} commentAmount 评论总数
 */

/**
 * @apiDefine TimeDTO
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 */

/**
 * @apiDefine UserDTO
 * @apiSuccess {String} id 编号
 * @apiSuccess {String} nickname 用户名
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 * @apiSuccess {String} phone 手机号
 * @apiSuccess {String} realname 真实姓名
 * @apiSuccess {String} email 邮箱
 * @apiSuccess {String} liveCity 居住城市
 * @apiSuccess {String} hometown 家乡
 * @apiSuccess {String} birth 生日
 * @apiSuccess {String} company 公司
 * @apiSuccess {String} univercity 大学
 * @apiSuccess {String} eduacation 教育程度
 */

/**
 * @apiDefine UniversalSuccessDTO
 * @apiSuccess {String} tipType 弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知
 * @apiSuccess {String} message 提示文本
 */

/**
 * @apiDefine UniversalErrorDTO
 * @apiError {String} tipType 弹窗类型 1: 成功 2: 警告 3: 危险 4: 通知
 * @apiError {String} message 提示文本
 */
