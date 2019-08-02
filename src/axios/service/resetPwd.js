import {$get, $post} from '@/axios/base/';

/**
 * 修改密码
 * @param params
 */
export function login(params) {
    return $post('auth-user/changePwd', params);
}